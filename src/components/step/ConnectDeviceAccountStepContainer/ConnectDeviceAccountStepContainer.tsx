import React, { useState, useEffect } from "react";
import MyDataHelps, { StepConfiguration } from "@careevolution/mydatahelps-js";
import ConnectDeviceAccountStep from "../ConnectDeviceAccountStep";

export interface ConnectDeviceAccountStepContainerProps {
    deviceType?: string;
}

export default function (props: ConnectDeviceAccountStepContainerProps) {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [styles, setStyles] = useState<any>({});
    const [deviceType, setDeviceType] = useState<string>(
        props.deviceType || ''
    );
    const [loading, setLoading] = useState<boolean>(true);

    function onConnect() {
        const providerID = convertToProviderID(deviceType);
        MyDataHelps.connectExternalAccount(providerID, {
            openNewWindow: true,
        }).then(function () {
            MyDataHelps.completeStep(providerID);
        });
    }

    function isTest() {
        return (
            !MyDataHelps.baseUrl ||
            MyDataHelps.baseUrl.startsWith("https://mdhorg.ce.dev") ||
            MyDataHelps.baseUrl.startsWith("https://mydatahelps.dev")
        );
    }

    function convertToProviderID(deviceType: string) {
        switch (deviceType) {
            case "Fitbit":
                return isTest() ? 18 : 564; // 'Fitbit prod' or 'Fitbit'
            case "Omron":
                return isTest() ? 171 : 1466; // 'Omron prod' or 'Omron'
            case "Garmin":
                return isTest() ? 1384 : 6327; // 'Garmin QA' or 'Garmin'
            default:
                throw Error("Unsupported device type " + deviceType);
        }
    }

    async function completeStepIfConnected(deviceType: string) {
        const accounts = await MyDataHelps.getExternalAccounts();

        const providerID = convertToProviderID(deviceType);
        const connected = accounts.some(
            (acc) => acc.provider.id === providerID
        );
        if (connected) {
            MyDataHelps.completeStep(providerID);
        }

        setLoading(false);
    }

    useEffect(() => {
        // Get the step configuration from MyDataHelps.
        MyDataHelps.getStepConfiguration().then(function (
            config: StepConfiguration
        ) {
            if (!config) {

                setLoading(false);
                completeStepIfConnected(deviceType);

                return; // allows test mode to work
            }

            setTitle(config.properties.title);

            setText(config.properties.text);
            if (!config.properties.deviceType) {
                throw new Error("deviceType is required");
            }
            setDeviceType(config.properties.deviceType);

            setStyles(config.styles ?? {});

            completeStepIfConnected(config.properties.deviceType);
        });
    }, []);

    if (loading) return <></>;

    return (
        <ConnectDeviceAccountStep
            title={title}
            text={text}
            deviceType={deviceType}
            providerID={convertToProviderID(deviceType)}
            styles={styles}
            onConnect={onConnect}
        />
    );
}
