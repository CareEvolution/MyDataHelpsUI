import React from "react";
import MedicationsView, { MedicationsViewProps } from "./MedicationsView";

export default { title: "View/MedicationsView", component: MedicationsView, parameters: { layout: 'fullscreen' } };
let render = (args: MedicationsViewProps) => <MedicationsView {...args} />
export const Default = {
    args: { presentation: "Push", previewState: "default" },
    render: render
};

export const Live = {
    args: { presentation: "Push" },
    render: render
};