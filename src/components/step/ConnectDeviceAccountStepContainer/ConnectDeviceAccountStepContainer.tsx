import React, { useState, useEffect } from "react";
import MyDataHelps, { StepConfiguration } from "@careevolution/mydatahelps-js";
import ConnectDeviceAccountStep from "../ConnectDeviceAccountStep";
import { getFitbitProviderID, getGarminProviderID, getOmronProviderID, getOuraProviderID } from "../../../helpers/providerIDs";
import { deviceType } from "../../../helpers/deviceType";

/**
 * This is a survey step component that facilitates connecting a participant's device account.
 * This component is intended to run within a survey for participants to link their device accounts, enabling data synchronization and enhancing user engagement.
 * It ensures that participants can easily connect their device accounts during the survey flow, providing a straightforward step in the data collection process.
 */
export default function ConnectDeviceAccountStepContainer () {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [styles, setStyles] = useState<any>({});
    const [deviceType, setDeviceType] = useState<deviceType>();
    const [loading, setLoading] = useState<boolean>(true);

    function onConnect() {
        const providerID = convertToProviderID(deviceType!);
        MyDataHelps.connectExternalAccount(providerID, {
            openNewWindow: true,
        }).then(function () {
            MyDataHelps.completeStep(providerID);
        });
    }

    function convertToProviderID(deviceType: deviceType) {
        switch (deviceType) {
            case "Fitbit":
                return getFitbitProviderID();
            case "Omron":
                return getOmronProviderID();
            case "Garmin":
                return getGarminProviderID();
            case 'Oura':
                return getOuraProviderID();
        }
    }

    async function completeStepIfConnected(deviceType: deviceType) {
        try {
            const accounts = await MyDataHelps.getExternalAccounts();

            const providerID = convertToProviderID(deviceType);
            const connected = accounts.some(
                (acc) => acc.provider.id === providerID
            );
            if (connected) {
                MyDataHelps.completeStep(providerID);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Get the step configuration from MyDataHelps.
        MyDataHelps.getStepConfiguration().then(function (
            config: StepConfiguration
        ) {
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

    if (loading || !deviceType) return <></>;

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
