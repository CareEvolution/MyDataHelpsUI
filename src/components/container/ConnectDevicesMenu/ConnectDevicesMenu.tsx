import MyDataHelps, { ConnectExternalAccountOptions, DataCollectionSettings, ExternalAccount, HealthConnectStatus } from '@careevolution/mydatahelps-js';
import React, { ReactNode, useEffect, useState } from 'react';
import { Action, TextBlock, Title } from '../../presentational';
import "./ConnectDevicesMenu.css"
import { getDexcomProviderID, getFitbitProviderID, getGarminProviderID, getOmronProviderID } from '../../../helpers/providerIDs';
import { previewAccounts, previewSettings } from './ConnectDevicesMenu.previewdata';
import language from '../../../helpers/language';
import FitnessWearable from '../../../assets/fitness-wearable.svg';
import FitbitLogo from '../../../assets/fitbit-logo.svg';
import GarminLogo from '../../../assets/garmin-logo.svg';
import DexcomLogo from '../../../assets/dexcom-logo.svg';
import AppleHealthLogo from '../../../assets/applehealth-logo.svg';
import GoogleFitLogo from '../../../assets/googlefit-logo.svg';
import HealthConnectLogo from '../../../assets/healthconnect-logo.svg';
import OmronLogo from '../../../assets/omron-logo.png';

export type DeviceAccountType = "Fitbit" | "Garmin" | "Dexcom" | "AppleHealth" | "GoogleFit" | "Omron" | "HealthConnect";

