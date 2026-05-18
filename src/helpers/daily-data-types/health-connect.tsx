import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import {
    healthConnectActiveCaloriesBurnedDataProvider,
    healthConnectDeepSleepMinutesDataProvider,
    healthConnectDistanceDataProvider,
    healthConnectLightSleepMinutesDataProvider,
    healthConnectMaxHeartRateDataProvider,
    healthConnectMindfulMinutesDataProvider,
    healthConnectMinHeartRateDataProvider,
    healthConnectRemSleepMinutesDataProvider,
    healthConnectRestingHeartRateDataProvider,
    healthConnectStepsDataProvider,
    healthConnectTherapyMinutesDataProvider,
    healthConnectTotalCaloriesBurnedDataProvider,
    healthConnectTotalSleepMinutesDataProvider,
    healthConnectBloodGlucoseDataProvider,
    healthConnectMinBloodGlucoseDataProvider,
    healthConnectMaxBloodGlucoseDataProvider
} from '../daily-data-providers';
import { DailyDataType, DailyDataTypeDefinition } from '../daily-data-types';
import { faBed, faDroplet, faFireFlameCurved, faHeartbeat, faHourglassHalf, faRoute, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { defaultFormatter, distanceFormatter, distanceYAxisConverter, heartRateFormatter, minutesFormatter, minutesToHoursYAxisConverter } from './formatters';
import { simpleAvailabilityCheck } from './availability-check';
import { formatNumberForLocale } from '../locale';
import { EXERCISE_SESSION_FILTERS } from '../daily-data-providers/health-connect-therapy-minutes';

const healthConnectTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.HealthConnectRestingHeartRate,
        dataProvider: healthConnectRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'resting-heart-rate'),
        labelKey: 'resting-heart-rate',
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70],
        requiresV2Api: true
    },
    {
        type: DailyDataType.HealthConnectTotalSleepMinutes,
        dataProvider: healthConnectTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep'),
        labelKey: 'sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.HealthConnectRemSleepMinutes,
        dataProvider: healthConnectRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep'),
        labelKey: 'rem-sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.HealthConnectDeepSleepMinutes,
        dataProvider: healthConnectDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep'),
        labelKey: 'deep-sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.HealthConnectLightSleepMinutes,
        dataProvider: healthConnectLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep'),
        labelKey: 'light-sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.HealthConnectSteps,
        dataProvider: healthConnectStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'steps-daily'),
        labelKey: 'steps',
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.HealthConnectDistance,
        dataProvider: healthConnectDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'distance-daily'),
        labelKey: 'distance-traveled',
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: distanceFormatter,
        yAxisConverter: distanceYAxisConverter,
        previewDataRange: [3000, 5000]
    },
    {
        type: DailyDataType.HealthConnectMaxHeartRate,
        dataProvider: healthConnectMaxHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'heart-rate-daily-maximum'),
        labelKey: 'max-heart-rate',
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [100, 180]
    },
    {
        type: DailyDataType.HealthConnectMinHeartRate,
        dataProvider: healthConnectMinHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'heart-rate-daily-minimum'),
        labelKey: 'min-heart-rate',
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 90]
    },
    {
        type: DailyDataType.HealthConnectActiveCaloriesBurned,
        dataProvider: healthConnectActiveCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'active-calories-burned-daily'),
        labelKey: 'active-calories-burned',
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1800, 2200]
    },
    {
        type: DailyDataType.HealthConnectTotalCaloriesBurned,
        dataProvider: healthConnectTotalCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'total-calories-burned-daily'),
        labelKey: 'total-calories-burned',
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1800, 2200]
    },
    {
        type: DailyDataType.HealthConnectTherapyMinutes,
        dataProvider: healthConnectTherapyMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'exercise-session', { v2QueryFilters: EXERCISE_SESSION_FILTERS }),
        labelKey: 'therapy-minutes',
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.HealthConnectMindfulMinutes,
        dataProvider: healthConnectMindfulMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'mindfulness-sessions'),
        labelKey: 'mindful-minutes',
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.HealthConnectBloodGlucose,
        dataProvider: healthConnectBloodGlucoseDataProvider,
        availabilityCheck: simpleAvailabilityCheck("HealthConnect", ["blood-glucose"]),
        labelKey: "blood-glucose",
        icon: <FontAwesomeSvgIcon icon={faDroplet} />,
        formatter: defaultFormatter,
        previewDataRange: [80, 160]
    },
    {
        type: DailyDataType.HealthConnectMinBloodGlucose,
        dataProvider: healthConnectMinBloodGlucoseDataProvider,
        availabilityCheck: simpleAvailabilityCheck("HealthConnect", ["blood-glucose"]),
        labelKey: "blood-glucose-min",
        icon: <FontAwesomeSvgIcon icon={faDroplet} />,
        formatter: defaultFormatter,
        previewDataRange: [60, 80]
    },
    {
        type: DailyDataType.HealthConnectMaxBloodGlucose,
        dataProvider: healthConnectMaxBloodGlucoseDataProvider,
        availabilityCheck: simpleAvailabilityCheck("HealthConnect", ["blood-glucose"]),
        labelKey: "blood-glucose-max",
        icon: <FontAwesomeSvgIcon icon={faDroplet} />,
        formatter: defaultFormatter,
        previewDataRange: [160, 180]
    }
];
healthConnectTypeDefinitions.forEach((def) => {
    def.dataSource = 'HealthConnect';
});

export default healthConnectTypeDefinitions;
