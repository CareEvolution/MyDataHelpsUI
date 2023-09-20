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
    const [deviceType, setDeviceType] = useState<string>(props.deviceType ?? "");
    const [providerID, setProviderID] = useState<number>(props.providerID ?? 0);

    function onConnect() {
        MyDataHelps.connectExternalAccount(providerID, {
            openNewWindow: true,
        }).then(function() {
            console.log("Completing step. Connected to provider ID", providerID);
            MyDataHelps.completeStep("")
        });
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

            if (!config.properties.providerID) {
                throw new Error("providerID is required");
            }

            setProviderID(config.properties.providerID as number);

            setStyles(config.styles ?? {});
        })
    }, []);

    useEffect(() => {
        // Check connect status once providerID is set.
        if (!providerID) return;

        MyDataHelps.getExternalAccounts().then(function(accounts) {
            const connected = accounts.some((acc) => acc.provider.id === providerID);
            if (connected) {
                console.log("Completing step. Already connected to provider ID", providerID);
                MyDataHelps.completeStep("");
            }
        })
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
