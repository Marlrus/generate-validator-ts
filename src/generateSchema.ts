import * as tsj from "ts-json-schema-generator";

export type SchemaGeneratorConfig = tsj.Config;

type SchemaGeneratorContract = {
  generateSchema: () => tsj.Schema;
};

export const MakeSchemaGenerator = (config: tsj.Config) => {
  const generateSchema: SchemaGeneratorContract["generateSchema"] = () =>
    tsj.createGenerator(config).createSchema(config.type);

  return {
    generateSchema,
  };
};
