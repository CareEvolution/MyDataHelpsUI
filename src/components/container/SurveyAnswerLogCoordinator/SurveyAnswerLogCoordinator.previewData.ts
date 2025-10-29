import { startOfToday } from 'date-fns';
import { generateSurveyAnswers, getDayKey, SurveyAnswerLog } from '../../../helpers';
import { v4 as uuid } from 'uuid';

export type SurveyAnswerLogCoordinatorPreviewState = 'no data' | 'with data';

export async function generateSurveyAnswerLogs(previewState: SurveyAnswerLogCoordinatorPreviewState, startDate: Date): Promise<Partial<Record<string, SurveyAnswerLog>>> {
    if (previewState === 'no data') {
        return {};
    }

    const surveyAnswers = (await generateSurveyAnswers(startDate, startOfToday(), ['result_identifier'], 0, 5, { days: 1 })).flat();

    return surveyAnswers.reduce((surveyAnswerLogs, surveyAnswer) => {
        const dayKey = getDayKey(surveyAnswer.date);
        surveyAnswerLogs[dayKey] ??= { resultId: uuid(), surveyAnswers: [] };
        surveyAnswerLogs[dayKey].surveyAnswers.push(surveyAnswer);
        return surveyAnswerLogs;
    }, {} as Record<string, SurveyAnswerLog>);
}