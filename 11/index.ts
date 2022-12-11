import {aocTest} from "../util/aoc-test.js";

const example = `\
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 10605, 2713310158],
)

function solveA(input: string) {
  const monkeys = parseInput(input);

  let round = 0;
  while(round < 20){
    round ++;
    for(const m of monkeys.values()){
      while(m.items.length){
        m.inspectCount ++;

        const worry = m.items.shift()!;
        let newWorry: number = eval(m.op.replace(/old/g, String(worry)));
        newWorry = Math.floor(newWorry / 3);

        const target = newWorry % m.div === 0 ? m.trueTo : m.falseTo;
        monkeys.get(target)!.items.push(newWorry);
      }
    }
  }

  const counts = Array.from(monkeys.values(), it=> it.inspectCount)
    .sort((a,b)=>b-a);
  return counts[0] * counts[1];
}

function solveB(input: string) {
  const monkeys = parseInput(input);
  const commonMult = Array.from(monkeys.values(), it=>it.div).reduce((a,b)=>a*b, 1);

  let round = 0;
  while(round < 10_000){
    round ++;
    for(const m of monkeys.values()){
      while(m.items.length){
        m.inspectCount ++;
        const worry = m.items.shift()!;
        let newWorry:number = eval(m.op.replace(/old/g, String(worry)));
        newWorry %= commonMult;

        const target = newWorry % m.div === 0 ? m.trueTo : m.falseTo;
        monkeys.get(target)!.items.push(newWorry);
      }
    }
  }

  const counts = Array.from(monkeys.values(), it=> it.inspectCount)
    .sort((a,b)=>b-a);
  return counts[0] * counts[1];
}

function parseInput(input: string){
  return new Map(Array.from(
    input.matchAll(/^Monkey (\d+):\s+Starting items: (.+)\s+Operation: new = (.*)\s+Test: divisible by (.*)\s+If true: throw to monkey (.*)\s+If false: throw to monkey (.*)\s*/gm),
    ([, id, items, op, div, trueTo, falseTo]) => {
      return [id, {
        items: items.split(', ').map(Number),
        op,
        div: Number(div),
        trueTo,
        falseTo,
        inspectCount: 0,
      }]
    },
  ))
}
