import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import NotesTimeline, { SymptomSharkNotesTimelineProps } from "./NotesTimeline";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/NotesTimeline", component: NotesTimeline, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkNotesTimelineProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default" showFilters>
            <Section><NotesTimeline {...args} /></Section>
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>;

export const Default = {
    render: render
};