import React from 'react'
import { Layout, NavigationBar, StatusBarBackground } from "../.."
import language from "../../../helpers/language";
import ExternalAccountList from "../../container/ExternalAccountList";
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js";

export interface ExternalAccountsViewProps {
    excludeProviders?: boolean;
    excludeHealthPlans?: boolean;
    excludeDeviceManufacturers?: boolean;
    presentation?: ViewPresentationType;
    previewState?: "default";
    colorScheme?: "auto" | "light" | "dark";
    onBack?(): void
    onClose?(): void
    reconnectOpenNewWindow?: boolean
    standaloneModeFinalRedirectPath?: string
}

export type ViewPresentationType = "Modal" | "Push";

export default function (props: ExternalAccountsViewProps) {
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
                    showCloseButton={props.presentation == "Modal"}
                    onBack={props.onBack}
                    onClose={props.onClose} />
            }
            {!props.presentation &&
                <StatusBarBackground />
            }
            <ExternalAccountList previewState={props.previewState}
                externalAccountProviderCategories={externalAccountProviderCategories}
                onExternalAccountsLoaded={onExternalAccountsLoaded}
                reconnectOpenNewWindow={props.reconnectOpenNewWindow}
                standaloneModeFinalRedirectPath={props.standaloneModeFinalRedirectPath} />
        </Layout>
    )
}