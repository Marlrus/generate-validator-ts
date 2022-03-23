import Ajv, { Options as AjvOptions } from "ajv";
import addFormats from "ajv-formats";

type MakeAjvClientArgs = {
  ajvConfig: AjvOptions;
  debug?: boolean;
};

type MakeAjvClientContract = (args: MakeAjvClientArgs) => Ajv;

export const MakeAjvClient: MakeAjvClientContract = ({ ajvConfig, debug = false }) => {
  const log = (...args: any) => (debug ? console.log(...args) : undefined);
  const prefix = `[generate-ts-validator/MakeAjvClient]`;

  log(`${prefix} Args:`, { ajvConfig });
  const ajv = new Ajv(ajvConfig);
  const extendedAjv = addFormats(ajv);
  return extendedAjv;
};
