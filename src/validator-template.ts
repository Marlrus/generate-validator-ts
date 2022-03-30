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
};

type TemplateImports = (throwError: boolean) => string;

const templateImports: TemplateImports = (throwError) =>
  throwError
    ? `import { ValidatorClient, Schema } from "./index";`
    : `import { ValidatorClient, Schema, MaybeValidator } from "./index";`;

type CreateTemplate = (args: CreateTemplateArgs) => string;

export const createTemplate: CreateTemplate = ({
  typeNames,
  typePath,
  schemaGenerator,
  throwError = false,
}) => `${templateImports(throwError)}
import * as ExpectedTypes from "${typePath}"

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
