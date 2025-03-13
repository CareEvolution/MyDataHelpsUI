
import React from 'react';
import { Action, Button } from '../../presentational';
import MyDataHelps, { HealthConnectPhrStatus } from '@careevolution/mydatahelps-js';
import { language, useInitializeView } from '../../../helpers';
import { useInterval } from '../../../hooks';
import HealthConnectIcon from '../../presentational/HealthConnectIcon/HealthConnectIcon';

export interface HealthConnectPhrSyncProps {
    showWhen?: "anyPermissionsEnabled" | "noPermissionsEnabled";
    triggerSyncCompleteEvent?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "permissionsEnabled" | "noPermissionsEnabled" | "running";
}

export default function HealthConnectPhrSync(props: HealthConnectPhrSyncProps) {
    const [status, setStatus] = React.useState<HealthConnectPhrStatus | undefined>();

    function getPreviewStatus(): HealthConnectPhrStatus {
        const hasEnabledPermissions = props.previewState == "permissionsEnabled" || props.previewState == "running";
        return {
            available: true,
            running: props.previewState == "running",
            requestedPermissions: ["something"],
            enabledPermissions: hasEnabledPermissions ? ["read", "write"] : []
        }
    }

    async function refreshStatus() {
        if (props.previewState) {
            setStatus(getPreviewStatus());
            return;
        }

        let newStatus = await MyDataHelps.getHealthConnectPhrStatus();
        setStatus(newStatus);
        if (status?.running && !newStatus.running) {
            if (props.triggerSyncCompleteEvent) {
                MyDataHelps.triggerEvent({ type: "healthConnectPhrSyncComplete" });
            }
        }
    }

    useInitializeView(async () => {
        if (props.previewState) { refreshStatus(); }
        let deviceInfo = await MyDataHelps.getDeviceInfo();
        if (deviceInfo?.platform === "Android") {
            refreshStatus();
        }
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

    function getSubtitle() {
        if (status!.enabledPermissions.length > 0) {
            return status!.running ? language("syncing-data") : language("connected");
        }
        return language("health-connect-phr-sync-prompt");
    }

    function getIndicator() {
        if (status!.enabledPermissions.length > 0) {
            return <Button variant='subtle' onClick={() => MyDataHelps.showHealthConnectSettings()}>{language("settings")}</Button>;
        }
        return <Button onClick={() => MyDataHelps.showHealthConnectPhrPrompt()}>{language("connect")}</Button>;
    }

    return <Action innerRef={props.innerRef} titleIcon={<HealthConnectIcon width={15} style={{ marginRight: "8px" }} />}
        bottomBorder
        title={language("health-connect-phr-sync-title")}
        renderAs="div"
        subtitle={getSubtitle()}
        indicator={getIndicator()}>
    </Action>
}