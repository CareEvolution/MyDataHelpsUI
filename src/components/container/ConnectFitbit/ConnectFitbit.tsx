import ConnectDevice from '../ConnectDevice';
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
	const [promptGoogleHealth, setPromptGoogleHealth] = useState(false);
	const previewMode = !!props.previewState || !!props.googleHealthPreviewState;

	function getInternalFitbitProviderID() {
		return props.fitbitProviderID || getFitbitProviderID();
	}

	// Google Health is replacing Fitbit, so nudge users toward it whenever Fitbit is already connected
	// or Fitbit has been turned off for the project. We reuse the Fitbit tile's own load (via
	// onInitialized) rather than re-fetching settings/accounts here. The Google Health tile below only
	// renders when Google Health is enabled and not yet connected (hideWhenConnected), which completes
	// the "enabled but not connected" half of the condition.
	function onFitbitInitialized(info: { enabled: boolean, connected: boolean }) {
		if (previewMode) return;
		setPromptGoogleHealth(info.connected || !info.enabled);
	}

	// In preview mode the Google Health prompt is driven directly by googleHealthPreviewState.
	let showGoogleHealthPrompt = previewMode ? !!props.googleHealthPreviewState : promptGoogleHealth;

	return (<>
		<ConnectDevice
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
			onInitialized={onFitbitInitialized} />
		{showGoogleHealthPrompt &&
			<ConnectGoogleHealth
				googleHealthProviderID={props.googleHealthProviderID}
				previewState={props.googleHealthPreviewState}
				hideWhenConnected={true}
				connectExternalAccountOptions={props.connectExternalAccountOptions} />
		}
	</>);
}
