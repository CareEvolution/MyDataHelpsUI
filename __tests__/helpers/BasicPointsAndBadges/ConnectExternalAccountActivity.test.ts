import { awardConnectExternalAccountActivityPoints, ConnectExternalAccountActivity } from "../../../src/helpers/BasicPointsAndBadges/ConnectExternalAccountActivity";

jest.mock('@careevolution/mydatahelps-js', () => {

    const externalAccounts = [{
        "id" : 1,
        "provider": { "id": 1, "name": "Garmin", "category": "Device Manufacturer"} 
    },
    {
        "id" : 2,
        "provider": { "id": 2, "name": "FitBit", "category": "Device Manufacturer"} 
    },
    {
        "id" : 3,
        "provider": { "id": 3, "name": "Health Plan 1", "category": "Health Plan"} 
    }];

    return {
        __esModule: true,
        default: {
            token: { access_token: '1' },
            getCurrentLanguage: () => jest.fn(),
            getExternalAccounts: jest.fn(() => {
                return Promise.resolve(externalAccounts);
            }),
            on: jest.fn(),
            off: jest.fn(),
        },
        MyDataHelps: {
            getCurrentLanguage: () => jest.fn(),
            getExternalAccounts: jest.fn(),
            on: jest.fn(),
            off: jest.fn(),
        }
    }
});

describe("ConnectExternalAccountActivity Awards", () => {
    it("should award points for connecting a single external account", async () => {
         const activity = {
             type: "connectExternalAccount",
             points: 10,
             providerCategories: ["Health Plan"]
         } as ConnectExternalAccountActivity;
         const activityState = {
             pointsAwarded: 0,
             providersConnected: []
         };
         const newActivityState = await awardConnectExternalAccountActivityPoints(activity, activityState);
         expect(newActivityState.pointsAwarded).toBe(10);
         expect(newActivityState.providersConnected).toEqual([3]);
    });

    it("should award points for connecting multiple devices", async () => {
        const activity = {
            type: "connectExternalAccount",
            points: 10,
            providerCategories: ["Device Manufacturer"]
        } as ConnectExternalAccountActivity;
        const activityState = {
            pointsAwarded: 0,
            providersConnected: []
        };
        const newActivityState = await awardConnectExternalAccountActivityPoints(activity, activityState);
        expect(newActivityState.pointsAwarded).toBe(20);
        expect(newActivityState.providersConnected).toEqual([1, 2]);
   });

   it("should append points and reset providers connected if not on file", async () => {
        const activity = {
            type: "connectExternalAccount",
            points: 10,
            providerCategories: ["Health Plan"]
        } as ConnectExternalAccountActivity;
        const activityState = {
            pointsAwarded: 10,
            providersConnected: [1,2]
        };
        const newActivityState = await awardConnectExternalAccountActivityPoints(activity, activityState);
        expect(newActivityState.pointsAwarded).toBe(20);
        expect(newActivityState.providersConnected).toEqual([3]);
    });

    it("should NOT award points when the ppt does not have this provider connected", async () => {
        const activity = {
            type: "connectExternalAccount",
            points: 10,
            providerCategories: ["Provider"]
        } as ConnectExternalAccountActivity;
        const activityState = {
            pointsAwarded: 0,
            providersConnected: []
        };
        const newActivityState = await awardConnectExternalAccountActivityPoints(activity, activityState);
        expect(newActivityState.pointsAwarded).toBe(0);
        expect(newActivityState.providersConnected).toEqual([]);
   });
 });
