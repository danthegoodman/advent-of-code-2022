import _ from "lodash";
import {aocTest} from "../util/aoc-test.js";

const example = `\
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;


await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 157, 70],
);

function solveA(input: string) {
  const lines = input.split('\n');
  let sum = 0;
  for(const l of lines){
    const seen = new Set(l.slice(0, l.length/2));
    const dup = l.slice(l.length/2).split('').find(it=> seen.has(it));
    if(!dup) throw new Error("bad input")
    sum += priority(dup)
  }
  return sum
}
function solveB(input: string) {
  const lines = input.split('\n');
  const groups = _.chunk(lines, 3);
  let sum = 0;
  for(const [a,b,c] of groups){
    const seenOnce = new Set(a);
    const seenTwice = new Set(b.split('').filter(it=> seenOnce.has(it)));
    const dup = c.split('').find(it=> seenTwice.has(it))
    if(!dup) throw new Error("bad input")
    sum += priority(dup)
  }
  return sum
}

function priority(char: string){
  const code = char.charCodeAt(0);
  if (char > 'a') {
    return 1 + (code - 'a'.charCodeAt(0))
  } else {
    return 27 + (code - 'A'.charCodeAt(0))
  }
}
