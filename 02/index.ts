import {aocTest} from "../util/aoc-test.js";

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [`A Y\nB X\nC Z`, 15, 12],
);

function solveA(input: string) {
  const guide = input.trim().split('\n').map(it=>it.split(' '));
  let score = 0;
  for(const [left,right] of guide){
    if(right === 'X') score += 1;
    if(right === 'Y') score += 2;
    if(right === 'Z') score += 3;
    if(left === 'A'){
      if(right === 'X') score += 3;
      if(right === 'Y') score += 6;
      if(right === 'Z') score += 0;
    }
    if(left === 'B'){
      if(right === 'X') score += 0;
      if(right === 'Y') score += 3;
      if(right === 'Z') score += 6;
    }
    if(left === 'C'){
      if(right === 'X') score += 6;
      if(right === 'Y') score += 0;
      if(right === 'Z') score += 3;
    }
  }
  return score;
}
function solveB(input: string) {
  const guide = input.trim().split('\n').map(it=>it.split(' '));
  let score = 0;
  for(const [left,right] of guide){
    if(right === 'X'){
     if(left === 'A') score += 3
     if(left === 'B') score += 1
     if(left === 'C') score += 2
    }
    if(right === 'Y'){
      score += 3
      if(left === 'A') score += 1
      if(left === 'B') score += 2
      if(left === 'C') score += 3
    }
    if(right === 'Z'){
      score += 6
      if(left === 'A') score += 2
      if(left === 'B') score += 3
      if(left === 'C') score += 1
    }
  }
  return score;
}
