import { SurveyAnswer } from '@careevolution/mydatahelps-js';

export interface DataPoint {
  type: string;
  value: number;
}

export interface InsightsData {
  date: Date;
  surveyAnswers: SurveyAnswer[];
  dataPoints: DataPoint[];
}
