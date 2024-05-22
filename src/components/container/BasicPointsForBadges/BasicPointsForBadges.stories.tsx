import React from "react"
import BasicPointsForBadges, { BasicPointsForBadgesProps } from "./BasicPointsForBadges"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers";

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
		previewState: "Default",
        goals: [
            { 
                type: "fitbitDailyData",
                key: "steps",
                points: 100,
                activationDate: new Date("2024-01-01"),
                awardThreshold: 10000,
                dailyDataType: DailyDataType.FitbitSteps
            }
        ],
        pointsForBadge: 1000
	},
	render: render
};


export const ShowTotalPoints = {
	args: {
		previewState: "Default",
		showTotalPoints: true,
        goals: [
            { 
                type: "fitbitDailyData",
                key: "steps",
                points: 100,
                activationDate: new Date("2024-01-01"),
                awardThreshold: 10000,
                dailyDataType: DailyDataType.FitbitSteps
            }
        ],
        pointsForBadge: 1000
	},
	render: render
};


export const Live = {
	args: {
		previewState: "Default",
        pointsForBadge: 1000
	},
	render: render
};