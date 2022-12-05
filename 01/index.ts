import * as assert from 'assert';
import {readInput} from "../util/read-input.js";

function main(){
  const input = readInput(import.meta.url)
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

  assert.strictEqual(24000, solveA(example))
  assert.strictEqual(70369, solveA(input))

  assert.strictEqual(45000, solveB(example))
  assert.strictEqual(203002, solveB(input))
}

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

main()
