import React from "react"
import BasicBadges, { BasicBadgesProps } from "./BasicBadges"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/BasicBadges",
    component: BasicBadges,
    parameters: {
        layout: 'fullscreen',
    }
};

const render = (args: BasicBadgesProps) => <Layout colorScheme='auto'>
    <Card>
        <BasicBadges {...args} />
    </Card>
</Layout>;

export const FiveBadges = {
    args: {
        badgeCount: 5
    },
    render: render
};

export const TenBadges = {
    args: {
        badgeCount:10
    },
    render: render
};


export const FiftyBadges = {
    args: {
        badgeCount: 50
    },
    render: render
};


export const ZeroBadges = {
    args: {
        badgeCount: 0
    },
    render: render
};


export const Live = {
    args: {
        pointsForBadgesCustomField: "PointsAndBadges",
    },
    render: render
};