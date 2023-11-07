import React from 'react'
import { Layout, Card, NavigationBar, Title, ConditionsList } from "../.."
import { TermInformation } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import MyDataHelps from '@careevolution/mydatahelps-js';
import conditionIcon from "../../../assets/icon-problem.svg";
import language from '../../../helpers/language';

export interface ConditionsViewProps {
    presentation?: "Push" | "Modal"
    previewState?: "default"
}

export default function (props: ConditionsViewProps) {
    function viewTermInfo(termInfo: TermInformation) {
        var queryString = new URLSearchParams({ termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode, lang: MyDataHelps.getCurrentLanguage() }).toString();
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/TermInformation.html?" + queryString, { modal: true });
    }

    return (
        <Layout>
            <NavigationBar
                showBackButton={props.presentation == "Push"}
                showCloseButton={props.presentation == "Modal"}>
                <Title order={2} autosizeImage image={<img src={conditionIcon} />} imageAlignment="left">{language("conditions")}</Title>
            </NavigationBar>
            <Card>
                <ConditionsList previewState={props.previewState} onViewTermInfo={(t) => viewTermInfo(t)} />
            </Card>
        </Layout>
    )
}