export type ContrastInsightSplitRule =
    { kind: "personalMedian" } |
    { kind: "threshold", value: number } |
    { kind: "weekendVsWeekday" };

export interface ContrastInsightConfig {
    driverDataType: string;
    outcomeDataType: string;
    /** Number of days the outcome trails the driver.  0 = same day, 1 = outcome measured the day after the driver. */
    lagDays?: 0 | 1;
    split?: ContrastInsightSplitRule;
    windowDays?: number;
    minimumTotalDays?: number;
    minimumDaysPerBucket?: number;
    /** Minimum Cohen's d effect size required before a pattern is reported. */
    minimumEffectSize?: number;
    /** Optional minimum difference between bucket averages, in the outcome's raw units. */
    minimumDelta?: number;
    /** Days of the week treated as the weekend.  0 = Sunday ... 6 = Saturday. */
    weekendDays?: number[];
    excludeZeroDriverDays?: boolean;
    excludeZeroOutcomeDays?: boolean;
}

export interface ContrastInsightDay {
    /** The date of the outcome value.  When lagDays is 1, the driver value is from the previous day. */
    date: Date;
    driverValue: number;
    outcomeValue: number;
    /** True when the day falls in the high-driver (or weekend) bucket. */
    high: boolean;
}

export type ContrastInsightStatus = "insufficient-data" | "no-pattern" | "pattern";

export interface ContrastInsightResult {
    status: ContrastInsightStatus;
    days: ContrastInsightDay[];
    highDayCount: number;
    lowDayCount: number;
    highAverage: number;
    lowAverage: number;
    /** highAverage - lowAverage, in the outcome's raw units. */
    delta: number;
    /** Cohen's d for the difference between buckets. */
    effectSize: number;
    /** The driver value separating the buckets.  Undefined for weekend vs weekday splits. */
    splitValue?: number;
    /** True when a weekend imbalance was detected and the insight was recomputed using weekdays only. */
    weekdaysOnly: boolean;
}

export const defaultContrastInsightConfig: Required<Pick<ContrastInsightConfig, "lagDays" | "split" | "windowDays" | "minimumTotalDays" | "minimumDaysPerBucket" | "minimumEffectSize" | "minimumDelta" | "weekendDays" | "excludeZeroDriverDays" | "excludeZeroOutcomeDays">> = {
    lagDays: 0,
    split: { kind: "personalMedian" },
    windowDays: 30,
    minimumTotalDays: 20,
    minimumDaysPerBucket: 7,
    minimumEffectSize: 0.5,
    minimumDelta: 0,
    weekendDays: [0, 6],
    excludeZeroDriverDays: true,
    excludeZeroOutcomeDays: true
};
