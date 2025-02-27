import MyDataHelps, { ConnectExternalAccountOptions, DataCollectionSettings, ExternalAccount, HealthConnectStatus, ParticipantInfo } from '@careevolution/mydatahelps-js';
import React, { ReactNode, useState } from 'react';
import { Action, TextBlock, Title } from '../../presentational';
import "./ConnectDevicesMenu.css"
import { getDexcomProviderID, getFitbitProviderID, getGarminProviderID, getOmronProviderID } from '../../../helpers/providerIDs';
import { generateSampleParticipantInfo, previewAccounts, previewHealthConnectStatus, previewSettings } from './ConnectDevicesMenu.previewdata';
import language from '../../../helpers/language';
import FitnessWearable from '../../../assets/fitness-wearable.svg';
import FitbitLogo from '../../../assets/fitbit-logo.svg';
import GarminLogo from '../../../assets/garmin-logo.svg';
import DexcomLogo from '../../../assets/dexcom-logo.svg';
import AppleHealthLogo from '../../../assets/applehealth-logo.svg';
import GoogleFitLogo from '../../../assets/googlefit-logo.svg';
import OmronLogo from '../../../assets/omron-logo.png';
import HealthConnectLogo from '../../../assets/healthconnect-logo.svg';
import { add, formatISO } from 'date-fns';
import { useInitializeView } from '../../../helpers';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export type DeviceAccountType = "Fitbit" | "Garmin" | "Dexcom" | "AppleHealth" | "GoogleFit" | "Omron" | "HealthConnect" | "Environmental";

export interface ConnectDevicesMenuProps {
    innerRef?: React.Ref<HTMLDivElement>
    accountTypes?: DeviceAccountType[]
    title?: string
    text?: string
    previewState?: "iOS" | "Android" | "Web" | "ConnectedStates"
    headerVariant?: "large" | "medium"
    connectExternalAccountOptions?: ConnectExternalAccountOptions
    enableAppleHealthSurveyName?: string
    enableGoogleFitSurveyName?: string
    postalCodeSurveyName?: string
}

interface ConnectDevicesMenuState {
    loading: boolean;
    settings: DataCollectionSettings | null;
    deviceExternalAccounts: ExternalAccount[] | null;
    platform: string | null;
    hasRecentAppleHealthData: boolean;
    healthConnectStatus: HealthConnectStatus | null;
    participantInfo: ParticipantInfo | null;
}

