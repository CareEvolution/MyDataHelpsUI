
import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { Grid, GridProps } from "./Grid";
import DailyDataGoal from "../../container/DailyDataGoal/DailyDataGoal";

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
                    dailyDataType="FitbitSleepMinutes"
                    title="Worn to Sleep"
                    subtitle="200 points" />
            </Grid.Column>
            <Grid.Column span={6}>
                <DailyDataGoal
                    previewState="Default"
                    goal={1}
                    dailyDataType="FitbitSleepMinutes"
                    title="Worn to Sleep"
                    subtitle="200 points" />
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