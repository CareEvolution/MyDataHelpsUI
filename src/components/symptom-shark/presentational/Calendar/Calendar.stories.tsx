import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import SymptomSharkCalendar, { SymptomSharkCalendarProps } from "./Calendar";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/Calendar", component: SymptomSharkCalendar, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkCalendarProps) => <Layout>
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default" showFilters>
            <Section>
                <SymptomSharkCalendar {...args} />
            </Section>
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

let defaultProps: SymptomSharkCalendarProps = {
    onDaySelected: (d: Date) => { }
};

export const Default = {
    args: defaultProps,
    render: render
};