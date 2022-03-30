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

try {
  const validation1 = validateTest(data);
  console.log({ validation1 });
  const validation2 = validateSomething(something);
  console.log({ validation2 });
  const validation3 = typeCastTest(data);
  console.log({ validation3 });
  const validation4 = typeCastSomething(something);
  console.log({ validation4 });
} catch (err) {
  console.log("IN ERROR BLOCK");
  console.log(err);
}
