
import React from "react";
import SymptomSharkLogToday, { SymptomSharkLogTodayProps } from "./SymptomSharkLogToday";
import { Layout } from "../../presentational";

export default { title: "Container/SymptomSharkLogToday", component: SymptomSharkLogToday, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkLogTodayProps) => <Layout colorScheme="auto"><SymptomSharkLogToday {...args} /></Layout>

export const NoLog = {
    args: {
        previewState: "noLog"
    },
    render: render
};

export const WithLog = {
    args: {
        previewState: "withLog"
    },
    render: render
};