function useConnectDevicesMenuState(
    previewState?: "iOS" | "Android" | "Web" | "ConnectedStates",
    enableAppleHealthSurveyName?: string,
    enableGoogleFitSurveyName?: string): ConnectDevicesMenuState {
    const [state, setState] = useState<ConnectDevicesMenuState>({
        loading: true,
        settings: null,
        deviceExternalAccounts: null,
        platform: null,
        hasRecentAppleHealthData: false,
        healthConnectStatus: null,
        participantInfo: null
    });

    if (previewState) {
        let settings = { ...previewSettings };
        if (enableAppleHealthSurveyName || enableGoogleFitSurveyName) {
            settings.appleHealthEnabled = false;
            settings.googleFitEnabled = false;
        }

        let previewStateObject: ConnectDevicesMenuState = {
            loading: false,
            settings: settings,
            deviceExternalAccounts: [],
            platform: "Web",
            hasRecentAppleHealthData: false,
            healthConnectStatus: null,
            participantInfo: generateSampleParticipantInfo()
        }

        if (previewState == "ConnectedStates") {
            previewStateObject.deviceExternalAccounts = previewAccounts;
            previewStateObject.platform = "iOS";
            previewStateObject.hasRecentAppleHealthData = true;
            previewStateObject.participantInfo!.demographics.postalCode = "00000";
            previewStateObject.participantInfo!.customFields.homePostalCode = "00001";
            previewStateObject.participantInfo!.customFields.workPostalCode = "00002";
            previewStateObject.participantInfo!.customFields.vacationPostalCode = "00002";
        }
        else if (previewState == "iOS") {
            previewStateObject.platform = "iOS";
        } else if (previewState == "Android") {
            previewStateObject.platform = "Android";
        }

        if (previewState == "Android") {
            previewStateObject.healthConnectStatus = previewHealthConnectStatus;
        }
        return previewStateObject;
    }

    function initialize() {
        Promise.all([
            MyDataHelps.getDataCollectionSettings(),
            MyDataHelps.getExternalAccounts(),
            MyDataHelps.getDeviceInfo(),
            MyDataHelps.getParticipantInfo()
        ])
            .then(([settings, accounts, deviceInfo, participantInfo]) => {
                let newState: ConnectDevicesMenuState = {
                    loading: false,
                    settings: settings,
                    deviceExternalAccounts: accounts,
                    platform: deviceInfo ? deviceInfo.platform : "Web",
                    hasRecentAppleHealthData: false,
                    healthConnectStatus: null,
                    participantInfo: participantInfo
                };

                if (deviceInfo?.platform == "iOS") {
                    MyDataHelps.queryDeviceData({
                        namespace: "AppleHealth",
                        observedAfter: formatISO(add(new Date(), { days: -3 })),
                        limit: 1
                    }).then((result) => {
                        newState.hasRecentAppleHealthData = result.deviceDataPoints.length > 0;
                    }).finally(() => {
                        setState(newState);
                    });
                }
                else if (deviceInfo?.platform == "Android" && settings.healthConnectEnabled) {
                    MyDataHelps.getHealthConnectStatus().then(status => {
                        newState.healthConnectStatus = status;
                    }).finally(() => {
                        setState(newState);
                    });
                } else {
                    setState(newState);
                }
            });
    }

    useInitializeView(initialize, ["externalAccountSyncComplete"]);
    return state;
}

