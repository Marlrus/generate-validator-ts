import { MakeSchemaGenerator } from "./make-schema-client";
import { MakeValidatorClient } from "./make-validator-client";
import { createTemplate } from "./validator-template";
import path from "path";
import fs from "fs";
import * as tsj from "ts-json-schema-generator";
import { DEFAULT_CONFIG } from "./config";
import jsonConfig from "./genvalidatorconfig.json";

export { MaybeValidator } from "./make-validator-client";
export { Schema } from "./make-schema-client";

console.log({ jsonConfig });

const config = {
  ...DEFAULT_CONFIG,
  ...jsonConfig,
};

const { tsconfigPath, ...tsjConfigValues } = config.tsjConfig as tsj.Config & {
  tsconfigPath: string;
};

const typePath = "./test.type.ts";

const tsjConfig = {
  path: path.resolve(__dirname, typePath),
  tsconfig: path.resolve(__dirname, tsconfigPath),
  type: "*",
  ...tsjConfigValues,
};

const { makeSchemaGeneratorOptions } = jsonConfig;

const schemaGenerator = MakeSchemaGenerator({ tsjConfig, ...makeSchemaGeneratorOptions });

const { ajvConfig } = config;

const { ajvClientOptions } = config;
const { makeValidatorClientOptions } = config;

export const ValidatorClient = MakeValidatorClient({
  ajvClientArgs: {
    ajvConfig,
    ...ajvClientOptions,
  },
  ...makeValidatorClientOptions,
});

const renamedFile = typePath.split(".").slice(0, -1).join(".").concat(".validator.ts");
const outPath = path.resolve(__dirname, `${renamedFile}`);

console.log({ outPath });

const template = createTemplate({ typeNames: ["Test", "Something"], schemaGenerator });

fs.writeFileSync(outPath, template);
console.log("Generated Validators");
