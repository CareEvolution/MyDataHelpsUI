import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { appleHealthActiveEnergyBurned, appleHealthDistanceDataProvider, appleHealthFlightsClimbedDataProvider, appleHealthHeartRateRangeDataProvider, appleHealthHrvDataProvider, appleHealthInBedDataProvider, appleHealthMaxHeartRateDataProvider, appleHealthRestingHeartRateDataProvider, appleHealthSleepCoreDataProvider, appleHealthSleepDataProvider, appleHealthSleepDeepDataProvider, appleHealthSleepRemDataProvider, appleHealthStandTimeDataProvider, appleHealthStepsDataProvider, appleHealthWalkingHeartRateAverageDataProvider } from "../daily-data-providers";
import { DailyDataTypeDefinition } from "../daily-data-types";
import { DailyDataType, simpleAvailabilityCheck } from "../query-daily-data";
import { faBed, faHeartbeat, faPerson, faPersonRunning, faRoute, faStairs } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, hrvFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";

let appleHealthTypeDefinitions: DailyDataTypeDefinition[] = [
	{
		type: DailyDataType.AppleHealthDistanceWalkingRunning,
		dataProvider: appleHealthDistanceDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyDistanceWalkingRunning"]),
		label: language("distance-traveled"),
		icon: <FontAwesomeSvgIcon icon={faRoute} />,
		formatter: (value: number) => Number(value.toFixed(2)).toLocaleString() + " km",
		yAxisConverter: (value: number) => value / 1000
	},
	{
		type: DailyDataType.AppleHealthFlightsClimbed,
		dataProvider: appleHealthFlightsClimbedDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["FlightsClimbed"]),
		label: language("flights-climbed"),
		icon: <FontAwesomeSvgIcon icon={faStairs} />,
		formatter: defaultFormatter
	},
	{
		type: DailyDataType.AppleHealthHeartRateRange,
		dataProvider: appleHealthHeartRateRangeDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]),
		label: language("heart-rate-range"),
		icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
		formatter: heartRateFormatter
	},
	{
		type: DailyDataType.AppleHealthHrv,
		dataProvider: appleHealthHrvDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HeartRateVariability"]),
		label: language("heart-rate-variability"),
		icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
		formatter: hrvFormatter
	},
	{
		type: DailyDataType.AppleHealthMaxHeartRate,
		dataProvider: appleHealthMaxHeartRateDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]),
		label: language("maximum-heart-rate"),
		icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
		formatter: heartRateFormatter
	},
	{
		type: DailyDataType.AppleHealthRestingHeartRate,
		dataProvider: appleHealthRestingHeartRateDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"]),
		label: language("resting-heart-rate"),
		icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
		formatter: heartRateFormatter
	},
	{
		type: DailyDataType.AppleHealthSleepMinutes,
		dataProvider: appleHealthSleepDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
		label: language("asleep-time"),
		icon: <FontAwesomeSvgIcon icon={faBed} />,
		formatter: minutesFormatter,
		yAxisConverter: sleepYAxisConverter
	},
	{
		type: DailyDataType.AppleHealthCoreSleepMinutes,
		dataProvider: appleHealthSleepCoreDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
		label: language("asleep-time-core"),
		icon: <FontAwesomeSvgIcon icon={faBed} />,
		formatter: minutesFormatter,
		yAxisConverter: sleepYAxisConverter
	},
	{
		type: DailyDataType.AppleHealthDeepSleepMinutes,
		dataProvider: appleHealthSleepDeepDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
		label: language("asleep-time-deep"),
		icon: <FontAwesomeSvgIcon icon={faBed} />,
		formatter: minutesFormatter,
		yAxisConverter: sleepYAxisConverter
	},
	{
		type: DailyDataType.AppleHealthRemSleepMinutes,
		dataProvider: appleHealthSleepRemDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
		label: language("asleep-time-rem"),
		icon: <FontAwesomeSvgIcon icon={faBed} />,
		formatter: minutesFormatter,
		yAxisConverter: sleepYAxisConverter
	},
	{
		type: DailyDataType.AppleHealthInBedMinutes,
		dataProvider: appleHealthInBedDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
		label: language("in-bed-time"),
		icon: <FontAwesomeSvgIcon icon={faBed} />,
		formatter: minutesFormatter,
		yAxisConverter: sleepYAxisConverter
	},
	{
		type: DailyDataType.AppleHealthStandMinutes,
		dataProvider: appleHealthStandTimeDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["AppleStandTime"]),
		label: language("stand-time"),
		icon: <FontAwesomeSvgIcon icon={faPerson} />,
		formatter: minutesFormatter
	},
	{
		type: DailyDataType.AppleHealthSteps,
		dataProvider: appleHealthStepsDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]),
		label: language("steps"),
		icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
		formatter: defaultFormatter
	},
	{
		type: DailyDataType.AppleHealthWalkingHeartRateAverage,
		dataProvider: appleHealthWalkingHeartRateAverageDataProvider,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["WalkingHeartRateAverage"]),
		label: language("walking-heart-rate-average"),
		icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
		formatter: heartRateFormatter
	},
	{
		type: DailyDataType.AppleHealthActiveEnergyBurned,
		dataProvider: appleHealthActiveEnergyBurned,
		availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["ActiveEnergyBurned"]),
		label: language("active-energy-burned"),
		icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
		formatter: defaultFormatter
	}
];
appleHealthTypeDefinitions.forEach((def) => {
	def.dataSource = "AppleHealth";
});

export default appleHealthTypeDefinitions;