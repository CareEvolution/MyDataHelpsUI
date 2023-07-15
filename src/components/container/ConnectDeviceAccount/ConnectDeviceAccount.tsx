import React, { useState, useEffect } from 'react'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle"
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh"
import MyDataHelps, { ExternalAccount, ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import { LoadingIndicator, Button, CardTitle } from '../../presentational';
import "./ConnectDeviceAccount.css"
import language from "../../../helpers/language"
import add from 'date-fns/add'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import isAfter from 'date-fns/isAfter'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface ConnectDeviceAccountProps {
	title?: string,
	providerName: string,
	providerIDCallback: () => number,
	previewState?: ConnectDevicePreviewState,
	dataCollectionProperty: string
}

export type ConnectDevicePreviewState = ExternalAccountStatus | "notConnected";

export default function (props: ConnectDeviceAccountProps) {
	const [loading, setLoading] = useState(true);
	const [deviceExternalAccount, setDeviceExternalAccount] = useState<ExternalAccount | null>(null);

	function buildLanguageKey(key: string) {
		return key.replace("{device}", props.providerName.toLowerCase());
	}
	function initialize() {
		if (props.previewState) {
			if (props.previewState == "notConnected") {
				setLoading(false);
				return;
			}
			setDeviceExternalAccount({
				id: 1,
				lastRefreshDate: formatISO(add(new Date(), { hours: -1 })),
				status: props.previewState,
				provider: {
					name: props.providerName,
					category: "Device Manufacturer",
					id: props.providerIDCallback(),
					logoUrl: ""
				}
			});
			setLoading(false);
			return;
		}

		MyDataHelps.getExternalAccounts().then(function (accounts) {
			for (let i = 0; i < accounts.length; i++) {
				if (accounts[i].provider.id == props.providerIDCallback()) {
					setDeviceExternalAccount(accounts[i]);
				}
			}
			setLoading(false);
		});
	}

	function connectToDevice() {
		MyDataHelps.connectExternalAccount(props.providerIDCallback());
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

	var deviceAccountStatus: ExternalAccountStatus | undefined = deviceExternalAccount?.status;
	if (deviceExternalAccount?.status == "fetchComplete") {
		var fetchDate = parseISO(deviceExternalAccount.lastRefreshDate);
		var threshold = add(fetchDate, { hours: 3 });
		if (isAfter(new Date(), threshold)) {
			MyDataHelps.refreshExternalAccount(deviceExternalAccount.id);
			deviceAccountStatus = "fetchingData";
		}
	}

	return (
		<div className="mdhui-connect-device">
			{props.title &&
				<CardTitle title={props.title} />
			}
			{loading &&
				<LoadingIndicator />
			}
			{!loading &&
				<div className="content">
					{!deviceExternalAccount &&
						<div>
							<div className="subtitle">{language[buildLanguageKey("connect-{device}-intro")]}</div>
							<Button onClick={() => connectToDevice()}>{language[buildLanguageKey("connect-{device}-button")]}</Button>
						</div>
					}
					{deviceExternalAccount && deviceAccountStatus == 'fetchComplete' &&
						<div className="subtitle success">
							<FontAwesomeSvgIcon icon={faCheckCircle} /> {language[buildLanguageKey("received-{device}-data")]}
						</div>
					}
					{deviceExternalAccount && deviceAccountStatus == 'fetchingData' &&
						<div className="subtitle downloading">
							<FontAwesomeSvgIcon icon={faRefresh} spin /> {language["downloading-data"]}
						</div>
					}
					{deviceExternalAccount && deviceAccountStatus == 'unauthorized' &&
						<div>
							<div className="subtitle reconnect">
								<FontAwesomeSvgIcon icon={faExclamationTriangle} /> {language["reconnect"]}
							</div>
							<Button onClick={() => connectToDevice()}>{language[buildLanguageKey("connect-{device}-button")]}</Button>
						</div>
					}
				</div>
			}
		</div>
	);
}