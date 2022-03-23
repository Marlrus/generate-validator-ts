import { ValidatorClient } from "./index";
import * as ExpectedTypes from "./test.type";

export const validateTest = ValidatorClient.validate<ExpectedTypes.Test>({ typeName: "Test" });
