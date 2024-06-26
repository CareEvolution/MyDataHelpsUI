import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataPointsPage, DeviceInfo, Guid, PersistableDeviceDataPoint, SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import { add, compareDesc, endOfDay, endOfToday, formatISO, isAfter, isBefore, isToday, parseISO, startOfDay, startOfToday } from 'date-fns';
import { AsthmaActionPlan, AsthmaAirQuality, AsthmaAirQualityDescription, AsthmaAirQualityType, AsthmaBiometric, AsthmaBiometricType, AsthmaDataStatus, AsthmaLogEntry, AsthmaParticipant } from '../model';
import { isBloodOxygenLevelWithinRange, isDaytimeRestingHeartRateWithinRange, isNighttimeRestingHeartRateWithinRange, isRespiratoryRateWithinRange, isSleepDisturbancesWithinRange, isStepsWithinRange } from './asthma-functions';
import { registerDailyDataProvider, simpleAvailabilityCheck } from "../../../helpers";
import { daytimeBloodOxygenLevelDataProvider, daytimeRestingHeartRateDataProvider, nighttimeBloodOxygenLevelDataProvider, nighttimeRestingHeartRateDataProvider, respiratoryRateDataProvider, sleepDisturbancesDataProvider, stepsDataProvider } from "./daily-data-providers";
import queryAllSurveyAnswers from '../../../helpers/query-all-survey-answers';

export enum AsthmaDailyDataType {
    Steps = 'Asthma.Steps',
    DaytimeRestingHeartRate = 'Asthma.DaytimeRestingHeartRate',
    NighttimeRestingHeartRate = 'Asthma.NighttimeRestingHeartRate',
    RespiratoryRate = 'Asthma.RespiratoryRate',
    DaytimeBloodOxygenLevel = 'Asthma.DaytimeBloodOxygenLevel',
    NighttimeBloodOxygenLevel = 'Asthma.NighttimeBloodOxygenLevel',
    SleepDisturbances = 'Asthma.SleepDisturbances'
}

registerDailyDataProvider(AsthmaDailyDataType.Steps, stepsDataProvider, simpleAvailabilityCheck('Project', ['Steps']));
registerDailyDataProvider(AsthmaDailyDataType.DaytimeRestingHeartRate, daytimeRestingHeartRateDataProvider, simpleAvailabilityCheck('Project', ['DaytimeRestingHeartRate']));
registerDailyDataProvider(AsthmaDailyDataType.NighttimeRestingHeartRate, nighttimeRestingHeartRateDataProvider, simpleAvailabilityCheck('Project', ['NighttimeRestingHeartRate']));
registerDailyDataProvider(AsthmaDailyDataType.RespiratoryRate, respiratoryRateDataProvider, simpleAvailabilityCheck('Project', ['RespiratoryRate']));
registerDailyDataProvider(AsthmaDailyDataType.DaytimeBloodOxygenLevel, daytimeBloodOxygenLevelDataProvider, simpleAvailabilityCheck('Project', ['DaytimeBloodOxygenLevel']));
registerDailyDataProvider(AsthmaDailyDataType.NighttimeBloodOxygenLevel, nighttimeBloodOxygenLevelDataProvider, simpleAvailabilityCheck('Project', ['NighttimeBloodOxygenLevel']));
registerDailyDataProvider(AsthmaDailyDataType.SleepDisturbances, sleepDisturbancesDataProvider, simpleAvailabilityCheck('Project', ['SleepDisturbances']));

type BiometricTypeTermCode = 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'Steps' | 'SleepDisturbances' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
type BiometricThresholdFunction = (baseline: number, rawValue: number) => boolean;
type BiometricStatusDefaults = { withValue: AsthmaDataStatus, withoutValue: AsthmaDataStatus };
type AirQualityTypeTermCode = 'HomeAirQuality' | 'WorkAirQuality';

