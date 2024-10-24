export type OverviewValueEvaluator = (value: number) => boolean;

export function createOverviewValueEvaluator(min: number, max?: number): OverviewValueEvaluator {
    return value => max !== undefined ? value >= min && value <= max : value >= min;
}