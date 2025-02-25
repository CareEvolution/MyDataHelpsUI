import MyDataHelps, {
    DeviceDataNamespace,
    DeviceDataPointQuery,
    DeviceDataV2Namespace,
    DeviceDataV2Query,
} from "@careevolution/mydatahelps-js";
import { DataCollectionSettings } from "../daily-data-providers/data-collection-settings";

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

export async function checkSourceAvailability(
    settings: DataCollectionSettings,
    sources: { namespace: DeviceDataNamespace | DeviceDataV2Namespace, type: string[] }[],
    modifiedAfter?: Date
): Promise<boolean> {
    const availabilityChecks = sources.map(async ({ namespace, type }) => {
        let enabled: boolean = false;
        let isV2: boolean = false;

        switch (namespace) {
            case "AppleHealth":
                enabled = type.some(t => settings.isEnabled("AppleHealth", t));
                break;
            case "Fitbit":
                enabled = settings.isEnabled("Fitbit");
                break;
            case "Garmin":
                enabled = settings.isEnabled("Garmin");
                break;
            case "HealthConnect":
                enabled = type.some(t => settings.isEnabled("HealthConnect", t));
                isV2 = true;
                break;
        }

        if (!enabled) return false;

        if (isV2) {
            return simpleAvailabilityCheckV2(namespace as DeviceDataV2Namespace, type)(modifiedAfter);
        } else {
            return simpleAvailabilityCheck(namespace as DeviceDataNamespace, type)(modifiedAfter);
        }
    });

    const finalResults = await Promise.all(availabilityChecks);
    return finalResults.some(result => result);
}
