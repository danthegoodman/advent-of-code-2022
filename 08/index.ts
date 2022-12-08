import {aocTest} from "../util/aoc-test.js";

const example = `\
30373
25512
65332
33549
35390`;

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 21, 8],
)

function solveA(input: string) {
  const grid = input.split('\n').map(it=> it.split('').map(Number));
  let count = 0;
  for(let r = 0; r < grid.length;r++){
    for(let c = 0;  c < grid[r].length; c++){
      if(r === 0 || r === grid.length - 1) count ++;
      else if(c === 0 || c == grid[r].length - 1) count ++;
      else {
        const row = grid[r];
        const col = grid.map(it=> it[c]);
        const rowBefore = row.slice(0,c);
        const rowAfter = row.slice(c+1);
        const colBefore = col.slice(0, r);
        const colAfter = col.slice(r+1);
        const consider = [rowBefore, rowAfter, colBefore, colAfter];
        const val = grid[r][c];
        const found = consider.find(arr=> arr.every(it=> it < val))
        if(found){
          count ++;
        }
      }
    }
  }
  return count;
}
function solveB(input: string) {
  const grid = input.split('\n').map(it=> it.split('').map(Number));
  let max = 0;
  for(let r = 0; r < grid.length;r++){
    for(let c = 0;  c < grid[r].length; c++){
      let score = getScore(r,c);
      if(score > max){
        max = score;
      }
    }
  }
  return max;

  function getScore(r:number,c:number){
    const row = grid[r];
    const col = grid.map(it=> it[c]);
    const val = grid[r][c];
    const rowBefore = row.slice(0,c).reverse();
    const rowAfter = row.slice(c+1);
    const colBefore = col.slice(0, r).reverse();
    const colAfter = col.slice(r+1);
    const consider = [rowBefore, rowAfter, colBefore, colAfter].map(arr=>{
      let newArr = [];
      for(let i = 0; i< arr.length;i++){
        const it = arr[i];
        if(it === val){
          newArr.push(it);
          return newArr;
        }
        if(it > val){
          newArr.push(it);
          return newArr
        } else {
          newArr.push(it);
        }
      }
      return newArr;
    })
    return consider.map(it=> it.length).reduce((a,b)=> a*b, 1);
  }
}
