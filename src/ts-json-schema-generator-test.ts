import * as tsj from "ts-json-schema-generator";
import path from "path";

const config = {
  path: path.resolve(__dirname, "./test.type.ts"),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "*",
};

export const tsJsonSchmGen = () => {
  const schema = tsj.createGenerator(config).createSchema(config.type);
  const schemaString = JSON.stringify(schema, null, 2);

  console.log(schemaString);
  return schema;
};
