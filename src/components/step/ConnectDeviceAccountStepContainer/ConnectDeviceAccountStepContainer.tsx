import React, { useState, useEffect } from "react";
import MyDataHelps, { StepConfiguration } from "@careevolution/mydatahelps-js";
import ConnectDeviceAccountStep from "../ConnectDeviceAccountStep";

export default function () {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [styles, setStyles] = useState<any>({});
    const [deviceType, setDeviceType] = useState<string>("");
    const [providerName, setProviderName] = useState<string>("");
    const [connected, setConnected] = useState<boolean>();

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function (
            config: StepConfiguration
        ) {
            if (!config) return; // allows test mode to work

            setTitle(config.properties.title);
            setText(config.properties.text);
            setDeviceType(config.properties.deviceType);
            setProviderName(config.properties.providerName);
            setStyles(config.styles ?? {});
        });
    }, []);

    useEffect(() => {
        if (!providerName || connected) return;

        const interval = setInterval(async () => {
            const accounts = await MyDataHelps.getExternalAccounts();
            const containProviderName = accounts.some(
                (acc) => acc.provider.name === providerName
            );
            if (!connected && containProviderName) {
                setConnected(containProviderName);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [providerName, connected]);

    useEffect(() => {
        if (connected) {
            MyDataHelps.completeStep("");
        }
    }, [connected]);

    return (
        <ConnectDeviceAccountStep
            title={title}
            text={text}
            deviceType={deviceType}
            providerName={providerName}
            styles={styles}
        />
    );
}
