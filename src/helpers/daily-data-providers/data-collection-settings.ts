import MyDataHelps, {
    DataCollectionSettings as MDHDataCollectionSettings,
    SupportedDeviceDataV2DataType,
} from "@careevolution/mydatahelps-js";

export class DataCollectionSettings {
    private settings: MDHDataCollectionSettings;
    private deviceDataTypes: SupportedDeviceDataV2DataType[] | null = null;

    private constructor(settings: MDHDataCollectionSettings) {
        this.settings = settings;
    }

    static async create(): Promise<DataCollectionSettings> {
        const settings = await MyDataHelps.getDataCollectionSettings();
        return new DataCollectionSettings(settings);
    }

    private async getDeviceDataTypes(): Promise<
        SupportedDeviceDataV2DataType[]
    > {
        if (!this.deviceDataTypes) {
            this.deviceDataTypes =
                await MyDataHelps.getDeviceDataV2AllDataTypes();
        }
        return this.deviceDataTypes;
    }

    isAppleHealthEnabled(type: string): boolean {
        return this.settings.queryableDeviceDataTypes.some(
            (s) => s.namespace === "AppleHealth" && s.type === type,
        );
    }

    async isHealthConnectEnabled(type: string): Promise<boolean> {
        if (this.settings.healthConnectEnabled) {
            const types = await this.getDeviceDataTypes();
            return types.some(
                (t) => t.namespace === "HealthConnect" && t.type === type,
            );
        }
        return false;
    }

    isFitbitEnabled(): boolean {
        return this.settings.fitbitEnabled;
    }

    isGarminEnabled(): boolean {
        return this.settings.garminEnabled;
    }
}
