import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPointsV2, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import { DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import * as mindfulTherapyFunctions from '../../../src/helpers/daily-data-providers/common-mindful-and-therapy';
import appleHealthTherapyMinutes from '../../../src/helpers/daily-data-providers/apple-health-therapy-minutes';

describe('Daily Data Provider - Apple Health Therapy Minutes', () => {
    it('Should query for daily data points, filter out mindful data points, and build a minutes result.', async () => {
        const mindfulDataPoint = { identifier: 'Mindful' } as DeviceDataV2Point;
        const therapyDataPoint = { identifier: 'Therapy' } as DeviceDataV2Point;
        jest.spyOn(mindfulTherapyFunctions, 'isSilverCloudCbtDataPoint').mockImplementation(dataPoint => dataPoint === therapyDataPoint);

        setupDailyDataPointsV2('AppleHealth', 'Mindful Sessions', sampleStartDate, sampleEndDate, undefined, undefined, [mindfulDataPoint, therapyDataPoint]);
        setupDailyTimeRanges([therapyDataPoint], sampleTimeRanges);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await appleHealthTherapyMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
