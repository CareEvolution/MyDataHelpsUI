import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, compareDesc, formatISO, isAfter, isBefore, parseISO, startOfToday } from 'date-fns';
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

const getLatestDataPointValue = (today: Date, dataPoints: DeviceDataPoint[], type: string, offsetDays: number): number | undefined => {
    let start = add(today, {days: offsetDays});
    let end = add(today, {days: offsetDays + 1});

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

const computeBiometricStatus = (thresholdFunction: BiometricThresholdFunction, baseline?: number, value?: number): AsthmaDataStatus => {
    if (baseline) {
        if (value) {
            return thresholdFunction(baseline, value) ? 'in-range' : 'out-of-range';
        }
        return 'offline';
    }
    return 'establishing';
};

const computeBiometric = (type: AsthmaBiometricType, today: Date, dataPoints: DeviceDataPoint[], offsetDays: number, thresholdFunction: BiometricThresholdFunction): AsthmaBiometric => {
    let baseline = getLatestDataPointValue(today, dataPoints, biometricTypeTermCodes[type] + 'Baseline', offsetDays - 1);
    let value = getLatestDataPointValue(today, dataPoints, biometricTypeTermCodes[type], offsetDays);
    return {
        type: type,
        status: computeBiometricStatus(thresholdFunction, baseline, value),
        value: value
    }
};

const computeBiometrics = (today: Date, dataPoints: DeviceDataPoint[]): AsthmaBiometric[] => {
    return [
        computeBiometric('daytime-resting-heart-rate', today, dataPoints, -1, (baseline, value) => value <= (baseline * 1.2)),
        computeBiometric('nighttime-resting-heart-rate', today, dataPoints, 0, (baseline, value) => value <= (baseline * 1.15)),
        computeBiometric('respiratory-rate', today, dataPoints, 0, (baseline, value) => value <= (baseline * 1.15)),
        computeBiometric('steps', today, dataPoints, -1, (baseline, value) => value >= (baseline / 2.0)),
        computeBiometric('sleep-disturbances', today, dataPoints, 0, (baseline, value) => value <= (baseline + 3.5)),
        computeBiometric('daytime-blood-oxygen-level', today, dataPoints, -1, (baseline, value) => {
            let percentage = value * 100.0;
            let threshold = (baseline * 100.0) - 4.0;
            return percentage >= 95 || percentage >= threshold
        }),
        computeBiometric('nighttime-blood-oxygen-level', today, dataPoints, 0, (baseline, value) => {
            let percentage = value * 100.0;
            let threshold = (baseline * 100.0) - 4.0;
            return percentage >= 95 || percentage >= threshold
        })
    ];
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

const computeAirQuality = (type: AsthmaAirQualityType, dataPoints: DeviceDataPoint[]): AsthmaAirQuality => {
    let filteredDataPoints = dataPoints.filter(dp => dp.type === airQualityTypeTermCodes[type]);

    let aqi: number | undefined;
    if (filteredDataPoints.length > 0) {
        aqi = getDataPointValueAsNumber(filteredDataPoints.sort(sortDataPointsDesc)[0]);
    }

    let [status, description] = computeAirQualityStatusAndDescription(aqi);

    return {
        type: type,
        status: status,
        value: aqi,
        description: description
    }
};

const computeAirQualities = (dataPoints: DeviceDataPoint[]): AsthmaAirQuality[] => {
    return [
        computeAirQuality('home', dataPoints),
        computeAirQuality('work', dataPoints)
    ];
};

export interface AsthmaDataService {
    loadParticipant(): Promise<AsthmaParticipant>;

    loadLogEntries(fromDate?: Date, toDate?: Date): Promise<AsthmaLogEntry[]>;

    loadBiometrics(): Promise<AsthmaBiometric[]>;

    loadAirQualities(): Promise<AsthmaAirQuality[]>;

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
    loadBiometrics: async function (): Promise<AsthmaBiometric[]> {
        let today = startOfToday();
        let threshold = add(today, {days: -2});

        let params: DeviceDataPointQuery = {
            namespace: 'Project',
            type: [
                'DaytimeRestingHeartRate', 'DaytimeRestingHeartRateBaseline', 'NighttimeRestingHeartRate', 'NighttimeRestingHeartRateBaseline',
                'RespiratoryRate', 'RespiratoryRateBaseline', 'Steps', 'StepsBaseline', 'SleepDisturbances', 'SleepDisturbancesBaseline',
                'DaytimeBloodOxygenLevel', 'DaytimeBloodOxygenLevelBaseline', 'NighttimeBloodOxygenLevel', 'NighttimeBloodOxygenLevelBaseline'
            ],
            observedAfter: threshold.toISOString()
        };
        let result = await MyDataHelps.queryDeviceData(params);
        return computeBiometrics(today, result.deviceDataPoints);
    },
    loadAirQualities: async function (): Promise<AsthmaAirQuality[]> {
        let now = new Date();
        let threshold = add(now, {hours: -12});

        let params: DeviceDataPointQuery = {
            namespace: 'AirNowApi',
            type: ['HomeAirQuality', 'WorkAirQuality'],
            observedAfter: threshold.toISOString()
        };
        let result = await MyDataHelps.queryDeviceData(params);
        return computeAirQualities(result.deviceDataPoints);
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