import {aocTest} from "../util/aoc-test.js";

const example = `\
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

await aocTest(
  import.meta.url,
  {solveA, solveB},
  [example, 95437, 24933642],
)

type Tree = Map<string, Tree | number>;

function getTreeFromInput(input: string): Tree {
  const lines = input.split('\n');
  const root: Tree = new Map();

  const treeStack = [root];
  for(let ln of lines){
    if(ln[0] === '$'){
      const [cmd, arg] = ln.slice(2).split(' ');
      if(cmd === 'cd'){
        if(arg === '..'){
          treeStack.pop();
        } else if(arg === '/'){
          treeStack.splice(0, treeStack.length, root);
        } else {
          let nextTree = treeStack.at(-1)!.get(arg);
          if(!(nextTree instanceof Map)) throw `expected traversal into dir at ${arg}`
          treeStack.push(nextTree);
        }
      }
    } else {
      const [size, name] = ln.split(' ');
      if(size === 'dir'){
        treeStack.at(-1)!.set(name, new Map())
      } else {
        treeStack.at(-1)!.set(name, Number(size))
      }
    }
  }

  return root;
}

function sumSubFiles(tree: Tree): number {
  let size = 0;
  for(let y of tree.values()){
    if(typeof y === 'number'){
      size += y;
    } else {
      size += sumSubFiles(y);
    }
  }
  return size;
}

function* iterSizes(tree: Tree): Iterable<number>{
  for(let y of tree.values()){
    if(typeof y === 'number') continue;
    yield* iterSizes(y);
  }
  yield sumSubFiles(tree);
}

function solveA(input: string) {
  const tree = getTreeFromInput(input);

  let result = 0;
  for(let size of iterSizes(tree)){
    if(size >= 100000) continue;
    result += size;
  }
  return result;
}

function solveB(input: string) {
  const tree = getTreeFromInput(input);
  const unused = 70_000_000 - sumSubFiles(tree);
  const delNeeded = 30_000_000 - unused;

  let best = Number.POSITIVE_INFINITY;
  for(let size of iterSizes(tree)){
    if(size < delNeeded) continue;
    if(size > best) continue;
    best = size;
  }
  return best;
}
