import MyDataHelps from '@careevolution/mydatahelps-js';
import React, { useEffect, useState } from 'react';
import language from '../../../helpers/language';
import { Action, Card } from '../../presentational';
import ConnectFitbit from '../ConnectFitbit';
import ConnectGarmin from '../ConnectGarmin';

export type DeviceConnectionType = "Fitbit" | "Garmin" | "AppleHealth" | "GoogleFit";

export interface ConnectDevicesProps {
    connectDevicesViewUrl?: string
    deviceConnectionTypes?: DeviceConnectionType[]
}

export default function (props: ConnectDevicesProps) {
    let [enabledTypes, setEnabledTypes] = useState<DeviceConnectionType[]>([]);

    useEffect(() => {
        MyDataHelps.getDataCollectionSettings().then(function (settings) {
            let newTypes: DeviceConnectionType[] = [];
            if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("Fitbit")) && settings.fitbitEnabled) {
                newTypes.push("Fitbit");
            }
            if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("Garmin")) && settings.garminEnabled) {
                newTypes.push("Garmin");
            }
            if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("AppleHealth")) && !!settings.queryableDeviceDataTypes.find(t => t.namespace == "AppleHealth")) {
                newTypes.push("AppleHealth");
            }
            if ((!props.deviceConnectionTypes || props.deviceConnectionTypes.includes("GoogleFit")) && !!settings.queryableDeviceDataTypes.find(t => t.namespace == "GoogleFit")) {
                newTypes.push("GoogleFit");
            }
            setEnabledTypes(newTypes);
        });
    }, []);

    //if there's just 1 enabled type, or there's nothing to drill into, we show all cards
    let expanded = enabledTypes.length == 1 || !props.connectDevicesViewUrl;

    if (expanded) {
        return <>
            {enabledTypes.includes("Fitbit") && <Card><ConnectFitbit /></Card>}
            {enabledTypes.includes("AppleHealth") && <Card><ConnectFitbit /></Card>}
            {enabledTypes.includes("GoogleFit") && <Card><ConnectFitbit /></Card>}
            {enabledTypes.includes("Garmin") && <Card><ConnectGarmin /></Card>}
        </>
    }
    else {
        return <Card>
            <Action title={language["connect-devices-title"]} subtitle={language["connect-devices-subtitle"]} onClick={() => MyDataHelps.openApplication(props.connectDevicesViewUrl!)} />
        </Card>
    }
}