
import React from "react";
import SymptomSharkLogEntryList, { SymptomSharkLogEntryListProps } from "./LogEntryList";
import { Layout } from "../../../presentational";

export default { title: "SymptomShark/Container/LogEntryList", component: SymptomSharkLogEntryList, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkLogEntryListProps) => <Layout colorScheme="auto"><SymptomSharkLogEntryList {...args} /></Layout>

export const Default = {
    args: {
        previewState: "default"
    },
    render: render
};