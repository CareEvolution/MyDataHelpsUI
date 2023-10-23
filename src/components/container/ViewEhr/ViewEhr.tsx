import React, { useEffect, useState } from 'react'
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js"
import { Action, Button, Title } from '../../presentational'
import language from '../../../helpers/language'
import { previewAccounts } from '../ExternalAccountsPreview/ExternalAccountsPreview.previewdata'

export interface ViewEhrProps {
    onClick(): void;
    title: string;
    innerRef?: React.Ref<HTMLButtonElement>;
    previewState?: "default";
}


export default function (props: ViewEhrProps) {
    const [ehrAccounts, setEhrAccounts] = useState<ExternalAccount[] | null>(null);

    function initialize() {
        if (props.previewState == "default") {
            updateExternalAccounts(previewAccounts);
            return;
        }

        MyDataHelps.getExternalAccounts().then(function (accounts) {
            updateExternalAccounts(accounts);
        });
    }

    function updateExternalAccounts(accounts: ExternalAccount[]) {
        accounts = accounts.filter(a => a.provider.category == "Provider" || a.provider.category == "Health Plan");
        setEhrAccounts(accounts);
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

    if (!ehrAccounts || !ehrAccounts.length) {
        return null;
    }

    return (
        <Action indicator={<Button variant='light' onClick={() => props.onClick()}>View</Button>}>
            <Title order={3}>Health Records</Title>
        </Action>
    );
}