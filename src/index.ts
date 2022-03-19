import * as TJS from "typescript-json-schema";
import fs from "fs";
import path from "path";

const settings: TJS.PartialArgs = {
  required: true,
};

const tsconfigContent = fs.readFileSync(path.resolve(__dirname, "../tsconfig.json"));

const compilerOptions: TJS.CompilerOptions = JSON.parse(tsconfigContent.toString()).compilerOptions;

export type Test = {
  /**
   * Specify individual fields in items.
   *
   * @items.type integer
   * @items.minimum 0
   */
  sizes: number;

  /**
   * Or specify a JSON spec:
   *
   * @items {"type":"string","format":"email"}
   */
  emails: string[];
  obj: Test2;
};

export type Test2 = {
  /**
   * Specify individual fields in items.
   *
   * @items.type integer
   * @items.minimum 0
   */
  sizes: number;

  /**
   * Or specify a JSON spec:
   *
   * @items {"type":"string","format":"email"}
   */
  emails: string[];
};

const program = TJS.getProgramFromFiles([path.resolve(__dirname, "./index.ts")], compilerOptions);

const schemaString = TJS.generateSchema(program, "Test", settings);

console.log(JSON.stringify(schemaString, null, 2));
