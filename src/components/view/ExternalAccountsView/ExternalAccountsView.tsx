import React from 'react'
import { Layout, NavigationBar, StatusBarBackground } from "../.."
import language from "../../../helpers/language";
import ExternalAccountList from "../../container/ExternalAccountList";
import MyDataHelps, { ConnectExternalAccountOptions, ExternalAccount } from "@careevolution/mydatahelps-js";

export interface ExternalAccountsViewProps {
    excludeProviders?: boolean;
    excludeHealthPlans?: boolean;
    excludeDeviceManufacturers?: boolean;
    presentation?: ViewPresentationType;
    previewState?: "default";
    colorScheme?: "auto" | "light" | "dark";
    connectExternalAccountOptions?: ConnectExternalAccountOptions;
}

export type ViewPresentationType = "Modal" | "Push";

/**
 * This view provides an overview of the participant's connected Providers, Health Plans, and Devices.
 * It displays the status of each connection and offers the option to reconnect as needed.
 */
export default function ExternalAccountsView(props: ExternalAccountsViewProps) {
    let title = '';
    let externalAccountProviderCategories: string[] = [];

    if (!props.excludeProviders) {
        externalAccountProviderCategories.push('Provider');
        title += language('external-accounts-title-providers');
    }
    if (!props.excludeHealthPlans) {
        externalAccountProviderCategories.push('Health Plan');
        if (title.length > 0) {
            title += language('external-accounts-title-divider');
        }
        title += language('external-accounts-title-health-plans');
    }
    if (!props.excludeDeviceManufacturers) {
        externalAccountProviderCategories.push('Device Manufacturer');
        if (title.length > 0) {
            title += language('external-accounts-title-divider');
        }
        title += language('external-accounts-title-devices');
    }

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
        <Layout colorScheme={props.colorScheme ?? "auto"}>
            {props.presentation &&
                <NavigationBar title={title}
                    showBackButton={props.presentation == "Push"}
                    showCloseButton={props.presentation == "Modal"} />
            }
            {!props.presentation &&
                <StatusBarBackground />
            }
            <ExternalAccountList previewState={props.previewState}
                externalAccountProviderCategories={externalAccountProviderCategories}
                onExternalAccountsLoaded={onExternalAccountsLoaded}
                connectExternalAccountOptions={props.connectExternalAccountOptions} />
        </Layout>
    )
}