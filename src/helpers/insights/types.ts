import { SurveyAnswer } from '@careevolution/mydatahelps-js';

export interface InsightsDataPoint {
    type: string;
    value: number;
}

export interface InsightsData {
    date: Date;
    surveyAnswers: SurveyAnswer[];
    dataPoints: InsightsDataPoint[];
}
