export interface InsightMatrixValueFormatter {
    format: (value: number) => string;
}

export const createShrinkThousandsInsightMatrixValueFormatter = (): InsightMatrixValueFormatter => {
    return {
        format: value => {
            if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'k';
            }
            return value.toFixed(0);
        }
    };
};

export const createMinutesToHoursInsightMatrixValueFormatter = (): InsightMatrixValueFormatter => {
    return {
        format: value => (value / 60).toFixed(1) + 'hr'
    };
};

export const createIntegerInsightMatrixValueFormatter = (suffix?: string): InsightMatrixValueFormatter => {
    return {
        format: value => {
            let formattedValue = Number(value.toFixed(0)).toLocaleString();
            if (suffix) {
                formattedValue += suffix;
            }
            return formattedValue;
        }
    };
};