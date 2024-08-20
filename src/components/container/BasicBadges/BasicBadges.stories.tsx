import React from "react"
import BasicBadges, { BasicBadgesProps } from "./BasicBadges";
import Card from "../../presentational/Card";
import Layout from "../../presentational/Layout";
import { Description } from "@storybook/blocks";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BasicBadges> = {
	title: "Container/BasicBadges",
	component: BasicBadges,
	parameters: {
		layout: 'fullscreen',
		docs: {
			Description: <Description />
		}
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const render = (args: BasicBadgesProps) => <Layout colorScheme='auto'>
    <Card>
        <BasicBadges {...args} />
    </Card>
</Layout>;

export const FiveBadges : Story = {
    args: {
        badgeCount: 5
    },
    render: render
};

export const TenBadges : Story = {
    args: {
        badgeCount:10
    },
    render: render
};


export const FiftyBadges : Story = {
    args: {
        badgeCount: 50
    },
    render: render
};


export const ZeroBadges : Story = {
    args: {
        badgeCount: 0
    },
    render: render
};


export const Live : Story = {
    args: {
        pointsForBadgesCustomField: "PointsAndBadges",
    },
    render: render
};