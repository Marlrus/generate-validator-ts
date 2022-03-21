import { tsJsonSchmGen } from "./ts-json-schema-generator-test";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const tsJsonSchema = tsJsonSchmGen();

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const data = {
  id: "3e336960-e5bc-457e-9b29-0947fd5babef",
  posInteger: 1,
  float: 0.1231245,
  ts: Date.now(),
  startsWithA: "omazing",
  email: "not an email",
  emails: ["not an email", "isEmail@test.com", "is not again"],
  nested: {
    nestedEmail: "email@mail.com",
  },
};

const ajvValidator = ajv.compile(tsJsonSchema);

const isNumber = (string: string) => /[0-9]/.test(string);

const validator = (data: unknown) => {
  console.log("validating data:", data);
  console.log(JSON.parse(JSON.stringify(data)));
  const valid = ajvValidator(data);
  console.log("Validator 1 valid:", valid);
  if (valid) return data;

  const errors = ajvValidator.errors!;
  const errMessages = errors.reduce<string[]>((acc, error) => {
    if (error.instancePath === "") return [...acc, `Payload ${error.message}`];

    const propSplit: string[] = error.instancePath.split("/").filter((s) => s !== "");
    const propPath = propSplit.reduce<string>((acc, prop) => {
      if (isNumber(prop)) return `${acc}[${prop}]`;
      return acc !== "" ? `${acc}.${prop}` : prop;
    }, "");
    const errorMessage: string = `Property "${propPath}" ${error.message}`;
    return [...acc, errorMessage];
  }, []);

  const validationErrors = {
    validationErrors: errMessages,
  };
  console.log(validationErrors);
  return validationErrors;
};

validator(data);
