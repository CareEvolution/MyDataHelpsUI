import React from 'react'
import { Layout, Card, NavigationBar, AllergiesList, Title } from "../.."
import { TermInformationReference } from "../../container/TermInformation/TermInformation";
import MyDataHelps from '@careevolution/mydatahelps-js';
import allergiesIcon from "../../../assets/icon-allergies.png";
import language from '../../../helpers/language';

export interface AllergiesViewProps {
    presentation?: "Push" | "Modal"
    previewState?: "default"
    onViewTermInfo?(termInfo: TermInformationReference): void
    colorScheme?: "auto" | "light" | "dark"
}

/**
 * This view shows a listing of allergies pulled from the connected Providers, and Health Plans.
 */
export default function AllergiesView(props: AllergiesViewProps) {
    function viewTermInfo(termInfo: TermInformationReference) {
        if (props.onViewTermInfo) {
            props.onViewTermInfo(termInfo);
            return;
        }
        var queryString = new URLSearchParams({ termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode, lang: MyDataHelps.getCurrentLanguage() }).toString();
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/TermInformation.html?" + queryString, { modal: true });
    }

    return (
        <Layout colorScheme={props.colorScheme}>
            <NavigationBar
                showBackButton={props.presentation == "Push"}
                showCloseButton={props.presentation == "Modal"}>
                <Title order={2} autosizeImage image={<img src={allergiesIcon} />} imageAlignment="left">{language("allergies-title")}</Title>
            </NavigationBar>
            <Card>
                <AllergiesList previewState={props.previewState} onViewTermInfo={(t) => viewTermInfo(t)} />
            </Card>
        </Layout>
    )
}