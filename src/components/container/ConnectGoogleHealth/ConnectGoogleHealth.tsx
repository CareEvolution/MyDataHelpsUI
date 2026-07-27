import React from 'react'
import { ConnectExternalAccountOptions, ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import ConnectDevice from '../ConnectDevice';
import { getGoogleHealthProviderID } from '../../../helpers/providerIDs';
import GoogleHealthLogo from '../../../assets/google-health-logo.png';

export interface ConnectGoogleHealthProps {
	title?: string,
	googleHealthProviderID?: number,
	previewState?: ConnectGoogleHealthPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	hideWhenConnected?: boolean
	connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export type ConnectGoogleHealthPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectGoogleHealthProps) {
	function getInternalGoogleHealthProviderID() {
		return props.googleHealthProviderID || getGoogleHealthProviderID();
	}

	return (<ConnectDevice innerRef={props.innerRef}
		title="Google Health"
		titleImage={<img src={GoogleHealthLogo} />}
		providerName="Google Health"
		dataCollectionProperty='googleHealthEnabled'
		providerID={getInternalGoogleHealthProviderID()}
		previewState={props.previewState}
		disabledBehavior={props.disabledBehavior}
		hideWhenConnected={props.hideWhenConnected}
		connectExternalAccountOptions={props.connectExternalAccountOptions} />);
}
