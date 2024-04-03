import { BloodPressureDataPoint, SurveyBloodPressureDataParameters } from "."
import surveyBloodPressureDataProvider from "./survey-blood-pressure-data-provider"
import deviceDataBloodPressureDataProvider from "./device-blood-pressure-data-provider"

export type BloodPressureDeviceDataSource = 'AppleHealth' | 'GoogleFit' | "Omron";

export default async function (surveyDataSource?: SurveyBloodPressureDataParameters, bloodPressureDeviceDataSources?: BloodPressureDeviceDataSource[]): Promise<BloodPressureDataPoint[]> {
    let providers: Promise<BloodPressureDataPoint[]>[] = [];

    if (surveyDataSource) {
        providers.push(surveyBloodPressureDataProvider(surveyDataSource));
    }

    if (bloodPressureDeviceDataSources) {
        bloodPressureDeviceDataSources.forEach((source) => {
            if (source === 'AppleHealth') {
                providers.push(deviceDataBloodPressureDataProvider(source, "BloodPressureSystolic", "BloodPressureDiastolic"));
            } else if (source === 'GoogleFit') {
                providers.push(deviceDataBloodPressureDataProvider(source, "blood_pressure_systolic", "blood_pressure_diastolic"));
            } else if (source === 'Omron') {
                providers.push(deviceDataBloodPressureDataProvider(source, "BloodPressureSystolic", "BloodPressureDiastolic"));
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
