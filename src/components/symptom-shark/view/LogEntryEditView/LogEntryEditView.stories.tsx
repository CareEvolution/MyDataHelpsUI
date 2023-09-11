
import React from "react";
import SymptomSharkLogEntryEditView, { LogEntryEditViewProps } from "./LogEntryEditView";
import { Layout } from "../../../presentational";

export default { title: "SymptomShark/View/LogEntryEditView", component: SymptomSharkLogEntryEditView, parameters: { layout: 'fullscreen' } };
let render = (args: LogEntryEditViewProps) => <Layout colorScheme="auto"><SymptomSharkLogEntryEditView {...args} /></Layout>

export const Default = {
    args: {
        date: new Date(),
        previewState: "default"
    },
    render: render
};