# Generate Validator TS

Generate Opinionated validators from TS types using `ts-json-schema-generator` and `ajv` extended with `ajv-format`.

WIP: **This project is a WIP so instructions below will be for running the package as it is not executable yet**.

## Used packages

- [ajv Github](https://github.com/ajv-validator/ajv)
- [ajv API Reference](https://ajv.js.org/api.html)
- [ts-json-schema-generator Github](https://github.com/vega/ts-json-schema-generator)

Inspired by [create-validator-ts](https://github.com/azu/create-validator-ts)

## Config options

```json
{
  /* Options from https://github.com/vega/ts-json-schema-generator#options */
  "tsjConfig": {
    /* Allow additional properties for objects */
    "additionalProperties": false,
    /* Encode refs in schema as valid URIs */
    "encodeRefs": true,
    /* all: create shared ref for all types, none: no shared ref, export: create shared ref only for exported types */
    "expose": "export",
    /* Additional validation keywords to include */
    "extraTags": [],
    /* none: no JsDoc annotations, basic: JsDoc provides schema properties, extended: read @nullable and @asType */
    "jsDoc": "extended",
    /* Minify generated schema */
    "minify": false,
    /* skip type check for better performance */
    "skipTypeCheck": false,
    /* sort properties */
    "sortProps": true,
    /* Do not allow additional items on tuples */
    "strictTuples": false,
    /* Do not create a top level ref definition */
    "topRef": true,
    /* Path to tscnofig from root */
    "tsconfigPath": "./tsconfig.json"
  },
  /* any option seen on https://ajv.js.org/options.html#option-defaults */
  "ajvConfig": {
    "allErrors": true
  },
  "ajvClientOptions": {
    /* Execution logs and performance logs */
    "debug": false,
    /* Performance logs only */
    "debugTime": false
  },
  "makeValidatorClientOptions": {
    /* Execution logs and performance logs */
    "debug": false,
    /* Performance logs only */
    "debugTime": false
  }
}
```

## Installation and Running

- Installation

**Recommended Node Version:** 14 or over.

```
npm install
```

- Dev Running

```
npm run dev
```

- Production Building

```
npm run build
```

- Production Running

```
npm run start
```
