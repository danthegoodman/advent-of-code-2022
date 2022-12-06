import {aocTest} from "../util/aoc-test.js";

const example = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 24000, 45000],
);

function solveA(input: string): number {
  let groups = input.trim().split('\n\n');
  let max = 0;
  for(const grp of groups){
    const sum = grp.split('\n').map(Number).reduce((a,b)=>a+b, 0);
    if(sum > max){
      max = sum;
    }
  }
  return max;
}

function solveB(input: string): number {
  let groups = input.trim().split('\n\n');
  const sums = groups.map(grp=> grp.split('\n').map(Number).reduce((a,b)=>a+b, 0));
  sums.sort((a,b)=> a-b);
  return sums.slice(-3).reduce((a,b)=>a+b,0);
}
