const createValidators = (typeNames: string[]) =>
  typeNames.reduce<string>((acc, typeName) => {
    const newValidator = `export const validate${typeName} = SchemaValidator<ExpectedTypes.${typeName}>({ typeName: "${typeName}" })`;
    return acc + "\n" + newValidator;
  }, "");

export const createTemplate = ({
  typeNames,
  schemaGenerator,
}) => `import { ValidatorClient, SchemaType } from "./index";
import * as ExpectedTypes from "./test.type"

/* 
This is a generated file through generate-validator-ts
It contains validators for ${JSON.stringify(typeNames)}
The outupt can be modded by updating the configuration file
*/

const schema: SchemaType = ${JSON.stringify(schemaGenerator.generateSchema(), null, 2)}

const SchemaValidator = ValidatorClient.makeValidator({ schema });
${createValidators(typeNames)}
`;
