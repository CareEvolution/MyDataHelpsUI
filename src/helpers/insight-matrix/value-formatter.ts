import { formatNumberForLocale } from "../locale";
import { language } from "../language";

export interface InsightMatrixValueFormatter {
    format: (value: number) => string;
}

export const createShrinkThousandsInsightMatrixValueFormatter = (): InsightMatrixValueFormatter => {
    return {
        format: value => {
            if (value >= 1000) {
                return formatNumberForLocale(value / 1000, 1) + 'k'; // k is SI notation, not localized
            }
            return formatNumberForLocale(value);
        }
    };
};

export const createMinutesToHoursInsightMatrixValueFormatter = (): InsightMatrixValueFormatter => {
    return {
        format: value => formatNumberForLocale(value / 60, 1) + language("hours-abbreviation")
    };
};

export const createIntegerInsightMatrixValueFormatter = (suffix?: string): InsightMatrixValueFormatter => {
    return {
        format: value => {
            let formattedValue = formatNumberForLocale(value);
            if (suffix) {
                formattedValue += suffix;
            }
            return formattedValue;
        }
    };
};