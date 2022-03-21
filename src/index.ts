import { tsJsonSchmGen } from "./ts-json-schema-generator-test";
import { tsJsonGen } from "./typescript-json-schema-test";
import Ajv from "ajv";

const tsJsonSchema = tsJsonSchmGen();
const typescriptJsonSchema = tsJsonGen();

const ajv = new Ajv({ allErrors: true });

const validator1 = ajv.compile(tsJsonSchema);
const validator2 = ajv.compile(typescriptJsonSchema);
// const validator3 = ajv.compile({
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "$ref": "#/definitions/Test",
//   "definitions": {
//     "Test": {
//       "type": "object",
//       "properties": {
//         "size": {
//           "description": "Specify individual fields in items.",
//           "type": "integer",
//           "minimum": 0
//         },
//         "emails": {
//           "description": "Or specify a JSON spec:",
//           "items": {
//             "type": "string",
//           },
//           "type": "array"
//         },
//         "optional": {
//           "type": "string"
//         }
//       },
//       "additionalProperties": false,
//       "required": [
//         "emails",
//         "size"
//       ]
//     }
//   }
// })

const data = {
  posInteger: 1,
  emails: [],
  optional: "test",
};

console.log("Validator 1", validator1(data));
console.log("Validator 2", validator2(data));
// console.log("Validator 3", validator3(data))
