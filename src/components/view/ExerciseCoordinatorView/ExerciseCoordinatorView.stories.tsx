import React from "react";
import ExerciseCoordinatorView, { ExerciseCoordinatorViewProps } from "./ExerciseCoordinatorView";

export default { title: "View/ExerciseCoordinatorView", component: ExerciseCoordinatorView, parameters: { layout: 'fullscreen' } };
let render = (args: ExerciseCoordinatorViewProps) => <ExerciseCoordinatorView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};