const biometricTypeTermCodes: Record<AsthmaBiometricType, BiometricTypeTermCode> = {
    'daytime-resting-heart-rate': 'DaytimeRestingHeartRate',
    'nighttime-resting-heart-rate': 'NighttimeRestingHeartRate',
    'respiratory-rate': 'RespiratoryRate',
    'steps': 'Steps',
    'sleep-disturbances': 'SleepDisturbances',
    'daytime-blood-oxygen-level': 'DaytimeBloodOxygenLevel',
    'nighttime-blood-oxygen-level': 'NighttimeBloodOxygenLevel'
};

const airQualityTypeTermCodes: Record<AsthmaAirQualityType, AirQualityTypeTermCode> = {
    'home': 'HomeAirQuality',
    'work': 'WorkAirQuality'
};

const sortDataPointsDesc = (dataPoint1: DeviceDataPoint, dataPoint2: DeviceDataPoint): number => {
    return compareDesc(parseISO(dataPoint1.observationDate!), parseISO(dataPoint2.observationDate!));
};

const getDataPointValueAsNumber = (dataPoint: DeviceDataPoint): number => {
    let valueAsNumber: number = parseFloat(dataPoint.value);
    if (isNaN(valueAsNumber)) {
        return -1;
    }
    return valueAsNumber;
};

const getLatestDataPointValue = (date: Date, dataPoints: DeviceDataPoint[], type: string, offsetDays: number): number | undefined => {
    let startOfDate = startOfDay(date);

    let start = add(startOfDate, {days: offsetDays});
    let end = add(startOfDate, {days: offsetDays + 1});

    let filteredDataPoints = dataPoints.filter(dp => {
        if (dp.type !== type) return false;

        let dataPointDate = parseISO(dp.observationDate!);
        return !isBefore(dataPointDate, start) && !isAfter(dataPointDate, end);
    });

    if (filteredDataPoints.length > 0) {
        return getDataPointValueAsNumber(filteredDataPoints.sort(sortDataPointsDesc)[0]);
    }

    return undefined;
};

const loadBiometrics = (observedAfter: Date, observedBefore: Date): Promise<DeviceDataPointsPage> => {
    let params: DeviceDataPointQuery = {
        namespace: 'Project',
        type: [
            'DaytimeRestingHeartRate', 'DaytimeRestingHeartRateBaseline', 'NighttimeRestingHeartRate', 'NighttimeRestingHeartRateBaseline',
            'RespiratoryRate', 'RespiratoryRateBaseline', 'Steps', 'StepsBaseline', 'SleepDisturbances', 'SleepDisturbancesBaseline',
            'DaytimeBloodOxygenLevel', 'DaytimeBloodOxygenLevelBaseline', 'NighttimeBloodOxygenLevel', 'NighttimeBloodOxygenLevelBaseline'
        ],
        observedAfter: observedAfter.toISOString(),
        observedBefore: observedBefore.toISOString()
    };
    return MyDataHelps.queryDeviceData(params);
};

const computeBiometricStatus = (thresholdFunction: BiometricThresholdFunction, baseline: number | undefined, value: number | undefined, defaultStatus: BiometricStatusDefaults): AsthmaDataStatus => {
    if (baseline) {
        if (value) {
            return thresholdFunction(baseline, value) ? 'in-range' : 'out-of-range';
        }
        return 'offline';
    }
    return value ? defaultStatus.withValue : defaultStatus.withoutValue;
};

const computeBiometric = (type: AsthmaBiometricType, date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, thresholdFunction: BiometricThresholdFunction, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    let baseline = getLatestDataPointValue(date, dataPoints, biometricTypeTermCodes[type] + 'Baseline', offsetDays - 1);
    let value = getLatestDataPointValue(date, dataPoints, biometricTypeTermCodes[type], offsetDays);
    return {
        type: type,
        status: computeBiometricStatus(thresholdFunction, baseline, value, defaultStatus),
        value: value
    }
};

const computeDaytimeRestingHeartRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('daytime-resting-heart-rate', date, dataPoints, offsetDays, isDaytimeRestingHeartRateWithinRange, defaultStatus);
};

const computeNighttimeRestingHeartRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('nighttime-resting-heart-rate', date, dataPoints, offsetDays, isNighttimeRestingHeartRateWithinRange, defaultStatus);
};

const computeRespiratoryRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('respiratory-rate', date, dataPoints, offsetDays, isRespiratoryRateWithinRange, defaultStatus);
};

const computeStepsForControlStatus = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('steps', date, dataPoints, offsetDays, isStepsWithinRange, defaultStatus);
};

const computeStepsForDate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('steps', date, dataPoints, offsetDays, (baseline, rawValue) => (isToday(date) && new Date().getHours() < 19) || isStepsWithinRange(baseline, rawValue), defaultStatus);
};

const computeSleepDisturbances = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('sleep-disturbances', date, dataPoints, offsetDays, isSleepDisturbancesWithinRange, defaultStatus);
};

const computeDaytimeBloodOxygenLevel = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('daytime-blood-oxygen-level', date, dataPoints, offsetDays, isBloodOxygenLevelWithinRange, defaultStatus);
};

const computeNighttimeBloodOxygenLevel = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: BiometricStatusDefaults): AsthmaBiometric => {
    return computeBiometric('nighttime-blood-oxygen-level', date, dataPoints, offsetDays, isBloodOxygenLevelWithinRange, defaultStatus);
};

const computeBiometricsForControlStatus = (date: Date, dataPoints: DeviceDataPoint[]): AsthmaBiometric[] => {
    const defaultStatus: BiometricStatusDefaults = {
        withValue: 'establishing',
        withoutValue: 'establishing'
    };
    return [
        computeDaytimeRestingHeartRate(date, dataPoints, -1, defaultStatus),
        computeNighttimeRestingHeartRate(date, dataPoints, 0, defaultStatus),
        computeRespiratoryRate(date, dataPoints, 0, defaultStatus),
        computeStepsForControlStatus(date, dataPoints, -1, defaultStatus),
        computeSleepDisturbances(date, dataPoints, 0, defaultStatus),
        computeDaytimeBloodOxygenLevel(date, dataPoints, -1, defaultStatus),
        computeNighttimeBloodOxygenLevel(date, dataPoints, 0, defaultStatus)
    ];
};

const computeBiometricsForDate = (date: Date, dataPoints: DeviceDataPoint[]): AsthmaBiometric[] => {
    const defaultStatus: BiometricStatusDefaults = {
        withValue: 'not-determined',
        withoutValue: 'not-found'
    };
    return [
        computeDaytimeRestingHeartRate(date, dataPoints, 0, defaultStatus),
        computeNighttimeRestingHeartRate(date, dataPoints, 0, defaultStatus),
        computeRespiratoryRate(date, dataPoints, 0, defaultStatus),
        computeStepsForDate(date, dataPoints, 0, defaultStatus),
        computeSleepDisturbances(date, dataPoints, 0, defaultStatus),
        computeDaytimeBloodOxygenLevel(date, dataPoints, 0, defaultStatus),
        computeNighttimeBloodOxygenLevel(date, dataPoints, 0, defaultStatus)
    ];
};

const loadAirQualities = (observedAfter: Date, observedBefore?: Date, pageID?: Guid): Promise<DeviceDataPointsPage> => {
    let params: DeviceDataPointQuery = {
        namespace: 'AirNowApi',
        type: ['HomeAirQuality', 'WorkAirQuality'],
        observedAfter: observedAfter.toISOString()
    };
    if (observedBefore) {
        params.observedBefore = observedBefore.toISOString();
    }
    if (pageID) {
        params.pageID = pageID;
    }
    return MyDataHelps.queryDeviceData(params);
};

const computeAirQualityStatusAndDescription = (aqi: number | undefined, defaultStatus: AsthmaDataStatus): [AsthmaDataStatus, AsthmaAirQualityDescription | undefined] => {
    if (aqi) {
        if (aqi <= 100) {
            return ['in-range', undefined];
        }
        if (aqi <= 200) {
            return ['out-of-range', 'unhealthy'];
        }
        if (aqi <= 300) {
            return ['out-of-range', 'very unhealthy'];
        }
        if (aqi <= 500) {
            return ['out-of-range', 'hazardous'];
        }
    }
    return [defaultStatus, undefined];
};

