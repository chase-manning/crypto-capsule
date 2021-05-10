import BN from "bn.js";

export const inputToDate = (input: string): Date => {
  const items = input.split("/");
  return new Date(`${items[2]}/${items[0]}/${items[1]}`);
};

export const dateToUnix = (date: Date): BN => {
  return new BN(date.getTime() / 1000);
};

export const getCurrentUnix = (): number => {
  return new Date().getTime() / 1000;
};

export const UnixToDate = (unix: number): Date => {
  return new Date(unix * 1000);
};

export const DAYS = 60 * 60 * 24;
export const WEEKS = 60 * 60 * 24 * 7;
export const MONTHS = Math.round(60 * 60 * 24 * (365 / 12));
export const YEARS = Math.round(60 * 60 * 24 * 365);

export const getPeriodType = (periodSize: string): string => {
  const size = Number(periodSize);
  if (size === DAYS) return "days";
  if (size === WEEKS) return "weeks";
  if (size === MONTHS) return "months";
  if (size === YEARS) return "years";
  return "unknown";
};

export const getPeriodSize = (periodType: string): number => {
  if (periodType === "days") return DAYS;
  if (periodType === "weeks") return WEEKS;
  if (periodType === "months") return MONTHS;
  if (periodType === "years") return YEARS;
  return 1;
};
