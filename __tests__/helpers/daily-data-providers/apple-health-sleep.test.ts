import { describe, expect, test } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPoints, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { asleepCoreTime, asleepDeepTime, asleepRemTime, asleepTime, inBedTime } from '../../../src/helpers/daily-data-providers/apple-health-sleep';

describe('Daily Data Provider - Apple Health Sleep', () => {
    test.each([
        { title: 'In Bed', sleepFunction: inBedTime, sleepTypes: ['InBed'] },
        { title: 'Core', sleepFunction: asleepCoreTime, sleepTypes: ['AsleepCore'] },
        { title: 'REM', sleepFunction: asleepRemTime, sleepTypes: ['AsleepREM'] },
        { title: 'Deep', sleepFunction: asleepDeepTime, sleepTypes: ['AsleepDeep'] },
        { title: 'Total', sleepFunction: asleepTime, sleepTypes: ['AsleepCore', 'AsleepREM', 'AsleepDeep', 'Asleep'] }
    ])('$title - Should query for daily data points, filter by sleep type, and build a minutes result.', async ({ sleepFunction, sleepTypes }) => {
        const dataPoints: DeviceDataPoint[] = [{ value: 'Other' } as DeviceDataPoint];
        sleepTypes.forEach(sleepType => {
            dataPoints.push({ value: sleepType } as DeviceDataPoint);
        });

        setupDailyDataPoints('AppleHealth', 'SleepAnalysisInterval', sampleStartDate, sampleEndDate, undefined, dataPoints);
        setupDailyTimeRanges(dataPoints.slice(1), sampleTimeRanges, -6);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await sleepFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
