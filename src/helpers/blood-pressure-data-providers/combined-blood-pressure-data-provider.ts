import { BloodPressureDataPoint, SurveyBloodPressureDataParameters } from '.'
import surveyBloodPressureDataProvider from './survey-blood-pressure-data-provider'
import deviceDataBloodPressureDataProvider from './device-data-blood-pressure-data-provider'
import deviceDataBloodPressureDataProviderV2 from './device-data-v2-blood-pressure-data-provider'
import { getCombinedDataCollectionSettings } from '../daily-data-providers/combined-data-collection-settings';
import { DataCollectionSettings, SupportedDeviceDataV2DataType } from '@careevolution/mydatahelps-js';

export type BloodPressureDeviceDataSource = 'AppleHealth' | 'GoogleFit' | 'Omron' | 'HealthConnect';

export default async function (surveyDataSource?: SurveyBloodPressureDataParameters, bloodPressureDeviceDataSources?: BloodPressureDeviceDataSource[]): Promise<BloodPressureDataPoint[]> {
    const providers: Promise<BloodPressureDataPoint[]>[] = [];

    if (surveyDataSource) {
        providers.push(surveyBloodPressureDataProvider(surveyDataSource));
    }

    if (bloodPressureDeviceDataSources) {
        const useV2 = bloodPressureDeviceDataSources.includes('HealthConnect');
        const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(useV2);

        bloodPressureDeviceDataSources.forEach(source => {
            if (source === 'AppleHealth' && appleHealthBloodPressureEnabled(settings)) {
                providers.push(deviceDataBloodPressureDataProvider('AppleHealth', 'BloodPressureSystolic', 'BloodPressureDiastolic'));
            } else if (source === 'GoogleFit' && googleFitBloodPressureEnabled(settings)) {
                providers.push(deviceDataBloodPressureDataProvider('GoogleFit', 'blood_pressure_systolic', 'blood_pressure_diastolic'));
            } else if (source === 'Omron' && settings.omronEnabled) {
                providers.push(deviceDataBloodPressureDataProvider('Omron', 'BloodPressureSystolic', 'BloodPressureDiastolic'));
            } else if (source === 'HealthConnect' && healthConnectBloodPressureEnabled(settings, deviceDataV2Types)) {
                providers.push(deviceDataBloodPressureDataProviderV2('HealthConnect', 'blood-pressure-systolic', 'blood-pressure-diastolic'));
            }
        });
    }

    if (providers.length === 0) return [];

    return (await Promise.all(providers)).reduce((allDataPoints, dataPoints) => allDataPoints.concat(dataPoints), []);
}

function appleHealthBloodPressureEnabled(settings: DataCollectionSettings): boolean {
    return settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(
        dt => dt.namespace === 'AppleHealth' && ['BloodPressureSystolic', 'BloodPressureDiastolic'].includes(dt.type)
    );
}

function googleFitBloodPressureEnabled(settings: DataCollectionSettings): boolean {
    return settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(
        dt => dt.namespace === 'GoogleFit' && ['blood_pressure_systolic', 'blood_pressure_diastolic'].includes(dt.type)
    );
}

function healthConnectBloodPressureEnabled(settings: DataCollectionSettings, deviceDataV2Types: SupportedDeviceDataV2DataType[]): boolean {
    return settings.healthConnectEnabled && deviceDataV2Types.some(
        dt => dt.namespace === 'HealthConnect' && ['blood-pressure-systolic', 'blood-pressure-diastolic'].includes(dt.type)
    );
}

