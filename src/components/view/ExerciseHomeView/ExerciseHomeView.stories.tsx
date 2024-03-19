import React from "react";
import ExerciseHomeView, { ExerciseHomeViewProps } from "./ExerciseHomeView";

export default { title: "View/ExerciseHomeView", component: ExerciseHomeView, parameters: { layout: 'fullscreen' } };
let render = (args: ExerciseHomeViewProps) => <ExerciseHomeView {...args} />
export const Default = {
    args: { previewState: "default" },
    render: render
};