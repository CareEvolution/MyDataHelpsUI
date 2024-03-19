import React from "react";
import PacingCoordinatorView, { PacingCoordinatorViewProps } from "./PacingCoordinatorView";

export default { title: "View/PacingCoordinatorView", component: PacingCoordinatorView, parameters: { layout: 'fullscreen' } };
let render = (args: PacingCoordinatorViewProps) => <PacingCoordinatorView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};