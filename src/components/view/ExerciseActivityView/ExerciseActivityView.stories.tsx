import React from "react";
import ExerciseActivityView, { ExerciseActivityViewProps } from "./ExerciseActivityView";

export default { title: "View/ExerciseActivityView", component: ExerciseActivityView, parameters: { layout: 'fullscreen' } };
let render = (args: ExerciseActivityViewProps) => <ExerciseActivityView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};