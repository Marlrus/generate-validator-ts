import { ErrorObject } from "ajv";
import { MakeAjvClient, MakeAjvClientArgs } from "./make-ajv-client";
import { Schema } from "./make-schema-client";

type MakeValidatorMakerArgs = {
  ajvClientArgs: MakeAjvClientArgs;
  debug?: boolean;
  debugTime?: boolean;
};

type ValidationErrors = {
  validationErrors: string[];
};

type MaybeValidator<T> = T | ValidationErrors;

type SchemaInfoArgs = {
  schema: Schema;
};

type TypeNameArgs = {
  typeName: string;
};

type LoadSchema = (schemaInfoArgs: SchemaInfoArgs) => void;

type MakeTypeCaster = <T>(typeNameArgs: TypeNameArgs) => (data: unknown) => MaybeValidator<T>;

type MakeValidator = (typeNameArgs: TypeNameArgs) => (data: unknown) => boolean;

type MakeValidatorClientContract = (args: MakeValidatorMakerArgs) => {
  loadSchema: LoadSchema;
  makeTypeCaster: MakeTypeCaster;
  makeValidator: MakeValidator;
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

export const MakeValidatorClient: MakeValidatorClientContract = ({
  ajvClientArgs,
  debug = false,
  debugTime = false,
}) => {
  const log = (...args: any) => (debug ? console.log(...args) : undefined);
  const time = (label: any) => (debug || debugTime ? console.time(label) : undefined);
  const timeEnd = (label: any) => (debug || debugTime ? console.timeEnd(label) : undefined);
  const ajv = MakeAjvClient(ajvClientArgs);

  const loadSchema = ({ schema }) => {
    const rand = Math.random();
    const prefix = `[generate-ts-validator/loadSchema]`;
    const timeLabel = `${prefix} ${rand} EXECUTION TIME`;
    time(timeLabel);
    log(`${prefix} Loading Schema`);
    ajv.addSchema(schema, "SCHEMA");
    timeEnd(timeLabel);
  };

  const makeTypeCaster: MakeTypeCaster =
    <T>({ typeName }: TypeNameArgs) =>
    (data: unknown): MaybeValidator<T> => {
      const rand = Math.random();
      const prefix = `[generate-ts-validator/typeCast${typeName}]`;
      const timeLabel = `${prefix} ${rand} EXECUTION TIME`;
      time(timeLabel);
      try {
        log(`${prefix} Args:`, { typeName });

        log(`${prefix} Data:`, data);

        const validator = ajv.getSchema(`SCHEMA#/definitions/${typeName}`)!;
        const valid = validator(data);

        if (valid) {
          log(`${prefix} Data is Valid, returning data:`, valid);
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
      } finally {
        timeEnd(timeLabel);
      }
    };

  const makeValidator: MakeValidator =
    ({ typeName }: TypeNameArgs) =>
    (data: unknown): boolean => {
      const rand = Math.random();
      const prefix = `[generate-ts-validator/validate${typeName}]`;
      const timeLabel = `${prefix} ${rand} EXECUTION TIME`;
      time(timeLabel);
      try {
        log(`${prefix} Args:`, { typeName });

        log(`${prefix} Data:`, data);

        const validator = ajv.getSchema(`SCHEMA#/definitions/${typeName}`)!;
        const valid = validator(data);

        if (valid) {
          log(`${prefix} Data is Valid:`);
          return true;
        }
        log(`${prefix} Data failed validation:`, validator.errors);
        return false;
      } finally {
        timeEnd(timeLabel);
      }
    };

  return {
    makeTypeCaster,
    makeValidator,
    loadSchema,
  };
};
