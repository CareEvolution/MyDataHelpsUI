import React, { useState, useEffect } from 'react'
import "./ExternalAccountsPreview.css"
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js"
import { Action } from '../../presentational'
import language from '../../../helpers/language'
import { previewAccounts } from './ExternalAccountsPreview.previewdata'

export interface ExternalAccountsPreviewProps {
	excludeDeviceManufacturers?: boolean
	applicationUrl: ExternalAccountsApplicationUrl,
	previewState?: ExternalAccountsPreviewPreviewState
}

export type ExternalAccountsApplicationUrl = "preview" | string;
export type ExternalAccountsPreviewPreviewState = "Default";

export default function (props: ExternalAccountsPreviewProps) {
	const [externalAccounts, setExternalAccounts] = useState<ExternalAccount[] | null>(null);

	function initialize() {
		if (props.previewState == "Default") {
			setExternalAccounts(previewAccounts);
			return;
		}

		MyDataHelps.getExternalAccounts().then(function (accounts) {
			if (props.excludeDeviceManufacturers) {
				accounts = accounts.filter(a => a.provider.category != "Device Manufacturer");
			}
			setExternalAccounts(accounts);
		});
	}

	function manageExternalAccounts() {
		if (props.applicationUrl == "preview") {
			console.log("PREVIEW: Opening the external accounts application.");
		} else {
			MyDataHelps.openApplication(props.applicationUrl);
		}
	}

	useEffect(() => {
		initialize();
		MyDataHelps.on("applicationDidBecomeVisible", initialize);
		return () => {
			MyDataHelps.off("applicationDidBecomeVisible", initialize);
		}
	}, []);

	if (!externalAccounts || !externalAccounts.length) {
		return null;
	}

	let titleKey = props.excludeDeviceManufacturers ? "external-accounts-title-without-devices" : "external-accounts-title";

	return (
		<div className="mdhui-external-accounts-preview">
			<Action title={language[titleKey]} onClick={() => manageExternalAccounts()}>
				{externalAccounts.map((account) =>
					<div key={account.id} className="external-account-title">{account.provider.name}</div>
				)}
			</Action>
		</div>
	);
}