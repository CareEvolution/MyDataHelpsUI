import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataPointsPage, PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, compareDesc, endOfDay, endOfToday, formatISO, isAfter, isBefore, isToday, parseISO, startOfDay, startOfToday } from 'date-fns';
import { AsthmaAirQuality, AsthmaAirQualityType, AsthmaBiometric, AsthmaBiometricType, AsthmaDataStatus, AsthmaLogEntry, AsthmaParticipant } from '../model';

type BiometricTypeTermCode = 'DaytimeRestingHeartRate' | 'NighttimeRestingHeartRate' | 'RespiratoryRate' | 'Steps' | 'SleepDisturbances' | 'DaytimeBloodOxygenLevel' | 'NighttimeBloodOxygenLevel';
type BiometricThresholdFunction = (baseline: number, value: number) => boolean;
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

const computeBiometricStatus = (thresholdFunction: BiometricThresholdFunction, baseline?: number, value?: number): AsthmaDataStatus => {
    if (baseline) {
        if (value) {
            return thresholdFunction(baseline, value) ? 'in-range' : 'out-of-range';
        }
        return 'offline';
    }
    return 'establishing';
};

const computeBiometric = (type: AsthmaBiometricType, date: Date, dataPoints: DeviceDataPoint[], offsetDays: number, thresholdFunction: BiometricThresholdFunction): AsthmaBiometric => {
    let baseline = getLatestDataPointValue(date, dataPoints, biometricTypeTermCodes[type] + 'Baseline', offsetDays - 1);
    let value = getLatestDataPointValue(date, dataPoints, biometricTypeTermCodes[type], offsetDays);
    return {
        type: type,
        status: computeBiometricStatus(thresholdFunction, baseline, value),
        value: value
    }
};

const computeDaytimeRestingHeartRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('daytime-resting-heart-rate', date, dataPoints, offsetDays, (baseline, value) => value <= (baseline * 1.2));
};

const computeNighttimeRestingHeartRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('nighttime-resting-heart-rate', date, dataPoints, offsetDays, (baseline, value) => value <= (baseline * 1.15));
};

const computeRespiratoryRate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('respiratory-rate', date, dataPoints, offsetDays, (baseline, value) => value <= (baseline * 1.15));
};

const computeStepsForControlStatus = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('steps', date, dataPoints, offsetDays, (baseline, value) => value >= (baseline / 2.0));
};

const computeStepsForDate = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('steps', date, dataPoints, offsetDays, (baseline, value) => (isToday(date) && new Date().getHours() < 19) || value >= (baseline / 2.0);
};

const computeSleepDisturbances = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('sleep-disturbances', date, dataPoints, offsetDays, (baseline, value) => value <= (baseline + 3.5));
};

const computeDaytimeBloodOxygenLevel = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('daytime-blood-oxygen-level', date, dataPoints, -1, (baseline, value) => {
        let percentage = value * 100.0;
        let threshold = (baseline * 100.0) - 4.0;
        return percentage >= 95 || percentage >= threshold
    });
};

const computeNighttimeBloodOxygenLevel = (date: Date, dataPoints: DeviceDataPoint[], offsetDays: number): AsthmaBiometric => {
    return computeBiometric('nighttime-blood-oxygen-level', date, dataPoints, 0, (baseline, value) => {
        let percentage = value * 100.0;
        let threshold = (baseline * 100.0) - 4.0;
        return percentage >= 95 || percentage >= threshold
    });
};

const computeBiometricsForControlStatus = (date: Date, dataPoints: DeviceDataPoint[]): AsthmaBiometric[] => {
    return [
        computeDaytimeRestingHeartRate(date, dataPoints, -1),
        computeNighttimeRestingHeartRate(date, dataPoints, 0),
        computeRespiratoryRate(date, dataPoints, 0),
        computeStepsForControlStatus(date, dataPoints, -1),
        computeSleepDisturbances(date, dataPoints, 0),
        computeDaytimeBloodOxygenLevel(date, dataPoints, -1),
        computeNighttimeBloodOxygenLevel(date, dataPoints, 0)
    ];
};

const computeBiometricsForDate = (date: Date, dataPoints: DeviceDataPoint[]): AsthmaBiometric[] => {
    return [
        computeDaytimeRestingHeartRate(date, dataPoints, 0),
        computeNighttimeRestingHeartRate(date, dataPoints, 0),
        computeRespiratoryRate(date, dataPoints, 0),
        computeStepsForDate(date, dataPoints, 0),
        computeSleepDisturbances(date, dataPoints, 0),
        computeDaytimeBloodOxygenLevel(date, dataPoints, 0),
        computeNighttimeBloodOxygenLevel(date, dataPoints, 0)
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

const computeAirQualityStatusAndDescription = (aqi?: number): [AsthmaDataStatus, string | undefined] => {
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
    return ['establishing', undefined];
};

const computeAirQuality = (type: AsthmaAirQualityType, dataPoints: DeviceDataPoint[], computeAqi: (dataPoints: DeviceDataPoint[]) => number): AsthmaAirQuality => {
    let filteredDataPoints = dataPoints.filter(dp => dp.type === airQualityTypeTermCodes[type]);

    let aqi: number | undefined;
    if (filteredDataPoints.length > 0) {
        aqi = computeAqi(filteredDataPoints);
    }

    let [status, description] = computeAirQualityStatusAndDescription(aqi);

    return {
        type: type,
        status: status,
        value: aqi,
        description: description
    }
};

const computeAirQualities = (dataPoints: DeviceDataPoint[], computeAqi: (dataPoints: DeviceDataPoint[]) => number): AsthmaAirQuality[] => {
    return [
        computeAirQuality('home', dataPoints, computeAqi),
        computeAirQuality('work', dataPoints, computeAqi)
    ];
};

export interface AsthmaDataService {
    loadParticipant(): Promise<AsthmaParticipant>;

    loadLogEntries(fromDate?: Date, toDate?: Date): Promise<AsthmaLogEntry[]>;

    loadBiometricsForControlStatus(): Promise<AsthmaBiometric[]>;

    loadBiometricsForDate(date: Date): Promise<AsthmaBiometric[]>;

    loadAirQualitiesForControlStatus(): Promise<AsthmaAirQuality[]>;

    loadAirQualitiesForDate(date: Date): Promise<AsthmaAirQuality[]>;

    saveLogEntry(logEntry: AsthmaLogEntry): Promise<void>;

    loadAndClearAlertTakeover(): Promise<string | undefined>;
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
    loadAirQualitiesForControlStatus: async function (): Promise<AsthmaAirQuality[]> {
        let result = await loadAirQualities(add(new Date(), {hours: -12}), endOfToday());
        return computeAirQualities(result.deviceDataPoints, dataPoints => getDataPointValueAsNumber(dataPoints.sort(sortDataPointsDesc)[0]));
    },
    loadAirQualitiesForDate: async function (date: Date): Promise<AsthmaAirQuality[]> {
        let result = await loadAirQualities(startOfDay(date), endOfDay(date));
        return computeAirQualities(result.deviceDataPoints, dataPoints => {
            let maxValue = 0;
            dataPoints.forEach(dataPoint => {
                let value = getDataPointValueAsNumber(dataPoint);
                if (value > maxValue) {
                    maxValue = value;
                }
            });
            return maxValue;
        });
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
    }
};

export default service;