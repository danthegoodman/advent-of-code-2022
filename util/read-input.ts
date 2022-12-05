import {fileURLToPath} from "url";
import {readFileSync} from "fs";
import { dirname } from "path";

export function readInput(importMetaUrl: string){
  const filename = dirname(fileURLToPath(importMetaUrl)) + '/input.txt';
  return readFileSync(filename, 'utf8').trim();
}
