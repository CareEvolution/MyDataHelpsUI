import language from "../language";
import { formatNumberForLocale, formatMinutesForLocale } from "../locale";

export const defaultFormatter = (value: number) => formatNumberForLocale(value);
export const hrvFormatter = (value: number) => Number(value.toFixed(0)) + " ms"; // ms is same in all current languages
export const heartRateFormatter = (value: number) => `${Number(value.toFixed(0))} ${language("bpm")}`;
export const minutesFormatter = (value: number) => formatMinutesForLocale(value);
export const sleepYAxisConverter = (value: number) => value / 60.0;
