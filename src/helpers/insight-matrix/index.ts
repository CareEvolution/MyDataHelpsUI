export { generateSampleData } from './sample-data';
export { SurveyDataType, isSurveyDataType, getSurveyDataProvider } from './survey-data-type';
export { InsightMatrixDataConfiguration, InsightMatrixGroupByDataConfiguration, InsightMatrixComparisonDataConfiguration, InsightMatrixDataProvider, InsightMatrixData } from './types';
export { InsightMatrixValueCalculator, createAverageValueInsightMatrixValueCalculator, createPercentageOfDaysInsightMatrixValueCalculator } from './value-calculator';
export { InsightMatrixValueEvaluator, createMinMaxInsightMatrixValueEvaluator } from './value-evaluator';
export { InsightMatrixValueFormatter, createShrinkThousandsInsightMatrixValueFormatter, createMinutesToHoursInsightMatrixValueFormatter, createIntegerInsightMatrixValueFormatter } from './value-formatter';
export { InsightMatrixValueThreshold, NotEnteredThreshold, computeThresholdDays } from './value-threshold';
