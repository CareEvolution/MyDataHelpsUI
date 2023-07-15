import MyDataHelps, { DataCollectionSettings } from '@careevolution/mydatahelps-js';
import React, { useEffect, useState } from 'react';
import language from '../../../helpers/language';
import { Action, Card } from '../../presentational';
import ConnectAppleHealth from '../ConnectAppleHealth';
import ConnectFitbit from '../ConnectFitbit';
import ConnectGarmin from '../ConnectGarmin';
import ConnectGoogleFit from '../ConnectGoogleFit';

export type DeviceConnectionType = "Fitbit" | "Garmin" | "AppleHealth" | "GoogleFit";

export interface ConnectDevicesProps {
    connectDevicesViewUrl?: string
    deviceConnectionTypes?: DeviceConnectionType[]
    previewState?: "AllDevices" | "FitbitOnly"
    previewDevicePlatform?: string
}

export default function (props: ConnectDevicesProps) {
    let [dataCollectionSettings, setDataCollectionSettings] = useState<DataCollectionSettings | null>(null);

    useEffect(() => {
        if (props.previewState == "FitbitOnly") {
            setDataCollectionSettings({
                fitbitEnabled: true,
                garminEnabled: false,
                queryableDeviceDataTypes: [],
                ehrEnabled: false,
                airQualityEnabled: false,
                weatherEnabled: false,
                sensorDataCollectionEndDate: ""
            });
        } else if (props.previewState == "AllDevices") {
            setDataCollectionSettings({
                fitbitEnabled: true,
                garminEnabled: true,
                queryableDeviceDataTypes: [
                    {
                        namespace: "AppleHealth",
                        type: "Something"
                    }, {
                        namespace: "GoogleFit",
                        type: "Something"
                    }
                ],
                ehrEnabled: false,
                airQualityEnabled: false,
                weatherEnabled: false,
                sensorDataCollectionEndDate: ""
            });
        } else {
            MyDataHelps.getDataCollectionSettings().then(function (settings) {
                setDataCollectionSettings(settings);
            });
        }
    }, []);

    if (!dataCollectionSettings) {
        return null;
    }

    let enabledTypes: DeviceConnectionType[] = [];
    if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("Fitbit")) && dataCollectionSettings.fitbitEnabled) {
        enabledTypes.push("Fitbit");
    }
    if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("Garmin")) && dataCollectionSettings.garminEnabled) {
        enabledTypes.push("Garmin");
    }
    if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("AppleHealth")) && !!dataCollectionSettings.queryableDeviceDataTypes.find(t => t.namespace == "AppleHealth")) {
        enabledTypes.push("AppleHealth");
    }
    if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("GoogleFit")) && !!dataCollectionSettings.queryableDeviceDataTypes.find(t => t.namespace == "GoogleFit")) {
        enabledTypes.push("GoogleFit");
    }


    //if there's just 1 enabled type, or there's nothing to drill into, we show them individually
    let expanded = enabledTypes.length == 1 || !props.connectDevicesViewUrl;
    if (expanded) {
        return <>
            {enabledTypes.includes("Fitbit") && <Card><ConnectFitbit previewState={props.previewState ? "notConnected" : undefined} /></Card>}
            {enabledTypes.includes("AppleHealth") && <Card><ConnectAppleHealth previewDevicePlatform={props.previewDevicePlatform} /></Card>}
            {enabledTypes.includes("Garmin") && <Card><ConnectGarmin previewState={props.previewState ? "notConnected" : undefined} /></Card>}
            {enabledTypes.includes("GoogleFit") && <Card><ConnectGoogleFit previewDevicePlatform={props.previewDevicePlatform} /></Card>}
        </>
    }
    else {
        return <Card>
            <Action title={language["connect-devices-title"]} subtitle={language["connect-devices-subtitle"]} onClick={() => MyDataHelps.openApplication(props.connectDevicesViewUrl!)} />
        </Card>
    }
}