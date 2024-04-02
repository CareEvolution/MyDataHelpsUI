import React, { useEffect, useState } from 'react'
import { Action, Button, TextBlock, Title } from '../../presentational';
import "./ConnectEhr.css"
import language from '../../../helpers/language'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation"
import MyDataHelps from "@careevolution/mydatahelps-js"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import ConnectEHR from "../../../assets/connect-ehr.svg";
import { ColorDefinition } from '../../../helpers/colors';

export interface ConnectEhrProps {
	applicationUrl?: ConnectEhrApplicationUrl,
	previewState?: ConnectEhrPreviewState,
	disabledBehavior?: 'hide' | 'displayError'
	bottomBorder?: boolean
	innerRef?: React.Ref<HTMLDivElement>
	variant?: "large" | "medium" | "small"
	title?: string
	notConnectedText?: string
	connectedText?: string
	hideWhenConnected?: boolean
	buttonColor?: ColorDefinition
	onClick?: () => void
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
			if (props.onClick) {
				props.onClick();
			} else if (props.applicationUrl) {
				MyDataHelps.openApplication(props.applicationUrl);
			}
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
				<div ref={props.innerRef} className="mdhui-connect-ehr">
					<div className="error-content">{language("connect-ehr-not-enabled")}</div>
				</div>
			);
		} else {
			return null;
		}
	}

	if (loading) {
		return null;
	}

	if (props.hideWhenConnected && connected) {
		return null;
	}

	let defaultTitle = language('connect-ehr-title-prefix') + language('connect-ehr-title-providers') + language('connect-ehr-title-divider') + language('connect-ehr-title-health-plans');
	let title = props.title || defaultTitle;

	const projectNameSubstitutionTarget = "@@PROJECT_NAME@@";
	let connectedText = props.connectedText || language("connect-ehr-text-connected").replace(projectNameSubstitutionTarget, projectName || "");
	let notConnectedText = props.notConnectedText || language("connect-ehr-text").replace(projectNameSubstitutionTarget, projectName || "");
	let text = (connected ? connectedText : notConnectedText);

	let headerVariant = props.variant || "large";

	let content = <>
		<Title autosizeImage defaultMargin order={headerVariant == "large" ? 2 : 3} imageAlignment={headerVariant == "large" ? "top" : "left"} image={<img src={ConnectEHR} />}>{title}</Title>
		<TextBlock>
			{connected
				? <>
					<div className="connection-status">
						{needsAttention
							? <div className="warning">
								<FontAwesomeSvgIcon icon={faTriangleExclamation} /> {language("connect-ehr-needs-attention")}
							</div>
							: <div className="success">
								<FontAwesomeSvgIcon icon={faCheckCircle} /> {language("connect-ehr-connected")}
							</div>
						}
					</div>
					<div className="content">{text}</div>
				</>
				: <div className="content">{text}</div>
			}
		</TextBlock>
	</>;

	return (
		<div ref={props.innerRef} className="mdhui-connect-ehr">
			{props.variant == "small" &&
				<Action className="mdhui-connect-ehr-action" onClick={() => connectToEhr()}>
					{content}
				</Action>
			}
			{props.variant != "small" &&
				<>{content}
					<Button color={props.buttonColor} defaultMargin onClick={() => connectToEhr()}><FontAwesomeSvgIcon icon={faAddressCard} />&nbsp;&nbsp; {defaultTitle}</Button>
				</>
			}
		</div>
	);
}