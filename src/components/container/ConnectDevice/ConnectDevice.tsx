import React, { useState, useEffect, ReactElement } from 'react'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle"
import { faRefresh } from "@fortawesome/free-solid-svg-icons/faRefresh"
import MyDataHelps, { ExternalAccount, ExternalAccountStatus } from "@careevolution/mydatahelps-js"
import { LoadingIndicator, Button, CardTitle, Title, Action, TextBlock } from '../../presentational';
import "./ConnectDevice.css"
import language from "../../../helpers/language"
import add from 'date-fns/add'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import isAfter from 'date-fns/isAfter'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import fitbit from '../../../assets/fitbit.svg';
import garmin from '../../../assets/garmin.svg';
import smartwatch from '../../../assets/smartwatch.svg';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { getFitbitProviderID, getGarminProviderID } from '../../../helpers/providerIDs';

export interface ConnectDeviceProps {
	language: ConnectDeviceLanguage
	hideWhenConnected?: boolean
	provider: "Fitbit" | "Garmin"
	previewState?: ConnectDevicePreviewState
	disabledBehavior?: 'hide' | 'displayError'
	innerRef?: React.Ref<HTMLDivElement>
	variant: "small" | "medium" | "large"
}

export interface ConnectDeviceLanguage {
	notConnectedTitle?: string
	notConnectedMessage?: string
	fetchCompleteTitle?: string
	fetchCompleteMessage?: string
	fetchingDataTitle?: string
	fetchingDataMessage?: string
	unauthorizedTitle?: string
	unauthorizedMessage?: string
	connectButtonText?: string
}

export type ConnectDevicePreviewState = ExternalAccountStatus | "notConnected" | "notEnabled";

export default function (props: ConnectDeviceProps) {
	const [loading, setLoading] = useState(true);
	const [deviceEnabled, setDeviceEnabled] = useState(false);
	const [deviceExternalAccount, setDeviceExternalAccount] = useState<ExternalAccount | null>(null);

	let providerID = props.provider == "Fitbit" ? getFitbitProviderID() : getGarminProviderID();

	function initialize() {
		if (props.previewState) {
			if (props.previewState == "notEnabled") {
				setLoading(false);
				return;
			}
			setDeviceEnabled(true);
			if (props.previewState == "notConnected") {
				setLoading(false);
				return;
			}
			setDeviceExternalAccount({
				id: 1,
				lastRefreshDate: formatISO(add(new Date(), { hours: -1 })),
				status: props.previewState,
				provider: {
					name: props.provider,
					category: "Device Manufacturer",
					id: providerID,
					logoUrl: ""
				}
			});
			setLoading(false);
			return;
		}

		MyDataHelps.getDataCollectionSettings().then(function (settings: any) {
			let enabled = props.provider == "Fitbit" ? settings.fitbitEnabled : settings.garminEnabled;
			setDeviceEnabled(enabled);
			if (enabled) {
				MyDataHelps.getExternalAccounts().then(function (accounts) {
					for (let i = 0; i < accounts.length; i++) {
						if (accounts[i].provider.id == providerID) {
							setDeviceExternalAccount(accounts[i]);
						}
					}
					setLoading(false);
				});
			} else {
				setLoading(false);
			}
		});
	}

	function connectToDevice() {
		MyDataHelps.connectExternalAccount(providerID);
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

	if (!deviceEnabled) {
		if (props.disabledBehavior == 'displayError' && !loading) {
			return (
				<div className="mdhui-connect-device" ref={props.innerRef}>
					<TextBlock>{props.provider} is not enabled for this project.</TextBlock>
				</div>
			);
		} else {
			return null;
		}
	}

	let title = props.language.notConnectedTitle;
	let message = props.language.notConnectedMessage;
	let image = providerID == getFitbitProviderID() ? fitbit : garmin;
	let icon: ReactElement | null = null;

	if (props.hideWhenConnected && deviceAccountStatus != 'unauthorized') {
		return null;
	}
	if (deviceAccountStatus == 'fetchComplete') {
		title = props.language.fetchCompleteTitle;
		message = props.language.fetchCompleteMessage;
		icon = <FontAwesomeSvgIcon icon={faCheckCircle} className="mdhui-connect-device-icon mdhui-color-success" />;
	}
	if (deviceAccountStatus == 'fetchingData') {
		title = props.language.fetchingDataTitle;
		message = props.language.fetchingDataMessage;
		icon = <FontAwesomeSvgIcon icon={faRefresh} spin className="mdhui-connect-device-icon mdhui-color-muted" />;
	}
	if (deviceAccountStatus == 'unauthorized') {
		title = props.language.unauthorizedTitle;
		message = props.language.unauthorizedMessage;
		icon = <FontAwesomeSvgIcon icon={faExclamationTriangle} className="mdhui-connect-device-icon mdhui-color-danger" />;
	}

	let classNames = ["mdhui-connect-device"];
	classNames.push("mdhui-connect-device-" + props.variant);

	if (props.variant == "small") {
		return <Action onClick={() => { }} className="mdhui-connect-device mdhui-connect-device-small" indicator={<div className="mdhui-connect-device-action">Add Account</div>}>
			<div className="mdhui-connect-device-title">
				<img src={image} />
				<Title order={4}>{props.provider}</Title>
			</div>
		</Action>
	}

	if (deviceAccountStatus == 'fetchingData') {
		return <Action onClick={() => { }} className="mdhui-connect-device mdhui-connect-device-small" indicator={<>Downloading Data&nbsp;&nbsp;<FontAwesomeSvgIcon icon={faRefresh} spin className="mdhui-connect-device-icon mdhui-color-muted" /></>}>
			<div className="mdhui-connect-device-title">
				<img src={image} />
				<Title order={4}>{props.provider}</Title>
			</div>
		</Action>
	}

	if (deviceAccountStatus == 'fetchComplete') {
		return <Action onClick={() => { }} className="mdhui-connect-device mdhui-connect-device-small" indicator={<>Connected</>}>
			<div className="mdhui-connect-device-title">
				<img src={image} />
				<Title order={4}>{props.provider}</Title>
			</div>
		</Action>
	}

	return (
		<div className={classNames.join(" ")} ref={props.innerRef}>
			<div className="mdhui-connect-device-title-wrapper">
				<div className="mdhui-connect-device-title">
					<img src={image} />
					<Title order={3}>{title}</Title>
				</div>
				{icon}
			</div>
			{loading &&
				<LoadingIndicator />
			}
			{!loading &&
				<div className="content">
					<div className="subtitle">
						{message}
					</div>
					{(!deviceExternalAccount || deviceAccountStatus == 'unauthorized') &&
						<Button onClick={() => connectToDevice()}><img style={{ verticalAlign: "middle" }} src={smartwatch} /> <span style={{ verticalAlign: "middle" }}>{props.language.connectButtonText}</span></Button>
					}
				</div>
			}
		</div>
	);
}