const computeAirQuality = (type: AsthmaAirQualityType, dataPoints: DeviceDataPoint[], computeAqi: (dataPoints: DeviceDataPoint[]) => number, defaultStatus: AsthmaDataStatus): AsthmaAirQuality => {
    let filteredDataPoints = dataPoints.filter(dp => dp.type === airQualityTypeTermCodes[type]);

    let aqi: number | undefined;
    if (filteredDataPoints.length > 0) {
        aqi = computeAqi(filteredDataPoints);
    }

    let [status, description] = computeAirQualityStatusAndDescription(aqi, defaultStatus);

    return {
        type: type,
        status: status,
        value: aqi,
        description: description
    }
};


export interface AsthmaDataService {
    loadParticipant(): Promise<AsthmaParticipant>;

    loadDeviceInfo(): Promise<DeviceInfo>;

    loadLogEntries(fromDate?: Date, toDate?: Date): Promise<AsthmaLogEntry[]>;

    loadBiometricsForControlStatus(): Promise<AsthmaBiometric[]>;

    loadBiometricsForDate(date: Date): Promise<AsthmaBiometric[]>;

    loadAirQualitiesForControlStatus(homeAirQualityZipCode: string, workAirQualityZipCode: string): Promise<AsthmaAirQuality[]>;

    loadAirQualitiesForDate(date: Date): Promise<AsthmaAirQuality[]>;

    loadAirQualityDataPoints(fromDate: Date): Promise<DeviceDataPoint[]>;

    saveLogEntry(logEntry: AsthmaLogEntry): Promise<void>;

    loadAlertTakeover(): Promise<DeviceDataPoint | undefined>;

    updateAlertTakeover(dataPoint: DeviceDataPoint, status: string, comment?: string): Promise<void>;

    loadSurveyAnswers(surveyName: string | string[], fromDate?: Date): Promise<SurveyAnswer[]>;

    checkSurveyAnswerExists(surveyName: string | string[]): Promise<boolean>;

    loadAsthmaActionPlan(): Promise<AsthmaActionPlan | undefined>;
}

