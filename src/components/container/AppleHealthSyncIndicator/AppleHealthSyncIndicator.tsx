import React, { useEffect, useRef, useState } from "react";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { language, useInitializeView } from "../../../helpers";
import { getRelativeDateString } from "../../../helpers/date-helpers";
import { useInterval } from "../../../hooks";
import LoadingIndicator from "../../presentational/LoadingIndicator";
import appleHealthLogo from "../../../assets/applehealth-logo.svg";
import "./AppleHealthSyncIndicator.css";

export type AppleHealthSyncIndicatorPreviewState = "syncing" | "syncComplete" | "notSyncing";

export interface AppleHealthSyncIndicatorProps {
    previewState?: AppleHealthSyncIndicatorPreviewState;
    hideMessage?: boolean;
    /** Keeps the indicator visible when not syncing, showing "Sync complete" briefly after a full sync and then the last full sync time. */
    alwaysDisplay?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

interface SyncStatus {
    syncing: boolean;
    lastSyncCompletionDate?: string;
}

const syncCompleteDisplayMs = 5000;

/**
 * Shows a small indicator while the iOS app is syncing Apple Health data, and renders nothing otherwise
 * unless alwaysDisplay is set. Renders nothing on Android and web, where there is no Apple Health sync.
 */
export default function AppleHealthSyncIndicator(props: AppleHealthSyncIndicatorProps) {
    const [status, setStatus] = useState<SyncStatus>();
    const [justCompleted, setJustCompleted] = useState<boolean>(false);
    const wasSyncing = useRef<boolean>(false);
    // The last full sync date when the current syncing stretch was first observed.
    const lastSyncCompletionDateAtSyncStart = useRef<string>();

    function applyStatus(newStatus: SyncStatus | undefined) {
        const syncing = !!newStatus?.syncing;
        if (wasSyncing.current && !syncing) {
            // A session can end canceled or partial. Only call it complete if the last full sync date moved forward.
            const previous = lastSyncCompletionDateAtSyncStart.current;
            const current = newStatus?.lastSyncCompletionDate;
            setJustCompleted(!!current && (!previous || new Date(current) > new Date(previous)));
        } else if (syncing) {
            if (!wasSyncing.current) {
                lastSyncCompletionDateAtSyncStart.current = newStatus?.lastSyncCompletionDate;
            }
            setJustCompleted(false);
        }
        wasSyncing.current = syncing;
        setStatus(newStatus);
    }

    async function refresh() {
        if (props.previewState) {
            wasSyncing.current = false;
            setJustCompleted(props.previewState === "syncComplete");
            setStatus({
                syncing: props.previewState === "syncing",
                lastSyncCompletionDate: new Date(Date.now() - 60 * 60 * 1000).toISOString()
            });
            return;
        }

        try {
            const deviceInfo = await MyDataHelps.getDeviceInfo();
            if (deviceInfo?.platform !== "iOS") {
                applyStatus(undefined);
                return;
            }
            const appleHealthStatus = await MyDataHelps.getAppleHealthStatus();
            if (!appleHealthStatus?.enabled) {
                applyStatus(undefined);
                return;
            }
            applyStatus({
                syncing: !!appleHealthStatus.syncSession,
                lastSyncCompletionDate: appleHealthStatus.lastSyncCompletionDate
            });
        } catch {
            // Older app versions do not support GetAppleHealthStatus.
            applyStatus(undefined);
        }
    }

    useInitializeView(refresh, ["appleHealthSyncResume", "appleHealthSyncComplete"], [props.previewState]);

    // appleHealthSyncComplete is only sent when a full sync finishes, so a canceled or partial
    // session would otherwise leave the indicator showing. Re-check periodically while syncing.
    useInterval(() => {
        refresh();
    }, (status?.syncing && !props.previewState) ? 10000 : null);

    useEffect(() => {
        if (!justCompleted || props.previewState) return;
        const timeout = setTimeout(() => setJustCompleted(false), syncCompleteDisplayMs);
        return () => clearTimeout(timeout);
    }, [justCompleted, props.previewState]);

    if (!status) return null;

    let icon: React.ReactNode;
    let message: string;
    if (status.syncing) {
        icon = <LoadingIndicator variant="inline" />;
        message = language("syncing-data");
    } else if (!props.alwaysDisplay) {
        return null;
    } else if (justCompleted) {
        icon = <FontAwesomeSvgIcon className="mdhui-apple-health-sync-indicator-complete" icon={faCheckCircle} />;
        message = language("sync-complete");
    } else if (status.lastSyncCompletionDate) {
        icon = <FontAwesomeSvgIcon className="mdhui-apple-health-sync-indicator-complete" icon={faCheckCircle} />;
        message = `${language("last-full-sync")} ${getRelativeDateString(status.lastSyncCompletionDate, new Date(), false)}`;
    } else {
        return null;
    }

    return <div ref={props.innerRef} className="mdhui-apple-health-sync-indicator" role="status">
        <img className="mdhui-apple-health-sync-indicator-logo" src={appleHealthLogo} alt={language("apple-health-logo-alt")} />
        {icon}
        <span className={props.hideMessage ? "mdhui-apple-health-sync-indicator-message-hidden" : "mdhui-apple-health-sync-indicator-message"}>{message}</span>
    </div>;
}
