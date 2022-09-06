import React from 'react'
import {Card, Layout, NavigationBar, StatusBarBackground} from "../.."
import language from '../../../helpers/language'
import {ProviderSearch} from '../../container'
import {TextBlock} from '../../presentational'
import ExternalAccountsPreview from "../../container/ExternalAccountsPreview";
import {ExternalAccountsApplicationUrl} from "../../container/ExternalAccountsPreview/ExternalAccountsPreview";

export interface ConnectEhrViewProps {
    externalAccountsApplicationUrl: ExternalAccountsApplicationUrl,
    presentation?: ViewPresentationType,
    preview?: boolean
}

export type ViewPresentationType = "Modal" | "Push";

export default function (props: ConnectEhrViewProps) {
    return (
        <Layout>
            {props.presentation &&
            <NavigationBar title={language["connect-ehr-title"]}
                           showBackButton={props.presentation == "Push"}
                           showCloseButton={props.presentation == "Modal"}/>
            }
            {!props.presentation &&
            <StatusBarBackground color="var(--main-bg-color)"/>
            }
            <TextBlock>
                {language["ehr-intro"]}
            </TextBlock>
            <Card>
                <ExternalAccountsPreview previewState={props.preview ? "Default" : undefined} applicationUrl={props.externalAccountsApplicationUrl} excludeDeviceManufacturers={true}/>
            </Card>
            <Card>
                <ProviderSearch previewState={props.preview ? "Default" : undefined} providerCategories={["Provider", "Health Plan"]} pageSize={10} />
            </Card>
        </Layout>
    )
}