const service: AsthmaDataService = {
    loadParticipant: async function (): Promise<AsthmaParticipant> {
        let participantInfo = await MyDataHelps.getParticipantInfo();
        return new AsthmaParticipant(participantInfo);
    },
    loadDeviceInfo(): Promise<DeviceInfo> {
        return MyDataHelps.getDeviceInfo();
    },
    loadLogEntries: async function (fromDate?: Date, toDate?: Date): Promise<AsthmaLogEntry[]> {
        let params: DeviceDataPointQuery = {
            namespace: 'Project',
            type: ['Asthma-LogEntry']
        };
        if (fromDate) {
            params.observedAfter = fromDate.toISOString();
        }
        if (toDate) {
            params.observedBefore = toDate.toISOString();
        }
        let result = await MyDataHelps.queryDeviceData(params);
        return result.deviceDataPoints.map(dp => JSON.parse(dp.value) as AsthmaLogEntry);
    },
    loadBiometricsForControlStatus: async function (): Promise<AsthmaBiometric[]> {
        let date = new Date();
        let result = await loadBiometrics(add(startOfDay(date), {days: -2}), endOfDay(date));
        return computeBiometricsForControlStatus(date, result.deviceDataPoints);
    },
    loadBiometricsForDate: async function (date: Date): Promise<AsthmaBiometric[]> {
        let result = await loadBiometrics(add(startOfDay(date), {days: -1}), endOfDay(date));
        return computeBiometricsForDate(date, result.deviceDataPoints);
    },
    loadAirQualitiesForControlStatus: async function (homeAirQualityZipCode: string, workAirQualityZipCode: string): Promise<AsthmaAirQuality[]> {
        let result = await loadAirQualities(add(new Date(), {hours: -12}), endOfToday());
        const computeAqi = (dataPoints: DeviceDataPoint[]) => getDataPointValueAsNumber(dataPoints.sort(sortDataPointsDesc)[0]);
        return [
            homeAirQualityZipCode ? computeAirQuality('home', result.deviceDataPoints, computeAqi, 'establishing') : {type: 'home', status: 'not-configured'},
            workAirQualityZipCode ? computeAirQuality('work', result.deviceDataPoints, computeAqi, 'establishing') : {type: 'work', status: 'not-configured'}
        ];
    },
    loadAirQualitiesForDate: async function (date: Date): Promise<AsthmaAirQuality[]> {
        let result = await loadAirQualities(startOfDay(date), endOfDay(date));
        const computeAqi = (dataPoints: DeviceDataPoint[]) => {
            let maxValue = 0;
            dataPoints.forEach(dataPoint => {
                let value = getDataPointValueAsNumber(dataPoint);
                if (value > maxValue) {
                    maxValue = value;
                }
            });
            return maxValue;
        };
        return [
            computeAirQuality('home', result.deviceDataPoints, computeAqi, 'not-found'),
            computeAirQuality('work', result.deviceDataPoints, computeAqi, 'not-found')
        ];
    },
    loadAirQualityDataPoints: async function (fromDate: Date): Promise<DeviceDataPoint[]> {
        let allDataPoints: DeviceDataPoint[] = [];

        let results = await loadAirQualities(fromDate);
        allDataPoints = allDataPoints.concat(results.deviceDataPoints);
        while (results.nextPageID) {
            results = await loadAirQualities(fromDate, undefined, results.nextPageID);
            allDataPoints = allDataPoints.concat(results.deviceDataPoints);
        }
        return allDataPoints;
    },
    saveLogEntry: function (logEntry: AsthmaLogEntry): Promise<void> {
        let logEntryDataPoint: PersistableDeviceDataPoint = {
            type: 'Asthma-LogEntry',
            identifier: logEntry.identifier,
            observationDate: `${logEntry.identifier}T12:00:00-06:00`,
            value: JSON.stringify(logEntry)
        };
        return MyDataHelps.persistDeviceData([logEntryDataPoint]);
    },
    loadAlertTakeover: async function (): Promise<DeviceDataPoint | undefined> {
        let today = startOfToday();

        let params: DeviceDataPointQuery = {
            namespace: 'Project',
            type: ['AlertTakeover'],
            observedAfter: today.toISOString()
        };

        let result = await MyDataHelps.queryDeviceData(params);

        let dataPoints = result.deviceDataPoints;
        if (dataPoints.length === 0) return undefined;

        let mostRecentDataPoint = dataPoints.sort(sortDataPointsDesc)[0];
        if (mostRecentDataPoint.properties?.hasOwnProperty('viewed') || mostRecentDataPoint.properties?.hasOwnProperty('cleared')) return undefined;

        return mostRecentDataPoint;
    },
    updateAlertTakeover(dataPoint: DeviceDataPoint, status: string, comment?: string): Promise<void> {
        dataPoint.properties = dataPoint.properties ?? {};
        dataPoint.properties[status] = formatISO(new Date());
        if (comment) {
            dataPoint.properties['comment'] = comment;
        }
        return MyDataHelps.persistDeviceData([dataPoint]);
    },
    loadSurveyAnswers: function (surveyName: string | string[], fromDate?: Date): Promise<SurveyAnswer[]> {
        let query: SurveyAnswersQuery = {surveyName: surveyName};
        if (fromDate) {
            query.insertedAfter = formatISO(fromDate);
        }
        return queryAllSurveyAnswers(query);
    },
    checkSurveyAnswerExists: function (surveyName: string | string[]): Promise<boolean> {
        let query: SurveyAnswersQuery = {surveyName: surveyName, limit: 1};
        return MyDataHelps.querySurveyAnswers(query).then(result => !!result.surveyAnswers.length);
    },
    loadAsthmaActionPlan: async function (): Promise<AsthmaActionPlan | undefined> {
        let result = await MyDataHelps.invokeCustomApi('Asthma.ActionPlan', 'GET', '', true);
        return result ? {id: result.Id, url: `data:image/jpeg;base64,${result.Content}`} : undefined;
    }
};

export default service;
