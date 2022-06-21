import {SplitDateTime} from "../models/basic-models";

export const splitDateTime = (dateArg: Date): SplitDateTime => {
  const dateStr = dateArg.getDate();
  const monthStr = dateArg.getMonth();
  const yearStr = dateArg.getFullYear();
  const hourStr = dateArg.getHours();
  const minutesStr = dateArg.getMinutes();
  const secondsStr = dateArg.getSeconds();
  return {
    dateStr: `${dateStr}/${monthStr}/${yearStr}`,
    timeStr: `${hourStr}:${minutesStr}:${secondsStr}`,
  };
};
