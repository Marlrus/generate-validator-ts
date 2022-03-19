import * as tsj from "ts-json-schema-generator";
import fs from "fs";
import path from "path";

export type Test = {
  requiredProp: string;
  optionalProp?: string;
  /**
   * Size
   *
   * @minimum 0
   * @TJS-type integer
   */
  minTest: number;
  /**
   * Email
   *
   * @TJS-type number
   */
  emailTest: string;
};

export type ShapesData = {
  /**
   * Specify individual fields in items.
   *
   * @items.type integer
   * @items.minimum 0
   */
  sizes: number[];

  /**
   * Or specify a JSON spec:
   *
   * @items {"type":"string","format":"email"}
   */
  emails: string[];
};

const config = {
  path: path.resolve(__dirname, "./index.ts"),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "*",
};

const out_path = "./test.ts";

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);

console.log(schemaString);
