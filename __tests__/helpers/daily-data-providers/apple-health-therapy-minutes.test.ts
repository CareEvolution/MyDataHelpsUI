import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPoints, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import * as mindfulTherapyFunctions from '../../../src/helpers/daily-data-providers/common-mindful-and-therapy';
import appleHealthTherapyMinutes from '../../../src/helpers/daily-data-providers/apple-health-therapy-minutes';

describe('Daily Data Provider - Apple Health Therapy Minutes', () => {
    it('Should query for daily data points, filter out mindful data points, and build a minutes result.', async () => {
        const mindfulDataPoint: DeviceDataPoint = { identifier: 'Mindful' } as DeviceDataPoint;
        const therapyDataPoint: DeviceDataPoint = { identifier: 'Therapy' } as DeviceDataPoint;
        jest.spyOn(mindfulTherapyFunctions, 'isSilverCloudCbtDataPoint').mockImplementation(dataPoint => dataPoint === therapyDataPoint);

        setupDailyDataPoints('AppleHealth', 'MindfulSession', sampleStartDate, sampleEndDate, undefined, [mindfulDataPoint, therapyDataPoint]);
        setupDailyTimeRanges([therapyDataPoint], sampleTimeRanges);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await appleHealthTherapyMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
