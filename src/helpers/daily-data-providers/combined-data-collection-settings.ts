import MyDataHelps, {
    DataCollectionSettings as MDHDataCollectionSettings,
    SupportedDeviceDataV2DataType
} from "@careevolution/mydatahelps-js";

export interface CombinedDataCollectionSettings {
    settings: MDHDataCollectionSettings;
    deviceDataV2Types: SupportedDeviceDataV2DataType[];
}

export async function getCombinedDataCollectionSettings(
    useV2: boolean = false
): Promise<CombinedDataCollectionSettings> {
    const [settings, deviceDataV2Types] = await Promise.all([
        MyDataHelps.getDataCollectionSettings(),
        useV2
            ? MyDataHelps.getDeviceDataV2AllDataTypes(true) // Only get enabled types
            : Promise.resolve([])
    ]);

    return {
        settings,
        deviceDataV2Types
    };
}
