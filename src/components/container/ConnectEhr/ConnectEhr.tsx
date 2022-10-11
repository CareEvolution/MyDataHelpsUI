import React, { useEffect, useState } from 'react'
import { CardTitle, ShinyOverlay } from '../../presentational';
import "./ConnectEhr.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import language from '../../../helpers/language'
import { faCheckCircle, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import MyDataHelps from "@careevolution/mydatahelps-js"

export interface ConnectEhrProps {
	applicationUrl: ConnectEhrApplicationUrl,
	previewState?: ConnectEhrPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
}

export type ConnectEhrApplicationUrl = "preview" | string;
export type ConnectEhrPreviewState = "notEnabled" | "enabled" | "enabledConnected" | "enabledNeedsAttention";

export default function (props: ConnectEhrProps) {
	const [loading, setLoading] = useState(true);
	const [ehrEnabled, setEhrEnabled] = useState(false);
	const [projectName, setProjectName] = useState<null | string>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const [needsAttention, setNeedsAttention] = useState<boolean>(false);

	function initialize() {
		if (props.previewState) {
			if (props.previewState == "notEnabled") {
				return;
			}
			setEhrEnabled(true);
			setProjectName("PROJECT");
			if (props.previewState == "enabledConnected") {
				setConnected(true);
				setNeedsAttention(false);
			} else if (props.previewState == "enabledNeedsAttention") {
				setConnected(true);
				setNeedsAttention(true);
			}
			setLoading(false);
			return;
		}

		MyDataHelps.getDataCollectionSettings().then(function (settings) {
			setEhrEnabled(settings.ehrEnabled);
			if (settings.ehrEnabled) {
				MyDataHelps.getProjectInfo().then(function (projectInfo) {
					setProjectName(projectInfo.name);
					MyDataHelps.getExternalAccounts().then(function (accounts) {
						accounts = accounts.filter(a => ["Provider", "Health Plan"].indexOf(a.provider.category) != -1);
						setConnected(accounts.length > 0);
						setNeedsAttention(accounts.some((account) => account.status == "unauthorized" || account.status == "error"));
						setLoading(false);
					});
				});
			}
		});
	}

	function connectToEhr() {
		if (props.applicationUrl == "preview") {
			console.log("PREVIEW: Opening the connect EHR application.");
		} else {
			MyDataHelps.openApplication(props.applicationUrl);
		}
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

	if (!ehrEnabled) {
		if (props.disabledBehavior == 'displayError') {
			return (
				<div className="mdhui-connect-ehr">
					<div className="error-content">{language["connect-ehr-not-enabled"]}</div>
				</div>
			);
		} else {
			return null;
		}
	}

	if (loading) {
		return null;
	}

	return (
		<div className="mdhui-connect-ehr" onClick={() => connectToEhr()}>
			<CardTitle title={language["connect-ehr-title"]} />
			{connected
				? <div>
					<div className="connection-status">
						{needsAttention
							? <div className="warning">
								<FontAwesomeIcon icon={faTriangleExclamation} /> {language["connect-ehr-needs-attention"]}
							</div>
							: <div className="success">
								<FontAwesomeIcon icon={faCheckCircle} /> {language["connect-ehr-connected"]}
							</div>
						}
					</div>
					<div className="content">{language["connect-ehr-text-connected"].replace("@@PROJECT_NAME@@", projectName as any)}</div>
				</div>
				: <div className="content">{language["connect-ehr-text"].replace("@@PROJECT_NAME@@", projectName as any)}</div>
			}
			<div className="indicator">
				<FontAwesomeIcon icon={faChevronRight} />
			</div>
			<ShinyOverlay />
		</div>
	);
}