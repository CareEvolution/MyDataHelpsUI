import language from "../language";
import { formatNumberForLocale, formatMinutesForLocale } from "../locale";

export const defaultFormatter = (value: number) => formatNumberForLocale(value);
export const hrvFormatter = (value: number) => formatNumberForLocale(value) + " ms"; // ms is SI unit, not localized
export const heartRateFormatter = (value: number) => `${formatNumberForLocale(value)} ${language("bpm")}`;
export const minutesFormatter = (value: number) => formatMinutesForLocale(value);
export const sleepYAxisConverter = (value: number) => value / 60.0;
