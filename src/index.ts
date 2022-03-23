import { MakeSchemaGenerator } from "./create-schema-client";
import { MakeValidatorClient } from "./create-validator";
import { MakeAjvClient } from "./create-ajv-client";
import { createTemplate } from "./validator-template";
import path from "path";
import fs from "fs";
import { Test } from "./test.type";

const typePath = "./test.type.ts";

const tsjConfig = {
  path: path.resolve(__dirname, typePath),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "*",
  // expose: "all"
};

const schemaGenerator = MakeSchemaGenerator({ tsjConfig, debug: true });

const schema = schemaGenerator.generateSchema();

const ajvConfig = {
  allErrors: true,
};

export const ajv = MakeAjvClient({ ajvConfig, debug: true });

const data = {
  id: "3e336960-e5bc-457e-9b29-0947fd5babef",
  posInteger: 1,
  float: 0.1231245,
  ts: Date.now(),
  startsWithA: "amazing",
  email: "email@test.com",
  emails: ["anotherEmail@test.com", "isEmail@test.com"],
  nested: {
    nestedEmail: "email@mail.com",
  },
};

export const ValidatorClient = MakeValidatorClient({
  ajv: ajv.addSchema(schema, "SCHEMA"),
  debug: true,
});

const validateTest = ValidatorClient.makeValidator<Test>({ typeName: "Test" });

const validatedTest = validateTest(data);

if ("validationErrors" in validatedTest) {
  console.log("VALIDATION ERRORS", validatedTest);
} else {
  console.log("VALID RES", validatedTest);
}

const renamedFile = typePath.split(".").slice(0, -1).join(".").concat(".validator.ts");
const outPath = path.resolve(__dirname, `${renamedFile}`);

console.log({ outPath });

const template = createTemplate({ typeNames: ["Test"] });

console.log(template);

fs.writeFileSync(outPath, template);
