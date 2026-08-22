import { add, startOfDay } from "date-fns";
import { getDailyDataTypeDefinition } from "../query-daily-data";
import { computeContrastInsight } from "./compute";
import { ContrastInsightConfig, ContrastInsightResult, defaultContrastInsightConfig } from "./types";

export type ContrastInsightPreviewState = "Default" | "NegativePattern" | "NoPattern" | "InsufficientData";

/** Deterministic pseudo-random value in [0, 1) so that preview data is stable across renders. */
function pseudoRandom(seed: number): number {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
}

/** Generates deterministic synthetic paired days and runs them through the real computation
 * pipeline, so previews exercise the same code path participants see. */
export function computePreviewContrastInsight(config: ContrastInsightConfig, previewState: ContrastInsightPreviewState): ContrastInsightResult {
    const settings = { ...defaultContrastInsightConfig, ...config };
    const driverRange = getDailyDataTypeDefinition(config.driverDataType).previewDataRange;
    const outcomeRange = getDailyDataTypeDefinition(config.outcomeDataType).previewDataRange;

    const dayCount = previewState === "InsufficientData" ? 8 : settings.windowDays;
    const effect = previewState === "Default" ? 0.35 : previewState === "NegativePattern" ? -0.35 : 0;

    const endDate = startOfDay(add(new Date(), { days: -1 }));
    const pairs = [];
    for (let i = 0; i < dayCount; i++) {
        const date = add(endDate, { days: -i });
        const driverPercent = pseudoRandom(i * 7 + 1);
        const driverValue = driverRange[0] + driverPercent * (driverRange[1] - driverRange[0]);
        const high = settings.split.kind === "weekendVsWeekday"
            ? settings.weekendDays.includes(date.getDay())
            : driverPercent > 0.5;
        const outcomePercent = Math.min(1, Math.max(0, 0.4 + (high ? effect : 0) + (pseudoRandom(i * 13 + 5) - 0.5) * 0.3));
        pairs.push({
            date: date,
            driverValue: Math.round(driverValue),
            outcomeValue: Math.round(outcomeRange[0] + outcomePercent * (outcomeRange[1] - outcomeRange[0]))
        });
    }
    return computeContrastInsight(pairs.reverse(), config);
}
