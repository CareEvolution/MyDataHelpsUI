import MyDataHelps, {
    DeviceDataNamespace,
    DeviceDataV2Namespace,
    DataCollectionSettings as MDHDataCollectionSettings,
    SupportedDeviceDataV2DataType,
} from "@careevolution/mydatahelps-js";

export class DataCollectionSettings {
    private settings: MDHDataCollectionSettings;
    private deviceDataTypes: SupportedDeviceDataV2DataType[];

    private constructor(
        settings: MDHDataCollectionSettings,
        deviceDataTypes: SupportedDeviceDataV2DataType[],
    ) {
        this.settings = settings;
        this.deviceDataTypes = deviceDataTypes;
    }

    static async create(): Promise<DataCollectionSettings> {
        const settings = await MyDataHelps.getDataCollectionSettings();
        let deviceDataTypes: SupportedDeviceDataV2DataType[] = [];
        
        // HACK HACK HACK: Need a better way to tell if V2 is needed.
        if (settings.healthConnectEnabled) {
            deviceDataTypes = await MyDataHelps.getDeviceDataV2AllDataTypes();
        }
        
        return new DataCollectionSettings(settings, deviceDataTypes);
    }

    isEnabled(
        namespace: DeviceDataNamespace | DeviceDataV2Namespace,
        type?: string,
    ): boolean {
        switch (namespace) {
            case "AppleHealth":
                return this.settings.queryableDeviceDataTypes.some(
                    (s) => s.namespace === "AppleHealth" && s.type === type,
                );
            case "GoogleFit":
                return this.settings.queryableDeviceDataTypes.some(
                    (s) => s.namespace === "GoogleFit" && s.type === type,
                );
            case "HealthConnect":
                if (this.settings.healthConnectEnabled) {
                    return this.deviceDataTypes.some(
                        (t) =>
                            t.namespace === "HealthConnect" &&
                            t.type === type &&
                            t.enabled === true,
                    );
                }
                return false;
            case "Fitbit":
                return this.settings.fitbitEnabled;
            case "Garmin":
                return this.settings.garminEnabled;
            default:
                return false;
        }
    }
}
