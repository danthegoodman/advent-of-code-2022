import chalk from "chalk";
import {basename, dirname} from "path";
import {fileURLToPath} from "url";
import {readFileSync, writeFileSync} from "fs";

type AocResult = string | number | null | undefined;
type AocTestFn = (input: string) => AocResult;
type AocExample = [string, string | number, string | number];
type AocTest = {
  solveA: AocTestFn | null
  solveB: AocTestFn | null
}

export async function aocTest(importMetaUrl: string, opts: AocTest, ...examples: AocExample[]) {
  const testId = basename(dirname(fileURLToPath(importMetaUrl)));
  const dataDir = dirname(dirname(fileURLToPath(import.meta.url))) + "/data";

  const input = await readInput(dataDir, testId);
  const solvers = [["A", opts.solveA], ["B", opts.solveB]] as const;

  for (const [name, solver] of solvers) {
    if (!solver) continue;

    let passed = true;
    for (const [n, ex] of examples.entries()) {
      passed &&= runExample(name, n, solver, ex);
    }
    if (!passed) {
      console.log(chalk.yellow(`${name}: Examples failed.`) + " Not running against input");
      continue;
    }

    runReal(testId, dataDir, name, solver, input)

    if(name === "A") console.log();
  }
}

async function readInput(dataDir: string, testId: string){
  const filename = `${testId}-input.txt`;
  const result = maybeReadFile(dataDir + "/" + filename);
  if (!result) throw `missing ${filename}`;
  return result.trim();
}

function maybeReadFile(filename: string): string | null {
  try {
    return readFileSync(filename, 'utf8');
  } catch (e: any){
    if(e.code !== "ENOENT") throw e;
    return null;
  }
}

function runExample(part: 'A' | 'B', n: number, solver: AocTestFn, ex: AocExample): boolean {
  const actual = solver(ex[0]);
  const expected = String(part === 'A' ? ex[1] : ex[2]);

  let message: string;
  let color: (s:string)=>string;
  if (actual == undefined) {
    message = `${actual} result`;
    color = chalk.redBright;
  } else {
    const actStr = String(actual)
    if (actStr === expected) {
      message = "✅ "
      color = chalk.green;
    } else {
      message = "\n   actual: " + actual + "\n expected: " + expected;
      color = chalk.red;
    }
  }

  const title = color(`${part}: Example ${n + 1}`)
  console.log(title+": " + message);

  return color === chalk.green;
}

function runReal(testId: string, dataDir: string, part: 'A' | 'B', solver: AocTestFn, input: string){
  const actual = solver(input);
  const actStr = String(actual);

  const outputFile = `${dataDir}/${testId}-output${part}.txt`;
  const expected = maybeReadFile(outputFile);

  let message: string;
  let color: (s:string)=>string;
  if (actual == undefined) {
    message = `${actual} result`;
    color = chalk.redBright;
  } else {
    message = actStr;
    if(expected != null){
      if(actStr === expected){
        color = chalk.green;
      } else {
        message += chalk.yellow("\nPrevious") + ": " + expected;
        color = chalk.yellow;
      }
    } else {
      color = s=>s;
    }
    writeFileSync(outputFile, actStr);
  }

  console.log(color(`${part} Result`) + ": " + message);
}

