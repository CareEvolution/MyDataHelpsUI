import React from 'react'
import { Layout, Card, NavigationBar, MedicationsList, Title } from "../.."
import MyDataHelps from '@careevolution/mydatahelps-js';
import medicationIcon from "../../../assets/icon-medication.svg";
import language from '../../../helpers/language';
import { TermInformationReference } from "../../container/TermInformation/TermInformation";

export interface MedicationsViewProps {
    presentation?: "Push" | "Modal"
    previewState?: "default"
    onViewTermInfo?(termInfo: TermInformationReference): void
    colorScheme?: "auto" | "light" | "dark"
}

export default function (props: MedicationsViewProps) {
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
                <Title order={2} autosizeImage image={<img src={medicationIcon} />} imageAlignment="left">{language("medications-title")}</Title>
            </NavigationBar>
            <Card>
                <MedicationsList previewState={props.previewState} onViewTermInfo={(t) => viewTermInfo(t)} />
            </Card>
        </Layout>
    )
}