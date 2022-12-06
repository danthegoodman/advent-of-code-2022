import {aocTest} from "../util/aoc-test.js";

const example = `\
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, "CMZ", "MCD"],
);

function solveA(input: string) {
  const {state, moves} = parseInput(input);
  for(const {move,from,to} of moves){
    const fromArr = state.get(from)!
    const toArr = state.get(to)!;
    for(let i = 0; i < move; i++){
      toArr.push(fromArr.pop()!);
    }
  }
  return Array.from(state.values(), it=> it.at(-1)).join('')
}

function solveB(input: string) {
  const {state, moves} = parseInput(input);
  for(const {move,from,to} of moves){
    const fromArr = state.get(from)!
    const toArr = state.get(to)!;
    toArr.push(...fromArr.splice(-move, move));
  }
  return Array.from(state.values(), it=> it.at(-1)).join('')
}

function parseInput(input: string){
  const [state, moves] = input.split('\n\n');
  return {
    state: parseState(state),
    moves: parseMoves(moves),
  }
}

function parseState(input: string){
  const stateIds = input.slice(input.lastIndexOf('\n'));
  const state = new Map<string, string[]>();
  for(const {0: id, index} of stateIds.matchAll(/\d+/g)){
    const rex = new RegExp("^.{" + (index!-1) + "}([A-Z])", "gm");
    const values = Array.from(input.matchAll(rex), it=>it[1]);
    state.set(id, values.reverse());
  }
  return state;
}

function parseMoves(input: string){
  return input.split('\n').map(line=>{
    const [,move,from,to] = line.match(/move (\d+) from (\d+) to (\d+)/)!;
    return {move: Number(move), from, to}
  })
}
