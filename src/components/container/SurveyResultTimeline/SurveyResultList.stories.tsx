import React from "react"
import SurveyResultList, { SurveyResultListProps } from "./SurveyResultList";
import { Card, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";

export default {
    title: "Container/SurveyResultList",
    component: SurveyResultList,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: SurveyResultListProps) => <Layout colorScheme="auto">
    <SurveyResultList {...args} />
</Layout>;

export const Default = {
    args: {
        title: "Health Timeline",
        titleResultIdentifier: "title",
        previewState: "default"
    },
    render: render
};
