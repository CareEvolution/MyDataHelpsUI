
import React from "react";
import SymptomSharkLogEntryEdit, { SymptomSharkLogEntryEditProps } from "./SymptomSharkLogEntryEdit";
import { Layout } from "../../presentational";

export default { title: "Container/SymptomSharkLogEntryEdit", component: SymptomSharkLogEntryEdit, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkLogEntryEditProps) => <Layout colorScheme="auto"><SymptomSharkLogEntryEdit {...args} /></Layout>

export const Default = {
    args: {
        date: new Date(),
        previewState: "default"
    },
    render: render
};