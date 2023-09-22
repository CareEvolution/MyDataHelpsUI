import React, { useState, useEffect } from "react";
import MyDataHelps, { StepConfiguration } from "@careevolution/mydatahelps-js";
import ConnectDeviceAccountStep from "../ConnectDeviceAccountStep";

export interface ConnectDeviceAccountStepContainerProps {
    deviceType?: string;
    providerID?: number;
}

export default function (props: ConnectDeviceAccountStepContainerProps) {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [styles, setStyles] = useState<any>({});
    const [deviceType, setDeviceType] = useState<string>(
        props.deviceType ?? ""
    );
    const [providerID, setProviderID] = useState<number>(props.providerID ?? 0);

    function onConnect() {
        MyDataHelps.connectExternalAccount(providerID, {
            openNewWindow: true,
        }).then(function () {
            MyDataHelps.completeStep(providerID);
        });
    }

    function isProd() {
        return (
            window.location.host.endsWith(".com") ||
            window.location.host.endsWith(".org")
        );
    }

    useEffect(() => {
        // Get the step configuration from MyDataHelps.
        MyDataHelps.getStepConfiguration().then(function (
            config: StepConfiguration
        ) {
            if (!config) return; // allows test mode to work

            setTitle(config.properties.title);

            setText(config.properties.text);
            if (!config.properties.deviceType) {
                throw new Error("deviceType is required");
            }
            setDeviceType(config.properties.deviceType);

            switch (config.properties.deviceType) {
                case "Fitbit":
                    setProviderID(
                        isProd() ? 564 : 18 // 'Fitbit' or 'Fitbit prod'
                    );
                    break;
                case "Omron":
                    setProviderID(
                        isProd() ? 1466 : 171 // 'Omron' or 'Omron prod'
                    );
                    break;
                case "Garmin":
                    setProviderID(
                        isProd() ? 6327 : 1384 // 'Garmin' or 'Garmin QA'
                    );
                    break;
                default:
                    throw Error(
                        "Unsupported device type " +
                            config.properties.deviceType
                    );
            }

            setStyles(config.styles ?? {});
        });
    }, []);

    useEffect(() => {
        // Check connect status once providerID is set.
        if (!providerID) return;

        MyDataHelps.getExternalAccounts().then(function (accounts) {
            const connected = accounts.some(
                (acc) => acc.provider.id === providerID
            );
            if (connected) {
                MyDataHelps.completeStep(providerID);
            }
        });
    }, [providerID]);

    if (!providerID) return <></>;

    return (
        <ConnectDeviceAccountStep
            title={title}
            text={text}
            deviceType={deviceType}
            providerID={providerID}
            styles={styles}
            onConnect={onConnect}
        />
    );
}
