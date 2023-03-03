import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StepImageIcon from "./StepImageIcon";
import {IconElementProps} from "../shared"
import StepLayout from "../StepLayout";

export default {
    title: "SurveyStep/Components/StepImageIcon",
    component: StepImageIcon,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof StepImageIcon>;

const Template: ComponentStory<typeof StepImageIcon> = (args: IconElementProps) =>
    <StepLayout>
        <StepImageIcon {...args} />
    </StepLayout>

export const StepImageIconNoSrc = Template.bind({});
StepImageIconNoSrc.args = {
}

export const StepImageIconWithSrc = Template.bind({});
StepImageIconWithSrc.args = {
    srcUrl: "https://rkstudio-customer-assets.s3.amazonaws.com/CareEvolution/Images/CE-Logo-2022.png"
}