import MyDataHelps, { SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { startOfDay } from "date-fns";
import queryAllSurveyAnswers from "../query-all-survey-answers";
import { queryDailyData } from "../query-daily-data";

export interface PointsAndBadgesState {
    points: number;
    badges: number;
}

export async function getCurrentPointsAndBadges(): Promise<PointsAndBadgesState> {
    let state = (await MyDataHelps.queryDeviceData({ type: "BasicPointsAndBadges", namespace: "Project" })).deviceDataPoints;
    if (state.length > 0) {
        return JSON.parse(state[0].value);
    }
    return { points: 0, badges: 0 };
}

export async function persistCurrentPointsAndBadges(state: PointsAndBadgesState) {
    await MyDataHelps.persistDeviceData([{
        type: "BasicPointsAndBadges",
        value: JSON.stringify(state)
    }]);
}

export interface BasicPointsForBadgesGoal {
    key: string;
    type: "dailyData" | "surveyCompleted" | "connectExternalAccount";
    points: number;
}

interface DailyDataPointsForBadgesGoal extends BasicPointsForBadgesGoal {
    type: "dailyData";
    activationDate: Date;
    awardThreshold: number;
    dailyDataType: string;
}

interface SurveyCompletedPointsForBadgesGoal extends BasicPointsForBadgesGoal {
    type: "surveyCompleted";
    surveyName: string;
    limit?: number;
}

interface ConnectExternalAccountPointsForBadgesGoal extends BasicPointsForBadgesGoal {
    type: "connectExternalAccount";
    category: string;
}

async function pointsForConnectExternalAccountGoal(goal: ConnectExternalAccountPointsForBadgesGoal, goalState?: string) {
    let pastConnectedProviders = goalState ? JSON.parse(goalState) as number[] : [];
    let connectedAccounts = await MyDataHelps.getExternalAccounts();
    let newProviders = connectedAccounts.filter(account => account.provider.category == goal.category && !pastConnectedProviders.includes(account.provider.id));
    let allProviders = connectedAccounts.map(account => account.provider.category == goal.category && account.id);
    if (newProviders.length > 0) {
        storeGoalState(goal.key, allProviders);
    }
    return newProviders.length * goal.points;
}

interface SurveyCompletedGoalState {
    countCompleted: number;
    lastQueryDate?: string;
}

async function pointsForSurveyCompletedGoal(goal: SurveyCompletedPointsForBadgesGoal, goalState?: string) {
    let state = goalState ? JSON.parse(goalState) as SurveyCompletedGoalState : { countCompleted: 0, lastQueryDate: undefined };

    var parameters: SurveyAnswersQuery = {
        surveyName: goal.surveyName
    };

    if (state.lastQueryDate) {
        parameters.insertedAfter = state.lastQueryDate;
    }

    if (goal.limit != undefined && state.countCompleted >= goal.limit) {
        return 0;
    }

    let answers = await queryAllSurveyAnswers(parameters);
    let newUniqueResults = answers.map(answer => answer.surveyResultID).filter((value, index, self) => self.indexOf(value) === index);
    if (goal.limit != undefined && newUniqueResults.length + state.countCompleted > goal.limit) {
        newUniqueResults = newUniqueResults.slice(0, goal.limit - state.countCompleted);
    }

    if (newUniqueResults.length > 0) {
        state.countCompleted += newUniqueResults.length;
        state.lastQueryDate = answers.length > 0 ? answers[0].insertedDate : state.lastQueryDate;
        storeGoalState(goal.key, state);
    }
    return newUniqueResults.length * goal.points;
}

async function pointsForDailyDataGoal(goal: DailyDataPointsForBadgesGoal, goalState?: string) {
    let daysAwarded = JSON.parse(goalState || "[]") as string[];

    let startDate = startOfDay(new Date());
    if (!goalState) {
        startDate = goal.activationDate;
    }

    let dailyData = await queryDailyData(goal.dailyDataType, startDate, new Date());
    let days = Object.keys(dailyData);
    let daysToAward = days.filter(day => !daysAwarded.includes(day) && dailyData[day] >= goal.awardThreshold);
    if (daysToAward.length > 0) {
        daysAwarded.push(...daysToAward);
        storeGoalState(goal.key, JSON.stringify(daysAwarded));
    }
    return daysToAward.length * goal.points;
}

async function storeGoalState(goalKey: string, state: any) {
    MyDataHelps.persistDeviceData([{
        type: `BasicGoal_${goalKey}`,
        value: JSON.stringify(state)
    }]);
}

export async function pointsForGoal(goal: BasicPointsForBadgesGoal, goalState?: string) {
    let points = 0;
    switch (goal.type) {
        case "dailyData":
            points = await pointsForDailyDataGoal(goal as DailyDataPointsForBadgesGoal, goalState);
            break;
        case "surveyCompleted":
            points = await pointsForSurveyCompletedGoal(goal as SurveyCompletedPointsForBadgesGoal, goalState);
            break;
        case "connectExternalAccount":
            points = await pointsForConnectExternalAccountGoal(goal as ConnectExternalAccountPointsForBadgesGoal, goalState);
            break;
    }
    return points;
}