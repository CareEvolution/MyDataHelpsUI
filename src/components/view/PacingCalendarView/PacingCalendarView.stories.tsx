import React from "react";
import PacingCalendarView, { PacingCalendarViewProps } from "./PacingCalendarView";

export default { title: "View/PacingCalendarView", component: PacingCalendarView, parameters: { layout: 'fullscreen' } };
let render = (args: PacingCalendarViewProps) => <PacingCalendarView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};