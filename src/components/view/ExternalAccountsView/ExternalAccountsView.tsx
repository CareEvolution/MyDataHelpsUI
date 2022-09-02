import React from 'react'
import { Layout, NavigationBar, StatusBarBackground } from "../.."
import language from "../../../helpers/language";
import ExternalAccountList from "../../container/ExternalAccountList";
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js";

export interface ExternalAccountsViewProps {
	excludeDeviceManufacturers?: boolean,
	presentation?: ViewPresentationType,
	preview?: boolean
}

export type ViewPresentationType = "Modal" | "Push";

export default function (props: ExternalAccountsViewProps) {

	let titleKey = props.excludeDeviceManufacturers ? "external-accounts-title-without-devices" : "external-accounts-title";

	function onExternalAccountsLoaded(accounts: ExternalAccount[]) {
		if (accounts.length === 0) {
			if (props.presentation === "Modal") {
				MyDataHelps.dismiss()
			} else {
				MyDataHelps.back();
			}
		}
	}

	return (
		<Layout>
			{props.presentation &&
				<NavigationBar title={language[titleKey]}
					showBackButton={props.presentation == "Push"}
					showCloseButton={props.presentation == "Modal"} />
			}
			{!props.presentation &&
				<StatusBarBackground color="var(--main-bg-color)" />
			}
			<ExternalAccountList previewState={props.preview ? "Default" : undefined} externalAccountProviderCategories={["Provider", "Health Plan"]} onExternalAccountsLoaded={onExternalAccountsLoaded} />
		</Layout>
	)
}