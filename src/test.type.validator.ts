import { ValidatorClient } from "./index";
import * as ExpectedTypes from "./test.type";

export const validateTest = ValidatorClient.makeValidator<ExpectedTypes.Test>({ typeName: "Test" });
