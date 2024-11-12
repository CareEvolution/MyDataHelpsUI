import { computeThresholdDays, NotEnteredThreshold } from '../../../src/helpers/insight-matrix/value-threshold'
import { InsightMatrixData, InsightMatrixGroupByDataConfiguration } from '../../../src/helpers/insight-matrix/types';
import { DailyDataType } from '../../../src/helpers/daily-data-types';
import { startOfDay } from 'date-fns';
import { describe, it } from '@jest/globals';

describe('Insight Matrix - Value Threshold Tests', () => {
    describe('Compute Threshold Days', () => {
        const startDate = startOfDay('2024-11-01 12:00:00');
        const endDate = startOfDay('2024-11-07 12:00:00');
        const data: InsightMatrixData<InsightMatrixGroupByDataConfiguration> = {
            configuration: {
                label: 'Some Label',
                rawDataType: DailyDataType.MindfulMinutes,
                thresholds: [
                    { label: 'Threshold 1', minimumValue: 5, maximumValue: 7 },
                    { label: 'Threshold 2' }
                ]
            },
            result: {
                '2024-11-01': 1,
                '2024-11-02': 3,
                '2024-11-03': 7,
                '2024-11-04': 10,
                '2024-11-05': 2,
                '2024-11-06': 6,
                '2024-11-07': 4,
            }
        };

        it('Should group data with the first matching threshold.', () => {
            const thresholdDaysLookup = computeThresholdDays(startDate, endDate, data);

            expect(Object.keys(thresholdDaysLookup).length).toBe(2);
            expect(thresholdDaysLookup['Threshold 1']).toEqual(['2024-11-03', '2024-11-06']);
            expect(thresholdDaysLookup['Threshold 2']).toEqual(['2024-11-01', '2024-11-02', '2024-11-04', '2024-11-05', '2024-11-07']);
        });

        it('Should ignore values that do not match any threshold.', () => {
            data.configuration.thresholds[1].maximumValue = 4;

            const thresholdDaysLookup = computeThresholdDays(startDate, endDate, data);

            expect(Object.keys(thresholdDaysLookup).length).toBe(2);
            expect(thresholdDaysLookup['Threshold 1']).toEqual(['2024-11-03', '2024-11-06']);
            expect(thresholdDaysLookup['Threshold 2']).toEqual(['2024-11-01', '2024-11-02', '2024-11-05', '2024-11-07']);
        });

        it('Should group not entered data into its own threshold.', () => {
            delete data.result['2024-11-03'];
            delete data.result['2024-11-04'];
            delete data.result['2024-11-05'];

            const thresholdDaysLookup = computeThresholdDays(startDate, endDate, data);

            expect(Object.keys(thresholdDaysLookup).length).toBe(3);
            expect(thresholdDaysLookup['Threshold 1']).toEqual(['2024-11-06']);
            expect(thresholdDaysLookup['Threshold 2']).toEqual(['2024-11-01', '2024-11-02', '2024-11-07']);
            expect(thresholdDaysLookup[NotEnteredThreshold]).toEqual(['2024-11-03', '2024-11-04', '2024-11-05']);
        });
    });
});