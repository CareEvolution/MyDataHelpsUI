import React from "react"
import SurveyResultTimeline, { SurveyResultTimelineProps } from "./SurveyResultTimeline";
import { Card, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";

export default {
    title: "Container/SurveyResultTimeline",
    component: SurveyResultTimeline,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: SurveyResultTimelineProps) => <Layout colorScheme="auto">
    <SurveyResultTimeline {...args} />
</Layout>;

export const Default = {
    args: {
        titleResultIdentifier: "title",
        previewState: "default"
    },
    render: render
};
