
import React from "react";
import SymptomSharkLogEntryEdit, { SymptomSharkLogEntryEditProps } from "./LogEntryEdit";
import { Layout } from "../../../presentational";

export default { title: "SymptomShark/Container/LogEntryEdit", component: SymptomSharkLogEntryEdit, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkLogEntryEditProps) => <Layout colorScheme="auto"><SymptomSharkLogEntryEdit {...args} /></Layout>

export const Default = {
    args: {
        date: new Date(),
        previewState: "default"
    },
    render: render
};