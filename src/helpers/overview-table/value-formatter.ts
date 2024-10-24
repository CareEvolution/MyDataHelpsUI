export type OverviewValueFormatter = (value: number) => string;

export const shrinkThousandsOverviewValueFormatter: OverviewValueFormatter = value => {
    if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'k';
    }
    return value.toFixed(0);
};

export const minutesToHoursOverviewValueFormatter: OverviewValueFormatter = value => (value / 60).toFixed(1) + 'hr';

export function createIntegerOverviewValueFormatter(suffix?: string): OverviewValueFormatter {
    return value => {
        let formattedValue = value.toFixed(0);
        if (suffix) {
            formattedValue += suffix;
        }
        return formattedValue;
    };
}