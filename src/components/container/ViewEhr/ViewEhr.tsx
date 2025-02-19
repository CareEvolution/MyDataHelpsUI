import React, { useEffect, useState } from 'react'
import MyDataHelps, { DataAvailability, ExternalAccount } from "@careevolution/mydatahelps-js"
import { Action, Button, LayoutContext, Title } from '../../presentational'
import language from '../../../helpers/language'
import { previewAccounts } from '../ExternalAccountsPreview/ExternalAccountsPreview.previewdata'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { ColorDefinition } from '../../../helpers/colors'
import "./ViewEhr.css"
import { ButtonVariant } from '../../presentational/Button/Button'

export interface ViewEhrProps {
    onClick(): void;
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "fetchComplete" | "fetchingData";
    buttonColor?: ColorDefinition;
    buttonVariant?: ButtonVariant;
}

export default function (props: ViewEhrProps) {
    const [ehrAccounts, setEhrAccounts] = useState<ExternalAccount[] | null>(null);
    const [dataAvailability, setDataAvailability] = useState<DataAvailability | null>(null);

    function initialize() {
        if (props.previewState) {
            previewAccounts[0].status = props.previewState;
            updateExternalAccounts(previewAccounts);
            return;
        }

        Promise.all([MyDataHelps.getExternalAccounts(), MyDataHelps.getDataAvailability()]).then(function ([accounts, dataAvailability]) {
            updateExternalAccounts(accounts);
            setDataAvailability(dataAvailability);
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

    if ((!ehrAccounts || !ehrAccounts.length) && !dataAvailability?.appleHealthRecords && !dataAvailability?.healthConnectPhr) {
        return null;
    }

    const indicator = <Button color={props.buttonColor} variant={props.buttonVariant || 'light'} onClick={() => { }}>{language("view")}</Button>;
    return (
        <Action innerRef={props.innerRef} className="mdhui-view-ehr" renderAs='div' onClick={() => props.onClick()} indicator={indicator}>
            <Title order={3}>{props.title || language("health-records")}</Title>
            {ehrAccounts?.find(e => e.status == "fetchingData") && <div className="mdhui-view-ehr-status"><FontAwesomeSvgIcon icon={faRefresh} spin /> {language("external-account-fetching-data")}</div>}
        </Action>
    );
}