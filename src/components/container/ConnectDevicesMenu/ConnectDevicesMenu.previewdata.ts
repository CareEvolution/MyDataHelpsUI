import { DataCollectionSettings, ExternalAccount, ExternalAccountProvider, HealthConnectStatus, ParticipantInfo } from "@careevolution/mydatahelps-js";
import { getDexcomProviderID, getFitbitProviderID, getGarminProviderID, getOmronProviderID, getOuraProviderID } from "../../../helpers/providerIDs";

export const previewAccounts:ExternalAccount[] = [
        {
            id: 1,
            lastRefreshDate: "",
            provider: {
                category: "Device Manufacturer",
                id: getFitbitProviderID(),
                name: "Fitbit",
                logoUrl: "",
            } as ExternalAccountProvider,
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
            } as ExternalAccountProvider,
            status: "unauthorized"
        },
        {
            id: 3,
            lastRefreshDate: "",
            provider: {
                category: "Device Manufacturer",
                id: getDexcomProviderID(),
                name: "Dexcom",
                logoUrl: "",
            } as ExternalAccountProvider,
            status: "fetchComplete"
        },
        {
            id: 4,
            lastRefreshDate: "",
            provider: {
                category: "Device Manufacturer",
                id: getOmronProviderID(),
                name: "Omron",
                logoUrl: "",
            } as ExternalAccountProvider,
            status: "fetchComplete"
        },
        {
            id: 5,
            lastRefreshDate: "",
            provider: {
                category: "Device Manufacturer",
                id: getOuraProviderID(),
                name: "Oura",
                logoUrl: "",
            } as ExternalAccountProvider,
            status: "fetchComplete"
        }
    ];

export const previewSettings:DataCollectionSettings = {
    fitbitEnabled: true,
    garminEnabled: true,
    dexcomEnabled: true,
    ouraEnabled: true,
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
    sensorDataCollectionEndDate: "",
    omronEnabled: true,
    healthConnectEnabled: true,
    googleFitEnabled: true,
    appleHealthEnabled: true,
    appleHealthRecordsEnabled: true
};


export const previewHealthConnectStatus: HealthConnectStatus = {
    available: true,
    requestedQueryRules: [
        "Steps"
    ],
    enabledQueryRules: [],
    running: false,
    lastPrompted: ""
};

export const generateSampleParticipantInfo = () => {
    return {
        demographics: {
            postalCode: ""
        },
        customFields: {}
    } as ParticipantInfo;
}