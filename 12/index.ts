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
  return solveCommon(input, 'up')
}
function solveB(input: string) {
  return solveCommon(input, 'down')
}

function findPos(grid: string[][], char: string){
  for(let r = 0; r < grid.length; r++){
    for(let c = 0; c < grid[r].length; c++){
      if(grid[r][c] === char){
        return [r,c] as const;
      }
    }
  }
  throw new Error("not found");
}
function getCode(char: string){
  switch (char){
    case 'S': return 0;
    case 'E': return 26;
  }
  return char.charCodeAt(0) - A_CODE;
}

function solveCommon(input: string, going: 'up' | 'down'){
  const startChar = going === 'up' ? 'S' : 'E';
  const endChar = going === 'up' ? 'E' : 'a';
  const grid = input.split('\n').map(it=>[...it]);
  const count = grid.map(r=> r.map(()=> -1));
  const start = findPos(grid, startChar);
  const posQueue = [ start ];
  count[start[0]][start[1]] = 0;

  while(posQueue.length){
    const [r,c] = posQueue.shift()!;
    const currCount = count[r][c];
    const currLvl = getCode(grid[r][c]);
    const consider = [[r-1,c],[r+1,c],[r,c-1],[r,c+1]] as const;

    for(const [r2,c2] of consider){
      if(count[r2]?.[c2] !== -1) continue;
      const nextCh = grid[r2][c2];
      const nextLvl = getCode(nextCh);
      if(going === 'up'){
        if(nextLvl - 1 > currLvl) continue;
      } else {
        if(nextLvl + 1 < currLvl) continue;
      }

      if(nextCh === endChar) return currCount + 1;
      count[r2][c2] = currCount + 1;
      posQueue.push([r2,c2]);
    }
  }
  throw new Error("never found")
}
