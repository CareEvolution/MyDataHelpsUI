import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationTriangle, faRefresh } from '@fortawesome/free-solid-svg-icons'
import MyDataHelps, { ExternalAccount, ExternalAccountStatus  } from "@careevolution/mydatahelps-js"
import { LoadingIndicator, Button, CardTitle } from '../../presentational';
import "./ConnectFitbit.css"
import language from "../../../helpers/language"
import add from 'date-fns/add'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import isAfter from 'date-fns/isAfter'

export interface ConnectFitbitProps {
	title?: string,
	fitbitProviderID?: number,
	previewState?: ConnectFitbitPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
}

export type ConnectFitbitPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectFitbitProps) {
	const [loading, setLoading] = useState(true);
	const [fitbitEnabled, setFitbitEnabled] = useState(false);
	const [fitbitExternalAccount, setFitbitExternalAccount] = useState<ExternalAccount | null>(null);

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

	function initialize() {
		if (props.previewState) {
			if (props.previewState == "notEnabled") {
				return;
			}
			setFitbitEnabled(true);
			if (props.previewState == "notConnected") {
				setLoading(false);
				return;
			}
			setFitbitExternalAccount({
				id: 1,
				lastRefreshDate: formatISO(add(new Date(), { hours: -1 })),
				status: props.previewState,
				provider: {
					name: "Fitbit",
					category: "Device Manufacturer",
					id: getFitbitProviderID(),
					logoUrl: ""
				}
			});
			setLoading(false);
			return;
		}

		MyDataHelps.getDataCollectionSettings().then(function (settings) {
			setFitbitEnabled(settings.fitbitEnabled);
			if (settings.fitbitEnabled) {
				MyDataHelps.getExternalAccounts().then(function (accounts) {
					for (let i = 0; i < accounts.length; i++) {
						if (accounts[i].provider.id == getFitbitProviderID()) {
							setFitbitExternalAccount(accounts[i]);
						}
					}
					setLoading(false);
				});
			} else {
				setLoading(false);
			}
		});
	}

	function connectToFitbit() {
		MyDataHelps.connectExternalAccount(getFitbitProviderID());
	}

	useEffect(() => {
		initialize();
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		MyDataHelps.on("externalAccountSyncComplete", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
			MyDataHelps.off("externalAccountSyncComplete", initialize);
		}
	}, []);


	var fitbitAccountStatus: ExternalAccountStatus | undefined = fitbitExternalAccount?.status;
	if (fitbitExternalAccount?.status == "fetchComplete") {
		var fetchDate = parseISO(fitbitExternalAccount.lastRefreshDate);
		var threshold = add(fetchDate, { hours: 3 });
		if (isAfter(new Date(), threshold)) {
			MyDataHelps.refreshExternalAccount(fitbitExternalAccount.id);
			fitbitAccountStatus = "fetchingData";
		}
	}

	if (!fitbitEnabled) {
		if (props.disabledBehavior == 'displayError' && !loading) {
			return (
				<div className="mdhui-connect-fitbit">
					<div className="content">Fitbit is not enabled for this project.</div>
				</div>
			);
		} else {
			return null;
		}
	}

	return (
		<div className="mdhui-connect-fitbit">
			{props.title &&
				<CardTitle title={props.title} />
			}
			{loading &&
				<LoadingIndicator />
			}
			{!loading &&
				<div className="content">
					{!fitbitExternalAccount &&
						<div>
							<div className="subtitle">{language["connect-fitbit-intro"]}</div>
							<Button onClick={() => connectToFitbit()}>{language["connect-fitbit-button"]}</Button>
						</div>
					}
					{fitbitExternalAccount && fitbitAccountStatus == 'fetchComplete' &&
						<div className="subtitle success">
							<FontAwesomeIcon icon={faCheckCircle} /> {language["received-fitbit-data"]}
						</div>
					}
					{fitbitExternalAccount && fitbitAccountStatus == 'fetchingData' &&
						<div className="subtitle downloading">
							<FontAwesomeIcon icon={faRefresh} spin /> {language["downloading-data"]}
						</div>
					}
					{fitbitExternalAccount && fitbitAccountStatus == 'unauthorized' &&
						<div>
							<div className="subtitle reconnect">
								<FontAwesomeIcon icon={faExclamationTriangle} /> {language["reconnect"]}
							</div>
							<Button onClick={() => connectToFitbit()}>{language["connect-fitbit-button"]}</Button>
						</div>
					}
				</div>
			}
		</div>
	);
}