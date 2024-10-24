export interface OverviewValueCalculator {
    calculate: (thresholdDays: string[], values: number[]) => number | undefined;
}

export const createAverageValueOverviewValueCalculator = (): OverviewValueCalculator => {
    return {
        calculate: (_: string[], values: number[]) => {
            const nonZeroValues = values.filter(v => v > 0);
            return nonZeroValues.length > 0 ? nonZeroValues.reduce((total, current) => total + current, 0) / nonZeroValues.length : undefined;
        }
    };
};

export const createPercentageOfDaysOverviewValueCalculator = (): OverviewValueCalculator => {
    return {
        calculate: (thresholdDays: string[], values: number[]) => {
            if (thresholdDays.length === 0) {
                return undefined;
            }
            return (values.filter(v => v > 0).length * 100.0) / thresholdDays.length;
        }
    };
};