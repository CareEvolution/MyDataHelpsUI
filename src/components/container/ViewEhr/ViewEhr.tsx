import React, { useState } from 'react'
import MyDataHelps from '@careevolution/mydatahelps-js'
import { Action, Button, Title } from '../../presentational'
import language from '../../../helpers/language'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { ColorDefinition, useInitializeView } from '../../../helpers'
import './ViewEhr.css'
import { ButtonVariant } from '../../presentational/Button/Button'
import { noop } from '../../../helpers/functions';

export type ViewEhrPreviewState = 'notConnected' | 'fetchComplete' | 'fetchingData';

export interface ViewEhrProps {
    previewState?: ViewEhrPreviewState;
    title?: string;
    buttonColor?: ColorDefinition;
    buttonVariant?: ButtonVariant;
    onClick: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * The ViewEhr component can be used as a CTA to view EHR records.
 *
 * It will render when the participant has provider and/or health plan external account
 * connections or when they are using Apple Health Reacts or Health Connect PHR.
 */
export default function ViewEhr(props: ViewEhrProps) {
    const [hasEhrConnection, setHasEhrConnection] = useState<boolean>(false);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    useInitializeView(() => {
        if (props.previewState === 'notConnected') {
            setHasEhrConnection(false);
            setIsFetchingData(false);
            return;
        } else if (props.previewState) {
            setHasEhrConnection(true);
            setIsFetchingData(props.previewState === 'fetchingData');
            return;
        }

        Promise.all([MyDataHelps.getExternalAccounts(), MyDataHelps.getDataAvailability()]).then(([accounts, dataAvailability]) => {
            const ehrAccounts = accounts.filter(account => ['Provider', 'Health Plan'].includes(account.provider.category));
            setHasEhrConnection(ehrAccounts.length > 0 || dataAvailability.appleHealthRecords || dataAvailability.healthConnectPhr);
            setIsFetchingData(ehrAccounts.some(account => account.status === 'fetchingData'));
        });
    }, ['externalAccountSyncComplete'], [props.previewState]);

    if (!hasEhrConnection) {
        return null;
    }

    return <Action
        className="mdhui-view-ehr"
        renderAs='div'
        indicator={<Button color={props.buttonColor} variant={props.buttonVariant || 'light'} onClick={noop}>{language('view')}</Button>}
        onClick={props.onClick}
        innerRef={props.innerRef}
    >
        <Title order={3}>{props.title || language('health-records')}</Title>
        {isFetchingData &&
            <div className="mdhui-view-ehr-status">
                <FontAwesomeSvgIcon icon={faRefresh} spin /> {language('external-account-fetching-data')}
            </div>
        }
    </Action>;
}