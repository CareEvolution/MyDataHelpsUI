import language from "../language";
import { formatMinutesForLocale, formatNumberForLocale } from "../locale";

export const defaultFormatter = (value: number) => formatNumberForLocale(value);
export const hrvFormatter = (value: number) => formatNumberForLocale(value) + " ms"; // ms is an SI unit, not localized.
export const heartRateFormatter = (value: number) => `${formatNumberForLocale(value)} ${language("bpm")}`;
export const minutesFormatter = (value: number) => formatMinutesForLocale(value);
export const minutesToHoursYAxisConverter = (value: number) => value / 60.0;
export const distanceFormatter = (value: number) => formatNumberForLocale(value / 1000, 2) + " km"; // km is an SI unit, not localized.
export const distanceYAxisConverter = (value: number) => value / 1000;
