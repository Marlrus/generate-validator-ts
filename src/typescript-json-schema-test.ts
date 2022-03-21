import * as TJS from "typescript-json-schema";
import fs from "fs";
import path from "path";

const settings: TJS.PartialArgs = {
  ref: true,
  aliasRef: true,
  topRef: true,
  titles: true,
  noExtraProps: true,
  required: true,
  strictNullChecks: true,
  tsNodeRegister: true,
};

const tsconfigContent = fs.readFileSync(path.resolve(__dirname, "../tsconfig.json"));

const compilerOptions: TJS.CompilerOptions = JSON.parse(tsconfigContent.toString()).compilerOptions;

const program = TJS.getProgramFromFiles(
  [path.resolve(__dirname, "./test.type.ts")],
  compilerOptions
);

export const tsJsonGen = () => {
  const schemaString = TJS.generateSchema(program, "Test", settings);

  console.log(JSON.stringify(schemaString, null, 2));
  return schemaString!;
};
