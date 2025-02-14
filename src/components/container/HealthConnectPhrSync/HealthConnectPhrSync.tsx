
import React from 'react';
import { Action, Button } from '../../presentational';
import HealthConnectLogo from '../../../assets/healthconnect-logo.svg';
import MyDataHelps, { HealthConnectPhrStatus } from '@careevolution/mydatahelps-js';
import { language, useInitializeView } from '../../../helpers';
import { useInterval } from '../../../hooks';

export interface HealthConnectPhrSyncProps {
    showWhen?: "anyPermissionsEnabled" | "noPermissionsEnabled";
    triggerSyncCompleteEvent?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "permissionsEnabled" | "noPermissionsEnabled" | "running";
}

export default function HealthConnectPhrSync(props: HealthConnectPhrSyncProps) {
    let [status, setStatus] = React.useState<HealthConnectPhrStatus | undefined>();

    function refreshStatus() {
        if (props.previewState) {
            let hasEnabledPermissions = props.previewState == "permissionsEnabled" || props.previewState == "running";
            setStatus({ available: true, running: props.previewState == "running", requestedPermissions: ["something"], enabledPermissions: hasEnabledPermissions ? ["read", "write"] : [] });
            return;
        }

        MyDataHelps.getHealthConnectPhrStatus().then(function (newStatus) {
            setStatus(newStatus);
            if (status?.running && !newStatus.running) {
                if (props.triggerSyncCompleteEvent) {
                    MyDataHelps.triggerEvent({ type: "healthConnectPhrSyncComplete" });
                }
            }
        });
    }

    useInitializeView(() => {
        if (props.previewState) { refreshStatus(); }
        MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
            if (deviceInfo?.platform === "Android") {
                refreshStatus();
            }
        });
    });

    useInterval(() => {
        refreshStatus();
    }, (status?.running) ? 3000 : null);

    if (!status || !status?.available) {
        return null;
    }

    if (props.showWhen === "anyPermissionsEnabled" && status.enabledPermissions.length == 0) {
        return null;
    }

    if (props.showWhen === "noPermissionsEnabled" && status.enabledPermissions.length > 0) {
        return null;
    }

    let subtitle = language("health-connect-phr-sync-prompt");
    let indicator = <Button onClick={() => MyDataHelps.showHealthConnectPhrPrompt()}>{language("connect")}</Button>;

    if (status.enabledPermissions.length > 0) {
        subtitle = status.running ? language("syncing-data") : language("connected");
        indicator = <Button variant='subtle' onClick={() => MyDataHelps.showHealthConnectSettings()}>{language("settings")}</Button>;
    }

    return <Action innerRef={props.innerRef} titleIcon={<img width={15} style={{ marginRight: "8px" }} src={HealthConnectLogo} />}
        bottomBorder
        title={language("health-connect-phr-sync-title")}
        renderAs="div"
        subtitle={subtitle}
        indicator={indicator}>
    </Action>
}