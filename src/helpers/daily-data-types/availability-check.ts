import MyDataHelps, {
    DeviceDataNamespace,
    DeviceDataPointQuery,
    DeviceDataV2Namespace,
    DeviceDataV2Query,
} from "@careevolution/mydatahelps-js";
import {
    CombinedDataCollectionSettings,
    getCombinedDataCollectionSettings,
} from "../daily-data-providers/combined-data-collection-settings";

export function simpleAvailabilityCheck(
    namespace: DeviceDataNamespace,
    type: string | string[],
) {
    return function (modifiedAfter?: Date) {
        var parameters: DeviceDataPointQuery = {
            namespace: namespace,
            type: type,
            limit: 1,
        };
        if (modifiedAfter) {
            parameters.modifiedAfter = modifiedAfter.toISOString();
        }
        return MyDataHelps.queryDeviceData(parameters)
            .then(function (result) {
                return result.deviceDataPoints.length > 0;
            })
            .catch(function () {
                return false;
            });
    };
}

export function simpleAvailabilityCheckV2(
    namespace: DeviceDataV2Namespace,
    type: string | string[],
) {
    return async function (modifiedAfter?: Date) {
        const parameters: DeviceDataV2Query = {
            namespace: namespace,
            type: Array.isArray(type) ? type.join(",") : type,
            limit: 1,
            modifiedAfter: modifiedAfter?.toISOString(),
        };
        try {
            const result = await MyDataHelps.queryDeviceDataV2(parameters);
            return result.deviceDataPoints.length > 0;
        } catch {
            return false;
        }
    };
}

export type DataSource = {
    namespace: DeviceDataNamespace | DeviceDataV2Namespace;
    type: string[];
};

export function sources(
    ...items: Array<[string, string | string[]]>
): DataSource[] {
    return items.map(([namespace, type]) => ({
        namespace: namespace as DeviceDataNamespace | DeviceDataV2Namespace,
        type: Array.isArray(type) ? type : [type],
    }));
}

let combinedSettingsPromise: Promise<CombinedDataCollectionSettings> | null =
    null;

function getCachedCombinedSettings(): Promise<CombinedDataCollectionSettings> {
    if (!combinedSettingsPromise) {
        combinedSettingsPromise = getCombinedDataCollectionSettings();
    }
    return combinedSettingsPromise;
}

export async function checkSourceAvailability(
    sources: DataSource[],
    modifiedAfter?: Date,
): Promise<boolean> {
    const combinedSettings = await getCachedCombinedSettings();
    const { settings, deviceDataV2Types } = combinedSettings;
    const availabilityChecks = sources.map(async ({ namespace, type }) => {
        let enabled: boolean = false;
        let isV2: boolean = false;

        switch (namespace) {
            case "AppleHealth":
                enabled =
                    settings.appleHealthEnabled &&
                    type.some((t) =>
                        settings.queryableDeviceDataTypes.some(
                            (d) => d.namespace == "AppleHealth" && d.type == t,
                        ),
                    );
                break;
            case "GoogleFit":
                enabled =
                    settings.googleFitEnabled &&
                    type.some((t) =>
                        settings.queryableDeviceDataTypes.some(
                            (d) => d.namespace == "GoogleFit" && d.type == t,
                        ),
                    );
                break;
            case "Fitbit":
                enabled = settings.fitbitEnabled;
                break;
            case "Garmin":
                enabled = settings.garminEnabled;
                break;
            case "HealthConnect":
                enabled =
                    settings.healthConnectEnabled &&
                    type.some((t) =>
                        deviceDataV2Types.some(
                            (d) =>
                                d.enabled &&
                                d.namespace == "HealthConnect" &&
                                d.type == t,
                        ),
                    );
                isV2 = true;
                break;
        }

        if (!enabled) return false;

        if (isV2) {
            return simpleAvailabilityCheckV2(
                namespace as DeviceDataV2Namespace,
                type,
            )(modifiedAfter);
        } else {
            return simpleAvailabilityCheck(
                namespace as DeviceDataNamespace,
                type,
            )(modifiedAfter);
        }
    });

    const finalResults = await Promise.all(availabilityChecks);
    return finalResults.some((result) => result);
}
