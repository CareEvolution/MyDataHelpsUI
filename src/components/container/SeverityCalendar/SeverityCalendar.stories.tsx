import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import SeverityCalendar, { SeverityCalendarProps } from "./SeverityCalendar";
import { DateRangeCoordinator } from "../../presentational";

export default {
    title: 'Container/SeverityCalendar',
    component: SeverityCalendar,
    parameters: {layout: 'fullscreen'},
    argTypes: {
        severityResultIdentifier: { control: 'text', description:  "Result values must be one of mild = [mild, severity1], moderate = [moderate, severity2], severe = [severe, severity3]" }
    }
};

const render = (args: SeverityCalendarProps) => <Layout colorScheme='auto'>
    <Card>
        <DateRangeCoordinator intervalType={"Month"}>
            <SeverityCalendar {...args} />
        </DateRangeCoordinator>
    </Card>
</Layout>;

const today : Date = new Date();

export const NoData = {
    args : {
        surveyName: 'Survey 1',
        severityResultIdentifier : '', 
        dateRecordedResultIdentifier : '',
        previewState : 'NoData'
    },
    render : render
};

export const WithData = {
    args : {
        surveyName: 'Survey 1',
        severityResultIdentifier : 'severityValue', 
        dateRecordedResultIdentifier : 'swellingDate',
        previewState : 'WithData'
    },
    render : render
};

export const Live = {
    args : {
        surveyName: 'RESOLVE Swelling and Urine Protein Measurements - OPTIONAL', 
        severityResultIdentifier : 'Swelling Severity', 
        dateRecordedResultIdentifier : 'Recent Swelling Date',
        previewState : 'Live'
    },
    render : render
};