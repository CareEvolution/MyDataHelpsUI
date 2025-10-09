import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import {
    healthConnectActiveCaloriesBurnedDataProvider,
    healthConnectDeepSleepMinutesDataProvider,
    healthConnectDistanceDataProvider,
    healthConnectLightSleepMinutesDataProvider,
    healthConnectMaxHeartRateDataProvider,
    healthConnectMinHeartRateDataProvider,
    healthConnectRemSleepMinutesDataProvider,
    healthConnectRestingHeartRateDataProvider,
    healthConnectStepsDataProvider,
    healthConnectTotalCaloriesBurnedDataProvider,
    healthConnectTotalSleepMinutesDataProvider
} from '../daily-data-providers';
import { DailyDataType, DailyDataTypeDefinition } from '../daily-data-types';
import { faBed, faFireFlameCurved, faHeartbeat, faRoute, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { defaultFormatter, distanceFormatter, distanceYAxisConverter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from './formatters';
import { simpleAvailabilityCheck } from './availability-check';

const healthConnectTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.HealthConnectRestingHeartRate,
        dataProvider: healthConnectRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'resting-heart-rate', true),
        labelKey: 'resting-heart-rate',
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70],
        requiresV2Api: true
    },
    {
        type: DailyDataType.HealthConnectTotalSleepMinutes,
        dataProvider: healthConnectTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep', true),
        labelKey: 'sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.HealthConnectRemSleepMinutes,
        dataProvider: healthConnectRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep', true),
        labelKey: 'rem-sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.HealthConnectDeepSleepMinutes,
        dataProvider: healthConnectDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep', true),
        labelKey: 'deep-sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.HealthConnectLightSleepMinutes,
        dataProvider: healthConnectLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'sleep', true),
        labelKey: 'light-sleep-time',
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.HealthConnectSteps,
        dataProvider: healthConnectStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'steps-daily', true),
        labelKey: 'steps',
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.HealthConnectDistance,
        dataProvider: healthConnectDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'distance-daily', true),
        labelKey: 'distance-traveled',
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: distanceFormatter,
        yAxisConverter: distanceYAxisConverter,
        previewDataRange: [3000, 5000]
    },
    {
        type: DailyDataType.HealthConnectMaxHeartRate,
        dataProvider: healthConnectMaxHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'heart-rate-daily-maximum', true),
        labelKey: 'max-heart-rate',
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [100, 180]
    },
    {
        type: DailyDataType.HealthConnectMinHeartRate,
        dataProvider: healthConnectMinHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'heart-rate-daily-minimum', true),
        labelKey: 'min-heart-rate',
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 90]
    },
    {
        type: DailyDataType.HealthConnectActiveCaloriesBurned,
        dataProvider: healthConnectActiveCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'active-calories-burned-daily', true),
        labelKey: 'active-calories-burned',
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1800, 2200]
    },
    {
        type: DailyDataType.HealthConnectTotalCaloriesBurned,
        dataProvider: healthConnectTotalCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck('HealthConnect', 'total-calories-burned-daily', true),
        labelKey: 'total-calories-burned',
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1800, 2200]
    }
];
healthConnectTypeDefinitions.forEach((def) => {
    def.dataSource = 'HealthConnect';
});

export default healthConnectTypeDefinitions;
