import React from 'react'
import { Layout, Card, NavigationBar, Title, ConditionsList } from "../.."
import { TermInformationReference } from "../../container/TermInformation/TermInformation";
import MyDataHelps from '@careevolution/mydatahelps-js';
import conditionIcon from "../../../assets/icon-problem.svg";
import language from '../../../helpers/language';

export interface ConditionsViewProps {
    presentation?: "Push" | "Modal"
    previewState?: "default"
    onViewTermInfo?(termInfo: TermInformationReference): void
    colorScheme?: "auto" | "light" | "dark"
}

export default function (props: ConditionsViewProps) {
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
                <Title order={2} autosizeImage image={<img src={conditionIcon} />} imageAlignment="left">{language("conditions-title")}</Title>
            </NavigationBar>
            <Card>
                <ConditionsList previewState={props.previewState} onViewTermInfo={(t) => viewTermInfo(t)} />
            </Card>
        </Layout>
    )
}