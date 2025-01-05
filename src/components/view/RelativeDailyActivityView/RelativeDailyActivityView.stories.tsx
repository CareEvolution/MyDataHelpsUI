import React from "react";
import RelativeDailyActivityView, { RelativeDailyActivityViewProps } from "./RelativeDailyActivityView";

export default { title: "View/RelativeDailyActivityView", component: RelativeDailyActivityView, parameters: { layout: 'fullscreen' } };
let render = (args: RelativeDailyActivityViewProps) => <RelativeDailyActivityView {...args} />
export const Default = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};