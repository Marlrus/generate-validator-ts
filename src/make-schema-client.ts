import * as tsj from "ts-json-schema-generator";

type SchemaGeneratorArgs = {
  tsjConfig: tsj.Config;
  debug?: boolean;
  debugTime?: boolean;
};

type SchemaGeneratorContract = (args: SchemaGeneratorArgs) => {
  generateSchema: () => tsj.Schema;
};

export type Schema = tsj.Schema;

export const MakeSchemaGenerator: SchemaGeneratorContract = ({
  tsjConfig,
  debug = false,
  debugTime = false,
}) => {
  const log = (...args: any) => (debug ? console.log(...args) : undefined);
  const prefix = `[generate-ts-validator/MakeSchemaGenerator]`;
  const rand = Math.random();
  const timeLabel = `${prefix} ${rand} EXECUTION TIME`;
  const time = (label: any) => (debug || debugTime ? console.time(label) : undefined);
  const timeEnd = (label: any) => (debug || debugTime ? console.timeEnd(label) : undefined);

  time(timeLabel);
  log(`${prefix} Args:`, { tsjConfig });

  const generateSchema = () => {
    const prefix = `[generate-ts-validator/generateSchema]`;
    const rand = Math.random();
    const timeLabel = `${prefix} ${rand} EXECUTION TIME`;
    time(timeLabel);
    const schema = tsj.createGenerator(tsjConfig).createSchema(tsjConfig.type);
    if (debug) log(`${prefix} Schema:`, JSON.stringify(schema, null, 2));
    timeEnd(timeLabel);
    return schema;
  };

  timeEnd(timeLabel);
  return {
    generateSchema,
  };
};
