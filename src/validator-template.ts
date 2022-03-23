const createValidators = (typeNames: string[]) =>
  typeNames.reduce<string>((acc, typeName) => {
    const newValidator = `export const validate${typeName} = ValidatorClient.makeValidator<ExpectedTypes.${typeName}>({ typeName: "${typeName}" })`;
    return acc + "\n" + newValidator;
  }, "");

export const createTemplate = ({ typeNames }) => `
import { ValidatorClient } from "./index";
import * as ExpectedTypes from "./test.type"
${createValidators(typeNames)}
`;
