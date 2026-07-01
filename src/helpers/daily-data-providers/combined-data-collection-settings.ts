import MyDataHelps, { DataCollectionSettings } from "@careevolution/mydatahelps-js";
import { SupportedDeviceDataV2DataTypeEx } from "./google-health-namespace";

export interface CombinedDataCollectionSettings {
    settings: DataCollectionSettings;
    deviceDataV2Types: SupportedDeviceDataV2DataTypeEx[];
}

export async function getCombinedDataCollectionSettings(useV2: boolean = false): Promise<CombinedDataCollectionSettings> {
    const [settings, deviceDataV2Types] = await Promise.all([
        MyDataHelps.getDataCollectionSettings(),
        useV2 ? MyDataHelps.getDeviceDataV2AllDataTypes(true) : Promise.resolve([])
    ]);
    return { settings, deviceDataV2Types };
}