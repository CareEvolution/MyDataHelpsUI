import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types"
import { getDailyDataTypeDefinition } from "../query-daily-data"

let activityColor = "#f5b722";
let sleepColor = "#7b88c6";
let heartColor = "#e35c33";

export interface StandardDailyDataTypeDefinition extends DailyDataTypeDefinition {
    color: string;
}

const standardDailyDataTypes: StandardDailyDataTypeDefinition[] = [
    { ...getDailyDataTypeDefinition(DailyDataType.SleepMinutes), color: sleepColor },
    { ...getDailyDataTypeDefinition(DailyDataType.Steps), color: activityColor },
    { ...getDailyDataTypeDefinition(DailyDataType.FitbitActiveMinutes), color: activityColor },
    { ...getDailyDataTypeDefinition(DailyDataType.GarminActiveMinutes), color: activityColor },
    { ...getDailyDataTypeDefinition(DailyDataType.AppleHealthActiveEnergyBurned), color: activityColor },
    { ...getDailyDataTypeDefinition(DailyDataType.GarminTotalCalories), color: activityColor },
    { ...getDailyDataTypeDefinition(DailyDataType.FitbitCaloriesBurned), color: activityColor },
    { ...getDailyDataTypeDefinition(DailyDataType.FitbitElevatedHeartRateMinutes), color: heartColor },
    { ...getDailyDataTypeDefinition(DailyDataType.AppleHealthMaxHeartRate), color: heartColor },
    { ...getDailyDataTypeDefinition(DailyDataType.GarminMaxHeartRate), color: heartColor },
    { ...getDailyDataTypeDefinition(DailyDataType.RestingHeartRate), color: heartColor }
];

export default standardDailyDataTypes;