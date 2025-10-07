import { DataCollectionSettings, DeviceDataNamespace, DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
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

export interface DataCollectionHelper {
    canQueryV1: (namespace: DeviceDataNamespace, types: string | string[]) => boolean;
    canQueryV2: (namespace: DeviceDataV2Namespace, types: string | string[]) => boolean;
}

export default function createDataCollectionHelper(combinedDataCollectionSettings: CombinedDataCollectionSettings): DataCollectionHelper {

    const v1DataTypes: Record<DeviceDataNamespace, string[]> = combinedDataCollectionSettings.settings.queryableDeviceDataTypes.reduce((v1DataTypes, dataType) => {
        v1DataTypes[dataType.namespace] = v1DataTypes[dataType.namespace] ?? [];
        v1DataTypes[dataType.namespace].push(dataType.type);
        return v1DataTypes;
    }, {} as Record<DeviceDataNamespace, string[]>);

    const v2DataTypes: Record<DeviceDataV2Namespace, string[]> = combinedDataCollectionSettings.deviceDataV2Types.reduce((v2DataTypes, dataType) => {
        if ( dataType.enabled ) {
            v2DataTypes[dataType.namespace] = v2DataTypes[dataType.namespace] ?? [];
            v2DataTypes[dataType.namespace].push(dataType.type);
        }
        return v2DataTypes;
    }, {} as Record<DeviceDataV2Namespace, string[]>);

    const canQuery = (namespace: DeviceDataNamespace | DeviceDataV2Namespace, types: string | string[], supportedTypes: string[] | undefined): boolean => {
        if (namespace === 'Project') {
            return true;
        }

        if (!combinedDataCollectionSettings.settings[enabledFlags[namespace]] || !supportedTypes) {
            return false;
        }

        if (typeof types === 'string') {
            types = [types];
        }

        return types.every(type => supportedTypes.includes(type));
    };

    return {
        canQueryV1: (namespace, types) => canQuery(namespace, types, v1DataTypes[namespace]),
        canQueryV2: (namespace, types) => canQuery(namespace, types, v2DataTypes[namespace])
    };
}