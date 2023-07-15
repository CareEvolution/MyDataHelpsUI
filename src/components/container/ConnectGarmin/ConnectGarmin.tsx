import React from 'react'
import MyDataHelps, { ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import ConnectDeviceAccount from '../ConnectDeviceAccount';

export interface ConnectGarminProps {
	garminProviderID?: number,
	previewState?: ConnectGarminPreviewState
}

export type ConnectGarminPreviewState = ExternalAccountStatus | "notConnected";

export default function (props: ConnectGarminProps) {
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

	return (<ConnectDeviceAccount title="Garmin" providerName="Garmin" dataCollectionProperty='garminEnabled' providerIDCallback={getGarminProviderID} previewState={props.previewState} />);
}
