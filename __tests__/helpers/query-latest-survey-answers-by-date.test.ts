import { describe, expect, it } from '@jest/globals';
import queryLatestSurveyAnswersByDate from '../../src/helpers/query-latest-survey-answers-by-date';
import queryAllSurveyAnswers from '../../src/helpers/query-all-survey-answers';
import { add, endOfDay, formatISO } from 'date-fns';
import getDayKey from '../../src/helpers/get-day-key';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { v4 as uuid } from 'uuid';
import { parseISOWithoutOffset } from '../../src/helpers/date-helpers';

jest.mock('../../src/helpers/query-all-survey-answers', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Query Latest Survey Answers By Date', () => {

    const queryAllSurveyAnswersMock = queryAllSurveyAnswers as jest.Mock;

    const startDate = parseISOWithoutOffset('2025-11-15T00:00:00');
    const endDate = parseISOWithoutOffset('2025-12-05T00:00:00');

    const surveyName = '* Survey Name';
    const stepIdentifier = 'Step Identifier';
    const resultIdentifier = 'Result Identifier';

    beforeEach(() => {
        jest.resetAllMocks();
    });

    const verifyQueryAssertions = (useEventAsDate: boolean) => {
        expect(queryAllSurveyAnswersMock).toHaveBeenCalledTimes(1);
        if (useEventAsDate) {
            expect(queryAllSurveyAnswersMock).toHaveBeenCalledWith({
                surveyName,
                event: '2025-11-1*,2025-11-2*,2025-11-3*,2025-12-0*',
                stepIdentifier,
                resultIdentifier
            });
        } else {
            expect(queryAllSurveyAnswersMock).toHaveBeenCalledWith({
                surveyName,
                after: add(startDate, { days: -1 }).toISOString(),
                before: add(endDate, { days: 1 }).toISOString(),
                stepIdentifier,
                resultIdentifier
            });
        }
    };

    describe('Date Filtering', () => {
        it('Should ignore survey answers that are too old.', async () => {
            queryAllSurveyAnswersMock.mockResolvedValue([
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(add(startDate, { seconds: -1 })), answers: ['5'] },
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(startDate), answers: ['7'] }
            ]);

            const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(startDate, endDate, surveyName, stepIdentifier, resultIdentifier);

            expect(Object.keys(latestSurveyAnswersByDate)).toHaveLength(1);
            expect(latestSurveyAnswersByDate[getDayKey(startDate)]?.[0].answers).toEqual(['7']);

            verifyQueryAssertions(false);
        });

        it('Should ignore survey answers that are too old (with events as dates).', async () => {
            queryAllSurveyAnswersMock.mockResolvedValue([
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(startDate), answers: ['5'], event: getDayKey(add(startDate, { days: -1 })) },
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(startDate), answers: ['7'], event: getDayKey(startDate) }
            ]);

            const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(startDate, endDate, surveyName, stepIdentifier, resultIdentifier, true);

            expect(Object.keys(latestSurveyAnswersByDate)).toHaveLength(1);
            expect(latestSurveyAnswersByDate[getDayKey(startDate)]?.[0].answers).toEqual(['7']);

            verifyQueryAssertions(true);
        });

        it('Should ignore survey answers that are too recent.', async () => {
            queryAllSurveyAnswersMock.mockResolvedValue([
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(add(endDate, { days: 1 })), answers: ['5'] },
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(endOfDay(endDate)), answers: ['7'] }
            ]);

            const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(startDate, endDate, surveyName, stepIdentifier, resultIdentifier);

            expect(Object.keys(latestSurveyAnswersByDate)).toHaveLength(1);
            expect(latestSurveyAnswersByDate[getDayKey(endDate)]?.[0].answers).toEqual(['7']);

            verifyQueryAssertions(false);
        });

        it('Should ignore survey answers that are too recent (with events as dates).', async () => {
            queryAllSurveyAnswersMock.mockResolvedValue([
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(endDate), answers: ['5'], event: getDayKey(add(endDate, { days: 1 })) },
                { surveyResultID: uuid().toString(), surveyName: 'Survey Name', date: formatISO(endDate), answers: ['7'], event: getDayKey(endDate) }
            ]);

            const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(startDate, endDate, surveyName, stepIdentifier, resultIdentifier, true);

            expect(Object.keys(latestSurveyAnswersByDate)).toHaveLength(1);
            expect(latestSurveyAnswersByDate[getDayKey(endDate)]?.[0].answers).toEqual(['7']);

            verifyQueryAssertions(true);
        });
    });

    describe('Survey Answer Collation', () => {
        const surveyResultID1 = uuid().toString();
        const surveyResultID2 = uuid().toString();
        const surveyResultID3 = uuid().toString();
        const surveyResultID4 = uuid().toString();

        const surveyAnswers: Partial<SurveyAnswer>[] = [
            { surveyResultID: surveyResultID1, surveyName: 'Survey Name', date: formatISO(add(endDate, { hours: 8 })), answers: ['5'], event: getDayKey(startDate) },
            { surveyResultID: surveyResultID2, surveyName: 'Survey Name', date: formatISO(add(endDate, { hours: 14 })), answers: ['7'], event: getDayKey(startDate) },
            { surveyResultID: surveyResultID2, surveyName: 'Survey Name', date: formatISO(add(endDate, { hours: 14 })), answers: ['6'], event: getDayKey(startDate) },
            { surveyResultID: surveyResultID1, surveyName: 'Survey Name', date: formatISO(add(endDate, { hours: 8 })), answers: ['8'], event: getDayKey(startDate) },
            { surveyResultID: surveyResultID3, surveyName: 'Other Survey Name', date: formatISO(add(endDate, { hours: 9 })), answers: ['1'], event: getDayKey(startDate) },
            { surveyResultID: surveyResultID4, surveyName: 'Other Survey Name', date: formatISO(add(endDate, { hours: 15 })), answers: ['3'], event: getDayKey(startDate) },
            { surveyResultID: surveyResultID4, surveyName: 'Other Survey Name', date: formatISO(add(endDate, { hours: 15 })), answers: ['2'], event: getDayKey(startDate) },
            { surveyResultID: surveyResultID3, surveyName: 'Other Survey Name', date: formatISO(add(endDate, { hours: 9 })), answers: ['4'], event: getDayKey(startDate) }
        ];

        beforeEach(() => {
            queryAllSurveyAnswersMock.mockResolvedValue([...surveyAnswers]);
        });

        it('Should return all survey answers from the latest result for each survey on each date.', async () => {
            const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(startDate, endDate, surveyName, stepIdentifier, resultIdentifier);

            expect(Object.keys(latestSurveyAnswersByDate)).toHaveLength(1);

            const sortedAnswers = latestSurveyAnswersByDate[getDayKey(endDate)]?.map(sa => sa.answers[0]).sort() ?? [];
            expect(sortedAnswers).toHaveLength(4);
            expect(sortedAnswers).toEqual(['2', '3', '6', '7']);

            verifyQueryAssertions(false);
        });

        it('Should return all survey answers from the latest result for each survey on each date (using events as dates).', async () => {
            const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(startDate, endDate, surveyName, stepIdentifier, resultIdentifier, true);

            expect(Object.keys(latestSurveyAnswersByDate)).toHaveLength(1);

            const sortedAnswers = latestSurveyAnswersByDate[getDayKey(startDate)]?.map(sa => sa.answers[0]).sort() ?? [];
            expect(sortedAnswers).toHaveLength(4);
            expect(sortedAnswers).toEqual(['2', '3', '6', '7']);

            verifyQueryAssertions(true);
        });
    });
});