import {aocTest} from "../util/aoc-test.js";

const example = `\
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 2, 4],
);

function solveA(input: string) {
  const data = input.split('\n').map(it=>it.match(/\d+/g)!.map(Number));
  let count = 0;
  for(const [a,b,x,y] of data){
    if(a <= x && y <= b){
      count += 1
    } else if(x <= a && b <= y){
      count += 1
    }
  }
  return count;
}
function solveB(input: string) {
  const data = input.split('\n').map(it=>it.match(/\d+/g)!.map(Number));
  let count = 0;
  for(const [a,b,x,y] of data){
    if(a <= x && x <= b){
      count += 1
    } else if(a <= y && y <= b){
      count += 1
    } else if(x <= a && a <= y){
      count += 1
    } else if(x <= b && b <= y){
      count += 1
    }
  }
  return count;
}
