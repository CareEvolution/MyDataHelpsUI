
import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Grid, GridProps } from "./Grid";
import DailyDataGoal from "../../container/DailyDataGoal/DailyDataGoal";
import { DailyDataType } from "../../../helpers";
import MicroTrend from "../../container/MicroTrend/MicroTrend";

export default {
    title: "Presentational/Grid",
    component: Grid,
    parameters: {
        layout: 'fullscreen',
    }
};

const render = (args: GridProps) => <Layout colorScheme='auto'>
    <Card>
        <Grid {...args} />
    </Card>
</Layout>;


let defaultProps: GridProps = {
    children: [
        <>
            <Grid.Column span={1}>1</Grid.Column>
            <Grid.Column span={1}>2</Grid.Column>
            <Grid.Column span={1}>3</Grid.Column>
            <Grid.Column span={1}>4</Grid.Column>
            <Grid.Column span={1}>5</Grid.Column>
            <Grid.Column span={1}>6</Grid.Column>
            <Grid.Column span={1}>7</Grid.Column>
            <Grid.Column span={1}>8</Grid.Column>
            <Grid.Column span={1}>9</Grid.Column>
            <Grid.Column span={1}>10</Grid.Column>
            <Grid.Column span={1}>11</Grid.Column>
            <Grid.Column span={1}>12</Grid.Column>
        </>
    ]
}

export const Numbers = {
    args: defaultProps,
    render: render
};

let dailyDataGoals: GridProps = {
    children: [
        <>
            <Grid.Column span={6}>
                <DailyDataGoal
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
        </>
    ],
    style: {
        margin: "16px"
    }
}

export const DailyDataGoals = {
    args: dailyDataGoals,
    render: render
};

let trendGrid: GridProps = {
    children: [
        <>
            <Grid.Column span={6} variant="card">
                <MicroTrend previewState="default" dataType={{
                    dailyDataType: DailyDataType.Steps,
                    color: "rgba(255, 166, 102, 1)"
                }} />
            </Grid.Column>
            <Grid.Column span={6} variant="card">
                <MicroTrend previewState="default" dataType={{
                    dailyDataType: DailyDataType.SleepMinutes,
                    color: "rgba(74, 144, 226, 1)"
                }} />
            </Grid.Column>
            <Grid.Column span={6} variant="card">
                <MicroTrend previewState="default" dataType={{
                    label: "Air Quality",
                    dailyDataType: DailyDataType.HomeAirQuality,
                    color: "rgb(53, 166, 160)"
                }} />
            </Grid.Column>
            <Grid.Column span={6} variant="card">
                <MicroTrend previewState="default" dataType={{
                    dailyDataType: DailyDataType.RestingHeartRate,
                    color: "#e35c33"
                }} />
            </Grid.Column>
            <Grid.Column span={6} variant="card">
                <MicroTrend previewState="default" dataType={{
                    dailyDataType: DailyDataType.RestingHeartRate,
                    color: "#e35c33"
                }} />
            </Grid.Column>
            {/* Preview state not specified on purpose to ensure the grid collapses correctly */}
            <Grid.Column span={6} variant="card">
                <MicroTrend dataType={{
                    dailyDataType: DailyDataType.RestingHeartRate,
                    color: "#e35c33"
                }} />
            </Grid.Column>
            <Grid.Column span={6} variant="card">
                <MicroTrend dataType={{
                    dailyDataType: DailyDataType.RestingHeartRate,
                    color: "#e35c33"
                }} />
            </Grid.Column>
            <Grid.Column span={6} variant="card">
                <MicroTrend previewState="default" dataType={{
                    dailyDataType: DailyDataType.RestingHeartRate,
                    color: "#e35c33"
                }} />
            </Grid.Column>
        </>
    ],
    gap: 16,
    style: {
        marginLeft: "16px",
        marginTop: "16px"
    }
}

export const TrendGridCollapsesCorrectly = {
    args: trendGrid,
    render: (args: GridProps) => <Layout colorScheme='auto'>
        <Grid {...args} />
    </Layout>
};