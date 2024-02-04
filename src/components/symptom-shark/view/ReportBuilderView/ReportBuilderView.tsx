import React from 'react'
import { Layout, NavigationBar } from '../../../presentational';
import ReportBuilder from '../../container/ReportBuilder';
import language from '../../../../helpers/language';

export interface SymptomSharkReportBuilderViewProps {
    colorScheme?: "light" | "dark" | "auto";
    previewState?: "default";
}

export default function (props: SymptomSharkReportBuilderViewProps) {
    return (
        <Layout colorScheme={props.colorScheme ?? "light"}>
            <NavigationBar variant='compressed' title={language("reports")} />
            <ReportBuilder previewState={props.previewState} />
        </Layout>
    )
}