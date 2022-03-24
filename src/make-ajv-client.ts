import Ajv, { Options as AjvOptions } from "ajv";
import addFormats from "ajv-formats";

export type MakeAjvClientArgs = {
  ajvConfig: AjvOptions;
  debug?: boolean;
  debugTime?: boolean;
};

type MakeAjvClientContract = (args: MakeAjvClientArgs) => Ajv;

export const MakeAjvClient: MakeAjvClientContract = ({
  ajvConfig,
  debug = false,
  debugTime = false,
}) => {
  const log = (...args: any) => (debug ? console.log(...args) : undefined);
  const time = (label: any) => (debug || debugTime ? console.time(label) : undefined);
  const timeEnd = (label: any) => (debug || debugTime ? console.timeEnd(label) : undefined);
  const prefix = `[generate-ts-validator/MakeAjvClient]`;
  const rand = Math.random();
  const timeLabel = `${prefix} ${rand} EXECUTION TIME`;

  time(timeLabel);
  log(`${prefix} Args:`, { ajvConfig });
  const ajv = new Ajv(ajvConfig);
  const extendedAjv = addFormats(ajv);
  timeEnd(timeLabel);
  return extendedAjv;
};
