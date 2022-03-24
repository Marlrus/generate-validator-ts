import { ValidatorClient, SchemaType } from "./index";
import * as ExpectedTypes from "./test.type";

const schema: SchemaType = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    Something: {
      type: "object",
      properties: {
        name: {
          type: ["string", "null"],
        },
        arr: {
          anyOf: [
            {
              type: "array",
              items: {
                type: "string",
              },
            },
            {
              type: "null",
            },
          ],
        },
        nested: {
          anyOf: [
            {
              type: "object",
              properties: {
                name: {
                  type: ["string", "null"],
                },
                lastName: {
                  type: ["string", "null"],
                },
              },
              additionalProperties: false,
            },
            {
              type: "null",
            },
          ],
        },
      },
      additionalProperties: false,
    },
    Test: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "uuid value",
          format: "uuid",
        },
        posInteger: {
          type: "integer",
          description: "Specify individual fields in items.",
          minimum: 0,
        },
        ts: {
          type: "integer",
          description: "Unix Time in ms",
        },
        float: {
          type: "number",
          format: "float",
        },
        startsWithA: {
          type: "string",
          pattern: "^a",
        },
        email: {
          type: "string",
          description: "Email formatted string",
          format: "email",
        },
        emails: {
          type: "array",
          items: {
            type: "string",
            description: "Email formatted string",
            format: "email",
          },
          description: "Or specify a JSON spec:",
          minItems: 1,
        },
        something: {
          anyOf: [
            {
              $ref: "#/definitions/Something",
            },
            {
              type: "null",
            },
          ],
        },
        optional: {
          type: ["string", "null"],
        },
        nested: {
          type: "object",
          properties: {
            nestedEmail: {
              type: "string",
              description: "Email formatted string",
              format: "email",
            },
          },
          required: ["nestedEmail"],
          additionalProperties: false,
        },
      },
      required: ["id", "posInteger", "ts", "float", "startsWithA", "email", "emails", "nested"],
      additionalProperties: false,
    },
  },
};

export const validateTest = ValidatorClient.makeValidator<ExpectedTypes.Test>({
  typeName: "Test",
  schema,
});
export const validateSomething = ValidatorClient.makeValidator<ExpectedTypes.Something>({
  typeName: "Something",
  schema,
});
