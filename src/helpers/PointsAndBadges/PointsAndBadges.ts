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

export interface BasicPointsForBadgesActivity {
    key: string;
    type: "dailyData" | "surveyCompleted" | "connectExternalAccount";
    points: number;
}

export interface DailyDataActivity extends BasicPointsForBadgesActivity {
    type: "dailyData";
    activationDate: Date;
    awardThreshold: number;
    dailyDataType: string;
}

export interface SurveyCompletionActivity extends BasicPointsForBadgesActivity {
    type: "surveyCompleted";
    surveyName: string;
    limit?: number;
}

export interface ConnectExternalAccountActivity extends BasicPointsForBadgesActivity {
    type: "connectExternalAccount";
    category: string;
}

async function pointsForConnectExternalAccountActivity(activity: ConnectExternalAccountActivity, activityState?: string) {
    let pastConnectedProviders = activityState ? JSON.parse(activityState) as number[] : [];
    let connectedAccounts = await MyDataHelps.getExternalAccounts();
    let newProviders = connectedAccounts.filter(account => account.provider.category == activity.category && !pastConnectedProviders.includes(account.provider.id));
    let allProviders = connectedAccounts.map(account => account.provider.category == activity.category && account.id);
    if (newProviders.length > 0) {
        storeActivityState(activity.key, allProviders);
    }
    return newProviders.length * activity.points;
}

interface SurveyCompletionActivityState {
    countCompleted: number;
    lastQueryDate?: string;
}

async function pointsForSurveyCompletionActivity(activity: SurveyCompletionActivity, activityState?: string) {
    let state = activityState ? JSON.parse(activityState) as SurveyCompletionActivityState : { countCompleted: 0, lastQueryDate: undefined };

    var parameters: SurveyAnswersQuery = {
        surveyName: activity.surveyName
    };

    if (state.lastQueryDate) {
        parameters.insertedAfter = state.lastQueryDate;
    }

    if (activity.limit != undefined && state.countCompleted >= activity.limit) {
        return 0;
    }

    let answers = await queryAllSurveyAnswers(parameters);
    let newUniqueResults = answers.map(answer => answer.surveyResultID).filter((value, index, self) => self.indexOf(value) === index);
    if (activity.limit != undefined && newUniqueResults.length + state.countCompleted > activity.limit) {
        newUniqueResults = newUniqueResults.slice(0, activity.limit - state.countCompleted);
    }

    if (newUniqueResults.length > 0) {
        state.countCompleted += newUniqueResults.length;
        state.lastQueryDate = answers.length > 0 ? answers[0].insertedDate : state.lastQueryDate;
        storeActivityState(activity.key, state);
    }
    return newUniqueResults.length * activity.points;
}

async function pointsForDailyDataActivity(activity: DailyDataActivity, activityState?: string) {
    let daysAwarded = JSON.parse(activityState || "[]") as string[];

    let startDate = startOfDay(new Date());
    if (!activityState) {
        startDate = activity.activationDate;
    }

    let dailyData = await queryDailyData(activity.dailyDataType, startDate, new Date());
    let days = Object.keys(dailyData);
    let daysToAward = days.filter(day => !daysAwarded.includes(day) && dailyData[day] >= activity.awardThreshold);
    if (daysToAward.length > 0) {
        daysAwarded.push(...daysToAward);
        storeActivityState(activity.key, JSON.stringify(daysAwarded));
    }
    return daysToAward.length * activity.points;
}

async function storeActivityState(activityKey: string, state: any) {
    MyDataHelps.persistDeviceData([{
        type: `BasicActivity_${activityKey}`,
        value: JSON.stringify(state)
    }]);
}

export async function pointsForActivity(activity: BasicPointsForBadgesActivity, activityState?: string) {
    let points = 0;
    switch (activity.type) {
        case "dailyData":
            points = await pointsForDailyDataActivity(activity as DailyDataActivity, activityState);
            break;
        case "surveyCompleted":
            points = await pointsForSurveyCompletionActivity(activity as SurveyCompletionActivity, activityState);
            break;
        case "connectExternalAccount":
            points = await pointsForConnectExternalAccountActivity(activity as ConnectExternalAccountActivity, activityState);
            break;
    }
    return points;
}