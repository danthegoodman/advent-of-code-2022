import {aocTest} from "../util/aoc-test.js";

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [`R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2`, 13, 1],
  ["R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20", null, 36],
)

function solveA(input: string) {
  return solveCommon(input, 2);
}

function solveB(input: string) {
  return solveCommon(input, 10);
}

function solveCommon(input: string, knots: number){
  const cmds = input.split('\n').map(it=> {
    const [c, n] = it.split(' ');
    return c.repeat(Number(n)).split('');
  }).flat();

  const visited = new Set<string>(['0,0']);
  const segments = Array.from({length: knots}, ()=> [0,0]);
  for(const ch of cmds){
    switch(ch){
      case 'R': segments[0][1]++; break;
      case 'L': segments[0][1]--; break;
      case 'U': segments[0][0]++; break;
      case 'D': segments[0][0]--; break;
    }

    for(let i = 1; i < segments.length;i++){
      const curr = segments[i];
      const prev = segments[i-1];
      const dr = prev[0] - curr[0];
      const dc = prev[1] - curr[1];
      if(Math.abs(dr) > 1 || Math.abs(dc) > 1){
        curr[0] += dr === 0 ? 0 : (dr < 0 ? -1 : 1);
        curr[1] += dc === 0 ? 0 : (dc < 0 ? -1 : 1);
      }
    }
    visited.add(segments.at(-1)!.join(','))
  }
  return visited.size;
}
