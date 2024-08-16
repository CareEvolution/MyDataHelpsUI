import React from 'react'
import { ConnectExternalAccountOptions, ExternalAccountStatus } from '@careevolution/mydatahelps-js'
import ConnectDevice from '../ConnectDevice';
import { getDexcomProviderID } from '../../../helpers/providerIDs';
import DexcomLogo from '../../../assets/dexcom-logo.svg';

export type ConnectDexcomPreviewState = ExternalAccountStatus | 'notConnected' | 'notEnabled';

export interface ConnectDexcomProps {
    title?: string,
    dexcomProviderID?: number,
    previewState?: ConnectDexcomPreviewState,
    disabledBehavior?: 'hide' | 'displayError'
    hideWhenConnected?: boolean
    connectExternalAccountOptions?: ConnectExternalAccountOptions
    innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: ConnectDexcomProps) {
    function getInternalDexcomProviderID() {
        return props.dexcomProviderID || getDexcomProviderID();
    }

    return <ConnectDevice
        innerRef={props.innerRef}
        title="Dexcom"
        titleImage={<img src={DexcomLogo} />}
        providerName="Dexcom"
        dataCollectionProperty="dexcomEnabled"
        providerID={getInternalDexcomProviderID()}
        previewState={props.previewState}
        disabledBehavior={props.disabledBehavior}
        hideWhenConnected={props.hideWhenConnected}
        connectExternalAccountOptions={props.connectExternalAccountOptions}
    />;
}