export default function (props: ConnectDevicesMenuProps) {
    const { loading, settings, deviceExternalAccounts, platform, hasRecentAppleHealthData, healthConnectStatus, participantInfo } =
        useConnectDevicesMenuState(props.previewState, props.enableAppleHealthSurveyName, props.enableGoogleFitSurveyName);

    if (loading) {
        return null;
    }

    let accountTypes = props.accountTypes || ["Fitbit", "Garmin", "Dexcom", "AppleHealth", "GoogleFit", "HealthConnect", "Environmental"];
    if (!settings?.fitbitEnabled) {
        accountTypes = accountTypes.filter(a => a != "Fitbit");
    }
    if (!settings?.garminEnabled) {
        accountTypes = accountTypes.filter(a => a != "Garmin");
    }
    if (!settings?.dexcomEnabled) {
        accountTypes = accountTypes.filter(a => a != "Dexcom");
    }
    if (platform == "Android" || (!settings!.appleHealthEnabled && !props.enableAppleHealthSurveyName)) {
        accountTypes = accountTypes.filter(a => a != "AppleHealth");
    }
    if (platform == "iOS" || (!settings!.googleFitEnabled && !props.enableGoogleFitSurveyName)) {
        accountTypes = accountTypes.filter(a => a != "GoogleFit");
    }
    if (platform == "iOS" || !settings?.healthConnectEnabled) {
        accountTypes = accountTypes.filter(a => a != "HealthConnect");
    }
    if ((!settings?.airQualityEnabled && !settings?.weatherEnabled) || !props.postalCodeSurveyName ) { 
        accountTypes = accountTypes.filter(a => a != "Environmental");
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
        return <ExternalAccountMenuItem preview={!!props.previewState}
            providerName={providerName}
            providerID={providerID}
            image={image}
            externalAccount={externalAccount}
            connectExternalAccountOptions={props.connectExternalAccountOptions} />;
    }

    function getAppleHealthMenuItem() {
        if (!accountTypes.includes("AppleHealth")) {
            return null;
        }

        return <AppleHealthMenuItem preview={!!props.previewState}
            platform={platform!}
            connected={hasRecentAppleHealthData}
            requested={settings!.appleHealthEnabled}
            enableAppleHealthSurvey={props.enableAppleHealthSurveyName} />;
    }


    function getGoogleFitMenuItem() {
        if (!accountTypes.includes("GoogleFit")) {
            return null;
        }

        return <GoogleFitMenuItem preview={!!props.previewState}
            platform={platform!}
            requested={settings!.googleFitEnabled}
            enableGoogleFitSurveyName={props.enableGoogleFitSurveyName} />;
    }

    function getHealthConnectMenuItem() {
        if (!accountTypes.includes("HealthConnect")) {
            return null;
        }

        return <HealthConnectMenuItem
            preview={!!props.previewState}
            platform={platform!}
            healthConnectStatus={healthConnectStatus} />;
    }

    function getEnvironmentalMenuItem() {
        if (!accountTypes.includes("Environmental")) {
            return null;
        }

        return <EnvironmentalMenuItem settings={settings!} participantInfo={participantInfo!} postalCodeSurveyName={props.postalCodeSurveyName!}/>
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
            {getEnvironmentalMenuItem()}
        </div>
    </div>
}

interface HealthConnectMenuItemProps {
    preview: boolean;
    platform: string;
    healthConnectStatus: HealthConnectStatus | null;
}

function HealthConnectMenuItem(props: HealthConnectMenuItemProps) {
    let action = () => {
        if (props.preview) return;
        MyDataHelps.showHealthConnectPrompt();
    }
    let indicator = <div className="mdhui-connect-devices-menu-connect">{language("connect")}</div>;

    if (props.platform == "Web") {
        action = () => {
            if (props.preview) return;
            MyDataHelps.openExternalUrl("https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US");
        }
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
    }
    else {
        if (!props.healthConnectStatus || !props.healthConnectStatus.available || props.healthConnectStatus.requestedQueryRules.length == 0) {
            return null;
        }

        if (props.healthConnectStatus.requestedQueryRules.every(r => props.healthConnectStatus?.enabledQueryRules.includes(r))) {
            action = () => {
                if (props.preview) return;
                MyDataHelps.showHealthConnectSettings();
            }
            indicator = <div className="mdhui-connect-devices-menu-connect">{language("settings")}</div>;
        }
    }

    return <div className="mdhui-connect-devices-menu-device">
        <Action onClick={action} indicator={indicator}>
            <Title autosizeImage image={<img src={HealthConnectLogo} />} order={4}>Health Connect</Title>
        </Action>
    </div>
}

interface ExternalAccountMenuItemProps {
    preview: boolean;
    providerName: string;
    providerID: number;
    image: ReactNode;
    externalAccount?: ExternalAccount;
    connectExternalAccountOptions?: ConnectExternalAccountOptions;
}

function ExternalAccountMenuItem(props: ExternalAccountMenuItemProps) {
    let indicator = <div className="mdhui-connect-devices-menu-connect">{language("connect")}</div>;
    let action: (() => void) | undefined = () => {
        if (props.preview) return;
        MyDataHelps.connectExternalAccount(props.providerID, props.connectExternalAccountOptions || { openNewWindow: true });
    };

    if (props.externalAccount) {
        if (props.externalAccount.status == "fetchComplete") {
            indicator = <div className="mdhui-connect-devices-menu-connected">{language("connected")}</div>;
            action = undefined;
        }
        else if (props.externalAccount.status == "fetchingData") {
            indicator = <div className="mdhui-connect-devices-menu-connected">{language("downloading-data-menu")}</div>;
            action = undefined;
        }
        else if (props.externalAccount.status == "unauthorized") {
            indicator = <div className="mdhui-connect-devices-menu-reconnect">{language("reconnect")} </div>;
        }
    }

    return <div className="mdhui-connect-devices-menu-device">
        <Action onClick={action} indicator={indicator}>
            <Title autosizeImage order={4} image={props.image}>{props.providerName}</Title>
        </Action>
    </div>;
}

interface GoogleFitMenuItemProps {
    preview: boolean;
    requested: boolean;
    platform: string;
    enableGoogleFitSurveyName?: string;
}

function GoogleFitMenuItem(props: GoogleFitMenuItemProps) {
    let action: () => void;
    let indicator: React.JSX.Element;
    if (props.platform == "Web") {
        action = () => {
            if (props.preview) return;
            MyDataHelps.openExternalUrl("https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US");
        };
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
    } else if (props.enableGoogleFitSurveyName && !props.requested) {
        action = () => {
            if (props.preview) return;
            MyDataHelps.startSurvey(props.enableGoogleFitSurveyName!);
        };
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("connect")}</div>;
    } else {
        action = () => {
            if (props.preview) return;
            MyDataHelps.showGoogleFitSettings();
        };
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("settings")}</div>;
    }

    return <div className="mdhui-connect-devices-menu-device">
        <Action onClick={action} indicator={indicator}>
            <Title autosizeImage image={<img src={GoogleFitLogo} />} order={4}>Google Fit</Title>
        </Action>
    </div>;
}

