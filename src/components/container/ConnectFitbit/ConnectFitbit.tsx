import ConnectDevice from '../ConnectDevice';
import MyDataHelps, { ConnectExternalAccountOptions, DataCollectionSettings, ExternalAccountStatus } from "@careevolution/mydatahelps-js";
import React, { useState } from "react";
import { getFitbitProviderID, getGoogleHealthProviderID } from '../../../helpers/providerIDs';
import FitbitLogo from '../../../assets/fitbit-logo.svg';
import GoogleHealthLogo from '../../../assets/google-health-logo.png';
import { useInitializeView } from '../../../helpers/Initialization';

export interface ConnectFitbitProps {
	title?: string,
	fitbitProviderID?: number,
	googleHealthProviderID?: number,
	previewState?: ConnectFitbitPreviewState,
	googleHealthPreviewState?: ConnectFitbitPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	hideWhenConnected?: boolean
	connectExternalAccountOptions?: ConnectExternalAccountOptions
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectFitbitProps) {
	const [promptGoogleHealth, setPromptGoogleHealth] = useState(false);

	function getInternalFitbitProviderID() {
		return props.fitbitProviderID || getFitbitProviderID();
	}

	function getInternalGoogleHealthProviderID() {
		return props.googleHealthProviderID || getGoogleHealthProviderID();
	}

	function initialize() {
		if (props.previewState || props.googleHealthPreviewState) {
			// In preview mode the Google Health prompt is driven directly by googleHealthPreviewState.
			setPromptGoogleHealth(!!props.googleHealthPreviewState);
			return;
		}

		Promise.all([MyDataHelps.getDataCollectionSettings(), MyDataHelps.getExternalAccounts()]).then(([settings, externalAccounts]) => {
			let fitbitConnected = externalAccounts.some(account => account.provider.id === getInternalFitbitProviderID());
			// Google Health is replacing Fitbit, so nudge users toward it whenever Fitbit is already
			// connected or Fitbit has been turned off for the project. The Google Health tile below only
			// renders when Google Health is enabled and not yet connected (hideWhenConnected), which
			// completes the "enabled but not connected" half of the condition.
			setPromptGoogleHealth(fitbitConnected || !(settings as DataCollectionSettings).fitbitEnabled);
		});
	}

	useInitializeView(initialize, ["externalAccountSyncComplete"], [props.previewState, props.googleHealthPreviewState]);

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
			connectExternalAccountOptions={props.connectExternalAccountOptions} />
		{promptGoogleHealth &&
			<ConnectDevice
				title="Google Health"
				titleImage={<img src={GoogleHealthLogo} />}
				providerName="Google Health"
				dataCollectionProperty='googleHealthEnabled'
				providerID={getInternalGoogleHealthProviderID()}
				previewState={props.googleHealthPreviewState}
				hideWhenConnected={true}
				connectExternalAccountOptions={props.connectExternalAccountOptions} />
		}
	</>);
}
