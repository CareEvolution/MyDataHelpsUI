import React from 'react'
import { ConnectExternalAccountOptions, ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import ConnectDevice from '../ConnectDevice';
import { getOuraProviderID } from '../../../helpers/providerIDs';
import OuraLogo from '../../../assets/oura-logo.png';

export interface ConnectOuraProps {
	title?: string,
	ouraProviderID?: number,
	previewState?: ConnectOuraPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	hideWhenConnected?: boolean
	connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export type ConnectOuraPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectOuraProps) {
	function getInternalOuraProviderID() {
		return props.ouraProviderID || getOuraProviderID();
	}

	return (<ConnectDevice innerRef={props.innerRef}
		title="Oura"
		titleImage={<img src={OuraLogo} />}
		providerName="Oura"
		dataCollectionProperty='ouraEnabled'
		providerID={getInternalOuraProviderID()}
		previewState={props.previewState}
		disabledBehavior={props.disabledBehavior}
		hideWhenConnected={props.hideWhenConnected}
		connectExternalAccountOptions={props.connectExternalAccountOptions} />);
}
