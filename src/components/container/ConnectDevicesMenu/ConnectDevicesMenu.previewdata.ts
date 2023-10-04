import { DataCollectionSettings, ExternalAccount } from "@careevolution/mydatahelps-js";
import { getFitbitProviderID, getGarminProviderID, getOmronProviderID } from "../../../helpers/providerIDs";

export const previewAccounts:ExternalAccount[] = [
        {
            id: 1,
            lastRefreshDate: "",
            provider: {
                category: "Device Manufacturer",
                id: getFitbitProviderID(),
                name: "Fitbit",
                logoUrl: "",
            },
            status: "fetchingData"
        },
        {
            id: 2,
            lastRefreshDate: "",
            provider: {
                category: "Device Manufacturer",
                id: getGarminProviderID(),
                name: "Garmin",
                logoUrl: "",
            },
            status: "unauthorized"
        },
        {
            id: 3,
            lastRefreshDate: "",
            provider: {
                category: "Device Manufacturer",
                id: getOmronProviderID(),
                name: "Fitbit",
                logoUrl: "",
            },
            status: "fetchComplete"
        }
    ];

export const previewSettings:DataCollectionSettings = {
    fitbitEnabled: true,
    garminEnabled: true,
    queryableDeviceDataTypes: [
        {
            namespace: "AppleHealth",
            type: "Steps"
        },
        {
            namespace: "GoogleFit",
            type: "Steps"
        }
    ],
    airQualityEnabled: true,
    weatherEnabled: true,
    ehrEnabled: true,
    sensorDataCollectionEndDate: ""
};