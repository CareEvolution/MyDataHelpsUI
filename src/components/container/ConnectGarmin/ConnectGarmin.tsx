import React from 'react'
import { ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import ConnectDevice from '../ConnectDevice';
import { getGarminProviderID } from '../../../helpers/providerIDs';

export interface ConnectGarminProps {
	title?: string,
	garminProviderID?: number,
	previewState?: ConnectGarminPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
}

export type ConnectGarminPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function(props: ConnectGarminProps) {
	function getInternalGarminProviderID() {
		return props.garminProviderID || getGarminProviderID();
	}
	
	return (<ConnectDevice innerRef={props.innerRef} title="Garmin" providerName="Garmin" dataCollectionProperty='garminEnabled' providerIDCallback={getInternalGarminProviderID} previewState={props.previewState} disabledBehavior={props.disabledBehavior} />);
  }
