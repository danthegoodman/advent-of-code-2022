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

  const visited = new Set<string>(['0,0']);
  let hr=0,hc=0,tr=0,tc=0;
  for(const ch of cmds){
    switch(ch){
      case 'R': hc++; break;
      case 'L': hc--; break;
      case 'U': hr++; break;
      case 'D': hr--; break;
    }

    const dr = hr - tr;
    const dc = hc - tc;
    if(Math.abs(dr) <= 1 && Math.abs(dc) <= 1) continue;
    tr += dr === 0 ? 0 : (dr < 0 ? -1 : 1);
    tc += dc === 0 ? 0 : (dc < 0 ? -1 : 1);
    visited.add(`${tr},${tc}`)
  }
  return visited.size;
}

function solveB(input: string) {
  return input.length;
}
