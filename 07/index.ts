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

function solveA(input: string) {
  const lines = input.split('\n');
  let cwd: string[] = [];
  let listing = false;
  type Tree = Map<string, Tree | number>;
  const tree: Tree = new Map();
  function treeGetCwd(){
    let t = tree;
    for(const part of cwd){
      t = t.get(part) as Tree
    }
    return t;
  }

  for(let ln of lines){
    if(ln[0] === '$'){
      const cmd = ln.slice(2)
      if(cmd === 'ls'){
        listing = true;
      } else {
        const newPlace = cmd.split(' ')[1];
        if(newPlace === '..'){
          cwd.pop();
        } else if(newPlace === '/'){
          cwd.splice(0, cwd.length);
        } else {
          cwd.push(newPlace);
        }
      }
    } else if(listing){
      const [size, name] = ln.split(' ');
      if(size === 'dir'){
        treeGetCwd().set(name, new Map())
      } else {
        treeGetCwd().set(name, Number(size))
      }
    } else {
      throw 'bad state'
    }
  }

  function sumSubFiles(tree: Tree): number{
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
  function* iterSizes(path: string, tree: Tree): Iterable<[string, number]>{
    for(let [x, y] of tree){
      if(typeof y !== 'number'){
        for(let sub of iterSizes(path + '/' + x, y)){
          yield sub;
        }
      }
    }
    yield [path, sumSubFiles(tree)];
  }

  let result = 0;
  for(let [,size] of iterSizes('', tree)){
    if(size < 100000){
      result += size;
    }
  }
  return result;
}
function solveB(input: string) {
  const lines = input.split('\n');
  let cwd: string[] = [];
  let listing = false;
  type Tree = Map<string, Tree | number>;
  const tree: Tree = new Map();
  function treeGetCwd(){
    let t = tree;
    for(const part of cwd){
      t = t.get(part) as Tree
    }
    return t;
  }

  for(let ln of lines){
    if(ln[0] === '$'){
      const cmd = ln.slice(2)
      if(cmd === 'ls'){
        listing = true;
      } else {
        const newPlace = cmd.split(' ')[1];
        if(newPlace === '..'){
          cwd.pop();
        } else if(newPlace === '/'){
          cwd.splice(0, cwd.length);
        } else {
          cwd.push(newPlace);
        }
      }
    } else if(listing){
      const [size, name] = ln.split(' ');
      if(size === 'dir'){
        treeGetCwd().set(name, new Map())
      } else {
        treeGetCwd().set(name, Number(size))
      }
    } else {
      throw 'bad state'
    }
  }

  function sumSubFiles(tree: Tree): number{
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
  function* iterSizes(path: string, tree: Tree): Iterable<[string, number]>{
    for(let [x, y] of tree){
      if(typeof y !== 'number'){
        for(let sub of iterSizes(path + '/' + x, y)){
          yield sub;
        }
      }
    }
    yield [path, sumSubFiles(tree)];
  }


  const sizes = Array.from(iterSizes('', tree))
    .sort((a,b)=> b[1]-a[1]);

  const avail = 70000000;
  const unusedNeeded = 30000000;
  const unused = avail - sizes[0][1];
  const delNeeded = unusedNeeded - unused;
  const ndx = sizes.findIndex(it=> it[1] <= delNeeded);
  return sizes[ndx - 1][1];
}
