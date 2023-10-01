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
import { previewAccounts, previewSettings } from './ConnectDevicesMenu.previewdata';
import language from '../../../helpers/language';

export type DeviceAccountType = "Fitbit" | "Garmin" | "AppleHealth" | "GoogleFit" | "Omron";

export interface ConnectDevicesMenuProps {
    innerRef?: React.Ref<HTMLDivElement>
    accountTypes?: DeviceAccountType[]
    title?: string
    text?: string
    previewState?: "iOS" | "Android" | "Web" | "ConnectedStates"
    headerVariant?: "large" | "medium"
}

export default function (props: ConnectDevicesMenuProps) {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<DataCollectionSettings | null>(null);
    const [deviceExternalAccounts, setDeviceExternalAccounts] = useState<ExternalAccount[] | null>(null);
    const [platform, setPlatform] = useState<string | null>(null);

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
    if(!accountTypes.length){
        return null;
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

        let indicator = <div className="mdhui-connect-devices-menu-connect">{language("connect")}</div>;
        let action: (() => void) | undefined = () => {
            MyDataHelps.connectExternalAccount(providerID)
        };

        if (externalAccount) {
            if (externalAccount.status == "fetchComplete" || externalAccount.status == "fetchingData") {
                indicator = <div className="mdhui-connect-devices-menu-connected">{language("connected")}</div>;
                action = undefined;
            }
            if (externalAccount.status == "fetchingData") {
                indicator = <div className="mdhui-connect-devices-menu-connected">{language("downloading-data-menu")}&nbsp;&nbsp;<FontAwesomeSvgIcon icon={faRefresh} spin /></div>;
                action = undefined;
            }
            if (externalAccount.status == "unauthorized") {
                indicator = <div className="mdhui-connect-devices-menu-reconnect">{language("reconnect")} </div>;
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
        let indicator = <div className="mdhui-connect-devices-menu-connect">{language("settings")}</div>;

        if (platform == "Web") {
            action = () => MyDataHelps.openExternalUrl("https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US");
            indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
        }

        return <div className="mdhui-connect-devices-menu-device">
            <Action icon={<img src={GoogleFitIcon} />} onClick={action} indicator={indicator}>
                <Title order={4}>Google Fit</Title>
            </Action>
        </div>;
    }

    let title = props.title || language("connect-devices-title");
    let text = props.text || language("connect-devices-text");
    let headerVariant = props.headerVariant || "large";
    let headerClasses = ["mdhui-connect-devices-menu-header", `mdhui-connect-devices-menu-header-${headerVariant}`];

    return <div ref={props.innerRef} className="mdhui-connect-devices-menu">
        <div className={headerClasses.join(" ")}>
            <div className="mdhui-connect-devices-menu-header-flex">
                <img src={ConnectDevicesIcon} />
                <Title className="mdhui-connect-devices-menu-title" order={headerVariant == "large" ? 2 : 3}>{title}</Title>
            </div>
            <div className="mdhui-connect-devices-menu-text">{text}</div>
        </div>
        <div className="mdhui-connect-devices-menu-inner">
            {getFitbitMenuItem()}
            {getGarminMenuItem()}
            {getAppleHealthMenuItem()}
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
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
    }

    return <div className="mdhui-connect-devices-menu-device">
        <Action icon={<img src={AppleHealthIcon} />} onClick={action} indicator={indicator}>
            <Title order={4}>Apple Health</Title>
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