import { MakeSchemaGenerator, SchemaGeneratorConfig } from "./generateSchema";
import path from "path";
import Ajv, { Options as AjvOptions } from "ajv";
import addFormats from "ajv-formats";
import { validator } from "./createValidator";
import { Test } from "./test.type";

const tsjConfig: SchemaGeneratorConfig = {
  path: path.resolve(__dirname, "./test.type.ts"),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "*",
  // expose: "all"
};

const schemaGenerator = MakeSchemaGenerator(tsjConfig);

const schema = schemaGenerator.generateSchema();

console.log(JSON.stringify(schema, null, 2));

const ajvConfig: AjvOptions = {
  allErrors: true,
};

const ajv = new Ajv(ajvConfig).addSchema(schema, "SCHEMA");
addFormats(ajv);

const data = {
  id: "3e336960-e5bc-457e-9b29-0947fd5babef",
  posInteger: 1,
  float: 0.1231245,
  ts: Date.now(),
  startsWithA: "amazing",
  email: "nan",
  emails: ["anotherEmail@test.com", "isEmail@test.com"],
  nested: {
    nestedEmail: "email@mail.com",
  },
};

const validatedRes = validator<Test>({ data, validationClient: ajv });

if ("validationErrors" in validatedRes) {
  console.log("VALIDATION ERRORS", validatedRes);
} else {
  console.log("VALID RES", validatedRes);
}
