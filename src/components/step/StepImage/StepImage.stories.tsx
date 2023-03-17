import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepImage from "./StepImage";
import {IconElementProps} from "../shared"
import StepLayout from "../StepLayout";

export default {
    title: "SurveyStep/Components/StepImage",
    component: StepImage,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof StepImage>;

const Template: ComponentStory<typeof StepImage> = (args: IconElementProps) =>
    <StepLayout>
        <StepImage {...args} />
    </StepLayout>

export const StepImageIconNoSrc = Template.bind({});
StepImageIconNoSrc.args = {
}

export const StepImageIconWithSrc = Template.bind({});
StepImageIconWithSrc.args = {
    srcUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/MDH-Logo-2022.svg"
}