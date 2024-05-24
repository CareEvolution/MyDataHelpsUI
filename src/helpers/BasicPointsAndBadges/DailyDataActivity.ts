import { startOfDay } from "date-fns";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState, storeActivityState } from "./Activities";
import { queryDailyData } from "../query-daily-data";

export interface DailyDataActivity extends BasicPointsForBadgesActivity {
    type: "dailyData";
    activationDate: Date;
    awardThreshold: number;
    dailyDataType: string;
}

interface DailyDataActivityState extends BasicPointsForBadgesActivityState {
    daysAwarded?: string[];
}

export async function awardDailyDataActivityPoints(activity: DailyDataActivity, activityState: DailyDataActivityState) {
    let daysAwarded = activityState.daysAwarded || [];
    let startDate = startOfDay(new Date());
    if (!activityState) {
        startDate = activity.activationDate;
    }

    let dailyData = await queryDailyData(activity.dailyDataType, startDate, new Date());
    let days = Object.keys(dailyData);
    let daysToAward = days.filter(day => !daysAwarded.includes(day) && dailyData[day] >= activity.awardThreshold);
    if (daysToAward.length > 0) {
        let newPoints = daysToAward.length * activity.points;
        let newState = { pointsAwarded: activityState.pointsAwarded + newPoints, daysAwarded: daysAwarded.concat(daysToAward) };
        storeActivityState(activity.key, newState);
        return newState;
    }
    return activityState;
}


