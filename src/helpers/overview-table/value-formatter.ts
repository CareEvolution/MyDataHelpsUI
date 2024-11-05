export interface OverviewValueFormatter {
    format: (value: number) => string;
}

export const createShrinkThousandsOverviewValueFormatter = (): OverviewValueFormatter => {
    return {
        format: value => {
            if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'k';
            }
            return value.toFixed(0);
        }
    };
};

export const createMinutesToHoursOverviewValueFormatter = (): OverviewValueFormatter => {
    return {
        format: value => (value / 60).toFixed(1) + 'hr'
    };
};

export const createIntegerOverviewValueFormatter = (suffix?: string): OverviewValueFormatter => {
    return {
        format: value => {
            let formattedValue = value.toFixed(0);
            if (suffix) {
                formattedValue += suffix;
            }
            return formattedValue;
        }
    };
};