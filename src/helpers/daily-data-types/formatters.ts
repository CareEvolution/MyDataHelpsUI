export const defaultFormatter = (value: number) => Number(value.toFixed(0)).toLocaleString();
export const hrvFormatter = (value: number) => Number(value.toFixed(0)) + " ms";
export const heartRateFormatter = (value: number) => Number(value.toFixed(0)) + " bpm";
export const minutesFormatter = (value: number) => {
    var hours = Math.floor(value / 60);
    var displayValue = hours > 0 ? (hours + "h ") : "";
    if (Math.round(value - (hours * 60)) !== 0) {
        displayValue = displayValue + (Math.round(value - (hours * 60)) + "m");
    }
    return displayValue;
};
export const sleepYAxisConverter = (value: number) => value / 60.0;
