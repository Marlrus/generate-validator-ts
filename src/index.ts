import { MakeSchemaGenerator, Schema } from "./make-schema-client";
import { MakeValidatorClient } from "./make-validator-client";
import { createTemplate } from "./validator-template";
import path from "path";
import fs from "fs";
// import * as ExpectedTypes from "./test.type";

const typePath = "./test.type.ts";

const tsjConfig = {
  path: path.resolve(__dirname, typePath),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "*",
  // expose: "all"
};

const schemaGenerator = MakeSchemaGenerator({ tsjConfig, debug: true });

const ajvConfig = {
  allErrors: true,
};

export const ValidatorClient = MakeValidatorClient({
  ajvClienArgs: {
    ajvConfig,
    debugTime: true,
  },
  debugTime: true,
});

export type SchemaType = Schema;

const renamedFile = typePath.split(".").slice(0, -1).join(".").concat(".validator.ts");
const outPath = path.resolve(__dirname, `${renamedFile}`);

console.log({ outPath });

const template = createTemplate({ typeNames: ["Test", "Something"], schemaGenerator });

console.log(template);

fs.writeFileSync(outPath, template);
