﻿import ConnectDevice from '../ConnectDevice';
import { ExternalAccountStatus } from "@careevolution/mydatahelps-js";
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

export default function (props: ConnectFitbitProps) {
	function getInternalFitbitProviderID() {
		return props.fitbitProviderID || getFitbitProviderID();
	}

	return (<ConnectDevice 
		innerRef={props.innerRef} 
		headerImage="FitbitLogo"
		title="Fitbit" 
		providerName="Fitbit" 
		dataCollectionProperty='fitbitEnabled' 
		providerID={getInternalFitbitProviderID()} 
		previewState={props.previewState} disabledBehavior={props.disabledBehavior} />);
}

