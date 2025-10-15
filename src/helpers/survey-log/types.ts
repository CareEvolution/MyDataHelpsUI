export interface SurveyLogSurveyAnswer {
    surveyName: string;
    stepIdentifier: string;
    resultIdentifier: string;
    answers: string[];
}

export interface SurveyLogDataPoint {
    type: string;
    value: number;
}

export interface SurveyLog {
    date: Date;
    surveyAnswers: SurveyLogSurveyAnswer[];
    dataPoints: SurveyLogDataPoint[];
}
