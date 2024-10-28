import { mockParticipantInfo } from "../../fixtures/participantInfo";
import { awardCustomActivityPoints, CustomActivity } from "../../../src/helpers/BasicPointsAndBadges/CustomActivity";

describe("Custom Activity Awards", () => {
    const pptInfo = {...mockParticipantInfo, customFields: { DailyGoals: "8" }};
    
    it("should award points based on custom field value", async () => {
         const activity : CustomActivity = {
            key: "CustomGoals",
            type: "custom",
            points: 10,
            customField: "DailyGoals"
        };

         const newActivityState = await awardCustomActivityPoints(activity, pptInfo);
         expect(newActivityState.pointsAwarded).toBe(80);
    });


    it("should NOT award points where missing custom field value", async () => {
        const activity : CustomActivity = {
           key: "CustomGoals",
           type: "custom",
           points: 10,
           customField: "DailyGoalsMissing"
       };

        const newActivityState = await awardCustomActivityPoints(activity, pptInfo);
        expect(newActivityState.pointsAwarded).toBe(0);
   });

    it("should handle decimal values in custom field", async () => {
        const pptInfoWithDecimal = {
            ...pptInfo,
            customFields: { DailyGoals: "1.2" }
        };
        const activity: CustomActivity = {
            key: "CustomGoals",
            type: "custom",
            points: 8,
            customField: "DailyGoals"
        };

        const newActivityState = await awardCustomActivityPoints(activity, pptInfoWithDecimal);
        expect(newActivityState.pointsAwarded).toBe(9.6);
    });
 });
