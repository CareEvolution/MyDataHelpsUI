import MyDataHelps, { DataCollectionSettings, ExternalAccount } from '@careevolution/mydatahelps-js';
import React, { ReactElement, useEffect, useState } from 'react';
import ConnectDevicesIcon from '../../../assets/connectdevices.svg';
import FitbitIcon from '../../../assets/fitbit.svg';
import GarminIcon from '../../../assets/garmin.svg';
import { Action, Title } from '../../presentational';
import "./ConnectDevicesMenu.css"
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faChevronRight, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { getFitbitProviderID } from '../../../helpers/providerIDs';
import { set } from 'lodash';

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

            if(props.previewState == "Connected") {
                setDeviceExternalAccounts([
                    {
                        id:1,
                        lastRefreshDate: "",
                        provider: {
                            category: "Device Manufacturer",
                            id: 2,
                            name: "Fitbit",
                            logoUrl: "",
                        },
                        status: "fetchingData"
                    }
                ]);
            }

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
    if (!settings?.fitbitEnabled) {
        accountTypes = accountTypes.filter(a => a != "fitbit");
    }
    if (!settings?.garminEnabled) {
        accountTypes = accountTypes.filter(a => a != "garmin");
    }
    if (!settings?.queryableDeviceDataTypes.find(a => a.namespace == "AppleHealth")) {
        accountTypes = accountTypes.filter(a => a != "appleHealth");
    }
    if (!settings?.queryableDeviceDataTypes.find(a => a.namespace == "GoogleFit")) {
        accountTypes = accountTypes.filter(a => a != "googleFit");
    }

    function getFitbitMenuItem() {
        if (!accountTypes.includes("fitbit")) {
            return null;
        }
        return getExternalAccountMenuItem("Fitbit", <img src={FitbitIcon} />);
    }

    function getGarminMenuItem() {
        if (!accountTypes.includes("garmin")) {
            return null;
        }
        return getExternalAccountMenuItem("Garmin", <img src={GarminIcon} />);
    }

    function getExternalAccountMenuItem(providerName: string, icon: ReactElement) {
        let externalAccount = deviceExternalAccounts?.find(a => a.provider.name == providerName);
        let indicator = <div className="mdhui-connect-devices-menu-connect">Connect</div>;
        let action = () => {
            MyDataHelps.connectExternalAccount(getFitbitProviderID())
        };
        if (externalAccount) {
            if (externalAccount.status == "fetchComplete") {
                indicator = <>Connected</>;
                action = () => { };
            }
            if (externalAccount.status == "fetchingData") {
                indicator = <>Downloading Data&nbsp;&nbsp;<FontAwesomeSvgIcon icon={faRefresh} spin /></>;
                action = () => { };
            }
            if (externalAccount.status == "unauthorized") {
                indicator = <><div className="mdhui-connect-devices-menu-reconnect">Reconnect </div></>;
            }
        }

        return <Action icon={icon} onClick={action} className="mdhui-connect-devices-menu-device" indicator={indicator}>
            <Title order={4}>{providerName}</Title>
        </Action>;
    }

    return <div className="mdhui-connect-devices-menu">
        <img src={ConnectDevicesIcon} />
        <Title className="mdhui-connect-devices-menu-title" order={3}>Connect Devices</Title>
        <div className="mdhui-connect-devices-menu-text">Share xyour steps, sleep, heart rate and more from your apps or wearable devices.</div>
        <div className="mdhui-connect-devices-menu-inner">
            {getFitbitMenuItem()}
            {getGarminMenuItem()}
        </div>
    </div>
}