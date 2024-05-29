import { add, startOfDay } from "date-fns";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState } from "./Activities";
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

    //by default, look back 14 days for new data
    //if no days awarded yet, or if the activation date is more recent than 14 days ago, use the activation date
    //to ensure that historical points are awarded when the user first connects a device (e.g. a Fitbit)
    let startDate = add(startOfDay(new Date()), { days: -14 });
    if (!activityState.daysAwarded || activityState.daysAwarded.length === 0 || startDate < activity.activationDate) {
        startDate = activity.activationDate;
    }

    let dailyData = await queryDailyData(activity.dailyDataType, startDate, new Date());
    let days = Object.keys(dailyData);
    let daysToAward = days.filter(day => !daysAwarded.includes(day) && dailyData[day] >= activity.awardThreshold);
    if (daysToAward.length > 0) {
        let newPoints = daysToAward.length * activity.points;
        let newState = { pointsAwarded: activityState.pointsAwarded + newPoints, daysAwarded: daysAwarded.concat(daysToAward) };
        return newState;
    }
    return activityState;
}


