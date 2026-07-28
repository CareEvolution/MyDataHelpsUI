import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faClock, faFireFlameCurved, faHeartbeat, faPerson, faPersonRunning, faRoute, faShoePrints, faStairs, faWind } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, distanceFormatter, distanceYAxisConverter, heartRateFormatter, hrvFormatter, minutesFormatter, minutesToHoursYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";
import { formatNumberForLocale } from "../locale";
import {
    googleHealthActiveCaloriesBurnedDataProvider,
    googleHealthAverageHeartRateDataProvider,
    googleHealthBreathingRateDataProvider,
    googleHealthCaloriesBurnedDataProvider,
    googleHealthCardioMinutesDataProvider,
    googleHealthDeepSleepMinutesDataProvider,
    googleHealthDistanceDataProvider,
    googleHealthElevatedHeartRateMinutesDataProvider,
    googleHealthFairlyActiveMinutesDataProvider,
    googleHealthFatBurnMinutesDataProvider,
    googleHealthFloorsDataProvider,
    googleHealthHrvDataProvider,
    googleHealthSedentaryMinutesDataProvider,
    googleHealthLightSleepMinutesDataProvider,
    googleHealthLightlyActiveMinutesDataProvider,
    googleHealthMaxHeartRateDataProvider,
    googleHealthMinHeartRateDataProvider,
    googleHealthPeakMinutesDataProvider,
    googleHealthRemSleepMinutesDataProvider,
    googleHealthRestingHeartRateDataProvider,
    googleHealthSpO2DataProvider,
    googleHealthStepsDataProvider,
    googleHealthTotalActiveMinutesDataProvider,
    googleHealthTotalSleepMinutesDataProvider,
    googleHealthVeryActiveMinutesDataProvider,
    googleHealthWearMinutesDataProvider
} from "../daily-data-providers";

const googleHealthTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.GoogleHealthSteps,
        dataProvider: googleHealthStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "steps-daily"),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.GoogleHealthRestingHeartRate,
        dataProvider: googleHealthRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "dailyRestingHeartRate-list-beatsPerMinute"),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.GoogleHealthSleepMinutes,
        dataProvider: googleHealthTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "sleep-list-session-asleep"),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.GoogleHealthLightSleepMinutes,
        dataProvider: googleHealthLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "sleep-list-stages-summary-light-minutes"),
        labelKey: "light-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.GoogleHealthRemSleepMinutes,
        dataProvider: googleHealthRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "sleep-list-stages-summary-rem-minutes"),
        labelKey: "rem-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.GoogleHealthDeepSleepMinutes,
        dataProvider: googleHealthDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "sleep-list-stages-summary-deep-minutes"),
        labelKey: "deep-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.GoogleHealthCaloriesBurned,
        dataProvider: googleHealthCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "totalCalories-daily"),
        labelKey: "calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1800, 2200]
    },
    {
        type: DailyDataType.GoogleHealthActiveCaloriesBurned,
        dataProvider: googleHealthActiveCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "activeEnergyBurned-daily"),
        labelKey: "active-calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 500]
    },
    {
        type: DailyDataType.GoogleHealthFloors,
        dataProvider: googleHealthFloorsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "floors-daily"),
        labelKey: "floors-climbed",
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 8]
    },
    {
        type: DailyDataType.GoogleHealthDistance,
        dataProvider: googleHealthDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "distance-daily"),
        labelKey: "distance-traveled",
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: distanceFormatter,
        yAxisConverter: distanceYAxisConverter,
        previewDataRange: [3000, 5000]
    },
    {
        type: DailyDataType.GoogleHealthSedentaryMinutes,
        dataProvider: googleHealthSedentaryMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "sedentaryPeriod-daily"),
        labelKey: "sedentary-time",
        icon: <FontAwesomeSvgIcon icon={faPerson} />,
        formatter: minutesFormatter,
        previewDataRange: [200, 300]
    },
    {
        type: DailyDataType.GoogleHealthWearMinutes,
        dataProvider: googleHealthWearMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "wearTime-daily"),
        labelKey: "wear-time",
        icon: <FontAwesomeSvgIcon icon={faClock} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [300, 700]
    },
    {
        type: DailyDataType.GoogleHealthBreathingRate,
        dataProvider: googleHealthBreathingRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "dailyRespiratoryRate-list-breathsPerMinute"),
        labelKey: "breathing-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: defaultFormatter,
        previewDataRange: [13, 18]
    },
    {
        type: DailyDataType.GoogleHealthHrv,
        dataProvider: googleHealthHrvDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "dailyHeartRateVariability-list-averageRmssd"),
        labelKey: "heart-rate-variability",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: hrvFormatter,
        previewDataRange: [55, 85]
    },
    {
        type: DailyDataType.GoogleHealthSpO2,
        dataProvider: googleHealthSpO2DataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "dailyOxygenSaturation-list-avg"),
        labelKey: "spo2",
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: (value: number) => formatNumberForLocale(value) + " %",
        previewDataRange: [95, 100]
    },
    {
        type: DailyDataType.GoogleHealthMaxHeartRate,
        dataProvider: googleHealthMaxHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "heartRate-daily-max"),
        labelKey: "max-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [120, 180]
    },
    {
        type: DailyDataType.GoogleHealthMinHeartRate,
        dataProvider: googleHealthMinHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "heartRate-daily-min"),
        labelKey: "min-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [45, 60]
    },
    {
        type: DailyDataType.GoogleHealthAverageHeartRate,
        dataProvider: googleHealthAverageHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "heartRate-daily-avg"),
        labelKey: "average-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 80]
    },
    {
        type: DailyDataType.GoogleHealthActiveMinutes,
        dataProvider: googleHealthTotalActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", ["activeMinutes-daily-light", "activeMinutes-daily-moderate", "activeMinutes-daily-vigorous"]),
        labelKey: "active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [50, 200]
    },
    {
        type: DailyDataType.GoogleHealthLightlyActiveMinutes,
        dataProvider: googleHealthLightlyActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "activeMinutes-daily-light"),
        labelKey: "lightly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.GoogleHealthFairlyActiveMinutes,
        dataProvider: googleHealthFairlyActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "activeMinutes-daily-moderate"),
        labelKey: "fairly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.GoogleHealthVeryActiveMinutes,
        dataProvider: googleHealthVeryActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "activeMinutes-daily-vigorous"),
        labelKey: "very-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.GoogleHealthElevatedHeartRateMinutes,
        dataProvider: googleHealthElevatedHeartRateMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", ["activeZoneMinutes-daily-fat-burn", "activeZoneMinutes-daily-cardio", "activeZoneMinutes-daily-peak"]),
        labelKey: "elevated-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.GoogleHealthFatBurnHeartRateMinutes,
        dataProvider: googleHealthFatBurnMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "activeZoneMinutes-daily-fat-burn"),
        labelKey: "fat-burn-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.GoogleHealthCardioHeartRateMinutes,
        dataProvider: googleHealthCardioMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "activeZoneMinutes-daily-cardio"),
        labelKey: "cardio-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.GoogleHealthPeakHeartRateMinutes,
        dataProvider: googleHealthPeakMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleHealth", "activeZoneMinutes-daily-peak"),
        labelKey: "peak-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    }
];
googleHealthTypeDefinitions.forEach((def) => {
    def.dataSource = "GoogleHealth";
});
export default googleHealthTypeDefinitions;
