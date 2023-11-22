import surveyBloodPressureDataProvider, { BloodPressureDataParameters as SurveyBloodPressureDataParameters } from "./survey-blood-pressure-data-provider";

export interface BloodPressureDataPoint {
    dateLabel: string,
    date: Date,
    systolic : number,
    diastolic : number
};

export type BloodPressureDataSource = "Survey";

export interface BloodPressureDataParameters {
    dataSource : BloodPressureDataSource,
    surveyParameters?: SurveyBloodPressureDataParameters
}

export type BloodPressureDataProvider = (props : BloodPressureDataParameters) => Promise<BloodPressureDataPoint[]>;

export default function queryBloodPressure(props : BloodPressureDataParameters) :  Promise<BloodPressureDataPoint[]>{
  
    if (props.dataSource === "Survey" && props.surveyParameters){
        return surveyBloodPressureDataProvider(props.surveyParameters);
    }

    return Promise.resolve([]);
}