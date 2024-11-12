import { getSurveyDataProvider, isSurveyDataType } from '../../../src/helpers/insight-matrix/survey-data-type';
import getDayKey from '../../../src/helpers/get-day-key';
import { DailyDataQueryResult, DailyDataType } from '../../../src/helpers/daily-data-types';
import * as queryAllSurveyAnswersModule from '../../../src/helpers/query-all-survey-answers';
import { add, endOfDay, startOfToday } from 'date-fns';

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

    describe('Survey Data Provider', () => {
        const startDate = add(startOfToday(), { days: -7 });
        const endDate = startOfToday();

        const surveyDataType: SurveyDataType = {
            surveyName: 'Survey Name',
            stepIdentifier: 'Step Identifier',
            resultIdentifier: 'Result Identifier'
        };

        const queryAllSurveyAnswersMock = jest.spyOn(queryAllSurveyAnswersModule, 'default').mockImplementation();

        const verifyResult = (result: DailyDataQueryResult, resultDate: Date, resultValue: number, withResultIdentifier: boolean = true) => {
            expect(Object.keys(result).length).toBe(1);
            expect(result[getDayKey(resultDate)]).toBe(resultValue);

            const expectedQuery: SurveyAnswersQuery = {
                surveyName: surveyDataType.surveyName,
                stepIdentifier: surveyDataType.stepIdentifier,
                after: add(startDate, { days: -1 }).toISOString(),
                before: add(endDate, { days: 1 }).toISOString()
            };

            if (withResultIdentifier) {
                expectedQuery.resultIdentifier = surveyDataType.resultIdentifier;
            }

            expect(queryAllSurveyAnswersMock).toHaveBeenCalledWith(expectedQuery);
        };

        beforeEach(() => {
            queryAllSurveyAnswersMock.mockReset();
        })

        it('Should query for survey answers, ignoring those that are too old.', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: add(startDate, { seconds: -1 }).toISOString(), answers: ["6"] },
                { date: startDate.toISOString(), answers: ["5"] }
            ]));

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            verifyResult(result, startDate, 5);
        });

        it('Should query for survey answers, ignoring those that are too recent.', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: add(endDate, { days: 1 }).toISOString(), answers: ["8"] },
                { date: endOfDay(endDate).toISOString(), answers: ["7"] }
            ]));

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            verifyResult(result, endDate, 7);
        });

        it('Should query for survey answers, ignoring duplicates (other answers from the same day).', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: add(startDate, { days: 2 }).toISOString(), answers: ["2"] },
                { date: add(startDate, { days: 2, minutes: 1 }).toISOString(), answers: ["4"] }
            ]));

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            verifyResult(result, add(startDate, { days: 2 }), 2);
        });
    });
});