import {aocTest} from "../util/aoc-test.js";

const example = `\
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 13, null],
)

function solveA(input: string) {
  const cmds = input.split('\n').map(it=> {
    const [c, n] = it.split(' ');
    return c.repeat(Number(n)).split('');
  }).flat();

  const visited = new Set<string>('0,0');
  let hr=0,hc=0,tr=0,tc=0;
  for(let ch of cmds){
    // const grid = Array.from({length: 5}, ()=> Array.from({length: 6}, ()=>'.'));
    // grid[tr][tc] = 'T';
    // grid[hr][hc] = 'H';
    // console.log(grid.map(r=>r.join('')).reverse().join('\n')+'\n');

    switch(ch){
      case 'R': hc++; break;
      case 'L': hc--; break;
      case 'U': hr++; break;
      case 'D': hr--; break;
    }

    let dr = hr - tr;
    let dc = hc - tc;
    if(Math.abs(dr) <= 1 && Math.abs(dc) <= 1) continue;
    if(dr === 0){
      tc += Math.floor(dc/2);
    } else if(dc === 0){
      tr += Math.floor(dr/2);
    } else {
      tr += dr < 0 ? -1 : (dr > 0 ? 1 : 0)
      tc += dc < 0 ? -1 : (dc > 0 ? 1 : 0)
    }

    // } else {
    //     console.log(ch, [hr,hc], [tr,tc])
    //     break;
    //   }
    // break;
    visited.add(`${tr},${tc}`)
  }
  return visited.size - 1;
}
function solveB(input: string) {
  return input.length;
}
