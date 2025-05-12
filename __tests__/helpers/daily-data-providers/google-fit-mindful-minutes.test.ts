import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPoints, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import googleFitMindfulMinutes from '../../../src/helpers/daily-data-providers/google-fit-mindful-minutes';

describe('Daily Data Provider - Google Fit Mindful Minutes', () => {
    it('Should query for daily data points, filter out non-meditation data points, and build a minutes result.', async () => {
        const meditationDataPoint: DeviceDataPoint = { value: 'meditation' } as DeviceDataPoint;
        const otherDataPoint: DeviceDataPoint = { value: 'other' } as DeviceDataPoint;

        setupDailyDataPoints('GoogleFit', 'ActivitySegment', sampleStartDate, sampleEndDate, undefined, [meditationDataPoint, otherDataPoint]);
        setupDailyTimeRanges([meditationDataPoint], sampleTimeRanges);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await googleFitMindfulMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
