import React, { useEffect, useState } from 'react'
import "./ExternalAccountsPreview.css"
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js"
import { Action } from '../../presentational'
import language from '../../../helpers/language'
import { previewAccounts } from './ExternalAccountsPreview.previewdata'

export interface ExternalAccountsPreviewProps {
    excludeProviders?: boolean;
    excludeHealthPlans?: boolean;
    excludeDeviceManufacturers?: boolean;
    applicationUrl?: ExternalAccountsApplicationUrl;
    previewState?: ExternalAccountsPreviewPreviewState;
    innerRef?: React.Ref<HTMLDivElement>
    onClick?: () => void;
}

export type ExternalAccountsApplicationUrl = "preview" | string;
export type ExternalAccountsPreviewPreviewState = "Default";

export default function (props: ExternalAccountsPreviewProps) {
    const [externalAccounts, setExternalAccounts] = useState<ExternalAccount[] | null>(null);

    let title = '';
    let externalAccountProviderCategories: string[] = [];

    if (!props.excludeProviders) {
        externalAccountProviderCategories.push('Provider');
        title += language('external-accounts-title-providers');
    }
    if (!props.excludeHealthPlans) {
        externalAccountProviderCategories.push('Health Plan');
        if (title.length > 0) {
            title += language('external-accounts-title-divider');
        }
        title += language('external-accounts-title-health-plans');
    }
    if (!props.excludeDeviceManufacturers) {
        externalAccountProviderCategories.push('Device Manufacturer');
        if (title.length > 0) {
            title += language('external-accounts-title-divider');
        }
        title += language('external-accounts-title-devices');
    }

    function initialize() {
        if (props.previewState == "Default") {
            updateExternalAccounts(previewAccounts);
            return;
        }

        MyDataHelps.getExternalAccounts().then(function (accounts) {
            updateExternalAccounts(accounts);
        });
    }

    function updateExternalAccounts(accounts: ExternalAccount[]) {
        if (externalAccountProviderCategories) {
            accounts = accounts.filter(a => externalAccountProviderCategories?.indexOf(a.provider.category) != -1);
        }
        setExternalAccounts(accounts);
    }

    function manageExternalAccounts() {
        if (props.applicationUrl == "preview") {
            console.log("PREVIEW: Opening the external accounts application.");
        } else {
            if (props.onClick) {
                props.onClick();
            } else if (props.applicationUrl) {
                MyDataHelps.openApplication(props.applicationUrl);
            }
        }
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
        }
    }, []);

    if (!externalAccounts || !externalAccounts.length) {
        return null;
    }

    return (
        <div ref={props.innerRef} className="mdhui-external-accounts-preview">
            <Action title={title} onClick={() => manageExternalAccounts()}>
                {externalAccounts.map((account) =>
                    <div key={account.id} className="external-account-title">{account.provider.name}</div>
                )}
            </Action>
        </div>
    );
}