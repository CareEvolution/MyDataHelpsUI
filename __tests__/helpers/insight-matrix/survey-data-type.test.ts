import { DailyDataType, isSurveyDataType } from '../../../src';

describe('Insight Matrix - Survey Data Type', () => {
    describe('Is Survey Data Type', () => {
        it('Should return false when the passed argument is a DailyDataType.', () => {
            const result = isSurveyDataType(DailyDataType.Steps);
            expect(result).toBe(false);
        });
        it('Should return true when the passed argument is a SurveyDataType.', () => {
            const result = isSurveyDataType({ surveyName: 'Survey Name', stepIdentifier: 'Step Identifier' });
            expect(result).toBe(true);
        });
    });
});

/*
export function getSurveyDataProvider(dataType: SurveyDataType): DailyDataProvider {
    return async (startDate: Date, endDate: Date) => {
        const query: SurveyAnswersQuery = {
            surveyName: dataType.surveyName,
            stepIdentifier: dataType.stepIdentifier,
            after: add(startDate, { days: -1 }).toISOString(),
            before: add(endDate, { days: 1 }).toISOString()
        };

        if (dataType.resultIdentifier) {
            query.resultIdentifier = dataType.resultIdentifier;
        }

        const answers = await queryAllSurveyAnswers(query);

        const result: DailyDataQueryResult = {};

        let currentDate = startDate;
        while (currentDate <= endDate) {
            const currentDayKey = getDayKey(currentDate);
            const answerForDate = answers.find(answer => isSameDay(parseISO(answer.date), currentDate))?.answers[0];
            if (answerForDate) {
                const parsedAnswer = parseInt(answerForDate);
                if (!Number.isNaN(parsedAnswer)) {
                    result[currentDayKey] = parsedAnswer;
                }
            }
            currentDate = add(currentDate, { days: 1 });
        }

        return result;
    };
}
 */