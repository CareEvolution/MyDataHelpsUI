export type OverviewValueCalculator = (days: number, values: number[]) => number | undefined;

export const averageValueOverviewValueCalculator: OverviewValueCalculator = (_, values) => {
    const nonZeroValues = values.filter(v => v > 0);
    return nonZeroValues.length > 0 ? nonZeroValues.reduce((total, current) => total + current, 0) / nonZeroValues.length : undefined;
};

export const percentageOfDaysOverviewValueCalculator: OverviewValueCalculator = (days, values) => {
    if (days === 0) {
        return undefined;
    }
    return (values.filter(v => v > 0).length * 100.0) / days;
};