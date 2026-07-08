import ConnectDevice, { ConnectDeviceInfo } from '../ConnectDevice';
import ConnectGoogleHealth, { ConnectGoogleHealthPreviewState } from '../ConnectGoogleHealth/ConnectGoogleHealth';
import { ConnectExternalAccountOptions, ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React, { useState } from "react";
import { getFitbitProviderID } from '../../../helpers/providerIDs';
import FitbitLogo from '../../../assets/fitbit-logo.svg';

export interface ConnectFitbitProps {
	title?: string,
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

export default function (props: ConnectFitbitProps) {
	const [showGoogleHealth, setShowGoogleHealth] = useState(false);
	const previewMode = !!props.previewState || !!props.googleHealthPreviewState;

	function getInternalFitbitProviderID() {
		return props.fitbitProviderID || getFitbitProviderID();
	}

	// Google Health is replacing Fitbit, so once a user is a Fitbit user (already connected) or Fitbit has
	// been turned off for the project, steer them to Google Health instead of Fitbit. We reuse the Fitbit
	// tile's own load (via onInitialized) rather than re-fetching settings/accounts here. When we switch
	// we render the Google Health tile *instead of* the Fitbit tile - the two are mutually exclusive - and
	// let the Google Health tile show its own connect prompt or connected state.
	function onFitbitInitialized(info: ConnectDeviceInfo) {
		if (previewMode) return;
		let googleHealthEnabled = !!info.settings?.googleHealthEnabled;
		setShowGoogleHealth((info.connected || !info.enabled) && googleHealthEnabled);
	}

	// In preview mode the choice is driven directly by googleHealthPreviewState.
	if (previewMode ? !!props.googleHealthPreviewState : showGoogleHealth) {
		return <ConnectGoogleHealth
			innerRef={props.innerRef}
			googleHealthProviderID={props.googleHealthProviderID}
			previewState={props.googleHealthPreviewState}
			disabledBehavior={props.disabledBehavior}
			hideWhenConnected={props.hideWhenConnected}
			connectExternalAccountOptions={props.connectExternalAccountOptions} />;
	}

	return <ConnectDevice
		innerRef={props.innerRef}
		title="Fitbit"
		titleImage={<img src={FitbitLogo} />}
		providerName="Fitbit"
		dataCollectionProperty='fitbitEnabled'
		providerID={getInternalFitbitProviderID()}
		previewState={props.previewState}
		disabledBehavior={props.disabledBehavior}
		hideWhenConnected={props.hideWhenConnected}
		connectExternalAccountOptions={props.connectExternalAccountOptions}
		onInitialized={onFitbitInitialized} />;
}
