import React from 'react'
import { ConnectExternalAccountOptions, ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import ConnectDevice from '../ConnectDevice';
import { getGarminProviderID } from '../../../helpers/providerIDs';
import GarminLogo from '../../../assets/garmin-logo.svg';

export interface ConnectGarminProps {
	title?: string,
	garminProviderID?: number,
	previewState?: ConnectGarminPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	hideWhenConnected?: boolean
	connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export type ConnectGarminPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectGarminProps) {
	function getInternalGarminProviderID() {
		return props.garminProviderID || getGarminProviderID();
	}

	return (<ConnectDevice innerRef={props.innerRef}
		title="Garmin"
		titleImage={<img src={GarminLogo} />}
		providerName="Garmin"
		dataCollectionProperty='garminEnabled'
		providerID={getInternalGarminProviderID()}
		previewState={props.previewState}
		disabledBehavior={props.disabledBehavior}
		hideWhenConnected={props.hideWhenConnected}
		connectExternalAccountOptions={props.connectExternalAccountOptions} />);
}
