import MyDataHelps, { DataCollectionSettings, DeviceDataNamespace, DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
import { CombinedDataCollectionSettings } from "./combined-data-collection-settings";

const enabledFlags: Record<Exclude<DeviceDataNamespace, 'Project'> | DeviceDataV2Namespace, keyof DataCollectionSettings> = {
    AirNowApi: 'airQualityEnabled',
    AppleHealth: 'appleHealthEnabled',
    Dexcom: 'dexcomEnabled',
    Fitbit: 'fitbitEnabled',
    Garmin: 'garminEnabled',
    GoogleFit: 'googleFitEnabled',
    HealthConnect: 'healthConnectEnabled',
    Omron: 'omronEnabled',
    Oura: 'ouraEnabled',
    WeatherBit: 'weatherEnabled'
};

export type CanQueryApiResult = { enabled: true; types: string[] } | { enabled: false; types?: never };

export interface CanQueryResult {
    v1: CanQueryApiResult;
    v2: CanQueryApiResult;
}

export function canQuery(combinedDataCollectionSettings: CombinedDataCollectionSettings, namespace: DeviceDataNamespace | DeviceDataV2Namespace, types: string | string[], strict?: boolean): CanQueryResult {
    const result: CanQueryResult = { v1: { enabled: false }, v2: { enabled: false } };

    if (typeof types === 'string') {
        types = [types];
    }

    if (namespace === 'Project') {
        result.v1.enabled = true;
        result.v1.types = types;
    } else if (namespace in enabledFlags && combinedDataCollectionSettings.settings[enabledFlags[namespace]]) {

        const v1DataTypes = combinedDataCollectionSettings.settings.queryableDeviceDataTypes
            .filter(dataType => dataType.namespace === namespace)
            .map(dataType => dataType.type);

        if (v1DataTypes.length > 0) {
            if (strict && types.every(type => v1DataTypes.includes(type))) {
                result.v1.enabled = true;
                result.v1.types = types;
            } else if (!strict && types.some(type => v1DataTypes.includes(type))) {
                result.v1.enabled = true;
                result.v1.types = types.filter(type => v1DataTypes.includes(type));
            }
        }

        const v2DataTypes = combinedDataCollectionSettings.deviceDataV2Types
            .filter(dataType => dataType.namespace === namespace && dataType.enabled)
            .map(dataType => dataType.type);

        if (v2DataTypes.length > 0) {
            if (strict && types.every(type => v2DataTypes.includes(type))) {
                result.v2.enabled = true;
                result.v2.types = types;
            } else if (!strict && types.some(type => v2DataTypes.includes(type))) {
                result.v2.enabled = true;
                result.v2.types = types.filter(type => v2DataTypes.includes(type));
            }
        }
    }

    return result;
}

export async function hasV1Data(namespace: DeviceDataNamespace, types: string | string[], modifiedAfter?: Date): Promise<true> {
    if (typeof types === 'string') {
        types = [types];
    }
    try {
        const result = await MyDataHelps.queryDeviceData({
            namespace: namespace,
            type: types,
            limit: 1,
            ...(modifiedAfter && { modifiedAfter: modifiedAfter.toISOString() })
        });
        return result.deviceDataPoints.length > 0 || Promise.reject(false);
    } catch {
        return Promise.reject(false);
    }
}

export async function hasV2Data(namespace: DeviceDataV2Namespace, types: string | string[], modifiedAfter?: Date): Promise<true> {
    if (typeof types === 'string') {
        types = [types];
    }
    return Promise.any(types.map(async type => {
        const result = await MyDataHelps.queryDeviceDataV2({
            namespace: namespace,
            type: type,
            limit: 1,
            ...(modifiedAfter && { modifiedAfter: modifiedAfter.toISOString() })
        });
        return result.deviceDataPoints.length > 0 || Promise.reject(false);
    })).catch(() => Promise.reject(false));
}