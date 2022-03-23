import { MakeSchemaGenerator } from "./create-schema-client";
import { MakeValidatorClient } from "./create-validator";
import { MakeAjvClient } from "./create-ajv-client";
import path from "path";
import { Test } from "./test.type";

const tsjConfig = {
  path: path.resolve(__dirname, "./test.type.ts"),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "*",
  // expose: "all"
};

const schemaGenerator = MakeSchemaGenerator({ tsjConfig, debug: true });

const schema = schemaGenerator.generateSchema();

const ajvConfig = {
  allErrors: true,
};

const ajv = MakeAjvClient({ ajvConfig, debug: true });
ajv.addSchema(schema, "SCHEMA");

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

const validatorClient = MakeValidatorClient({ ajv, debug: true });

const validatedTest = validatorClient.validate<Test>({ data, typeName: "Test" });

if ("validationErrors" in validatedTest) {
  console.log("VALIDATION ERRORS", validatedTest);
} else {
  console.log("VALID RES", validatedTest);
}
