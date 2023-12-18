import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import SwellingCalendar, { SwellingCalendarProps } from "./SwellingCalendar";
import { DateRangeCoordinator } from "../../presentational";

export default {
    title: 'Container/SwellingCalendar',
    component: SwellingCalendar,
    parameters: {layout: 'fullscreen'}
};

const render = (args: SwellingCalendarProps) => <Layout colorScheme='auto'>
    <Card>
        <DateRangeCoordinator intervalType={"Month"}>
            <SwellingCalendar {...args} />
        </DateRangeCoordinator>
    </Card>
</Layout>;

const today : Date = new Date();

export const NoData = {
    args : {
        surveyName: 'Survey 1',
        severityResultIdentifier : 'severityValue', 
        dateRecordedResultIdentifier : 'swellingDate',
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