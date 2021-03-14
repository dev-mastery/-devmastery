import fs from "fs";
import fsPath from "path";

interface FileInfo {
  createdAt: number;
  modifiedAt: number;
  contents: string;
  path: string;
}

export const makePath = fsPath.join;

export const fileExists = pathExists;
export const folderExists = pathExists;
function pathExists({ path }: { path: string }): boolean {
  return fs.existsSync(path);
}

export function readDir({ path }: { path: string }): string[] {
  if (!isDir({ path })) {
    throw new Error(`${path} is not a directory.`);
  }
  return fs.readdirSync(path);
}

export function isDir({ path }: { path: string }): boolean {
  return fs.statSync(path).isDirectory();
}

export function isFile({ path }: { path: string }): boolean {
  return fs.statSync(path).isFile();
}

export function readFile({ path }: { path: string }): FileInfo {
  const stat = fs.statSync(path);
  const contents = fs.readFileSync(path, { encoding: "utf8" });

  return {
    createdAt: stat.ctimeMs,
    modifiedAt: stat.mtimeMs,
    contents,
    path,
  };
}
