import {aocTest} from "../util/aoc-test.js";
import _ from 'lodash';

const example = `\
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`;
const output = `\
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 13140, output],
)

function solveA(input: string) {
  const lines = input.split('\n');
  let c = 20;
  let x = 1;
  let result = 0;
  for(let l of lines){
    if(l === 'noop') {
      c++;
      if(c%40 === 0){
        result += (c-20) * x;
        // console.log('1',(c-20), x, (c-20) * x)
      }
    } else {
      c += 2;
      if(c%40 === 1){
        result += (c-21) * x;
        // console.log('2',(c-21), x, (c-21) * x)
      }
      if(c%40 === 0){
        result += (c-20) * x;
        // console.log('3',(c-20), x, (c-20) * x)
      }
      x += Number(l.split(' ')[1]);
    }
  }
  return result;
}

function solveB(input: string) {
  const lines = input.split('\n');
  let output = [];
  let c = 0;
  let x = 1;
  for(let l of lines){
    output.push(Math.abs(x - (c%40)) <= 1 ? '#' : '.');
    // console.log(output);
    c++;
    if(l === 'noop') continue;

    output.push(Math.abs(x - (c%40)) <= 1 ? '#' : '.');
    // console.log(output);
    c++;
    x += Number(l.split(' ')[1]);
  }
  return _.chunk(output.slice(0,240),40).map(it=>it.join('')).join('\n');
}
