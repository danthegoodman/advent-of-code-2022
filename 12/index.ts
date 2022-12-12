import {aocTest} from "../util/aoc-test.js";

const A_CODE = 'a'.charCodeAt(0);

const example = `\
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 31, 29],
)

function solveA(input: string) {
  const grid = input.split('\n').map(it=>[...it]);
  const count = grid.map(r=> r.map(()=> NaN));
  let posQueue: [number,number][] = [];
  for(let r = 0; r < grid.length; r++){
    for(let c = 0; c < grid[r].length; c++){
      if(grid[r][c] === 'S'){
        posQueue.push([r,c])
        count[r][c] = 0;
      }
    }
  }

  function tryVisit(currCh: string, currCount: number, r: number, c:number){
    const nextCh = grid[r]?.[c];
    if(nextCh === undefined) return;
    if(Number.isFinite(count[r][c])) return;

    const currLvl = currCh === 'S' ? 0 : currCh.charCodeAt(0) - A_CODE;
    const nextLvl = nextCh === 'E' ? 26 : nextCh.charCodeAt(0) - A_CODE;
    if(nextLvl - 1 > currLvl) return;
    // console.log(currCh, '->', nextCh)
    count[r][c] = currCount + 1;
    posQueue.push([r,c]);
  }
  while(posQueue.length){
    const [r,c] = posQueue.shift()!;
    const curr = grid[r][c];
    const currCount = count[r][c];
    if(curr === 'E') {
      return currCount;
    }
    tryVisit(curr,currCount, r-1, c);
    tryVisit(curr,currCount, r+1, c);
    tryVisit(curr,currCount, r, c-1);
    tryVisit(curr,currCount, r, c+1);
  }
  return input && null;
}

function solveB(input: string) {
  const grid = input.split('\n').map(it=>[...it]);
  const count = grid.map(r=> r.map(()=> NaN));

  let posQueue: [number,number][] = [];
  for(let r = 0; r < grid.length; r++){
    for(let c = 0; c < grid[r].length; c++){
      if(grid[r][c] === 'E'){
        posQueue.push([r,c])
        count[r][c] = 0;
      }
    }
  }

  function tryVisit(currCh: string, currCount: number, r: number, c:number){
    const nextCh = grid[r]?.[c];
    if(nextCh === undefined) return;
    if(Number.isFinite(count[r][c])) return;

    const currLvl = currCh === 'E' ? 26 : currCh.charCodeAt(0) - A_CODE;
    const nextLvl = nextCh === 'S' ? 0 : nextCh.charCodeAt(0) - A_CODE;
    console.log(currCh, nextCh)
    if(nextLvl < currLvl - 1) return;
    count[r][c] = currCount + 1;
    posQueue.push([r,c]);
  }
  while(posQueue.length){
    const [r,c] = posQueue.shift()!;
    const curr = grid[r][c];
    const currCount = count[r][c];
    if(curr === 'a') {
      return currCount;
    }
    tryVisit(curr,currCount, r-1, c);
    tryVisit(curr,currCount, r+1, c);
    tryVisit(curr,currCount, r, c-1);
    tryVisit(curr,currCount, r, c+1);
  }
}
