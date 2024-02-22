import React from "react";
import SymptomSharkCalendarView, { CalendarViewProps } from "./CalendarView";

export default { title: "SymptomShark/View/CalendarView", component: SymptomSharkCalendarView, parameters: { layout: 'fullscreen' } };
let render = (args: CalendarViewProps) => <SymptomSharkCalendarView {...args} />

export const Default = {
    args: {
        previewState: "default"
    },
    render: render
};

export const Live = {
    args: {
    },
    render: render
};