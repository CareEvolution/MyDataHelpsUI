import MyDataHelps from "@careevolution/mydatahelps-js";
import language from "../language";

export const defaultFormatter = (value: number) => Number(value.toFixed(0)).toLocaleString(MyDataHelps.getCurrentLanguage());
export const hrvFormatter = (value: number) => Number(value.toFixed(0)) + " ms"; // ms is same in all current languages
export const heartRateFormatter = (value: number) => `${Number(value.toFixed(0))} ${language("bpm")}`;
export const minutesFormatter = (value: number) => {
    var hours = Math.floor(value / 60);
    var displayValue = hours > 0 ? (`${hours}${language("hours-abbreviation")} `) : "";
    if (Math.round(value - (hours * 60)) !== 0) {
        displayValue = `${displayValue}${(Math.round(value - (hours * 60)))}${language("minutes-abbreviation")}`;
    }
    return displayValue;
};
export const sleepYAxisConverter = (value: number) => value / 60.0;
