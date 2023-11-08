import React from 'react'
import { Layout, Card, NavigationBar, AllergiesList, Title } from "../.."
import { TermInformation } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import MyDataHelps from '@careevolution/mydatahelps-js';
import allergiesIcon from "../../../assets/icon-allergies.png";
import language from '../../../helpers/language';

export interface AllergiesViewProps {
    presentation?: "Push" | "Modal"
    previewState?: "default"
}

export default function (props: AllergiesViewProps) {
    function viewTermInfo(termInfo: TermInformation) {
        var queryString = new URLSearchParams({ termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode, lang: MyDataHelps.getCurrentLanguage() }).toString();
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/TermInformation.html?" + queryString, { modal: true });
    }

    return (
        <Layout>
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