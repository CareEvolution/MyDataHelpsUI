import React, { useState } from 'react'
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js"
import { Action, Button, Title } from '../../presentational'
import language from '../../../helpers/language'
import { previewAccounts } from '../ExternalAccountsPreview/ExternalAccountsPreview.previewdata'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { ColorDefinition } from '../../../helpers/colors'
import "./ViewDeviceActivity.css"
import { ButtonVariant } from '../../presentational/Button/Button'
import { DailyDataTypeDefinition, useInitializeView } from '../../../helpers'
import { getCombinedDataCollectionSettings } from '../../../helpers/daily-data-providers/combined-data-collection-settings'

export interface ViewDeviceActivityProps {
    onClick(): void;
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "fetchComplete" | "fetchingData";
    buttonColor?: ColorDefinition;
    buttonVariant?: ButtonVariant;
    dataTypes: DailyDataTypeDefinition[];
}

export default function (props: ViewDeviceActivityProps) {
    const [deviceAccounts, setDeviceAccounts] = useState<ExternalAccount[] | null>(null);
    const [deviceDataAvailable, setDeviceDataAvailable] = useState<boolean>(false);

    function initialize() {
        if (props.previewState) {
            let devicePreviewAccounts = previewAccounts.filter(a => a.provider.category == "Device Manufacturer");
            devicePreviewAccounts[0].status = props.previewState;
            updateExternalAccounts(devicePreviewAccounts);
            return;
        }

        MyDataHelps.getExternalAccounts().then(function (accounts) {
            updateExternalAccounts(accounts);
        });

        getCombinedDataCollectionSettings(true).then(combinedSettings => {
            if (props.dataTypes.length === 0) {
                setDeviceDataAvailable(false);
                return;
            }
            
            Promise.any(props.dataTypes.map(dataType => 
                dataType.availabilityCheck(combinedSettings)
                    .then(result => {
                        if (result) {
                            return true;
                        }
                        throw new Error("Result was falsy");
                    })
            ))
            .then(() => {
                setDeviceDataAvailable(true);
            })
            .catch(() => {
                setDeviceDataAvailable(false);
            });
        })
    }

    function updateExternalAccounts(accounts: ExternalAccount[]) {
        accounts = accounts.filter(a => a.provider.category == "Device Manufacturer");
        setDeviceAccounts(accounts);
    }

    useInitializeView(initialize, ["externalAccountSyncComplete"]);

    if ((!deviceAccounts || !deviceAccounts.length) && !deviceDataAvailable) {
        return null;
    }

    const viewButton = <Button color={props.buttonColor} variant={props.buttonVariant || 'light'} onClick={() => { }}>{language("view")}</Button>;
    return (
        <Action innerRef={props.innerRef} className="mdhui-view-device-activity" renderAs='div' onClick={() => props.onClick()} indicator={viewButton}>
            <Title order={3}>{props.title || language("device-activity")}</Title>
            {deviceAccounts?.find(e => e.status == "fetchingData") && <div className="mdhui-view-device-activity-status"><FontAwesomeSvgIcon icon={faRefresh} spin /> {language("external-account-fetching-data")}</div>}
        </Action>
    );
}