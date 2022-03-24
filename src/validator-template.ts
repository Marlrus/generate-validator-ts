const createValidators = (typeNames: string[]) =>
  typeNames.reduce<string>((acc, typeName) => {
    const newValidator = `export const validate${typeName} = ValidatorClient.makeValidator<ExpectedTypes.${typeName}>({ typeName: "${typeName}", schema })`;
    return acc + "\n" + newValidator;
  }, "");

export const createTemplate = ({
  typeNames,
  schemaGenerator,
}) => `import { ValidatorClient, SchemaType } from "./index";
import * as ExpectedTypes from "./test.type"

const schema: SchemaType = ${JSON.stringify(schemaGenerator.generateSchema(), null, 2)}
${createValidators(typeNames)}
`;
