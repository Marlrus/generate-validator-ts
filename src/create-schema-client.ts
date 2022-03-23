import * as tsj from "ts-json-schema-generator";

type SchemaGeneratorArgs = {
  tsjConfig: tsj.Config;
  debug?: boolean;
};

type SchemaGeneratorContract = (args: SchemaGeneratorArgs) => {
  generateSchema: () => tsj.Schema;
};

export const MakeSchemaGenerator: SchemaGeneratorContract = ({ tsjConfig, debug = false }) => {
  const log = (...args: any) => (debug ? console.log(...args) : undefined);
  const prefix = `[generate-ts-validator/MakeSchemaGenerator]`;

  log(`${prefix} Args:`, { tsjConfig });

  const generateSchema = () => {
    const schema = tsj.createGenerator(tsjConfig).createSchema(tsjConfig.type);
    if (debug) log(`${prefix} Schema:`, JSON.stringify(schema, null, 2));
    return schema;
  };

  return {
    generateSchema,
  };
};
