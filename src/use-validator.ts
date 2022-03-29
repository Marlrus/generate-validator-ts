import {
  validateTest,
  typeCastTest,
  validateSomething,
  typeCastSomething,
} from "./test.type.validator";

const data = {
  id: "3e336960-e5bc-457e-9b29-0947fd5babef",
  posInteger: 1,
  float: 0.1231245,
  ts: Date.now(),
  startsWithA: "amazing",
  email: "email@test.com",
  emails: ["anotherEmail@test.com", "isEmail@test.com"],
  nested: {
    nestedEmail: "email@mail.com",
  },
};

const something = {
  name: "hai",
  arr: ["something"],
  nested: null,
};

const validation1 = validateTest(data);
const validation2 = validateSomething(something);
const validation3 = typeCastTest(data);
const validation4 = typeCastSomething(something);

console.log({ validation1, validation2, validation3, validation4 });
