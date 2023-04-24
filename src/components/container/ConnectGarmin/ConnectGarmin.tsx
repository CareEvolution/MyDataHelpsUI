import React from 'react'
import MyDataHelps, { ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import ConnectDevice from '../ConnectDevice';

export interface ConnectGarminProps {
	title?: string,
	garminProviderID?: number,
	previewState?: ConnectGarminPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
}

export type ConnectGarminPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function(props: ConnectGarminProps) {
	function getGarminProviderID() {
		var garminProviderID = 6327;
		if (!MyDataHelps.baseUrl || MyDataHelps.baseUrl.startsWith("https://mdhorg.ce.dev")) {
			garminProviderID = 1384;
		}
		if (props.garminProviderID) {
			garminProviderID = props.garminProviderID;
		}
		return garminProviderID;
	}
	
	return (<ConnectDevice title="Garmin" providerName="Garmin" dataCollectionProperty='garminEnabled' providerIDCallback={getGarminProviderID} previewState={props.previewState} disabledBehavior={props.disabledBehavior} />);
  }
