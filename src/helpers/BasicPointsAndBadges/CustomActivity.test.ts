import { ParticipantInfo } from "@careevolution/mydatahelps-js";
import { CustomActivity } from "./CustomActivity";
import { awardCustomActivityPoints } from "./CustomActivity";

describe("Custom Activity Awards", () => {
    const pptInfo : ParticipantInfo = {
        participantID: "123",
        participantIdentifier: "123",
        secondaryIdentifier: "123",
        linkIdentifier: "123",
        demographics: {
            city: 'Naples',
            utcOffset: '-05:00:00',
            email: "abc@ce.com",
            firstName: "John",
            lastName: "Doe",
            mobilePhone: "1234567890",
            state: "FL",
            middleName: "",
            dateOfBirth: "",
            gender: "",
            preferredLanguage: "",
            street1: "",
            street2: "",
            postalCode: "",
            unsubscribedFromEmails: "",
            timeZone: "",
            unsubscribedFromSms: ""
        },
        enrollmentDate: new Date().toString(),
        projectID: "123",
        customFields: {
            ["DailyGoals"]: "8"
        }
    };
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
        expect(newActivityState.pointsAwarded).toBe(9.6); // Assuming rounding down
    });
 });
