import MyDataHelps, { DataCollectionSettings, ExternalAccount } from '@careevolution/mydatahelps-js';
import React, { ReactElement, useEffect, useState } from 'react';
import ConnectDevicesIcon from '../../../assets/connectdevices.svg';
import FitbitIcon from '../../../assets/fitbit.svg';
import GarminIcon from '../../../assets/garmin.svg';
import AppleHealthIcon from '../../../assets/appleHealth.svg';
import GoogleFitIcon from '../../../assets/googleFit.svg';
import OmronIcon from '../../../assets/omron.png';
import { Action, Title } from '../../presentational';
import "./ConnectDevicesMenu.css"
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { getFitbitProviderID, getGarminProviderID, getOmronProviderID } from '../../../helpers/providerIDs';

export type DeviceAccountType = "Fitbit" | "Garmin" | "AppleHealth" | "GoogleFit" | "Omron";

export interface ConnectDevicesMenuProps {
    innerRef?: React.Ref<HTMLDivElement>
    accountTypes?: DeviceAccountType[]
    title?: string
    text?: string
    previewState?: "iOS" | "Android" | "Web" | "ConnectedStates"
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

            if (props.previewState == "ConnectedStates") {
                setDeviceExternalAccounts([
                    {
                        id: 1,
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
            setPlatform("Web");
            if (props.previewState == "iOS") {
                setPlatform("iOS");
            } else if (props.previewState == "Android") {
                setPlatform("Android");
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
    let accountTypes = props.accountTypes || ["Fitbit", "Garmin", "AppleHealth", "GoogleFit"];
    if (!settings?.fitbitEnabled) {
        accountTypes = accountTypes.filter(a => a != "Fitbit");
    }
    if (!settings?.garminEnabled) {
        accountTypes = accountTypes.filter(a => a != "Garmin");
    }
    if (!settings?.queryableDeviceDataTypes.find(a => a.namespace == "AppleHealth")) {
        accountTypes = accountTypes.filter(a => a != "AppleHealth");
    }
    if (!settings?.queryableDeviceDataTypes.find(a => a.namespace == "GoogleFit")) {
        accountTypes = accountTypes.filter(a => a != "GoogleFit");
    }

    function getFitbitMenuItem() {
        if (!accountTypes.includes("Fitbit")) {
            return null;
        }
        return getExternalAccountMenuItem("Fitbit", getFitbitProviderID(), <img src={FitbitIcon} />);
    }

    function getGarminMenuItem() {
        if (!accountTypes.includes("Garmin")) {
            return null;
        }
        return getExternalAccountMenuItem("Garmin", getGarminProviderID(), <img src={GarminIcon} />);
    }

    function getOmronMenuItem() {
        if (!accountTypes.includes("Omron")) {
            return null;
        }
        return getExternalAccountMenuItem("Omron", getOmronProviderID(), <img style={{ borderRadius: "2px" }} src={OmronIcon} />);
    }

    function getExternalAccountMenuItem(providerName: string, providerID: number, icon: ReactElement) {
        let externalAccount = deviceExternalAccounts?.find(a => a.provider.id == providerID);

        let indicator = <div className="mdhui-connect-devices-menu-connect">Connect</div>;
        let action = () => {
            MyDataHelps.connectExternalAccount(providerID)
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

        return <div className="mdhui-connect-devices-menu-device">
            <Action icon={icon} onClick={action} indicator={indicator}>
                <Title order={4}>{providerName}</Title>
            </Action>
        </div>;
    }

    function getAppleHealthMenuItem() {
        if (!accountTypes.includes("AppleHealth")) {
            return null;
        }

        return <AppleHealthMenuItem platform={platform!} />;
    }

    function getGoogleFitMenuItem() {
        if (!accountTypes.includes("GoogleFit") || platform == "iOS") {
            return null;
        }

        let action = () => MyDataHelps.showGoogleFitSettings();
        let indicator = <div className="mdhui-connect-devices-menu-connect">Settings</div>;

        if (platform == "Web") {
            action = () => MyDataHelps.openExternalUrl("https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US");
            indicator = <div className="mdhui-connect-devices-menu-connect">Download MyDataHelps</div>;
        }

        return <div className="mdhui-connect-devices-menu-device">
            <Action icon={<img src={GoogleFitIcon} />} onClick={action} indicator={indicator}>
                <Title order={4}>Google Fit</Title>
            </Action>
        </div>;
    }

    return <div className="mdhui-connect-devices-menu">
        <img src={ConnectDevicesIcon} />
        <Title className="mdhui-connect-devices-menu-title" order={3}>Connect Devices</Title>
        <div className="mdhui-connect-devices-menu-text">Share your steps, sleep, heart rate and more from your apps or wearable devices.</div>
        <div className="mdhui-connect-devices-menu-inner">
            {getFitbitMenuItem()}
            {getAppleHealthMenuItem()}
            {getGarminMenuItem()}
            {getGoogleFitMenuItem()}
            {getOmronMenuItem()}
        </div>
    </div>
}

interface AppleHealthMenuItemProps {
    platform: string
}

function AppleHealthMenuItem(props: AppleHealthMenuItemProps) {
    let [expanded, setExpanded] = useState(false);

    if (props.platform == "Android") {
        return null;
    }

    let action = () => setExpanded(!expanded);
    let indicator = <div className="mdhui-connect-devices-menu-connect">Help</div>;

    if (props.platform == "Web") {
        action = () => MyDataHelps.openExternalUrl("https://apps.apple.com/us/app/mydatahelps/id1286789190");
        indicator = <div className="mdhui-connect-devices-menu-connect">Download MyDataHelps</div>;
    }

    return <div className="mdhui-connect-devices-menu-device">
        <Action icon={<img src={AppleHealthIcon} />} onClick={action} indicator={indicator}>
            <Title order={4}>Apple Health</Title>
        </Action>
        {expanded &&
            <div className="mdhui-connect-devices-menu-help">
                <p>If you did not approve or have disabled sharing of your Apple Health data and would like to enable it, follow these steps:</p>
                <ol>
                    <li>Open the "Settings" app</li>
                    <li>Select "Privacy"</li>
                    <li>Select "Health"</li>
                    <li>Select "MyDataHelps"</li>
                    <li>Enable the categories of data you would like to share</li>
                </ol>
            </div>
        }
    </div>;
}