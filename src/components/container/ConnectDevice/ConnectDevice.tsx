import React, { useState, useEffect } from 'react'
import { faExclamationTriangle, faCheckCircle, faRefresh } from "@fortawesome/free-solid-svg-icons";
import MyDataHelps, { ConnectExternalAccountOptions, ExternalAccount, ExternalAccountProvider, ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import { Button, TextBlock, Title } from '../../presentational';
import "./ConnectDevice.css"
import language from "../../../helpers/language"
import { add, parseISO, formatISO, isAfter } from 'date-fns'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface ConnectDeviceProps {
	title: string,
	providerName: string,
	providerID: number,
	previewState?: ConnectDevicePreviewState,
	disabledBehavior?: 'hide' | 'displayError',
	dataCollectionProperty: string
	innerRef?: React.Ref<HTMLDivElement>
	titleImage: React.ReactNode
	hideWhenConnected?: boolean
	connectExternalAccountOptions?: ConnectExternalAccountOptions
	onInitialized?: (info: ConnectDeviceInfo) => void
}

export type ConnectDevicePreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export interface ConnectDeviceInfo {
	enabled: boolean;
	connected: boolean;
}

export default function (props: ConnectDeviceProps) {
	const [loading, setLoading] = useState(true);
	const [deviceEnabled, setDeviceEnabled] = useState(false);
	const [deviceExternalAccount, setDeviceExternalAccount] = useState<ExternalAccount | null>(null);

	function buildLanguageKey(key: string) {
		return key.replace("{device}", props.providerName.toLowerCase().replace(/\s+/g, "-"));
	}
	function initialize() {
		if (props.previewState) {
			setLoading(true);
			setDeviceEnabled(false);
			setDeviceExternalAccount(null);

			if (props.previewState == "notEnabled") {
				props.onInitialized?.({ enabled: false, connected: false });
				setLoading(false);
				return;
			}
			setDeviceEnabled(true);
			if (props.previewState == "notConnected") {
				props.onInitialized?.({ enabled: true, connected: false });
				setLoading(false);
				return;
			}
			props.onInitialized?.({ enabled: true, connected: true });
			setDeviceExternalAccount({
				id: 1,
				lastRefreshDate: formatISO(add(new Date(), { hours: -1 })),
				status: props.previewState,
				provider: {
					name: props.providerName,
					category: "Device Manufacturer",
					id: props.providerID,
					logoUrl: "",
					enabled: true
				} as ExternalAccountProvider
			});
			setLoading(false);
			return;
		}

		MyDataHelps.getDataCollectionSettings().then(function (settings: any) {
			let enabled = settings[props.dataCollectionProperty];
			setDeviceEnabled(enabled);
			if (enabled) {
				MyDataHelps.getExternalAccounts().then(function (accounts) {
					let connected = false;
					for (let i = 0; i < accounts.length; i++) {
						if (accounts[i].provider.id == props.providerID) {
							setDeviceExternalAccount(accounts[i]);
							connected = true;
						}
					}
					props.onInitialized?.({ enabled: true, connected: connected });
					setLoading(false);
				});
			} else {
				props.onInitialized?.({ enabled: false, connected: false });
				setLoading(false);
			}
		});
	}

	function connectToDevice() {
		if (props.previewState) return;
		MyDataHelps.connectExternalAccount(props.providerID, props.connectExternalAccountOptions || { openNewWindow: true })
			.then(function () {
				initialize();
			});
	}

	useEffect(() => {
		initialize();
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		MyDataHelps.on("externalAccountSyncComplete", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
			MyDataHelps.off("externalAccountSyncComplete", initialize);
		}
	}, [props.previewState]);


	var deviceAccountStatus: ExternalAccountStatus | undefined = deviceExternalAccount?.status;
	if (deviceExternalAccount?.status == "fetchComplete") {
		var fetchDate = parseISO(deviceExternalAccount.lastRefreshDate);
		var threshold = add(fetchDate, { hours: 3 });
		if (isAfter(new Date(), threshold)) {
			MyDataHelps.refreshExternalAccount(deviceExternalAccount.id);
			deviceAccountStatus = "fetchingData";
		}
	}

	if (!deviceEnabled) {
		if (props.disabledBehavior == 'displayError' && !loading) {
			return (
				<div className="mdhui-connect-device" ref={props.innerRef}>
					<div className="content">
						{language("device-not-enabled").replace("@@DEVICE@@", props.title)}
					</div>
				</div>
			);
		} else {
			return null;
		}
	}

	if (props.hideWhenConnected && deviceExternalAccount && deviceExternalAccount?.status != "unauthorized" && deviceExternalAccount?.status != "error") {
		return null;
	}

	return (
		<div className="mdhui-connect-device" ref={props.innerRef}>
			<Title defaultMargin autosizeImage order={3} image={props.titleImage}>{props.title}</Title>
			<TextBlock>
				{!deviceExternalAccount &&
					<div>
						<div className="subtitle">{language(buildLanguageKey("connect-{device}-intro"))}</div>
						<Button onClick={() => connectToDevice()}>{language(buildLanguageKey("connect-{device}-button"))}</Button>
					</div>
				}
				{deviceExternalAccount && deviceAccountStatus == 'fetchComplete' &&
					<div className="subtitle success">
						<FontAwesomeSvgIcon icon={faCheckCircle} /> {language(buildLanguageKey("received-{device}-data"))}
					</div>
				}
				{deviceExternalAccount && deviceAccountStatus == 'fetchingData' &&
					<div className="subtitle downloading">
						<FontAwesomeSvgIcon icon={faRefresh} spin /> {language("downloading-data")}
					</div>
				}
				{deviceExternalAccount && deviceAccountStatus == 'unauthorized' &&
					<div>
						<div className="subtitle reconnect">
							<FontAwesomeSvgIcon icon={faExclamationTriangle} /> {language("expired-reconnect")}
						</div>
						<Button onClick={() => connectToDevice()}>{language(buildLanguageKey("connect-{device}-button"))}</Button>
					</div>
				}
				{deviceExternalAccount && deviceAccountStatus == 'error' &&
					<div>
						<div className="subtitle reconnect">
							<FontAwesomeSvgIcon icon={faExclamationTriangle} /> {language("connect-error-reconnect")}
						</div>
						<Button onClick={() => connectToDevice()}>{language(buildLanguageKey("connect-{device}-button"))}</Button>
					</div>
				}
			</TextBlock>
		</div>
	);
}