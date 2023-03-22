import React, { useState, useEffect } from 'react'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle"
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh"
import MyDataHelps, { ExternalAccount, ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import { LoadingIndicator, Button, CardTitle } from '../../presentational';
import "./ConnectGarmin.css"
import language from "../../../helpers/language"
import add from 'date-fns/add'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import isAfter from 'date-fns/isAfter'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface ConnectGarminProps {
	title?: string,
	garminProviderID?: number,
	previewState?: ConnectGarminPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
}

export type ConnectGarminPreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectGarminProps) {
	const [loading, setLoading] = useState(true);
	const [garminEnabled, setGarminEnabled] = useState(false);
	const [garminExternalAccount, setGarminExternalAccount] = useState<ExternalAccount | null>(null);

	function getGarminProviderID() {
		var garminProviderID = 6327;
		if (!MyDataHelps.baseUrl || MyDataHelps.baseUrl.startsWith("https://mdhorg.ce.dev")) {
			garminProviderID = 1384;
		}
		if (props.garminProviderID) {
			garminProviderID = props.garminProviderID;
		}
		return garminProviderID;
	}

	function initialize() {
		if (props.previewState) {
			if (props.previewState == "notEnabled") {
				return;
			}
			setGarminEnabled(true);
			if (props.previewState == "notConnected") {
				setLoading(false);
				return;
			}
			setGarminExternalAccount({
				id: 1,
				lastRefreshDate: formatISO(add(new Date(), { hours: -1 })),
				status: props.previewState,
				provider: {
					name: "Garmin",
					category: "Device Manufacturer",
					id: getGarminProviderID(),
					logoUrl: ""
				}
			});
			setLoading(false);
			return;
		}

		MyDataHelps.getDataCollectionSettings().then(function (settings) {
			setGarminEnabled(settings.garminEnabled);
			if (settings.garminEnabled) {
				MyDataHelps.getExternalAccounts().then(function (accounts) {
					for (let i = 0; i < accounts.length; i++) {
						if (accounts[i].provider.id == getGarminProviderID()) {
							setGarminExternalAccount(accounts[i]);
						}
					}
					setLoading(false);
				});
			} else {
				setLoading(false);
			}
		});
	}

	function connectToGarmin() {
		MyDataHelps.connectExternalAccount(getGarminProviderID());
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


	var garminAccountStatus: ExternalAccountStatus | undefined = garminExternalAccount?.status;
	if (garminExternalAccount?.status == "fetchComplete") {
		var fetchDate = parseISO(garminExternalAccount.lastRefreshDate);
		var threshold = add(fetchDate, { hours: 3 });
		if (isAfter(new Date(), threshold)) {
			MyDataHelps.refreshExternalAccount(garminExternalAccount.id);
			garminAccountStatus = "fetchingData";
		}
	}

	if (!garminEnabled) {
		if (props.disabledBehavior == 'displayError' && !loading) {
			return (
				<div className="mdhui-connect-garmin">
					<div className="content">Garmin is not enabled for this project.</div>
				</div>
			);
		} else {
			return null;
		}
	}

	return (
		<div className="mdhui-connect-garmin">
			{props.title &&
				<CardTitle title={props.title} />
			}
			{loading &&
				<LoadingIndicator />
			}
			{!loading &&
				<div className="content">
					{!garminExternalAccount &&
						<div>
							<div className="subtitle">{language["connect-garmin-intro"]}</div>
							<Button onClick={() => connectToGarmin()}>{language["connect-garmin-button"]}</Button>
						</div>
					}
					{garminExternalAccount && garminAccountStatus == 'fetchComplete' &&
						<div className="subtitle success">
							<FontAwesomeSvgIcon icon={faCheckCircle} /> {language["received-garmin-data"]}
						</div>
					}
					{garminExternalAccount && garminAccountStatus == 'fetchingData' &&
						<div className="subtitle downloading">
							<FontAwesomeSvgIcon icon={faRefresh} spin /> {language["downloading-data"]}
						</div>
					}
					{garminExternalAccount && garminAccountStatus == 'unauthorized' &&
						<div>
							<div className="subtitle reconnect">
								<FontAwesomeSvgIcon icon={faExclamationTriangle} /> {language["reconnect"]}
							</div>
							<Button onClick={() => connectToGarmin()}>{language["connect-garmin-button"]}</Button>
						</div>
					}
				</div>
			}
		</div>
	);
}