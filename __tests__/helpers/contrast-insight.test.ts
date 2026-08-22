import { describe, expect, it } from '@jest/globals';
import { computeContrastInsight, roundToNiceValue } from '../../src/helpers/contrast-insight/compute';
import { computePreviewContrastInsight } from '../../src/helpers/contrast-insight/preview';
import { ContrastInsightConfig } from '../../src/helpers/contrast-insight/types';

const baseConfig: ContrastInsightConfig = {
    driverDataType: 'SleepMinutes',
    outcomeDataType: 'Steps'
};

/** Builds paired days starting on a Monday.  The driver alternates between lowDriver and
 * highDriver; the outcome is derived from the driver bucket by the provided function. */
function buildPairs(count: number, options?: {
    startDate?: Date,
    driver?: (index: number) => number,
    outcome?: (index: number, driverValue: number) => number
}) {
    const startDate = options?.startDate ?? new Date(2025, 0, 6); // Monday, January 6, 2025
    const driver = options?.driver ?? (index => index % 2 === 0 ? 350 : 500);
    const outcome = options?.outcome ?? ((index, driverValue) => (driverValue > 425 ? 9000 : 7000) + (index % 5) * 100);
    return Array.from({ length: count }, (_, index) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + index);
        const driverValue = driver(index);
        return { date: date, driverValue: driverValue, outcomeValue: outcome(index, driverValue) };
    });
}

describe('roundToNiceValue', () => {
    it('Should round to human-friendly values.', () => {
        expect(roundToNiceValue(442)).toBe(450);
        expect(roundToNiceValue(7432)).toBe(7500);
        expect(roundToNiceValue(62)).toBe(62.5);
        expect(roundToNiceValue(0)).toBe(0);
    });
});

describe('computeContrastInsight', () => {
    it('Should report a pattern when high-driver days have clearly higher outcomes.', () => {
        const result = computeContrastInsight(buildPairs(30), baseConfig);
        expect(result.status).toBe('pattern');
        expect(result.delta).toBeGreaterThan(1500);
        expect(result.effectSize).toBeGreaterThan(0.5);
        expect(result.splitValue).toBe(425); // median of alternating 350/500 days
        expect(result.highDayCount + result.lowDayCount).toBe(30);
        expect(result.weekdaysOnly).toBe(false);
    });

    it('Should report a negative pattern when high-driver days have lower outcomes.', () => {
        const pairs = buildPairs(30, { outcome: (index, driverValue) => (driverValue > 425 ? 6000 : 9000) + (index % 5) * 100 });
        const result = computeContrastInsight(pairs, baseConfig);
        expect(result.status).toBe('pattern');
        expect(result.delta).toBeLessThan(0);
    });

    it('Should return insufficient-data when there are too few days.', () => {
        const result = computeContrastInsight(buildPairs(10), baseConfig);
        expect(result.status).toBe('insufficient-data');
    });

    it('Should return insufficient-data when one bucket is too small.', () => {
        const pairs = buildPairs(30, { driver: index => index < 3 ? 500 : 350 });
        const result = computeContrastInsight(pairs, { ...baseConfig, split: { kind: 'threshold', value: 425 } });
        expect(result.status).toBe('insufficient-data');
    });

    it('Should return no-pattern when the outcome does not differ between buckets.', () => {
        const pairs = buildPairs(30, { outcome: index => 8000 + (index % 7) * 150 });
        const result = computeContrastInsight(pairs, baseConfig);
        expect(result.status).toBe('no-pattern');
    });

    it('Should respect an explicit threshold split.', () => {
        const result = computeContrastInsight(buildPairs(30), { ...baseConfig, split: { kind: 'threshold', value: 480 } });
        expect(result.splitValue).toBe(480);
        expect(result.status).toBe('pattern');
    });

    it('Should split weekends from weekdays.', () => {
        const pairs = buildPairs(28, {
            driver: () => 400,
            outcome: () => 0
        }).map(pair => ({
            ...pair,
            outcomeValue: ([0, 6].includes(pair.date.getDay()) ? 10000 : 7000) + pair.date.getDate() * 10
        }));
        const result = computeContrastInsight(pairs, { ...baseConfig, split: { kind: 'weekendVsWeekday' }, minimumDaysPerBucket: 7 });
        expect(result.status).toBe('pattern');
        expect(result.highDayCount).toBe(8); // 4 weekends in 28 days starting Monday
        expect(result.splitValue).toBeUndefined();
        expect(result.delta).toBeGreaterThan(2000);
    });

    it('Should recompute using weekdays only when the high bucket is dominated by weekends.', () => {
        // driver is high on weekends only, and the outcome tracks the weekend, not the driver
        const pairs = buildPairs(35, {
            driver: () => 0,
            outcome: () => 0
        }).map(pair => {
            const weekend = [0, 6].includes(pair.date.getDay());
            return {
                ...pair,
                driverValue: weekend ? 520 : 360,
                outcomeValue: (weekend ? 11000 : 7000) + pair.date.getDate() * 10
            };
        });
        const result = computeContrastInsight(pairs, baseConfig);
        expect(result.weekdaysOnly).toBe(true);
        // once weekends are removed, the driver no longer separates the outcome
        expect(result.status).not.toBe('pattern');
    });

    it('Should enforce a minimum absolute delta when configured.', () => {
        const result = computeContrastInsight(buildPairs(30), { ...baseConfig, minimumDelta: 5000 });
        expect(result.status).toBe('no-pattern');
    });
});

describe('computePreviewContrastInsight', () => {
    // Preview data must deterministically produce the state it advertises, since the view
    // builder and Storybook rely on it to always render a populated example.
    const previewConfig: ContrastInsightConfig = { driverDataType: 'SleepMinutes', outcomeDataType: 'Steps' };

    it('Should produce a positive pattern for the Default preview.', () => {
        const result = computePreviewContrastInsight(previewConfig, 'Default');
        expect(result.status).toBe('pattern');
        expect(result.delta).toBeGreaterThan(0);
    });

    it('Should produce a negative pattern for the NegativePattern preview.', () => {
        const result = computePreviewContrastInsight(previewConfig, 'NegativePattern');
        expect(result.status).toBe('pattern');
        expect(result.delta).toBeLessThan(0);
    });

    it('Should produce no pattern for the NoPattern preview.', () => {
        expect(computePreviewContrastInsight(previewConfig, 'NoPattern').status).toBe('no-pattern');
    });

    it('Should produce insufficient data for the InsufficientData preview.', () => {
        expect(computePreviewContrastInsight(previewConfig, 'InsufficientData').status).toBe('insufficient-data');
    });

    it('Should produce a weekend pattern for the Default preview with a weekend split.', () => {
        const result = computePreviewContrastInsight({ ...previewConfig, split: { kind: 'weekendVsWeekday' } }, 'Default');
        expect(result.status).toBe('pattern');
    });
});
