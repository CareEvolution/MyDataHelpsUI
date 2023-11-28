import React from "react";
import ConditionsView, { ConditionsViewProps } from "./ConditionsView";

export default { title: "View/ConditionsView", component: ConditionsView, parameters: { layout: 'fullscreen' } };
let render = (args: ConditionsViewProps) => <ConditionsView {...args} />
export const Default = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};

export const Live = {
    args: { presentation: "Push" },
    render: render
};