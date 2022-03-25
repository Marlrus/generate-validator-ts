import { MakeSchemaGenerator, Schema } from "./make-schema-client";
import { MakeValidatorClient } from "./make-validator-client";
import { createTemplate } from "./validator-template";
import path from "path";
import fs from "fs";
import * as tsj from "ts-json-schema-generator";
import { DEFAULT_CONFIG } from "./config";
import jsonConfig from "./genvalidatorconfig.json";

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

const schemaGenerator = MakeSchemaGenerator({ tsjConfig, debug: true });

const { ajvConfig } = config;

const { ajvClientOptions } = config;
const { makeValidatorClientOptions } = config;

export const ValidatorClient = MakeValidatorClient({
  ajvClienArgs: {
    ajvConfig,
    ...ajvClientOptions,
  },
  ...makeValidatorClientOptions,
});

export type SchemaType = Schema;

const renamedFile = typePath.split(".").slice(0, -1).join(".").concat(".validator.ts");
const outPath = path.resolve(__dirname, `${renamedFile}`);

console.log({ outPath });

const template = createTemplate({ typeNames: ["Test", "Something"], schemaGenerator });

console.log(template);

fs.writeFileSync(outPath, template);
