import * as globby from "globby";
import fs from "fs";
import readline from "readline";

type FindPathsArgs = {
  typeFileTerminations: string[];
};

const findPaths = ({ typeFileTerminations }: FindPathsArgs) => {
  const searchPatterns = typeFileTerminations.map((termination) => `**${termination}`);
  const typeFilePaths = globby.sync(searchPatterns, { ignore: ["node_modules"], absolute: true });
  return typeFilePaths;
};

const findExportedTypes = async (absPath: string) => {
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

const findOutPath = (absPath: string) => {
  const outPath = `${absPath.split(".ts")[0]}.validator.ts`;
  return outPath;
};

const main = async () => {
  const filePaths = findPaths({ typeFileTerminations: [".type.ts"] });
  for (const filePath of filePaths) {
    const exportedTypes = await findExportedTypes(filePath);
    const outPath = findOutPath(filePath);
    console.log({ filePath, exportedTypes, outPath });
  }
};

main();
