import React, {useEffect, useState} from 'react'
import MyDataHelps, {ExternalAccount} from '@careevolution/mydatahelps-js';
import {Card, LoadingIndicator, SingleExternalAccount} from '../../presentational'
import {previewExternalAccounts} from './ExternalAccountList.previewdata'

export interface ExternalAccountListProps {
    externalAccountProviderCategories?: string[];
    previewState?: NotificationListPreviewState;
    onExternalAccountsLoaded?: (accounts: ExternalAccount[]) => void;
}

export type NotificationListPreviewState = "Default"

export default function (props: ExternalAccountListProps) {
    const [loading, setLoading] = useState(true);
    const [externalAccounts, setExternalAccounts] = useState<ExternalAccount[]>([]);

    function initialize() {
        if (props.previewState == "Default") {
            setLoading(false);
            updateExternalAccounts(previewExternalAccounts);
            return;
        }
        loadExternalAccounts();
    }

    function loadExternalAccounts() {
        MyDataHelps.getExternalAccounts().then(function (accounts) {
            updateExternalAccounts(accounts);
            setLoading(false);
        });
    }

    function updateExternalAccounts(accounts: ExternalAccount[]) {
        if (props.externalAccountProviderCategories) {
            accounts = accounts.filter(a => props.externalAccountProviderCategories?.indexOf(a.provider.category) != -1);
        }
        setExternalAccounts(accounts);
        if (props.onExternalAccountsLoaded) {
            props.onExternalAccountsLoaded(accounts);
        }
    }

    function onAccountRemoved(account: ExternalAccount) {
        setLoading(true);
        loadExternalAccounts();
    }

    function reconnectAccount(account: ExternalAccount) {
        MyDataHelps.connectExternalAccount(account.provider.id)
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
        MyDataHelps.on("externalAccountSyncComplete", initialize);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
            MyDataHelps.off("externalAccountSyncComplete", initialize);
        }
    }, []);

    return (
        <div className="mdhui-external-account-list">
            {externalAccounts && externalAccounts.map((externalAccount) =>
                <Card key={externalAccount.id.toString() + externalAccount.lastRefreshDate}>
                    <SingleExternalAccount
                        externalAccount={externalAccount}
                        onAccountRemoved={(account: ExternalAccount) => onAccountRemoved(account)}
                        onReconnectAccount={(account: ExternalAccount) => reconnectAccount(account)}/>
                </Card>
            )}
            {loading &&
            <LoadingIndicator/>
            }
        </div>
    );
}