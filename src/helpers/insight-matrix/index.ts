export { generateSampleData } from './sample-data';
export { InsightMatrixDataConfiguration, InsightMatrixGroupByDataConfiguration, InsightMatrixComparisonDataConfiguration, InsightMatrixDataProvider, InsightMatrixData } from './types';
export { InsightMatrixValueCalculator, createNonZeroAverageValueInsightMatrixValueCalculator, createPercentageOfDaysInsightMatrixValueCalculator } from './value-calculator';
export { InsightMatrixValueEvaluator, createMinMaxInsightMatrixValueEvaluator } from './value-evaluator';
export { InsightMatrixValueFormatter, createShrinkThousandsInsightMatrixValueFormatter, createMinutesToHoursInsightMatrixValueFormatter, createIntegerInsightMatrixValueFormatter } from './value-formatter';
export { InsightMatrixValueThreshold, NotEnteredThreshold, computeThresholdDays } from './value-threshold';
