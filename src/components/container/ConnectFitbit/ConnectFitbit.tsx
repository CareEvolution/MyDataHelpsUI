import ConnectDevice from '../ConnectDevice';
import MyDataHelps, { ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React from "react";
import { ConnectDeviceLanguage } from '../ConnectDevice/ConnectDevice';
import language from '../../../helpers/language';

export interface ConnectFitbitProps {
	hideWhenConnected?: boolean
	language?: ConnectDeviceLanguage
	previewState?: ConnectFitbitPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	variant?: "medium" | "large" | "small"
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectFitbitProps) {
	let componentLanguage = {
		notConnectedTitle: language("connect-fitbit-title"),
		notConnectedMessage: language("connect-fitbit-intro"),
		fetchCompleteTitle: language("connect-fitbit-title"),
		fetchCompleteMessage: language("received-fitbit-data"),
		fetchingDataTitle: language("connect-fitbit-title"),
		fetchingDataMessage: language("downloading-data"),
		unauthorizedTitle: language("connect-fitbit-title"),
		unauthorizedMessage: language("reconnect"),
		connectButtonText: language("connect-fitbit-button")
	};
	if (props.language) {
		componentLanguage = { ...componentLanguage, ...props.language };
	}


	return (<ConnectDevice innerRef={props.innerRef}
		language={componentLanguage}
		hideWhenConnected={props.hideWhenConnected}
		provider="Fitbit"
		previewState={props.previewState}
		disabledBehavior={props.disabledBehavior}
		variant={props.variant || "medium"} />);
}

