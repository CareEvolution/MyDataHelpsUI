import React from "react";
import MonthlyActivityView, { MonthlyActivityViewProps } from "./MonthlyActivityView";

export default { title: "View/MonthlyActivityView", component: MonthlyActivityView, parameters: { layout: 'fullscreen' } };
let render = (args: MonthlyActivityViewProps) => <MonthlyActivityView {...args} />
export const Default = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};