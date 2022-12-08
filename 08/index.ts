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

  const counts: number[][] = grid.map((row, r)=> {
    return row.map((val, c) => {
      const col = grid.map(it => it[c]);
      const views = [
        row.slice(0, c),
        row.slice(c + 1),
        col.slice(0, r),
        col.slice(r + 1),
      ]
      const canSeeOut = views.some(arr => arr.every(it => it < val));
      return canSeeOut ? 1 : 0;
    });
  })
  return counts.flat().reduce((a,b)=> a + b, 0);
}

function solveB(input: string) {
  const grid = input.split('\n').map(it=> it.split('').map(Number));

  const scores = grid.map((row, r)=> {
    return row.map((val, c) => {
      const col = grid.map(it=> it[c]);
      const views = [
        row.slice(0,c).reverse(),
        row.slice(c+1),
        col.slice(0, r).reverse(),
        col.slice(r+1),
      ]
      const distances = views.map(arr=> {
        const ndx = arr.findIndex(it=> it >= val)
        return ndx + 1 || arr.length;
      });
      return distances.reduce((a,b)=> a*b, 1)
    });
  })
  return Math.max(...scores.flat());
}