interface AppleHealthMenuItemProps {
    preview: boolean;
    platform: string;
    connected?: boolean;
    requested: boolean;
    enableAppleHealthSurvey?: string;
}

function AppleHealthMenuItem(props: AppleHealthMenuItemProps) {
    let [expanded, setExpanded] = useState(false);

    let action: () => void;
    let indicator: React.JSX.Element;
    if (props.platform == "Web") {
        action = () => {
            if (props.preview) return;
            MyDataHelps.openExternalUrl("https://apps.apple.com/us/app/mydatahelps/id1286789190");
        }
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("download-mydatahelps")}</div>;
    }
    else if (props.enableAppleHealthSurvey && !props.requested) {
        action = () => {
            if (props.preview) return;
            MyDataHelps.startSurvey(props.enableAppleHealthSurvey!);
        }
        indicator = <div className="mdhui-connect-devices-menu-connect">{language("connect")}</div>;
    }
    else {
        action = () => setExpanded(!expanded);
        indicator = <div className="mdhui-connect-devices-menu-connect">{language(props.connected ? "connected" : "how-to-enable")}</div>;
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

function EnvironmentalMenuItem(props: { settings: DataCollectionSettings, participantInfo: ParticipantInfo, postalCodeSurveyName: string }){
    let action = () => {
        MyDataHelps.startSurvey(props.postalCodeSurveyName);
    }

    const postalCodeCustomFields = Object.keys(props.participantInfo ? props.participantInfo.customFields : {}).filter( (k) => k.endsWith('PostalCode'));
    const postalCodes = [...postalCodeCustomFields.map((cf) => props.participantInfo?.customFields[cf]), props.participantInfo?.demographics.postalCode];
    var postalCode = postalCodes.filter((p) => !!p).slice(0,3).join(', ');
    if(postalCodes.length > 3) {
        postalCode = postalCode + ", ...";
    }

    const indicator = postalCode ? 
        <div className="mdhui-connect-devices-menu-connect">{postalCode}</div> :
        <div className="mdhui-connect-devices-menu-connect">{language("setup")}</div>;

    const titleBits = [];
    if(props.settings?.airQualityEnabled) {
        titleBits.push('Air Quality');
    }
    if(props.settings?.weatherEnabled) {
        titleBits.push('Weather');
    }
    const title = titleBits.join(" / ");

    return (
        <div className="mdhui-connect-devices-menu-device">
            <Action onClick={action} indicator={indicator}>
                <Title autosizeImage image={<FontAwesomeSvgIcon icon={faSun} color={"yellow"}/>} order={4}>{title}</Title>
            </Action>
        </div>
    );
}