import ConnectDevice from '../ConnectDevice';
import { ConnectExternalAccountOptions, ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React from "react";
import { getFitbitProviderID } from '../../../helpers/providerIDs';
import FitbitLogo from '../../../assets/fitbit-logo.svg';

export interface ConnectFitbitProps {
	title?: string,
	fitbitProviderID?: number,
	previewState?: ConnectFitbitPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	hideWhenConnected?: boolean
	connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectFitbitProps) {
	function getInternalFitbitProviderID() {
		return props.fitbitProviderID || getFitbitProviderID();
	}
	
	return (<ConnectDevice 
		innerRef={props.innerRef} 
		title="Fitbit" 
		titleImage={<img src={FitbitLogo} />}
		providerName="Fitbit" 
		dataCollectionProperty='fitbitEnabled' 
		providerID={getInternalFitbitProviderID()} 
		previewState={props.previewState} disabledBehavior={props.disabledBehavior}
		hideWhenConnected={props.hideWhenConnected}
		connectExternalAccountOptions={props.connectExternalAccountOptions} />);
}

