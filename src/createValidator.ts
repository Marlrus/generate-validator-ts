import Ajv, { ErrorObject } from "ajv";

type ValidatorOptions = {
  data: unknown;
  validationClient: Ajv;
};

type ValidationErrors = {
  validationErrors: string[];
};

type MaybeValidator<T> = T | ValidationErrors;

const isNumber = (string: string) => /[0-9]/.test(string);

const parseValidationErrors = (
  errors: ErrorObject<string, Record<string, any>, unknown>[]
): string[] =>
  errors.reduce<string[]>((acc, error) => {
    if (error.instancePath === "") return [...acc, `Payload ${error.message}`];

    const propSplit: string[] = error.instancePath.split("/").filter((s) => s !== "");
    const propPath = propSplit.reduce<string>((acc, prop) => {
      if (isNumber(prop)) return `${acc}[${prop}]`;
      return acc !== "" ? `${acc}.${prop}` : prop;
    }, "");
    const errorMessage: string = `Property "${propPath}" ${error.message}`;
    return [...acc, errorMessage];
  }, []);

export const validator = <T>({ data, validationClient }: ValidatorOptions): MaybeValidator<T> => {
  console.log("validating data:", data);
  const validator = validationClient.getSchema("SCHEMA#/definitions/Test")!;
  const valid = validator(data);
  console.log("Validator 1 valid:", valid);
  if (valid) return data as T;

  const errors = validator.errors!;
  console.log(errors);
  const errMessages = parseValidationErrors(errors);

  const validationErrors = {
    validationErrors: errMessages,
  };

  console.log(validationErrors);
  return validationErrors;
};
