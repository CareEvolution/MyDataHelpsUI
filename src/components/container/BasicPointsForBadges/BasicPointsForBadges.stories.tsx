import React from "react"
import BasicPointsForBadges, { BasicPointsForBadgesProps } from "./BasicPointsForBadges"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers";
import { DailyDataActivity } from "../../../helpers/BasicPointsAndBadges/DailyDataActivity";

export default {
    title: "Container/BasicPointsForBadges",
    component: BasicPointsForBadges,
    parameters: {
        layout: 'fullscreen',
    }
};

const render = (args: BasicPointsForBadgesProps) => <Layout colorScheme='auto'>
    <Card>
        <BasicPointsForBadges {...args} />
    </Card>
</Layout>;

export const Default = {
    args: {
        previewState: "default",
        activities: [
            {
                type: "dailyData",
                key: "steps",
                points: 100,
                activationDate: new Date("2024-01-01"),
                awardThreshold: 10000,
                dailyDataType: DailyDataType.FitbitSteps
            } as DailyDataActivity
        ],
        pointsPerBadge: 1000
    },
    render: render
};


export const ShowTotalPoints = {
    args: {
        previewState: "default",
        showTotalPoints: true,
        activities: [
            {
                type: "dailyData",
                key: "steps",
                points: 100,
                activationDate: new Date("2024-01-01"),
                awardThreshold: 10000,
                dailyDataType: DailyDataType.FitbitSteps
            } as DailyDataActivity
        ],
        pointsPerBadge: 1000
    },
    render: render
};


export const Live = {
    args: {
        pointsForBadge: 1000,
        activities: [
            {
                key: "FitbitSleepData",
                type: "dailyData",
                activationDate: new Date("2024-05-20"),
                points: 200,
                dailyDataType: DailyDataType.FitbitSleepMinutes,
                awardThreshold: 1
            },
            {
                key: "FitbitWearTime",
                type: "dailyData",
                activationDate: new Date("2024-05-20"),
                points: 100,
                dailyDataType: DailyDataType.FitbitWearMinutes,
                awardThreshold: 600
            },
            {
                key: "FitbitOrder",
                type: "survey",
                points: 800,
                surveyName: "OrderDevice",
                limit: 1
            },
            {
                key: "ConnectEhr",
                type: "connectExternalAccount",
                points: 250,
                providerCategories: ["Provider", "Health Plan"]
            },
        ]
    },
    render: render
};