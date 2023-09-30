import MyDataHelps, { DataCollectionSettings, ExternalAccount } from '@careevolution/mydatahelps-js';
import React, { useEffect, useState } from 'react';
import ConnectDevicesIcon from '../../../assets/connectdevices.svg';
import FitbitIcon from '../../../assets/fitbit.svg';
import { Action, TextBlock, Title } from '../../presentational';
import "./ConnectDevicesMenu.css"

export type DeviceAccountType = "fitbit" | "garmin" | "appleHealth" | "googleFit" | "omron";

export interface ConnectDevicesMenuProps {
    innerRef?: React.Ref<HTMLDivElement>
    accountTypes?: DeviceAccountType[]
    title?: string
    text?: string
    enableAppleHealthSurvey?: string
    enableGoogleFitSurvey?: string
    previewState?: "iOS" | "Android" | "Web" | "Connected" | "Error"
}

export default function (props: ConnectDevicesMenuProps) {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<DataCollectionSettings | null>(null);
    const [deviceExternalAccounts, setDeviceExternalAccounts] = useState<ExternalAccount[] | null>(null);
    const [platform, setPlatform] = useState<string | null>(null);

    function initialize() {
        if (props.previewState) {
            setSettings({
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
            });
            setDeviceExternalAccounts([]);
            if (props.previewState == "iOS") {
                setPlatform("iOS");
            }
            setLoading(false);
            return;
        }

        Promise.all([MyDataHelps.getDataCollectionSettings(), MyDataHelps.getExternalAccounts(), MyDataHelps.getDeviceInfo()])
            .then(([settings, accounts, deviceInfo]) => {
                setSettings(settings);
                setDeviceExternalAccounts(accounts);
                setPlatform(deviceInfo.platform);
                setLoading(false);
            });
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
        }
    }, []);

    if (loading) {
        return null;
    }

    //Omron excluded by default
    let accountTypes = props.accountTypes || ["fitbit", "garmin", "appleHealth", "googleFit"];
    if(!settings?.fitbitEnabled){
        accountTypes = accountTypes.filter(a => a != "fitbit");
    }
    if(!settings?.garminEnabled){
        accountTypes = accountTypes.filter(a => a != "garmin");
    }
    if(!settings?.queryableDeviceDataTypes.find(a => a.namespace == "AppleHealth")){
        accountTypes = accountTypes.filter(a => a != "appleHealth");
    }
    if(!settings?.queryableDeviceDataTypes.find(a => a.namespace == "GoogleFit")){
        accountTypes = accountTypes.filter(a => a != "googleFit");
    }

    return <div className="mdhui-connect-devices-menu">
        <img src={ConnectDevicesIcon} />
        <Title className="mdhui-connect-devices-menu-title" order={3}>Connect Devices</Title>
        <div className="mdhui-connect-devices-menu-text">Share your steps, sleep, heart rate and more from your apps or wearable devices.</div>
        <div className="mdhui-connect-devices-menu-inner">
            <Action icon={<img src={FitbitIcon} />} onClick={() => { }} className="mdhui-connect-devices-menu-device" indicator={<div className="mdhui-connect-device-action">Add Account</div>}>
                <Title order={4}>Fitbit</Title>
            </Action>
        </div>
    </div>
}