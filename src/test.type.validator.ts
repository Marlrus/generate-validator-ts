import { ValidatorClient, Schema, MaybeValidator } from "./index";
import * as ExpectedTypes from "./test.type"

/* 
This is a generated file through generate-validator-ts
It contains validators for ["Test","Something"]
The outupt can be modded by updating the configuration file
*/

const schema: Schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "Something": {
      "type": "object",
      "properties": {
        "name": {
          "type": [
            "string",
            "null"
          ]
        },
        "arr": {
          "anyOf": [
            {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "null"
            }
          ]
        },
        "nested": {
          "anyOf": [
            {
              "type": "object",
              "properties": {
                "name": {
                  "type": [
                    "string",
                    "null"
                  ]
                },
                "lastName": {
                  "type": [
                    "string",
                    "null"
                  ]
                }
              },
              "additionalProperties": false
            },
            {
              "type": "null"
            }
          ]
        }
      },
      "additionalProperties": false
    },
    "Test": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "uuid value",
          "format": "uuid"
        },
        "posInteger": {
          "type": "integer",
          "description": "Specify individual fields in items.",
          "minimum": 0
        },
        "ts": {
          "type": "integer",
          "description": "Unix Time in ms"
        },
        "float": {
          "type": "number",
          "format": "float"
        },
        "startsWithA": {
          "type": "string",
          "pattern": "^a"
        },
        "email": {
          "type": "string",
          "description": "Email formatted string",
          "format": "email"
        },
        "emails": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "Email formatted string",
            "format": "email"
          },
          "description": "Or specify a JSON spec:",
          "minItems": 1
        },
        "something": {
          "anyOf": [
            {
              "$ref": "#/definitions/Something"
            },
            {
              "type": "null"
            }
          ]
        },
        "optional": {
          "type": [
            "string",
            "null"
          ]
        },
        "nested": {
          "type": "object",
          "properties": {
            "nestedEmail": {
              "type": "string",
              "description": "Email formatted string",
              "format": "email"
            }
          },
          "required": [
            "nestedEmail"
          ],
          "additionalProperties": false
        }
      },
      "required": [
        "id",
        "posInteger",
        "ts",
        "float",
        "startsWithA",
        "email",
        "emails",
        "nested"
      ],
      "additionalProperties": false
    }
  }
}

ValidatorClient.loadSchema({ schema });

export const validateTest = ValidatorClient.makeValidator({ typeName: "Test" })
export const validateSomething = ValidatorClient.makeValidator({ typeName: "Something" })

export const typeCastTest = ValidatorClient.makeTypeCaster<MaybeValidator<ExpectedTypes.Test>>({ typeName: "Test" })
export const typeCastSomething = ValidatorClient.makeTypeCaster<ExpectedTypes.Something>({ typeName: "Something" })

const test = typeCastTest({})
const something = typeCastSomething({})
