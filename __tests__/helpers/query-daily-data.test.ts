import { describe, expect, it } from '@jest/globals';
import { DailyDataTypeDefinition } from '../../src/helpers/daily-data-types';
import { DailyDataQueryResult, queryDailyData, registerDailyDataTypeDefinition } from '../../src/helpers/query-daily-data';
import { sampleEndDate, sampleResult, sampleStartDate, setupCombinedFirstValueResult } from '../fixtures/daily-data-providers';
import { add, differenceInDays } from 'date-fns';
import getDayKey from '../../src/helpers/get-day-key';

describe('Query Daily Data', () => {
    const type1Result: DailyDataQueryResult = {};
    registerDailyDataTypeDefinition({
        type: 'type1',
        dataProvider: (_1: Date, _2: Date) => Promise.resolve(type1Result),
        previewDataRange: [50, 60]
    } as DailyDataTypeDefinition);

    const type2Result: DailyDataQueryResult = {};
    registerDailyDataTypeDefinition({
        type: 'type2',
        dataProvider: (_1: Date, _2: Date) => Promise.resolve(type2Result),
        previewDataRange: [50, 60]
    } as DailyDataTypeDefinition);

    it('Standard Type - Should query for daily data and combine/return the values in a first-value result keyed by date.', async () => {
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [type1Result], sampleResult);
        expect(await queryDailyData('type1', sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Custom Multi-Type - Should query for daily data and combine/return the values in a first-value result keyed by date.', async () => {
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [type1Result, type2Result], sampleResult);
        expect(await queryDailyData('Custom:["type1","type2"]', sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Preview - Should return type specific predictable preview daily data in preview mode.', async () => {
        const numberOfDays = differenceInDays(sampleEndDate, sampleStartDate) + 1;

        const type1PreviewData = await queryDailyData('type1', sampleStartDate, sampleEndDate, true);
        expect(Object.keys(type1PreviewData)).toHaveLength(numberOfDays);
        for (let i = 0; i < numberOfDays; i++) {
            const dayKey = getDayKey(add(sampleStartDate, { days: i }));
            expect(Object.keys(type1PreviewData)).toContain(dayKey)
            expect(type1PreviewData[dayKey]).toBeGreaterThanOrEqual(50);
            expect(type1PreviewData[dayKey]).toBeLessThanOrEqual(60);
        }
        expect(type1PreviewData).toEqual(await queryDailyData('type1', sampleStartDate, sampleEndDate, true));

        const type2PreviewData = await queryDailyData('type2', sampleStartDate, sampleEndDate, true);
        expect(Object.keys(type2PreviewData)).toHaveLength(numberOfDays);
        for (let i = 0; i < numberOfDays; i++) {
            const dayKey = getDayKey(add(sampleStartDate, { days: i }));
            expect(Object.keys(type2PreviewData)).toContain(dayKey)
            expect(type2PreviewData[dayKey]).toBeGreaterThanOrEqual(50);
            expect(type2PreviewData[dayKey]).toBeLessThanOrEqual(60);
        }
        expect(type2PreviewData).toEqual(await queryDailyData('type2', sampleStartDate, sampleEndDate, true));
        expect(type2PreviewData).not.toEqual(type1PreviewData);

        const customTypePreviewData = await queryDailyData('Custom:["type1","type2"]', sampleStartDate, sampleEndDate, true);
        expect(Object.keys(customTypePreviewData)).toHaveLength(numberOfDays);
        for (let i = 0; i < numberOfDays; i++) {
            const dayKey = getDayKey(add(sampleStartDate, { days: i }));
            expect(Object.keys(customTypePreviewData)).toContain(dayKey)
            expect(customTypePreviewData[dayKey]).toBeGreaterThanOrEqual(50);
            expect(customTypePreviewData[dayKey]).toBeLessThanOrEqual(60);
        }
        expect(customTypePreviewData).toEqual(await queryDailyData('Custom:["type1","type2"]', sampleStartDate, sampleEndDate, true));
        expect(customTypePreviewData).not.toEqual(type1PreviewData);
        expect(customTypePreviewData).not.toEqual(type2PreviewData);
    });
});