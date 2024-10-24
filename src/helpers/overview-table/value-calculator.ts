export type OverviewValueCalculator = (days: number, values: number[]) => number;

export const averageValueOverviewValueCalculator: OverviewValueCalculator = (_, values) => {
    const nonZeroValues = values.filter(v => v > 0);
    return nonZeroValues.reduce((total, current) => total + current, 0) / nonZeroValues.length
};

export const percentageOfDaysOverviewValueCalculator: OverviewValueCalculator = (days, values) => {
    const nonZeroValues = values.filter(v => v > 0);
    return (nonZeroValues.length * 100.0) / days;
};