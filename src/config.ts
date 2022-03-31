import * as tsj from "ts-json-schema-generator";
import { Options as AjvOptions } from "ajv";

type TsjConfig = tsj.Config & {
  tsconfigPath: string;
};

type DebugOptions = {
  debug?: boolean;
  debugTime?: boolean;
};

type TemplateOptions = {
  esModules?: boolean;
  throwError?: boolean;
};

export type GenerateTsValidtorConfig = {
  tsjConfig: TsjConfig;
  ajvConfig: AjvOptions;
  ajvClientOptions: DebugOptions;
  makeValidatorClientOptions: DebugOptions;
  makeSchemaGeneratorOptions: DebugOptions;
  makeTemplateOptions: TemplateOptions;
};

export const DEFAULT_CONFIG: GenerateTsValidtorConfig = {
  /* Options from https://github.com/vega/ts-json-schema-generator#options */
  tsjConfig: {
    /* Allow additional properties for objects */
    additionalProperties: false,
    /* Encode refs in schema as valid URIs */
    encodeRefs: true,
    /* all: create shared ref for all types, none: no shared ref, export: create shared ref only for exported types */
    expose: "export",
    /* Additional validation keywords to include */
    extraTags: [],
    /* none: no JsDoc annotations, basic: JsDoc provides schema properties, extended: read @nullable and @asType */
    jsDoc: "extended",
    /* Minify generated schema */
    minify: false,
    /* skip type check for better performance */
    skipTypeCheck: false,
    /* sort properties */
    sortProps: true,
    /* Do not allow additional items on tuples */
    strictTuples: false,
    /* Do not create a top level ref definition */
    topRef: true,
    /* Path to tscnofig from root */
    tsconfigPath: "./tsconfig.json",
  },
  /* any option seen on https://ajv.js.org/options.html#option-defaults */
  ajvConfig: {
    allErrors: true,
  },
  ajvClientOptions: {
    /* Execution logs and performance logs */
    debug: false,
    /* Performance logs only */
    debugTime: false,
  },
  makeValidatorClientOptions: {
    /* Execution logs and performance logs */
    debug: false,
    /* Performance logs only */
    debugTime: false,
  },
  makeSchemaGeneratorOptions: {
    /* Execution logs and performance logs */
    debug: false,
    /* Performance logs only */
    debugTime: false,
  },
  makeTemplateOptions: {
    /* Execution logs and performance logs */
    esModules: false,
    /* Performance logs only */
    throwError: false,
  },
};
