import { describe, expect, it } from '@jest/globals';
import { getSurveyDataProvider, isSurveyDataType, SurveyDataType } from '../../../src/helpers/insight-matrix/survey-data-type';
import getDayKey from '../../../src/helpers/get-day-key';
import { DailyDataType } from '../../../src/helpers/daily-data-types';
import { add, formatISO, startOfToday } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import queryLatestSurveyAnswersByDate from '../../../src/helpers/query-latest-survey-answers-by-date';

jest.mock('../../../src/helpers/query-latest-survey-answers-by-date', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Insight Matrix - Survey Data Type Tests', () => {

    const queryLatestSurveyAnswersByDateMock = queryLatestSurveyAnswersByDate as jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('Is Survey Data Type', () => {
        it('Should return false when the passed argument is a DailyDataType.', () => {
            const result = isSurveyDataType(DailyDataType.Steps);
            expect(result).toBe(false);
        });
        it('Should return true when the passed argument is a SurveyDataType.', () => {
            const result = isSurveyDataType({ surveyName: 'Survey Name' });
            expect(result).toBe(true);
        });
    });

    describe('Get Survey Data Provider', () => {
        test.each([
            { useEventAsDate: false },
            { useEventAsDate: true }
        ])('Should query for survey answers, ignoring answers with non-numeric values (using event as date: $useEventAsDate).', async ({ useEventAsDate }) => {
            const startDate = add(startOfToday(), { days: -7 });
            const endDate = startOfToday();

            queryLatestSurveyAnswersByDateMock.mockResolvedValue({
                [getDayKey(startDate)]: [{ date: formatISO(startDate), answers: ['5'] }],
                [getDayKey(add(startDate, { days: 1 }))]: [{ date: formatISO(add(startDate, { days: 1 })), answers: ['invalid'] }],
                [getDayKey(add(endDate, { days: -1 }))]: [{ date: formatISO(add(endDate, { days: -1 })), answers: ['6'] }]
            } as Record<string, SurveyAnswer[]>);

            const surveyDataType: SurveyDataType = {
                surveyName: 'Survey Name',
                stepIdentifier: 'Step Identifier',
                resultIdentifier: 'Result Identifier',
                useEventAsDate
            };

            const result = await getSurveyDataProvider(surveyDataType)(startDate, endDate);

            expect(Object.keys(result)).toHaveLength(2);
            expect(result[getDayKey(startDate)]).toBe(5);
            expect(result[getDayKey(getDayKey(add(endDate, { days: -1 })))]).toBe(6);

            expect(queryLatestSurveyAnswersByDateMock).toHaveBeenCalledWith(startDate, endDate, 'Survey Name', 'Step Identifier', 'Result Identifier', useEventAsDate);
        });
    });
});