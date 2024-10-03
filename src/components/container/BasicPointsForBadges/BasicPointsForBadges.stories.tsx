import React from "react"
import BasicPointsForBadges, { BasicPointsForBadgesProps } from "./BasicPointsForBadges"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers";
import { DailyDataActivity } from "../../../helpers/BasicPointsAndBadges/DailyDataActivity";
import { DailyDataGoals } from "../../presentational/Grid/Grid.stories";
import DailyDataGoal from "../DailyDataGoal";
import { Grid, Title } from "../../presentational";
import BasicBadges from "../BasicBadges";
import Divider from "../../presentational/Divider";
import { startOfDay } from "date-fns";

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


export const WithGoalsAndBadges = {
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
    render: (args: BasicPointsForBadgesProps) => <Layout colorScheme='auto'>
        <Card>
            <BasicPointsForBadges {...args} />
            <Divider />
            <Title order={3} style={{ margin: "16px", marginBottom:"0" }} >Fitbit Wear</Title>
            <Grid>
                <Grid.Column span={6}>
                    <DailyDataGoal
                        defaultMargin
                        previewState="Default"
                        goal={1}
                        dailyDataType={DailyDataType.FitbitSleepMinutes}
                        title="Worn to Sleep"
                        subtitle="200 points"
                        messages={[
                            {
                                threshold: 0,
                                message: "No points yet"
                            },
                            {
                                threshold: 1,
                                message: "Complete!"
                            }
                        ]} />
                </Grid.Column>
                <Grid.Column span={6}>
                    <DailyDataGoal
                        defaultMargin
                        previewState="Default"
                        goal={600}
                        dailyDataType={DailyDataType.FitbitWearMinutes}
                        title="Worn 10 Hours"
                        subtitle="100 points"
                        messages={[
                            {
                                threshold: 0,
                                message: "No points yet"
                            },
                            {
                                threshold: 150,
                                message: "Keep going!"
                            },
                            {
                                threshold: 300,
                                message: "Halfway there!"
                            },
                            {
                                threshold: 450,
                                message: "Almost there!"
                            },
                            {
                                threshold: 600,
                                message: "Complete!"
                            }
                        ]} />
                </Grid.Column>
            </Grid>
            <Divider />
            <BasicBadges badgeCount={2} />
        </Card>
    </Layout>
};



export const Live = {
    args: {
        pointsPerBadge: 500,
        showTotalPoints: false,
        activities: [
            {
                key: "SleepMinutes",
                type: "dailyData",
                activationDate: startOfDay(new Date("2024-09-02")),
                points: 200,
                dailyDataType: DailyDataType.SleepMinutes,
                awardThreshold: 60
            },
          /*   {
                key: "ConsentSurveyComplete",
                type: "surveyCompleted",
                points: 50,
                surveyName: "Consent"
            },
            {
                key: "ConnectDevice",
                type: "connectExternalAccount",
                points: 100,
                providerCategories: ["Device Manufacturer"]
            },
            {
                key: "CustomFieldLE8",
                type: "custom",
                points: 25,
                customField: "PersonalGoal"
            }, */
        ],
        customField: "StudyRewards",
    },
    render: render
};

export const LiveShowTotalPoints = {
    args: {
        pointsPerBadge: 500,
        showTotalPoints: true,
        activities: [
            {
                key: "SleepMinutes",
                type: "dailyData",
                activationDate: startOfDay(new Date("2024-09-02")),
                points: 200,
                dailyDataType: DailyDataType.SleepMinutes,
                awardThreshold: 60
            },
           /*  {
                key: "ConsentSurveyComplete",
                type: "surveyCompleted",
                points: 50,
                surveyName: "Consent"
            },
            {
                key: "ConnectDevice",
                type: "connectExternalAccount",
                points: 100,
                providerCategories: ["Device Manufacturer"]
            },
            {
                key: "CustomFieldLE8",
                type: "custom",
                points: 25,
                customField: "PersonalGoal"
            }, */
        ],
        customField: "StudyRewards",
    },
    render: render
};