import React, { useEffect, useState } from 'react'
import MyDataHelps, { ConnectExternalAccountOptions, ExternalAccount, ExternalAccountProvider } from '@careevolution/mydatahelps-js';
import { Card, LoadingIndicator, SingleExternalAccount } from '../../presentational'
import { previewExternalAccounts } from './ExternalAccountList.previewdata'

export interface ExternalAccountListProps {
    externalAccountProviderCategories?: string[];
    previewState?: "default"
    onExternalAccountsLoaded?: (accounts: ExternalAccount[]) => void;
    innerRef?: React.Ref<HTMLDivElement>
    connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export default function (props: ExternalAccountListProps) {
    const [loading, setLoading] = useState(true);
    const [externalAccounts, setExternalAccounts] = useState<ExternalAccount[]>([]);

    function initialize() {
        if (props.previewState == "default") {
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
        MyDataHelps.connectExternalAccount(account.provider.id, props.connectExternalAccountOptions || { openNewWindow: true })
            .then(function () {
                loadExternalAccounts();
            });
    }

    const externalAccountsById = (externalAccounts ?? []).reduce((linkedExternalAccounts, externalAccount) => {
        linkedExternalAccounts[externalAccount.provider.id] = externalAccount;
        return linkedExternalAccounts;
    }, {} as Record<number, ExternalAccount>);

    const canConnectToProvider = async (providerId: number): Promise<boolean> => {
        // TODO >> const provider = await MyDataHelps.getExternalAccountProvider(providerId);
        return /*provider.enabled || */externalAccountsById[providerId]?.status === 'unauthorized';
    };

    const connectToSuccessorProvider = async (provider: ExternalAccountProvider): Promise<void> => {
        // TODO: if (!canConnectToProvider(provider)) return;
        if (typeof provider.providerSuccessorID === "number") {
            MyDataHelps.connectExternalAccount(provider.providerSuccessorID, props.connectExternalAccountOptions ?? { openNewWindow: true })
                .then(function () {
                    loadExternalAccounts();
                });
        } else {
            console.error("Successor Provider is undefined for provider:", provider);
        }
    };

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
        <div ref={props.innerRef} className="mdhui-external-account-list">
            {externalAccounts && externalAccounts.map((externalAccount) =>
                <Card key={externalAccount.id.toString() + externalAccount.lastRefreshDate}>
                    <SingleExternalAccount
                        externalAccount={externalAccount}
                        onAccountRemoved={(account: ExternalAccount) => onAccountRemoved(account)}
                        onReconnectAccount={(account: ExternalAccount) => reconnectAccount(account)}
                        onConnectToSuccessorProvider={(provider: ExternalAccountProvider) => connectToSuccessorProvider(provider)}
                    />
                </Card>
            )}
            {loading &&
                <LoadingIndicator />
            }
        </div>
    );
}