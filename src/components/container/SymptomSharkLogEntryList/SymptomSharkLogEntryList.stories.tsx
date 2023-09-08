
import React from "react";
import SymptomSharkLogEntryList, { SymptomSharkLogEntryListProps } from "./SymptomSharkLogEntryList";
import { Layout } from "../../presentational";

export default { title: "Container/SymptomSharkLogEntryList", component: SymptomSharkLogEntryList, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkLogEntryListProps) => <Layout colorScheme="auto"><SymptomSharkLogEntryList {...args} /></Layout>

export const Default = {
    args: {
        previewState: "default"
    },
    render: render
};