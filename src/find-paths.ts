import * as globby from "globby";
import path from "path";
import fs from "fs";
import readline from "readline";

const findPaths = () => {
  const typePaths = globby.sync(["**.type.ts"], { ignore: ["node_modules"] });

  const typeFilePaths: string[] = [];

  for (const typePath of typePaths) {
    const absPath = path.resolve(process.cwd(), typePath);
    typeFilePaths.push(absPath);
  }

  return typeFilePaths;
};

const findTypes = async (absPath: string) => {
  const readStream = fs.createReadStream(absPath);
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  const typeNames: string[] = [];

  for await (const line of rl) {
    const isExportedTypeLine = line.includes("export type");
    if (!isExportedTypeLine) continue;
    const type = line.split(" ")[2];
    typeNames.push(type);
  }

  return typeNames;
};

const main = async () => {
  const filePaths = findPaths();
  for (const filePath of filePaths) {
    const types = await findTypes(filePath);
    console.log({ filePath, types });
  }
};

main();
