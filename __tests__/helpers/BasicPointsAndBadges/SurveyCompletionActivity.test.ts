import * as queryAllSurveyAnswersModule from '../../../src/helpers/query-all-survey-answers';
import { add, startOfToday } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { describe, it } from '@jest/globals';
import { awardSurveyCompletionActivityPoints, SurveyCompletionActivity } from '../../../src/helpers/BasicPointsAndBadges/SurveyCompletionActivity';
import { generateGUID } from "../../fixtures/commonFunctions";

describe('Basic Points And Badges - SurveyCompletionActivity', () => {

    const startDate = add(startOfToday(), { days: -7 });

    const sa1: SurveyAnswer = {
        date: add(startDate, { days: 1, minutes: 1 }).toISOString(),
        answers: ["1"],
        insertedDate: add(startDate, { days: 1, minutes: 1 }).toISOString(),
        surveyResultID: generateGUID(),
        id: generateGUID(),
        surveyID: generateGUID(),
        surveyVersion: 1,
        surveyName: 'Project Consent',
        surveyDisplayName: 'Consent to Study',
        stepIdentifier: '1',
        resultIdentifier: ''
    };

    const sa2: SurveyAnswer = {
        date: add(startDate, { days: 1, minutes: 2 }).toISOString(),
        answers: ["2"],
        insertedDate: add(startDate, { days: 1, minutes: 2 }).toISOString(),
        surveyResultID: generateGUID(),
        id: generateGUID(),
        surveyID: generateGUID(),
        surveyVersion: 1,
        surveyName: 'Project Consent',
        surveyDisplayName: 'Consent to Study',
        stepIdentifier: '1',
        resultIdentifier: ''
    };

    const queryAllSurveyAnswersMock = jest.spyOn(queryAllSurveyAnswersModule, 'default').mockImplementation();

    beforeEach(() => {
        queryAllSurveyAnswersMock.mockReset();
    });

    it('should calculate points with no limits.', async () => {
        queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([sa1, sa2] as SurveyAnswer[]));

        const surveyActivityWithNoLimit: SurveyCompletionActivity = {
            key: "consentSurvey",
            type: "surveyCompleted",
            points: 800,
            surveyName: "Project Consent"
        };

        const newState = await awardSurveyCompletionActivityPoints(surveyActivityWithNoLimit, { pointsAwarded: 0 });
        expect(newState.countCompleted).toBe(2);
        expect(newState.lastQueryDate).toBe(sa2.insertedDate);
        expect(newState.pointsAwarded).toBe(1600);
    });

    it('should calculate points with limits', async () => {
        queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([sa1, sa2] as SurveyAnswer[]));

        const surveyActivityWithNoLimit: SurveyCompletionActivity = {
            key: "consentSurvey",
            type: "surveyCompleted",
            points: 800,
            surveyName: "Project Consent",
            limit: 1
        };

        const newState = await awardSurveyCompletionActivityPoints(surveyActivityWithNoLimit, { pointsAwarded: 0 });
        expect(newState.countCompleted).toBe(1);
        expect(newState.lastQueryDate).toBe(sa2.insertedDate);
        expect(newState.pointsAwarded).toBe(800);
    });

    it('should not update state when completed count exceeds limit', async () => {
        queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([sa1, sa2] as SurveyAnswer[]));

        const surveyActivityWithNoLimit: SurveyCompletionActivity = {
            key: "consentSurvey",
            type: "surveyCompleted",
            points: 800,
            surveyName: "Project Consent",
            limit: 1
        };

        const testDate = add(startDate, { days: 4 }).toISOString();
        const newState = await awardSurveyCompletionActivityPoints(surveyActivityWithNoLimit, { pointsAwarded: 1, countCompleted: 1, lastQueryDate: testDate });
        expect(newState.countCompleted).toBe(1);
        expect(newState.lastQueryDate).toBe(testDate);
        expect(newState.pointsAwarded).toBe(1);
    });

    it('should update state when completed count does not exceeds limit', async () => {
        queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([sa1, sa2] as SurveyAnswer[]));

        const surveyActivityWithNoLimit: SurveyCompletionActivity = {
            key: "consentSurvey",
            type: "surveyCompleted",
            points: 800,
            surveyName: "Project Consent",
            limit: 2
        };

        const testDate = add(startDate, { days: 4 }).toISOString();
        const newState = await awardSurveyCompletionActivityPoints(surveyActivityWithNoLimit, { pointsAwarded: 1, countCompleted: 1, lastQueryDate: testDate });
        expect(newState.countCompleted).toBe(2);
        expect(newState.lastQueryDate).toBe(sa2.insertedDate);
        expect(newState.pointsAwarded).toBe(801);
    });

    it('when limits are set, the lastQueryDate should be the most recent result of all results', async () => {
        queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([sa1, sa2] as SurveyAnswer[]));

        const surveyActivityWithNoLimit: SurveyCompletionActivity = {
            key: "consentSurvey",
            type: "surveyCompleted",
            points: 800,
            surveyName: "Project Consent",
            limit: 1
        };

        const newState = await awardSurveyCompletionActivityPoints(surveyActivityWithNoLimit, { pointsAwarded: 0 });
        expect(newState.lastQueryDate).toBe(sa2.insertedDate);
    });

    it('should append new points.', async () => {
        queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([sa1, sa2] as SurveyAnswer[]));

        const surveyActivityWithNoLimit: SurveyCompletionActivity = {
            key: "consentSurvey",
            type: "surveyCompleted",
            points: 800,
            surveyName: "Project Consent"
        };

        const newState = await awardSurveyCompletionActivityPoints(surveyActivityWithNoLimit, { pointsAwarded: 2 });
        expect(newState.countCompleted).toBe(2);
        expect(newState.lastQueryDate).toBe(sa2.insertedDate);
        expect(newState.pointsAwarded).toBe(1602);
    });

    it('should ignore results on lastQueryDate.', async () => {
        queryAllSurveyAnswersMock.mockReturnValue(Promise.resolve([sa2] as SurveyAnswer[]));

        const surveyActivityWithNoLimit: SurveyCompletionActivity = {
            key: "consentSurvey",
            type: "surveyCompleted",
            points: 800,
            surveyName: "Project Consent"
        };

        const newState = await awardSurveyCompletionActivityPoints(
            surveyActivityWithNoLimit,
            { pointsAwarded: 2, lastQueryDate: sa2.insertedDate, countCompleted: 0 }
        );
        expect(newState.countCompleted).toBe(0);
        expect(newState.lastQueryDate).toBe(sa2.insertedDate);
        expect(newState.pointsAwarded).toBe(2);
    });
});