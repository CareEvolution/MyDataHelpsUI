import MyDataHelps, { DataCollectionSettings, DeviceDataNamespace, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import { CombinedDataCollectionSettings } from './combined-data-collection-settings';

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

export interface SupportedAPIsQuery {
    namespace: DeviceDataNamespace | DeviceDataV2Namespace;
    types: string[];
    requireAllTypes: boolean;
}

export type SupportedAPI = { enabled: true; types: string[] } | { enabled: false; types?: never };

export interface SupportedAPIsResult {
    v1: SupportedAPI;
    v2: SupportedAPI;
}

/**
 * Used to determine if either API (V1 or V2) supports the requested namespace and types, and if so, which types each supports. This allows
 * us to have data providers that can leverage either or both APIs to load data. It also means we can have more targeted data availability
 * checking because only enabled types are included in such queries.
 *
 * @param combinedDataCollectionSettings - The combined data collection settings used to determine the above.
 * @param query.namespace - The V1 or V2 namespace to check.
 * @param query.types - The V1 or V2 data types to check.
 * @param query.requireAllTypes - If true, all types must be available from an API for it to be enabled.  If false, only one type must be available.
 */
export function getSupportedApis(combinedDataCollectionSettings: CombinedDataCollectionSettings, query: SupportedAPIsQuery): SupportedAPIsResult {
    const result: SupportedAPIsResult = { v1: { enabled: false }, v2: { enabled: false } };

    const { namespace, types, requireAllTypes } = query;

    if (namespace === 'Project') {
        result.v1.enabled = true;
        result.v1.types = types;
    } else if (namespace in enabledFlags && combinedDataCollectionSettings.settings[enabledFlags[namespace]]) {

        const v1DataTypes = combinedDataCollectionSettings.settings.queryableDeviceDataTypes
            .filter(dataType => dataType.namespace === namespace)
            .map(dataType => dataType.type);

        if (v1DataTypes.length > 0) {
            if (requireAllTypes && types.every(type => v1DataTypes.includes(type))) {
                result.v1.enabled = true;
                result.v1.types = types;
            } else if (!requireAllTypes && types.some(type => v1DataTypes.includes(type))) {
                result.v1.enabled = true;
                result.v1.types = types.filter(type => v1DataTypes.includes(type));
            }
        }

        const v2DataTypes = combinedDataCollectionSettings.deviceDataV2Types
            .filter(dataType => dataType.namespace === namespace && dataType.enabled)
            .map(dataType => dataType.type);

        if (v2DataTypes.length > 0) {
            if (requireAllTypes && types.every(type => v2DataTypes.includes(type))) {
                result.v2.enabled = true;
                result.v2.types = types;
            } else if (!requireAllTypes && types.some(type => v2DataTypes.includes(type))) {
                result.v2.enabled = true;
                result.v2.types = types.filter(type => v2DataTypes.includes(type));
            }
        }
    }

    return result;
}

export async function hasV1Data(namespace: DeviceDataNamespace, types: string[], modifiedAfter?: Date): Promise<true> {
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

export async function hasV2Data(namespace: DeviceDataV2Namespace, types: string[], modifiedAfter?: Date): Promise<true> {
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