export interface ConnectDevicesMenuProps {
    innerRef?: React.Ref<HTMLDivElement>
    accountTypes?: DeviceAccountType[]
    title?: string
    text?: string
    previewState?: "iOS" | "Android" | "Web" | "ConnectedStates"
    headerVariant?: "large" | "medium"
    connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export default function (props: ConnectDevicesMenuProps) {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<DataCollectionSettings | null>(null);
    const [deviceExternalAccounts, setDeviceExternalAccounts] = useState<ExternalAccount[] | null>(null);
    const [platform, setPlatform] = useState<string | null>(null);
    const [healthConnectStatus, setHealthConnectStatus] = useState<HealthConnectStatus | null>(null);

    function initialize() {
        if (props.previewState) {
            setSettings(previewSettings);

            setDeviceExternalAccounts([]);
            if (props.previewState == "ConnectedStates") {
                setDeviceExternalAccounts(previewAccounts);
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
                if (deviceInfo) {
                    setPlatform(deviceInfo.platform);
                } else {
                    setPlatform("Web");
                }

                if (deviceInfo.platform == "Android") {
                    MyDataHelps.getHealthConnectStatus().then(status => {
                        setHealthConnectStatus(status);
                    });
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
        MyDataHelps.on("externalAccountSyncComplete", initialize);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
            MyDataHelps.off("externalAccountSyncComplete", initialize);
        }
    }, []);

    if (loading) {
        return null;
    }

    //Omron excluded by default
    let accountTypes = props.accountTypes || ["Fitbit", "Garmin", "Dexcom", "AppleHealth", "GoogleFit"];
    if (!settings?.fitbitEnabled) {
        accountTypes = accountTypes.filter(a => a != "Fitbit");
    }
    if (!settings?.garminEnabled) {
        accountTypes = accountTypes.filter(a => a != "Garmin");
    }
    if (!settings?.dexcomEnabled) {
        accountTypes = accountTypes.filter(a => a != "Dexcom");
    }
    if (!settings?.appleHealthEnabled) {
        accountTypes = accountTypes.filter(a => a != "AppleHealth");
    }
    if (!settings?.googleFitEnabled) {
        accountTypes = accountTypes.filter(a => a != "GoogleFit");
    }
    if (!settings?.healthConnectEnabled) {
        accountTypes = accountTypes.filter(a => a != "HealthConnect");
    }
    if (!accountTypes.length) {
        return null;
    }

    function onMenuItemClicked(action?: () => void) {
        if (props.previewState || !action) return;
        action();
    }

    function getFitbitMenuItem() {
        if (!accountTypes.includes("Fitbit")) {
            return null;
        }
        return getExternalAccountMenuItem("Fitbit", getFitbitProviderID(), <img src={FitbitLogo} />);
    }

    function getGarminMenuItem() {
        if (!accountTypes.includes("Garmin")) {
            return null;
        }
        return getExternalAccountMenuItem("Garmin", getGarminProviderID(), <img src={GarminLogo} />);
    }

    function getDexcomMenuItem() {
        if (!accountTypes.includes("Dexcom")) {
            return null;
        }
        return getExternalAccountMenuItem("Dexcom", getDexcomProviderID(), <img src={DexcomLogo} />);
    }

    function getOmronMenuItem() {
        if (!accountTypes.includes("Omron")) {
            return null;
        }
        return getExternalAccountMenuItem("Omron", getOmronProviderID(), <img src={OmronLogo} />);
    }

    function getExternalAccountMenuItem(providerName: string, providerID: number, image: ReactNode) {
        let externalAccount = deviceExternalAccounts?.find(a => a.provider.id == providerID);

        let indicator = <div className="mdhui-connect-devices-menu-connect">{language("connect")}</div>;
        let action: (() => void) | undefined = () => {
            MyDataHelps.connectExternalAccount(providerID, props.connectExternalAccountOptions || { openNewWindow: true });
        };

        if (externalAccount) {
            if (externalAccount.status == "fetchComplete") {
                indicator = <div className="mdhui-connect-devices-menu-connected">{language("connected")}</div>;
                action = undefined;
            }
            if (externalAccount.status == "fetchingData") {
                indicator = <div className="mdhui-connect-devices-menu-connected">{language("downloading-data-menu")}</div>;
                action = undefined;
            }
            if (externalAccount.status == "unauthorized") {
                indicator = <div className="mdhui-connect-devices-menu-reconnect">{language("reconnect")} </div>;
            }
        }

        return <div className="mdhui-connect-devices-menu-device">
            <Action onClick={() => onMenuItemClicked(action)} indicator={indicator}>
                <Title autosizeImage order={4} image={image}>{providerName}</Title>
            </Action>
        </div>;
    }

    function getAppleHealthMenuItem() {
        if (!accountTypes.includes("AppleHealth")) {
            return null;
        }

        return <AppleHealthMenuItem preview={!!props.previewState} platform={platform!} />;
    }

    function getGoogleFitMenuItem() {
        if (!accountTypes.includes("GoogleFit") || platform == "iOS") {
            return null;
        }

        let action = () => MyDataHelps.showGoogleFitSettings();
        let indicator = <div className="mdhui-connect-devices-menu-connect">{language("settings")}</div>;

        if (platform == "Web") {
            action = () => MyDataHelps.openExternalUrl("https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US");
            indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
        }

        return <div className="mdhui-connect-devices-menu-device">
            <Action onClick={() => onMenuItemClicked(action)} indicator={indicator}>
                <Title autosizeImage image={<img src={GoogleFitLogo} />} order={4}>Google Fit</Title>
            </Action>
        </div>;
    }

    function getHealthConnectMenuItem() {
        if (!accountTypes.includes("HealthConnect") || platform == "iOS") {
            return null;
        }

        let action = () => MyDataHelps.showHealthConnectPrompt();
        let indicator = <div className="mdhui-connect-devices-menu-connect">{language("connect")}</div>;

        if (platform == "Web") {
            action = () => MyDataHelps.openExternalUrl("https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US");
            indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
        }
        else {
            if (!healthConnectStatus || !healthConnectStatus.available || healthConnectStatus.requestedQueryRules.length == 0) {
                return null;
            }

            if (healthConnectStatus.requestedQueryRules.every(r => healthConnectStatus.enabledQueryRules.includes(r))) {
                action = () => MyDataHelps.showHealthConnectSettings();
                indicator = <div className="mdhui-connect-devices-menu-connect">{language("settings")}</div>;
            }
        }

        return <div className="mdhui-connect-devices-menu-device">
            <Action onClick={() => onMenuItemClicked(action)} indicator={indicator}>
                <Title autosizeImage image={<img src={HealthConnectLogo} />} order={4}>Health Connect</Title>
            </Action>
        </div>
    }

    let title = props.title || language("connect-devices-title");
    let text = props.text || language("connect-devices-text");
    let headerVariant = props.headerVariant || "large";

    return <div ref={props.innerRef} className="mdhui-connect-devices-menu">
        <Title autosizeImage defaultMargin order={headerVariant == "large" ? 2 : 3} image={<img src={FitnessWearable} />} imageAlignment={headerVariant == "large" ? "top" : "left"}>{title}</Title>
        <TextBlock>
            {text}
        </TextBlock>
        <div className="mdhui-connect-devices-menu-inner">
            {getFitbitMenuItem()}
            {getGarminMenuItem()}
            {getDexcomMenuItem()}
            {getAppleHealthMenuItem()}
            {getHealthConnectMenuItem()}
            {getGoogleFitMenuItem()}
            {getOmronMenuItem()}
        </div>
    </div>
}

interface AppleHealthMenuItemProps {
    preview: boolean;
    platform: string;
}

function AppleHealthMenuItem(props: AppleHealthMenuItemProps) {
    let [expanded, setExpanded] = useState(false);

    if (props.platform == "Android") {
        return null;
    }

    let action = () => setExpanded(!expanded);
    let indicator = <div className="mdhui-connect-devices-menu-connect">{language("how-to-enable")}</div>;

    if (props.platform == "Web") {
        action = () => {
            if (props.preview) return;
            MyDataHelps.openExternalUrl("https://apps.apple.com/us/app/mydatahelps/id1286789190");
        }
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
    }

    return <div className="mdhui-connect-devices-menu-device">
        <Action onClick={action} indicator={indicator}>
            <Title autosizeImage image={<img src={AppleHealthLogo} />} order={4}>Apple Health</Title>
        </Action>
        {expanded &&
            <div className="mdhui-connect-devices-menu-help">
                <p>{language("apple-health-troubleshooting-intro")}</p>
                <ol>
                    <li>{language("apple-health-troubleshooting-li-1")}</li>
                    <li>{language("apple-health-troubleshooting-li-2")}</li>
                    <li>{language("apple-health-troubleshooting-li-3")}</li>
                    <li>{language("apple-health-troubleshooting-li-4")}</li>
                    <li>{language("apple-health-troubleshooting-li-5")}</li>
                </ol>
            </div>
        }
    </div>;
}