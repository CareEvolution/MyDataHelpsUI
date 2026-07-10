import { DailyDataProvider, DailyDataQueryResult } from "../query-daily-data";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";
import { combineResultsUsingFirstValue } from "./daily-data";

/**
 * Wraps a Fitbit daily data provider so that it prefers the equivalent Google Health data
 * (when the participant has Google Health connected and the type is available) and falls
 * back to Fitbit on any day Google Health reports nothing.
 *
 * This keeps graphs that were configured against a Fitbit daily data type working while
 * moving to Google Health as the source of truth (Fitbit is being retired in its favor):
 * on days Google Health has data it is used, and Fitbit fills any remaining gaps. Combining
 * with "first value" (Google Health ordered first) avoids blending or double-counting.
 */
export function googleHealthPreferredOverFitbit(
    fitbitProvider: DailyDataProvider,
    googleHealthProvider: DailyDataProvider,
    googleHealthTypes: string | string[]
): DailyDataProvider {
    const types = Array.isArray(googleHealthTypes) ? googleHealthTypes : [googleHealthTypes];
    return async (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> => {
        const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

        const googleHealthAvailable = settings.googleHealthEnabled
            && types.some(type => deviceDataV2Types.some(ddt => ddt.namespace === "GoogleHealth" && ddt.type === type && ddt.enabled));

        // Google Health is pushed first so it wins on days both sources report.
        const providers: Promise<DailyDataQueryResult>[] = [];
        if (googleHealthAvailable) {
            providers.push(googleHealthProvider(startDate, endDate));
        }
        if (settings.fitbitEnabled) {
            providers.push(fitbitProvider(startDate, endDate));
        }

        if (providers.length === 0) return {};
        if (providers.length === 1) return providers[0];

        return combineResultsUsingFirstValue(startDate, endDate, await Promise.all(providers));
    };
}
