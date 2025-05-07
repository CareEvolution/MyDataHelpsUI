import { BloodPressureDataPoint, SurveyBloodPressureDataParameters } from '.'
import surveyBloodPressureDataProvider from './survey-blood-pressure-data-provider'
import deviceDataBloodPressureDataProvider from './device-data-blood-pressure-data-provider'
import deviceDataBloodPressureDataProviderV2 from './device-data-v2-blood-pressure-data-provider'

export type BloodPressureDeviceDataSource = 'AppleHealth' | 'GoogleFit' | 'Omron' | 'HealthConnect';

export default async function (surveyDataSource?: SurveyBloodPressureDataParameters, bloodPressureDeviceDataSources?: BloodPressureDeviceDataSource[]): Promise<BloodPressureDataPoint[]> {
    const providers: Promise<BloodPressureDataPoint[]>[] = [];

    if (surveyDataSource) {
        providers.push(surveyBloodPressureDataProvider(surveyDataSource));
    }

    if (bloodPressureDeviceDataSources) {
        bloodPressureDeviceDataSources.forEach(source => {
            if (source === 'AppleHealth') {
                providers.push(deviceDataBloodPressureDataProvider(source, 'BloodPressureSystolic', 'BloodPressureDiastolic'));
            } else if (source === 'GoogleFit') {
                providers.push(deviceDataBloodPressureDataProvider(source, 'blood_pressure_systolic', 'blood_pressure_diastolic'));
            } else if (source === 'Omron') {
                providers.push(deviceDataBloodPressureDataProvider(source, 'BloodPressureSystolic', 'BloodPressureDiastolic'));
            } else if (source === 'HealthConnect') {
                providers.push(deviceDataBloodPressureDataProviderV2(source, 'blood-pressure-systolic', 'blood-pressure-diastolic'));
            }
        });
    }

    if (providers.length === 0) return [];

    return (await Promise.all(providers)).reduce((allDataPoints, dataPoints) => allDataPoints.concat(dataPoints), []);
}
