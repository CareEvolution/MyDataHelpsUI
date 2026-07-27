import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPointsV2, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import { DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import * as mindfulTherapyFunctions from '../../../src/helpers/daily-data-providers/common-mindful-and-therapy';
import appleHealthMindfulMinutes from '../../../src/helpers/daily-data-providers/apple-health-mindful-minutes';

describe('Daily Data Provider - Apple Health Mindful Minutes', () => {
    it('Should query for daily data points, filter out therapy data points, and build a minutes result.', async () => {
        const mindfulDataPoint = { identifier: 'Mindful' } as DeviceDataV2Point;
        const therapyDataPoint = { identifier: 'Therapy' } as DeviceDataV2Point;
        jest.spyOn(mindfulTherapyFunctions, 'isSilverCloudCbtDataPoint').mockImplementation(dataPoint => dataPoint === therapyDataPoint);

        setupDailyDataPointsV2('AppleHealth', 'Mindful Sessions', sampleStartDate, sampleEndDate, undefined, undefined, [mindfulDataPoint, therapyDataPoint]);
        setupDailyTimeRanges([mindfulDataPoint], sampleTimeRanges);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await appleHealthMindfulMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
