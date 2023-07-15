import ConnectDeviceAccount from '../ConnectDeviceAccount';
import MyDataHelps, { ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React from "react";

export interface ConnectFitbitProps {
	fitbitProviderID?: number,
	previewState?: ConnectFitbitPreviewState
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected";

export default function(props: ConnectFitbitProps) {
	function getFitbitProviderID() {
		var fitbitProviderID = 564;
		if (!MyDataHelps.baseUrl || MyDataHelps.baseUrl.startsWith("https://mdhorg.ce.dev")) {
			fitbitProviderID = 2;
		}
		if (props.fitbitProviderID) {
			fitbitProviderID = props.fitbitProviderID;
		}
		return fitbitProviderID;
	}
	
	return (<ConnectDeviceAccount title="Fitbit" providerName="Fitbit" dataCollectionProperty='fitbitEnabled' providerIDCallback={getFitbitProviderID} previewState={props.previewState} />);
  }

