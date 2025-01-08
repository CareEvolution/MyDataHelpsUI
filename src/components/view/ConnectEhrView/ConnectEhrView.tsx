import React from 'react'
import { Card, Layout, NavigationBar, StatusBarBackground } from "../.."
import language from '../../../helpers/language'
import { ProviderSearch, ViewEhr } from '../../container'
import { TextBlock } from '../../presentational'
import ExternalAccountsPreview from "../../container/ExternalAccountsPreview";

export interface ConnectEhrViewProps {
    externalAccountsApplicationUrl?: string,
    onViewEhr?: () => void,
    excludeProviders?: boolean,
    excludeHealthPlans?: boolean,
    presentation?: ViewPresentationType,
    preview?: boolean,
    colorScheme?: "auto" | "light" | "dark"
    introText?: string
}

export type ViewPresentationType = "Modal" | "Push";

/**
 * This view enables participants to connect with their EHR providers and/or health plans.
 */
export default function ConnectEhrView(props: ConnectEhrViewProps) {
    let title = '';
    let providerCategories: string[] = [];

    if (!props.excludeProviders) {
        providerCategories.push('Provider');
        title += language('connect-ehr-title-providers');
    }
    if (!props.excludeHealthPlans) {
        providerCategories.push('Health Plan');
        if (title.length > 0) {
            title += language('connect-ehr-title-divider');
        }
        title += language('connect-ehr-title-health-plans');
    }
    title = language('connect-ehr-title-prefix') + title;

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
            <TextBlock>
                {props.introText ?? language('ehr-intro')}
            </TextBlock>
            {props.onViewEhr &&
                <Card>
                    <ViewEhr previewState={props.preview ? "fetchingData" : undefined} onClick={props.onViewEhr} />
                </Card>
            }
            {!props.externalAccountsApplicationUrl &&
                <Card>
                    <ExternalAccountsPreview previewState={props.preview ? "Default" : undefined} applicationUrl={props.externalAccountsApplicationUrl} excludeProviders={props.excludeProviders} excludeHealthPlans={props.excludeHealthPlans} excludeDeviceManufacturers={true} />
                </Card>
            }
            <Card>
                <ProviderSearch previewState={props.preview ? "Default" : undefined} providerCategories={providerCategories} />
            </Card>
        </Layout>
    )
}