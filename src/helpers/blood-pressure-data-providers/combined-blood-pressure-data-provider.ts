import { BloodPressureDataPoint, SurveyBloodPressureDataParameters } from "."
import surveyBloodPressureDataProvider from "./survey-blood-pressure-data-provider"
import deviceDataBloodPressureDataProvider from "./device-blood-pressure-data-provider"

export type BloodPressureDeviceDataSource = 'AppleHealth' | 'GoogleFit';

export default async function (surveyDataSource?: SurveyBloodPressureDataParameters, bloodPressureDeviceDataSources?: BloodPressureDeviceDataSource[]): Promise<BloodPressureDataPoint[]> {
    let providers: Promise<BloodPressureDataPoint[]>[] = [];

    if (surveyDataSource) {
        providers.push(surveyBloodPressureDataProvider(surveyDataSource));
    }

    if (bloodPressureDeviceDataSources) {
        bloodPressureDeviceDataSources.forEach((source) => {
            if (source === 'AppleHealth') {
                providers.push(deviceDataBloodPressureDataProvider("AppleHealth", "BloodPressureSystolic", "BloodPressureDiastolic"));
            } else if (source === 'GoogleFit') {
                providers.push(deviceDataBloodPressureDataProvider("GoogleFit", "blood_pressure_systolic", "blood_pressure_diastolic"));
            }
        });
    }

    if (!providers.length) {
        return [];
    }

    return Promise.all(providers).then((values) => {
        return values.reduce((acc, val) => acc.concat(val), []);
    });
}
