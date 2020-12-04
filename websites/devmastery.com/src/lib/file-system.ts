import fs from "fs";
import path from "path";

interface FileInfo {
  createdAt: number;
  modifiedAt: number;
  contents: string;
  path: string;
}

export const makePath = path.join;

export const fileExists = pathExists;
export const folderExists = pathExists;
function pathExists(path: string): boolean {
  return fs.existsSync(path);
}

export async function listSubfolders(parentFolder: string): Promise<string[]> {
  if (!folderExists(parentFolder)) {
    throw new Error(`Folder "${parentFolder}" does not exist.`);
  }

  return fs
    .readdirSync(parentFolder)
    .filter((item) => isFolder(path.join(parentFolder, item)));
}

export function isFolder(path: string): boolean {
  return fs.statSync(path).isDirectory();
}

export function isFile(path: string): boolean {
  return fs.statSync(path).isFile();
}

export async function getFileInfo(path: string): Promise<FileInfo> {
  let [stat, contents] = await Promise.all([
    fs.promises.stat(path),
    fs.promises.readFile(path, { encoding: "utf8" }),
  ]);

  return {
    createdAt: stat.ctimeMs,
    modifiedAt: stat.mtimeMs,
    contents,
    path,
  };
}
