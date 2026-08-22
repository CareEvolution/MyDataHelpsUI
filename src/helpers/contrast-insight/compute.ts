import { ContrastInsightConfig, ContrastInsightDay, ContrastInsightResult, defaultContrastInsightConfig } from "./types";

interface PairedDay {
    date: Date;
    driverValue: number;
    outcomeValue: number;
}

/** Rounds to a "nice" human-readable value (e.g., 7432 steps -> 7500, 442 minutes -> 450) so that
 * generated sentences like "above 7,500" read naturally. */
export function roundToNiceValue(value: number): number {
    if (value <= 0) return value;
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const step = magnitude / 4;
    return Math.round(value / step) * step;
}

function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function mean(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function pooledStandardDeviation(highValues: number[], lowValues: number[]): number {
    const variance = (values: number[]) => {
        const m = mean(values);
        return values.reduce((sum, value) => sum + Math.pow(value - m, 2), 0) / (values.length - 1);
    };
    const pooledVariance = ((highValues.length - 1) * variance(highValues) + (lowValues.length - 1) * variance(lowValues)) / (highValues.length + lowValues.length - 2);
    return Math.sqrt(pooledVariance);
}

function emptyResult(status: "insufficient-data" | "no-pattern", days: ContrastInsightDay[], weekdaysOnly: boolean, splitValue?: number): ContrastInsightResult {
    return {
        status: status,
        days: days,
        highDayCount: days.filter(d => d.high).length,
        lowDayCount: days.filter(d => !d.high).length,
        highAverage: 0,
        lowAverage: 0,
        delta: 0,
        effectSize: 0,
        splitValue: splitValue,
        weekdaysOnly: weekdaysOnly
    };
}

function computeForPairs(pairs: PairedDay[], config: ContrastInsightConfig, weekdaysOnly: boolean): ContrastInsightResult {
    const settings = { ...defaultContrastInsightConfig, ...config };
    const split = settings.split;

    if (pairs.length < settings.minimumTotalDays) {
        return emptyResult("insufficient-data", [], weekdaysOnly);
    }

    let splitValue: number | undefined;
    let isHigh: (pair: PairedDay) => boolean;
    if (split.kind === "weekendVsWeekday") {
        isHigh = pair => settings.weekendDays.includes(pair.date.getDay());
    } else if (split.kind === "threshold") {
        splitValue = split.value;
        const resolvedSplitValue = splitValue;
        isHigh = pair => pair.driverValue > resolvedSplitValue;
    } else {
        // Prefer a nice rounded median for readable sentences ("above 7,500"), but fall back to
        // the exact median when rounding would leave a bucket below the minimum size.
        const exactMedian = median(pairs.map(p => p.driverValue));
        splitValue = roundToNiceValue(exactMedian);
        const bucketSize = (value: number) => pairs.filter(p => p.driverValue > value).length;
        const highCount = bucketSize(splitValue);
        if (Math.min(highCount, pairs.length - highCount) < settings.minimumDaysPerBucket) {
            splitValue = exactMedian;
        }
        const resolvedSplitValue = splitValue;
        isHigh = pair => pair.driverValue > resolvedSplitValue;
    }

    const days: ContrastInsightDay[] = pairs.map(pair => ({ ...pair, high: isHigh(pair) }));
    const highValues = days.filter(d => d.high).map(d => d.outcomeValue);
    const lowValues = days.filter(d => !d.high).map(d => d.outcomeValue);

    if (highValues.length < settings.minimumDaysPerBucket || lowValues.length < settings.minimumDaysPerBucket) {
        return emptyResult("insufficient-data", days, weekdaysOnly, splitValue);
    }

    const highAverage = mean(highValues);
    const lowAverage = mean(lowValues);
    const delta = highAverage - lowAverage;
    const standardDeviation = pooledStandardDeviation(highValues, lowValues);
    const effectSize = standardDeviation > 0 ? delta / standardDeviation : 0;

    const meetsThresholds = Math.abs(effectSize) >= settings.minimumEffectSize
        && Math.abs(delta) >= settings.minimumDelta
        && standardDeviation > 0;

    return {
        status: meetsThresholds ? "pattern" : "no-pattern",
        days: days,
        highDayCount: highValues.length,
        lowDayCount: lowValues.length,
        highAverage: highAverage,
        lowAverage: lowAverage,
        delta: delta,
        effectSize: effectSize,
        splitValue: splitValue,
        weekdaysOnly: weekdaysOnly
    };
}

/** Computes a contrast insight from paired daily values.  Days are split into two buckets by the
 * configured rule and the outcome averages are contrasted, gated on data sufficiency, bucket
 * balance, and effect size.  When the high/low buckets are heavily imbalanced across weekends,
 * the insight is recomputed using weekdays only to avoid reporting a weekend effect in disguise. */
export function computeContrastInsight(pairs: PairedDay[], config: ContrastInsightConfig): ContrastInsightResult {
    const settings = { ...defaultContrastInsightConfig, ...config };
    const result = computeForPairs(pairs, config, false);

    if (settings.split.kind === "weekendVsWeekday" || result.status === "insufficient-data") {
        return result;
    }

    const weekendFraction = (days: ContrastInsightDay[]) => {
        const weekendCount = days.filter(d => settings.weekendDays.includes(d.date.getDay())).length;
        return days.length ? weekendCount / days.length : 0;
    };
    const highDays = result.days.filter(d => d.high);
    const lowDays = result.days.filter(d => !d.high);
    if (Math.abs(weekendFraction(highDays) - weekendFraction(lowDays)) <= 0.25) {
        return result;
    }

    const weekdayPairs = pairs.filter(pair => !settings.weekendDays.includes(pair.date.getDay()));
    return computeForPairs(weekdayPairs, config, true);
}
