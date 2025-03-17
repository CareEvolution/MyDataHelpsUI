import MyDataHelps, {
    DeviceDataNamespace,
    DeviceDataPointQuery,
    DeviceDataV2Namespace,
    DeviceDataV2Query,
} from "@careevolution/mydatahelps-js";
import {
    CombinedDataCollectionSettings,
} from "../daily-data-providers/combined-data-collection-settings";

export type DataSource = {
    namespace: DeviceDataNamespace | DeviceDataV2Namespace;
    type: string[];
    isV2?: boolean;
};

export function sources(
    ...items: Array<[string, string | string[], boolean?]>
): DataSource[] {
    return items.map(([namespace, type, isV2 = false]) => ({
        namespace: namespace as DeviceDataNamespace | DeviceDataV2Namespace,
        type: Array.isArray(type) ? type : [type],
        isV2: isV2
    }));
}

export function simpleAvailabilityCheck(
    namespace: DeviceDataNamespace | DeviceDataV2Namespace,
    type: string | string[],
    isV2: boolean = false,
) {
    return async function (combinedSettings: CombinedDataCollectionSettings, modifiedAfter?: Date) {
        const dataSource: DataSource = {
            namespace,
            type: Array.isArray(type) ? type : [type],
            isV2: isV2
        };
        
        return await checkSourceAvailability(
            combinedSettings,
            [dataSource],
            modifiedAfter,
        );
    };
}

export function combinedAvailabilityCheck(
    sources: DataSource[]
) {
    return async function (combinedSettings: CombinedDataCollectionSettings, modifiedAfter?: Date) {
        return await checkSourceAvailability(combinedSettings, sources, modifiedAfter);
    };
}

async function checkSourceAvailability(
    combinedSettings: CombinedDataCollectionSettings,
    sources: DataSource[],
    modifiedAfter?: Date,
): Promise<boolean> {
    const { settings, deviceDataV2Types } = combinedSettings;
    const availabilityChecks = sources.map(async ({ namespace, type, isV2 = false }) => {
        let enabled: boolean = false;

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
                isV2 = true; // HealthConnect always uses V2
                break;
        }

        if (!enabled) return false;

        let parameters: DeviceDataPointQuery | DeviceDataV2Query;
        
        if (isV2) {
            parameters = {
                namespace: namespace as DeviceDataV2Namespace,
                type: type.join(","),
                limit: 1,
                modifiedAfter: modifiedAfter?.toISOString(),
            };
            
            try {
                const result = await MyDataHelps.queryDeviceDataV2(parameters);
                return result.deviceDataPoints.length > 0;
            } catch {
                return false;
            }
        } else {
            parameters = {
                namespace: namespace as DeviceDataNamespace,
                type: type,
                limit: 1,
                modifiedAfter: modifiedAfter?.toISOString(),
            };
            
            try {
                const result = await MyDataHelps.queryDeviceData(parameters);
                return result.deviceDataPoints.length > 0;
            } catch {
                return false;
            }
        }
    });

    const finalResults = await Promise.all(availabilityChecks);
    return finalResults.some((result) => result);
}
