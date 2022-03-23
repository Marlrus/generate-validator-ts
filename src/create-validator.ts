import Ajv, { ErrorObject } from "ajv";

type MakeValidatorMakerArgs = {
  ajv: Ajv;
  debug?: boolean;
};

type ValidationErrors = {
  validationErrors: string[];
};

type MaybeValidator<T> = T | ValidationErrors;

type ValidateArgs = {
  typeName: string;
};

type MakeValidatorClientContract = (args: MakeValidatorMakerArgs) => {
  makeValidator: <T>(args: ValidateArgs) => (data: unknown) => MaybeValidator<T>;
};

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

export const MakeValidatorClient: MakeValidatorClientContract = ({ ajv, debug = false }) => {
  const log = (...args: any) => (debug ? console.log(...args) : undefined);

  const makeValidator =
    <T>({ typeName }) =>
    (data: unknown) => {
      const prefix = `[generate-ts-validator/validate]`;

      log(`${prefix} Args:`, { typeName });

      log(`${prefix} Data:`, data);

      const validator = ajv.getSchema(`SCHEMA#/definitions/${typeName}`)!;
      const valid = validator(data);

      log(`${prefix} Data Valid:`, valid);

      if (valid) {
        if (debug) console.log(`${prefix} Data validated, returning data`);
        return data as T;
      }

      log(`${prefix} Data failed validation, processing errors`);

      const errors = validator.errors!;

      log(`${prefix} Errors:`, errors);

      const errMessages = parseValidationErrors(errors);

      log(`${prefix} Parsed Errors:`, errMessages);

      const validationErrors = {
        validationErrors: errMessages,
      };

      log(`${prefix} Error Object:`, validationErrors);
      return validationErrors;
    };

  return {
    makeValidator,
  };
};
