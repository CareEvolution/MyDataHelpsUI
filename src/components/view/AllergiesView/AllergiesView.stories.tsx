import React from "react";
import AllergiesView, { AllergiesViewProps } from "./AllergiesView";

export default { title: "View/AllergiesView", component: AllergiesView, parameters: { layout: 'fullscreen' } };
let render = (args: AllergiesViewProps) => <AllergiesView {...args} />
export const Default = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};

export const Live = {
    args: { presentation: "Push" },
    render: render
};