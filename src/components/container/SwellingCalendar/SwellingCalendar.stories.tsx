import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import SwellingCalendar from "./SwellingCalendar";
import { SurveyResultDataParameters } from "../../../helpers/daily-data-providers";

export default {
    title: "Container/SwellingCalendar",
    component: SwellingCalendar,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof SwellingCalendar>;

const Template: ComponentStory<typeof SwellingCalendar> = (args: SwellingCalendar) =>
    <Layout colorScheme="auto">
        <Card>
            <SwellingCalendar {...args} />
        </Card>
    </Layout>;

const today : Date = new Date();

export const NoData = Template.bind({});
NoData.args = {
    surveyName: "Survey 1",
    severityResultIdentifier : "severityValue", 
    dateRecordedResultIdentifier : "swellingDate",
    previewState : "NoData"
}

export const WithData = Template.bind({});
WithData.args = {
    surveyName: "Survey 1",
    severityResultIdentifier : "severityValue", 
    dateRecordedResultIdentifier : "swellingDate",
    previewState : "WithData"
}

export const Live = Template.bind({});
Live.args = {
    surveyName: "RESOLVE Swelling and Urine Protein Measurements - OPTIONAL", 
    severityResultIdentifier : "Swelling Severity",
    dateRecordedResultIdentifier : "Recent Swelling Date",
    previewState : "Live"
}