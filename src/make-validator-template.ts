import { SchemaGeneratorClient } from "./make-schema-client";

type FunctionGeneratorArgs = {
  typeNames: string[];
  throwError?: boolean;
};

type FunctionGenerator = (args: FunctionGeneratorArgs) => string;

const createValidators: FunctionGenerator = ({ typeNames }) =>
  typeNames.reduce<string>((acc, typeName) => {
    const newValidator = `export const validate${typeName} = ValidatorClient.makeValidator({ typeName: "${typeName}" })`;
    return acc + "\n" + newValidator;
  }, "");

const createTypeCasters: FunctionGenerator = ({ typeNames, throwError = false }) =>
  typeNames.reduce<string>((acc, typeName) => {
    const generic = throwError
      ? `<ExpectedTypes.${typeName}>`
      : `<MaybeValidator<ExpectedTypes.${typeName}>>`;
    const newValidator = `export const typeCast${typeName} = ValidatorClient.makeTypeCaster${generic}({ typeName: "${typeName}", throwError: ${throwError} })`;
    return acc + "\n" + newValidator;
  }, "");

type CreateTemplateArgs = {
  typeNames: string[];
  typePath: string;
  schemaGenerator: SchemaGeneratorClient;
  throwError?: boolean;
  esModules?: boolean;
  debug?: boolean;
  debugTime?: boolean;
};

const esImport = (esModules: boolean) => (esModules ? ".js" : "");

type TemplateImports = (TemplateImportsArgs: { throwError: boolean; esModules: boolean }) => string;

const templateImports: TemplateImports = ({ throwError, esModules }) =>
  throwError
    ? `import { ValidatorClient, Schema } from "./index${esImport(esModules)}";`
    : `import { ValidatorClient, Schema, MaybeValidator } from "./index${esImport(esModules)}";`;

type CreateTemplate = (args: CreateTemplateArgs) => string;

export const createTemplate: CreateTemplate = (createTemplateArgs) => {
  const {
    typeNames,
    typePath,
    schemaGenerator,
    throwError = false,
    esModules = false,
    debug = false,
    debugTime = false,
  } = createTemplateArgs;
  const log = (...args: any) => (debug ? console.log(...args) : undefined);
  const time = (label: any) => (debug || debugTime ? console.time(label) : undefined);
  const timeEnd = (label: any) => (debug || debugTime ? console.timeEnd(label) : undefined);
  const prefix = `[generate-ts-validator/createTemplate]`;
  const rand = Math.random();
  const timeLabel = `${prefix} ${rand} EXECUTION TIME`;

  time(timeLabel);
  log(`${prefix} Args:`, createTemplateArgs);
  const template = `${templateImports({ throwError, esModules })}
  import * as ExpectedTypes from "${typePath}${esImport(esModules)}"

  /* 
    This is a generated file through generate-validator-ts
  It contains validators for ${JSON.stringify(typeNames)}
  The outupt can be modded by updating the configuration file
  */

  const schema: Schema = ${JSON.stringify(schemaGenerator.generateSchema(), null, 2)}

  ValidatorClient.loadSchema({ schema });
  ${createValidators({ typeNames })}
  ${createTypeCasters({ typeNames, throwError })}
  `;
  timeEnd(timeLabel);
  return template;
};
