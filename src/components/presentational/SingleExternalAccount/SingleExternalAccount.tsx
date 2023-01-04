import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import React, { useState } from 'react';
import MyDataHelps, { ExternalAccount } from '@careevolution/mydatahelps-js';
import language from '../../../helpers/language';
import formatRelative from 'date-fns/formatRelative'
import "./SingleExternalAccount.css"
import parseISO from 'date-fns/parseISO'
import { enUS, es } from 'date-fns/locale';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';

export interface SingleExternalAccountProps {
	externalAccount: ExternalAccount;
	onAccountRemoved: (account: ExternalAccount) => void;
	onReconnectAccount: (account: ExternalAccount) => void;
}

export default function (props: SingleExternalAccountProps) {
	let locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
	const [statusOverride, setStatusOverride] = useState("");

	function removeAccount() {
		setStatusOverride("deleting");
		MyDataHelps.deleteExternalAccount(props.externalAccount.id).then(function () {
			props.onAccountRemoved(props.externalAccount);
		}).catch(function () {
			setStatusOverride("");
		});
	}

	function refresh() {
		setStatusOverride("fetchingData");
		MyDataHelps.refreshExternalAccount(props.externalAccount.id).then();
	}

	function getStatus() {
		if (statusOverride) { return statusOverride; }
		return props.externalAccount.status;
	}

	return (
		<div className="mdhui-single-external-account">
			<div className="external-account-header">
				{props.externalAccount.provider.logoUrl &&
					<img alt={props.externalAccount.provider.name} src={props.externalAccount.provider.logoUrl} className="external-account-provider-logo" />
				}
				{!props.externalAccount.provider.logoUrl &&
					<div className="external-account-provider-name">{props.externalAccount.provider.name}</div>
				}
				{getStatus() !== "deleting" && getStatus() !== "fetchingData" &&
					<button className="delete-button" onClick={removeAccount} title={language["external-account-remove"]}>
						<FontAwesomeSvgIcon icon={faTrash} />
					</button>
				}
			</div>
			<div className="external-account-status">
				{getStatus() === "unauthorized" &&
					<p>
						<span className="error">{language["external-account-authorization-expired"]}</span>
					</p>
				}
				{getStatus() === "fetchingData" &&
					<p>
						<FontAwesomeSvgIcon icon={faRefresh} spin /> {language["external-account-fetching-data"]}
					</p>
				}
				{getStatus() === "fetchComplete" &&
					<p>
						{language["external-account-last-updated"]}&nbsp;
						<strong>{formatRelative(parseISO(props.externalAccount.lastRefreshDate), new Date(), { locale: locale })}</strong>
					</p>
				}
				{getStatus() === "error" &&
					<p className="error">
						{language["external-account-error"]}
					</p>
				}
				{(getStatus() === "fetchComplete" || getStatus() === "error") &&
					<p>
						<a href="javascript:{}" onClick={refresh}>
							<FontAwesomeSvgIcon icon={faRepeat} /> {language["external-account-refresh"]}
						</a>
					</p>
				}
				{getStatus() === "unauthorized" &&
					<p>
						<a href="javascript:{}" onClick={() => props.onReconnectAccount(props.externalAccount)}>
							<FontAwesomeSvgIcon icon={faRepeat} /> {language["external-account-reconnect"]}
						</a>
					</p>
				}
				{getStatus() === "deleting" &&
					<p>
						<FontAwesomeSvgIcon icon={faRefresh} spin /> {language["external-account-deleting"]}
					</p>
				}
			</div>
		</div>
	);
}