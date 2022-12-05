import {readInput} from "../util/read-input.js";
import * as assert from 'assert';
import _ from "lodash";

function main() {
  const input = readInput(import.meta.url);
  const example = `\
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

  assert.strictEqual(157, solveA(example));
  assert.strictEqual(7701, solveA(input));

  assert.strictEqual(70, solveB(example));
  assert.strictEqual(2644, solveB(input));
}

main();

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
