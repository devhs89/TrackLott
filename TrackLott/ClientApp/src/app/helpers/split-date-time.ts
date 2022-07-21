import {DateTimeModel} from "../models/date-time.model";

export const splitDateTime = (dateArg: Date): DateTimeModel => {
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
