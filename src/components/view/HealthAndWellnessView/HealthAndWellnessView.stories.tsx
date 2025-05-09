﻿import React from "react"
import HealthAndWellnessView, { HealthAndWellnessViewProps } from "./HealthAndWellnessView"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"

const meta: Meta<typeof HealthAndWellnessView> = {
    title: "View/HealthAndWellnessView",
    component: HealthAndWellnessView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof HealthAndWellnessView>;

const render = (args: HealthAndWellnessViewProps) => <HealthAndWellnessView {...args} />;

export const Default: Story = {
    args: {
        previewState: "default"
    },
    render: render
};

export const CardBased: Story = {
    args: {
        previewState: "default",
        variant: "cardBased"
    },
    render: render
};

export const Live: Story = {
    args: {},
    render: render
};