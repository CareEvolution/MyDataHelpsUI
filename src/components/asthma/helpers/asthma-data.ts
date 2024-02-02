import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataPointsPage, Guid, PersistableDeviceDataPoint, SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import { add, compareDesc, endOfDay, endOfToday, formatISO, isAfter, isBefore, isToday, parseISO, startOfDay, startOfToday } from 'date-fns';
import { AsthmaAirQuality, AsthmaAirQualityType, AsthmaBiometric, AsthmaBiometricType, AsthmaDataStatus, AsthmaLibraryCategory, AsthmaLogEntry, AsthmaParticipant } from '../model';
import { isBloodOxygenLevelWithinRange, isDaytimeRestingHeartRateWithinRange, isNighttimeRestingHeartRateWithinRange, isRespiratoryRateWithinRange, isSleepDisturbancesWithinRange, isStepsWithinRange } from './asthma-functions';

type BiometricTypeTermCode = 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'Steps' | 'SleepDisturbances' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
type BiometricThresholdFunction = (baseline: number, rawValue: number) => boolean;
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

const computeBiometricStatus = (thresholdFunction: BiometricThresholdFunction, baseline: number | undefined, value: number | undefined, defaultStatus: AsthmaDataStatus): AsthmaDataStatus => {
    if (baseline) {
        if (value) {
            return thresholdFunction(baseline, value) ? 'in-range' : 'out-of-range';
        }
        return 'offline';
    }
    return value ? 'establishing' : defaultStatus;
};

const computeBiometric = (type: AsthmaBiometricType, date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, thresholdFunction: BiometricThresholdFunction, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    let baseline = getLatestDataPointValue(date, dataPoints, biometricTypeTermCodes[type] + 'Baseline', offsetDays - 1);
    let value = getLatestDataPointValue(date, dataPoints, biometricTypeTermCodes[type], offsetDays);
    return {
        type: type,
        status: computeBiometricStatus(thresholdFunction, baseline, value, defaultStatus),
        value: value
    }
};

const computeDaytimeRestingHeartRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('daytime-resting-heart-rate', date, dataPoints, offsetDays, isDaytimeRestingHeartRateWithinRange, defaultStatus);
};

const computeNighttimeRestingHeartRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('nighttime-resting-heart-rate', date, dataPoints, offsetDays, isNighttimeRestingHeartRateWithinRange, defaultStatus);
};

const computeRespiratoryRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('respiratory-rate', date, dataPoints, offsetDays, isRespiratoryRateWithinRange, defaultStatus);
};

const computeStepsForControlStatus = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('steps', date, dataPoints, offsetDays, isStepsWithinRange, defaultStatus);
};

const computeStepsForDate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('steps', date, dataPoints, offsetDays, (baseline, rawValue) => (isToday(date) && new Date().getHours() < 19) || isStepsWithinRange(baseline, rawValue), defaultStatus);
};

const computeSleepDisturbances = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('sleep-disturbances', date, dataPoints, offsetDays, isSleepDisturbancesWithinRange, defaultStatus);
};

const computeDaytimeBloodOxygenLevel = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('daytime-blood-oxygen-level', date, dataPoints, offsetDays, isBloodOxygenLevelWithinRange, defaultStatus);
};

const computeNighttimeBloodOxygenLevel = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, defaultStatus: AsthmaDataStatus): AsthmaBiometric => {
    return computeBiometric('nighttime-blood-oxygen-level', date, dataPoints, offsetDays, isBloodOxygenLevelWithinRange, defaultStatus);
};

const computeBiometricsForControlStatus = (date: Date, dataPoints: DeviceDataPoint[]): AsthmaBiometric[] => {
    const defaultStatus: AsthmaDataStatus = 'establishing';
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
    const defaultStatus: AsthmaDataStatus = 'not-found';
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

const loadAirQualities = (observedAfter: Date, observedBefore: Date): Promise<DeviceDataPointsPage> => {
    let params: DeviceDataPointQuery = {
        namespace: 'AirNowApi',
        type: ['HomeAirQuality', 'WorkAirQuality'],
        observedAfter: observedAfter.toISOString(),
        observedBefore: observedBefore.toISOString()
    };
    return MyDataHelps.queryDeviceData(params);
};

const computeAirQualityStatusAndDescription = (aqi: number | undefined, defaultStatus: AsthmaDataStatus): [AsthmaDataStatus, string | undefined] => {
    if (aqi) {
        if (aqi <= 100) {
            return ['in-range', undefined];
        }
        if (aqi <= 200) {
            return ['out-of-range', 'Unhealthy'];
        }
        if (aqi <= 300) {
            return ['out-of-range', 'Very Unhealthy'];
        }
        if (aqi <= 500) {
            return ['out-of-range', 'Hazardous'];
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

    loadLogEntries(fromDate?: Date, toDate?: Date): Promise<AsthmaLogEntry[]>;

    loadBiometricsForControlStatus(): Promise<AsthmaBiometric[]>;

    loadBiometricsForDate(date: Date): Promise<AsthmaBiometric[]>;

    loadAirQualitiesForControlStatus(homeAirQualityZipCode: string, workAirQualityZipCode: string): Promise<AsthmaAirQuality[]>;

    loadAirQualitiesForDate(date: Date): Promise<AsthmaAirQuality[]>;

    saveLogEntry(logEntry: AsthmaLogEntry): Promise<void>;

    loadAndClearAlertTakeover(): Promise<string | undefined>;

    loadSurveyAnswers(surveyNames: string[]): Promise<SurveyAnswer[]>;

    loadLibraryCategories(url: string): Promise<AsthmaLibraryCategory[]>;
}

const service: AsthmaDataService = {
    loadParticipant: async function (): Promise<AsthmaParticipant> {
        let participantInfo = await MyDataHelps.getParticipantInfo();
        return new AsthmaParticipant(participantInfo);
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
    saveLogEntry: function (logEntry: AsthmaLogEntry): Promise<void> {
        let logEntryDataPoint: PersistableDeviceDataPoint = {
            type: 'Asthma-LogEntry',
            identifier: logEntry.identifier,
            observationDate: `${logEntry.identifier}T12:00:00-06:00`,
            value: JSON.stringify(logEntry)
        };
        return MyDataHelps.persistDeviceData([logEntryDataPoint]);
    },
    loadAndClearAlertTakeover: async function (): Promise<string | undefined> {
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
        if (mostRecentDataPoint.properties?.hasOwnProperty('viewed')) return undefined;

        mostRecentDataPoint.properties = mostRecentDataPoint.properties ?? {};
        mostRecentDataPoint.properties['viewed'] = formatISO(new Date());
        MyDataHelps.persistDeviceData([mostRecentDataPoint]).then();

        return mostRecentDataPoint.value;
    },
    loadSurveyAnswers: async function (surveyNames: string[]): Promise<SurveyAnswer[]> {
        let answers: SurveyAnswer[] = [];

        let queryParameters: SurveyAnswersQuery = {surveyName: surveyNames};

        const getPage = async function (pageID?: Guid): Promise<SurveyAnswer[]> {
            queryParameters.pageID = pageID;

            let response = await MyDataHelps.querySurveyAnswers(queryParameters);

            answers = answers.concat(response.surveyAnswers);
            if (response.nextPageID) {
                return getPage(response.nextPageID);
            } else {
                return answers;
            }
        };

        return getPage().then(function (surveyAnswers) {
            return surveyAnswers;
        });
    },
    loadLibraryCategories: async function (url: string): Promise<AsthmaLibraryCategory[]> {
        return fetch(url, {method: 'get'}).then(res => res.json());
    }
};

export default service;