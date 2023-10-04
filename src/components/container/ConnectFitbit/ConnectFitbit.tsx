import ConnectDevice from '../ConnectDevice';
import MyDataHelps, { ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React from "react";
import { getFitbitProviderID } from '../../../helpers/providerIDs';

export interface ConnectFitbitProps {
	title?: string,
	fitbitProviderID?: number,
	previewState?: ConnectFitbitPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function(props: ConnectFitbitProps) {
	function getInternalFitbitProviderID() {
		return props.fitbitProviderID || getFitbitProviderID();
	}
	
	return (<ConnectDevice innerRef={props.innerRef} title="Fitbit" providerName="Fitbit" dataCollectionProperty='fitbitEnabled' providerIDCallback={getInternalFitbitProviderID} previewState={props.previewState} disabledBehavior={props.disabledBehavior} />);
  }

