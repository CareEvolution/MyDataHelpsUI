import { getSurveyDataProvider, isSurveyDataType, SurveyDataType } from '../../../src/helpers/insight-matrix/survey-data-type';
import getDayKey from '../../../src/helpers/get-day-key';
import { DailyDataType } from '../../../src/helpers/daily-data-types';
import { DailyDataQueryResult } from '../../../src/helpers/query-daily-data';
import * as queryAllSurveyAnswersModule from '../../../src/helpers/query-all-survey-answers';
import { add, endOfDay, formatISO, startOfToday } from 'date-fns';
import { SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import { describe, it } from '@jest/globals';

describe('Insight Matrix - Survey Data Type Tests', () => {
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

    describe('Get Survey Data Provider', () => {
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
        });

        it('Should query for survey answers, ignoring those that are too old.', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: formatISO(add(startDate, { seconds: -1 })), answers: ["6"] },
                { date: formatISO(startDate), answers: ["5"] }
            ] as SurveyAnswer[]));

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            verifyResult(result, startDate, 5);
        });

        it('Should query for survey answers, ignoring those that are too recent.', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: formatISO(add(endDate, { days: 1 })), answers: ["8"] },
                { date: formatISO(endOfDay(endDate)), answers: ["7"] }
            ] as SurveyAnswer[]));

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            verifyResult(result, endDate, 7);
        });

        it('Should query for survey answers, selecting the most recent answer for each day.', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: formatISO(add(startDate, { days: 2 })), answers: ["2"] },
                { date: formatISO(add(startDate, { days: 2, minutes: 5 })), answers: ["4"] },
                { date: formatISO(add(startDate, { days: 2, minutes: 2 })), answers: ["6"] }
            ] as SurveyAnswer[]));

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            verifyResult(result, add(startDate, { days: 2 }), 4);
        });

        it('Should query for survey answers, ignoring answers with non-numeric values.', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: formatISO(startDate), answers: ["invalid"] },
                { date: formatISO(endDate), answers: ["6"] }
            ] as SurveyAnswer[]));

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            verifyResult(result, endDate, 6);
        });

        it('Should query for survey answers, even without a result identifier.', async () => {
            queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([
                { date: formatISO(startDate), answers: ["10"] }
            ] as SurveyAnswer[]));

            const result = await getSurveyDataProvider({ ...surveyDataType, resultIdentifier: undefined })(startDate, endDate);

            verifyResult(result, startDate, 10, false);
        });
    });
});