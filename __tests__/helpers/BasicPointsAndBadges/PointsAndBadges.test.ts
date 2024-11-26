import { add, startOfToday } from 'date-fns';
import { describe, it } from '@jest/globals';
import { awardPointsAndBadges, sumActivityPoints } from "../../../src/helpers/BasicPointsAndBadges/PointsAndBadges";
import { mockParticipantInfo } from "../../fixtures/participantInfo";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesState } from '../../../src/helpers/BasicPointsAndBadges/Activities';
import { SurveyCompletionActivity, SurveyCompletionActivityState } from '../../../src/helpers/BasicPointsAndBadges/SurveyCompletionActivity';
import { CustomActivity } from '../../../src/helpers/BasicPointsAndBadges/CustomActivity';

describe("Points And Badges full life cycle", () => {

    const startDate = add(startOfToday(), { days: -7 });

    it("should earn rewards on first use", async () => {

        const pptInfo = { ...mockParticipantInfo, customFields: { DailyGoals: "5" } };

        const activities: BasicPointsForBadgesActivity[] = [
            {
                key: "CustomField",
                type: "custom",
                points: 20,
                customField: "DailyGoals"
            } as CustomActivity,
            {
                key: "CustomField22",
                type: "custom",
                points: 100,
                customField: "DailyGoals"
            } as CustomActivity
        ];

        const pptExistingActivityStates: BasicPointsForBadgesState = { badges: [], activityStates: {} };

        const pointsPerBadge = 100;
        const newState = await awardPointsAndBadges(activities, pptExistingActivityStates, pointsPerBadge, pptInfo);

        const expected = Object.keys(newState.activityStates).sort();
        expect(expected.length).toBe(2);
        expect(expected[0]).toBe("CustomField");
        expect(newState.activityStates.CustomField.pointsAwarded).toBe(100);

        expect(expected[1]).toBe("CustomField22");
        expect(newState.activityStates.CustomField22.pointsAwarded).toBe(500);

        expect(newState.badges).toEqual([100, 200, 300, 400, 500, 600]);
    });

    it("should earn rewards when a new activity is added to the rewards system", async () => {

        const pptInfo = { ...mockParticipantInfo, customFields: { DailyGoals: "5" } };

        const activities: BasicPointsForBadgesActivity[] = [
            {
                key: "SurveyCompletion",
                type: "surveyCompleted",
                points: 100,
                surveyName: "Project Consent",
                limit: 1
            } as SurveyCompletionActivity,
            {
                key: "CustomField",
                type: "custom",
                points: 20,
                customField: "DailyGoals"
            } as CustomActivity,
            {
                key: "CustomField22",
                type: "custom",
                points: 100,
                customField: "DailyGoals"
            } as CustomActivity
        ];

        const pptExistingActivityStates: BasicPointsForBadgesState = {
            badges: [100, 200],
            activityStates: {
                CustomField: {
                    pointsAwarded: 100
                },
                SurveyCompletion: {
                    pointsAwarded: 100,
                    countCompleted: 1
                } as SurveyCompletionActivityState
            }
        };

        const pointsPerBadge = 100;
        const newState = await awardPointsAndBadges(activities, pptExistingActivityStates, pointsPerBadge, pptInfo);

        const expected = Object.keys(newState.activityStates).sort();
        expect(expected.length).toBe(3);
        expect(expected[0]).toBe("CustomField");
        expect(newState.activityStates.CustomField.pointsAwarded).toBe(100);

        expect(expected[1]).toBe("CustomField22");
        expect(newState.activityStates.CustomField22.pointsAwarded).toBe(500);

        expect(expected[2]).toBe("SurveyCompletion");
        expect(newState.activityStates.SurveyCompletion.pointsAwarded).toBe(100);

        expect(newState.badges).toEqual([100, 200, 300, 400, 500, 600, 700]);
    });

    it("should NOT remove earnings for activities deleted from reward system", async () => {

        const pptInfo = { ...mockParticipantInfo, customFields: { DailyGoals: "5" } };

        const activities: BasicPointsForBadgesActivity[] = [
            {
                key: "SurveyCompletion",
                type: "surveyCompleted",
                points: 100,
                surveyName: "Project Consent",
                limit: 1
            } as SurveyCompletionActivity
        ];

        const pptExistingActivityStates: BasicPointsForBadgesState = {
            badges: [100],
            activityStates: {
                CustomField: {
                    pointsAwarded: 1
                },
                SurveyCompletion: {
                    pointsAwarded: 100,
                    countCompleted: 1
                } as SurveyCompletionActivityState
            }
        };

        const pointsPerBadge = 100;
        const newState = await awardPointsAndBadges(activities, pptExistingActivityStates, pointsPerBadge, pptInfo);

        const expected = Object.keys(newState.activityStates).sort();
        expect(expected.length).toBe(2);
        expect(expected[0]).toBe("CustomField");
        expect(newState.activityStates.CustomField.pointsAwarded).toBe(1);

        expect(expected[1]).toBe("SurveyCompletion");
        expect(newState.activityStates.SurveyCompletion.pointsAwarded).toBe(100);

        expect(newState.badges).toEqual([100]);
    });

    it("should calculate the sum of existing points as 0 if none are on file", async () => {
        const pptExistingActivityStates = {};

        const pointsAwarded = sumActivityPoints(pptExistingActivityStates);
        expect(pointsAwarded).toBe(0);
    });

    it("should calculate the sum of existing points", async () => {
        const pointsAndBadges = {
            "badges": [],
            "activityStates": { "CustomField12": { "pointsAwarded": 1050 }, "CustomField22": { "pointsAwarded": 525 } }
        };

        const pointsAwarded = sumActivityPoints(pointsAndBadges.activityStates);
        expect(pointsAwarded).toBe(1575);
    });
});

