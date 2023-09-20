import React, { useState, useEffect } from "react";
import MyDataHelps, { StepConfiguration } from "@careevolution/mydatahelps-js";
import ConnectDeviceAccountStep from "../ConnectDeviceAccountStep";

export interface ConnectDeviceAccountStepContainerProps {
    designMode?: boolean;
}

export default function (props: ConnectDeviceAccountStepContainerProps) {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [styles, setStyles] = useState<any>({});
    const [deviceType, setDeviceType] = useState<string>("");
    const [providerID, setProviderID] = useState<number>();
    const [connected, setConnected] = useState<boolean>();

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

            if (!config.properties.providerID) {
                throw new Error("providerID is required");
            }
            setProviderID(config.properties.providerID);

            setStyles(config.styles ?? {});
        });
    }, []);

    useEffect(() => {
        // Disable auto polling in design mode due to absent token.
        if (props.designMode) return;

        // Start polling for connected status after a providerID is selected.
        if (!providerID || connected) return;

        const interval = setInterval(async () => {
            const accounts = await MyDataHelps.getExternalAccounts();
            const containProvider = accounts.some(
                (acc) => acc.provider.id === providerID
            );
            if (!connected && containProvider) {
                setConnected(containProvider);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [providerID, connected]);

    useEffect(() => {
        // Complete the step when connected.
        if (connected) {
            console.log("Connected to provider ID ", providerID);
            MyDataHelps.completeStep("");
        }
    }, [connected]);

    if (!providerID) return <></>;

    return (
        <ConnectDeviceAccountStep
            title={title}
            text={text}
            deviceType={deviceType}
            providerID={providerID}
            styles={styles}
        />
    )
}
