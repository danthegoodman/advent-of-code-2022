import {aocTest} from "../util/aoc-test.js";

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, 11, 26],
)

function solveA(input: string) {
  return findConsecutiveUnique(input, 4)
}
function solveB(input: string) {
  return findConsecutiveUnique(input, 14)
}

function findConsecutiveUnique(input: string, len: number) {
  for (let i = 0; i < input.length; i++) {
    if (new Set(input.slice(i, i + len)).size === len) {
      return i + len;
    }
  }
  return -1;
}
