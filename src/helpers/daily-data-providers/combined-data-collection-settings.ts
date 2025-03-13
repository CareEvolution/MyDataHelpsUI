import MyDataHelps, {
    DataCollectionSettings as MDHDataCollectionSettings,
    SupportedDeviceDataV2DataType,
} from "@careevolution/mydatahelps-js";

export interface CombinedDataCollectionSettings {
    settings: MDHDataCollectionSettings;
    deviceDataV2Types: SupportedDeviceDataV2DataType[];
}

export async function getCombinedDataCollectionSettings(): Promise<CombinedDataCollectionSettings> {
    const [settings, deviceDataV2Types] = await Promise.all([
        MyDataHelps.getDataCollectionSettings(),
        MyDataHelps.getDeviceDataV2AllDataTypes(),
    ]);

    return {
        settings,
        deviceDataV2Types,
    };
}
