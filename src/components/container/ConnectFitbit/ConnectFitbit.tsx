import ConnectDevice from '../ConnectDevice';
import MyDataHelps, { ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React from "react";

export interface ConnectFitbitProps {
	title?: string,
	fitbitProviderID?: number,
	previewState?: ConnectFitbitPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

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
	
	return (<ConnectDevice title="Fitbit" providerName="Fitbit" dataCollectionProperty='fitbitEnabled' providerIDCallback={getFitbitProviderID} previewState={props.previewState} disabledBehavior={props.disabledBehavior} />);
  }

