import React from "react";
import { ProgressBar, ProgressBarStep, Title } from "../../presentational";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import language from "../../../helpers/language";
import MyDataHelps, { DeviceDataPoint, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { add, parseISO } from "date-fns";
import queryAllSurveyAnswers from "../../../helpers/query-all-survey-answers";
import { DailyDataType, queryDailyData } from "../../../helpers/query-daily-data";

export interface BasicPointsForBadgesProps {
    pointsForBadge: number;
    goals: BasicPointsForBadgesGoal[];
}

export interface BasicPointsForBadgesGoal {
    key: string;
    type: "fitbitDailyData" | "surveyCompleted" | "connectExternalAccount";
    points: number;
}

export interface FitbitDailyDataGoal extends BasicPointsForBadgesGoal {
    type: "fitbitDailyData";
    activationDate?: Date;
    awardThreshold: number;
    dailyDataType: DailyDataType;
}

export interface SurveyCompletedGoal extends BasicPointsForBadgesGoal {
    type: "surveyCompleted";
    surveyName: string;
    limit?: number;
}

export interface ConnectExternalAccountGoal extends BasicPointsForBadgesGoal {
    type: "connectExternalAccount";
    category: string;
}

async function pointsForConnectExternalAccountGoal(goal: ConnectExternalAccountGoal, goalState?: string) {
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

async function pointsForSurveyCompletedGoal(goal: SurveyCompletedGoal, goalState?: string) {
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

async function pointsForFitbitDailyDataGoal(goal: FitbitDailyDataGoal, goalState?: string) {
    let daysAwarded = JSON.parse(goalState || "[]") as string[];

    let startDate = add(new Date(), { days: -30 });
    if (!goalState) {
        startDate = goal.activationDate || startDate;
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

interface PointsAndBadgesState {
    points: number;
    badges: number;
}

async function getCurrentPointsAndBadges(): Promise<PointsAndBadgesState> {
    let state = (await MyDataHelps.queryDeviceData({ type: "BasicPointsAndBadges", namespace: "Project" })).deviceDataPoints;
    if (state.length > 0) {
        return JSON.parse(state[0].value);
    }
    return { points: 0, badges: 0 };
}

async function persistCurrentPointsAndBadges(state: PointsAndBadgesState) {
    await MyDataHelps.persistDeviceData([{
        type: "BasicPointsAndBadges",
        value: JSON.stringify(state)
    }]);
}

async function awardPointsAndBadges(pointsForBadge: number, goals: BasicPointsForBadgesGoal[]) {
    let currentState = await getCurrentPointsAndBadges();

    let newPoints = currentState.points;
    goals.forEach(async goal => {
        let goalState = (await MyDataHelps.queryDeviceData({ type: `BasicGoal_${goal.key}`, namespace: "Project" })).deviceDataPoints;
        let points = 0;
        switch (goal.type) {
            case "fitbitDailyData":
                points = await pointsForFitbitDailyDataGoal(goal as FitbitDailyDataGoal, goalState.length > 0 ? goalState[0].value : undefined);
                break;
            case "surveyCompleted":
                points = await pointsForSurveyCompletedGoal(goal as SurveyCompletedGoal, goalState.length > 0 ? goalState[0].value : undefined);
                break;
            case "connectExternalAccount":
                points = await pointsForConnectExternalAccountGoal(goal as ConnectExternalAccountGoal, goalState.length > 0 ? goalState[0].value : undefined);
                break;
        }
        newPoints += points;
    });

    if (newPoints == 0) { return; }

    let lastBadgeThreshold = 0;
    for (var i = 0; i < currentState.points; i += pointsForBadge) {
        lastBadgeThreshold = i;
    }

    let badgesToAward = 0;
    for (var i = lastBadgeThreshold; i < newPoints; i += pointsForBadge) {
        badgesToAward++;
    }

    currentState.points = newPoints;
    currentState.badges += badgesToAward;
    await persistCurrentPointsAndBadges(currentState);
}

export default function (props: BasicPointsForBadgesProps) {

    return <div className="mdhui-basic-points-for-badges">
        <Title order={3}>{language("current-points")}</Title>
        <div className="current-points">450pts</div>
        <ProgressBar fillPercent={45} fillColor="linear-gradient(270deg, hsla(215, 17%, 55%, 1) 0%, hsla(219, 36%, 29%, 1) 100%)" backgroundColor="#ddd" steps={[{
            percent: 100,
            icon:
                <ProgressBarStep borderColor="rgba(148, 148, 148, 1)" backgroundColor="rgba(148, 148, 148, 1)" height="24px">
                    <FontAwesomeIcon icon={faStar as any} size={"1x"} style={{ color: "#fcfcfc", marginTop: "-3px" }} />
                </ProgressBarStep>
        }]} />
        <div className="next-badge">{language("next-points").replace("{{points}}", "550")}</div>
    </div>
}
