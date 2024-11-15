import { ParticipantInfo } from "@careevolution/mydatahelps-js";

export const mockParticipantInfo : ParticipantInfo = {
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
    }
};