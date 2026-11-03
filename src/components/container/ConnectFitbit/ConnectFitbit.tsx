import ConnectGoogleHealth, { ConnectGoogleHealthPreviewState } from '../ConnectGoogleHealth/ConnectGoogleHealth';
import { ConnectExternalAccountOptions, ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React from "react";

export interface ConnectFitbitProps {
	title?: string,
	/** @deprecated Ignored. Fitbit accounts cannot be connected. */
	fitbitProviderID?: number,
	googleHealthProviderID?: number,
	previewState?: ConnectFitbitPreviewState,
	googleHealthPreviewState?: ConnectGoogleHealthPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	hideWhenConnected?: boolean
	connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

/** Google Health is the replacement for Fitbit, so this component connects Google Health. */
export default function (props: ConnectFitbitProps) {
	return <ConnectGoogleHealth
		innerRef={props.innerRef}
		googleHealthProviderID={props.googleHealthProviderID}
		previewState={props.googleHealthPreviewState ?? props.previewState}
		disabledBehavior={props.disabledBehavior}
		hideWhenConnected={props.hideWhenConnected}
		connectExternalAccountOptions={props.connectExternalAccountOptions} />;
}
