import { DailyDataProvider, DailyDataQueryResult } from "../query-daily-data";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";
import { combineResultsUsingFirstValue } from "./daily-data";

/**
 * Wraps a Fitbit daily data provider so that it prefers Fitbit data but falls back to the
 * equivalent Google Health data on any day Fitbit reports nothing (as long as the
 * participant has Google Health connected and the type is available).
 *
 * This keeps graphs that were configured against a Fitbit daily data type working as
 * Fitbit is retired in favor of Google Health: on days Fitbit still has data it is used
 * unchanged; on days it doesn't, the Google Health value fills in. Combining with
 * "first value" (Fitbit ordered first) avoids blending or double-counting the two sources.
 */
export function fitbitWithGoogleHealthFallback(
    fitbitProvider: DailyDataProvider,
    googleHealthProvider: DailyDataProvider,
    googleHealthTypes: string | string[]
): DailyDataProvider {
    const types = Array.isArray(googleHealthTypes) ? googleHealthTypes : [googleHealthTypes];
    return async (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> => {
        const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

        const googleHealthAvailable = settings.googleHealthEnabled
            && types.some(type => deviceDataV2Types.some(ddt => ddt.namespace === "GoogleHealth" && ddt.type === type && ddt.enabled));

        // Fitbit is pushed first so it wins on days both sources report.
        const providers: Promise<DailyDataQueryResult>[] = [];
        if (settings.fitbitEnabled) {
            providers.push(fitbitProvider(startDate, endDate));
        }
        if (googleHealthAvailable) {
            providers.push(googleHealthProvider(startDate, endDate));
        }

        if (providers.length === 0) return {};
        if (providers.length === 1) return providers[0];

        return combineResultsUsingFirstValue(startDate, endDate, await Promise.all(providers));
    };
}
