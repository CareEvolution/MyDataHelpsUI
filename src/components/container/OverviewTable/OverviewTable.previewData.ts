import { DailyDataQueryResult, getDayKey, OverviewDataProvider, OverviewDataType, predictableRandomNumber } from '../../../helpers';
import { OverviewThresholdEvaluator } from './OverviewTable';
import { add } from 'date-fns';

export type OverviewTablePreviewState = 'mood';

export const PreviewData = {
    createPrimaryDataProvider: (previewState: OverviewTablePreviewState): OverviewDataProvider => {
        if (previewState === 'mood') {

            return {
                type: { label: 'When mood rating was...' } as OverviewDataType,
                dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'mood-rating', 0, 10)
            };
        }
        return {
            type: { label: 'Primary' } as OverviewDataType,
            dataProvider: () => Promise.resolve({})
        };
    },
    createSecondaryDataProviders: (previewState: OverviewTablePreviewState): OverviewDataProvider[] => {
        if (previewState === 'mood') {
            return [
                {
                    type: {
                        label: 'Sleep',
                        valueCalculator: {
                            calculate: (_, values) => {
                                const nonZeroValues = values.filter(v => v > 0);
                                return nonZeroValues.reduce((total, current) => total + current, 0) / nonZeroValues.length
                            }
                        },
                        valueFormatter: {
                            format: value => Number((value / 60).toFixed(1)) + 'hr'
                        },
                        valueEvaluator: {
                            isGood: value => value >= 420 && value <= 600
                        }
                    } as OverviewDataType,
                    dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'sleep', 200, 700)
                },
                {
                    type: {
                        label: 'Steps',
                        valueCalculator: {
                            calculate: (_, values) => {
                                const nonZeroValues = values.filter(v => v > 0);
                                return nonZeroValues.reduce((total, current) => total + current, 0) / nonZeroValues.length
                            }
                        },
                        valueFormatter: {
                            format: value => {
                                if (value >= 1000) {
                                    return Number((value / 1000).toFixed(1)) + 'k';
                                }
                                return value.toFixed(0);
                            }
                        },
                        valueEvaluator: {
                            isGood: value => value >= 6000
                        }
                    } as OverviewDataType,
                    dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'steps', 1000, 12000)
                },
                {
                    type: {
                        label: 'Mindful (% of days)',
                        valueCalculator: {
                            calculate: (days, values) => {
                                return (values.filter(v => v > 0).length * 100.0) / days;
                            }
                        },
                        valueFormatter: {
                            format: value => Number(value.toFixed(0)) + '%'
                        },
                        valueEvaluator: {
                            isGood: value => value > 0
                        }
                    } as OverviewDataType,
                    dataProvider: (startDate: Date, endDate: Date) => generateSampleData(startDate, endDate, 'mindful', 0, 60)
                }
            ];
        }
        return [
            {
                type: { label: 'Secondary' } as OverviewDataType,
                dataProvider: () => Promise.resolve({})
            }
        ];
    },
    createThresholdEvaluator: (previewState: OverviewTablePreviewState): OverviewThresholdEvaluator => {
        if (previewState === 'mood') {
            return {
                getAllThresholds: () => ['High', 'Medium', 'Low', 'Not Entered'],
                getThreshold: (value: number): string => {
                    if (value >= 8) {
                        return 'High';
                    }
                    if (value >= 6) {
                        return 'Medium';
                    }
                    if (value >= 0) {
                        return 'Low';
                    }
                    return 'Not Entered';
                }
            };
        }
        return {
            getAllThresholds: () => ['All'],
            getThreshold: () => 'All'
        };
    }
};

async function generateSampleData(startDate: Date, endDate: Date, key: string, min: number, max: number) {
    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const currentDayKey = getDayKey(currentDate);
        if (await predictableRandomNumber(currentDayKey + `-missing-${key}`) % 10 !== 0) {
            result[currentDayKey] = await predictableRandomNumber(currentDayKey) % (max - min + 1) + min;
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return result;
}
