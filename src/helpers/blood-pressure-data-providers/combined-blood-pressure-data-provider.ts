import MyDataHelps from "@careevolution/mydatahelps-js"
import { BloodPressureDataPoint, SurveyBloodPressureDataParameters } from "."
import surveyBloodPressureDataProvider from "./survey-blood-pressure-data-provider"
import deviceDataBloodPressureDataProvider from "./device-blood-pressure-data-provider"

export default async function (surveyDataSource?: SurveyBloodPressureDataParameters): Promise<BloodPressureDataPoint[]> {
    let providers: Promise<BloodPressureDataPoint[]>[] = [];

    return MyDataHelps.getDataCollectionSettings().then((settings) => {

        if (surveyDataSource) {
            providers.push(surveyBloodPressureDataProvider(surveyDataSource));
        }
        
        if (!surveyDataSource || !surveyDataSource.hideDeviceData) {
            providers.push(deviceDataBloodPressureDataProvider("AppleHealth", "BloodPressureSystolic", "BloodPressureDiastolic"));
            providers.push(deviceDataBloodPressureDataProvider("GoogleFit", "blood_pressure_systolic", "blood_pressure_diastolic"));
        }

        if (!providers.length) {
            return [];
        }

        return Promise.all(providers).then((values) => {
            return values.reduce((acc, val) => acc.concat(val), []);
        });
    });
}
