import { awardConnectExternalAccountActivityPoints, ConnectExternalAccountActivity } from "../../../src/helpers/BasicPointsAndBadges/ConnectExternalAccountActivity";

jest.mock('@careevolution/mydatahelps-js', () => {

    const externalAccounts = [{
        "id" : 1,
        "provider": { "id": 11, "name": "Garmin", "category": "Device Manufacturer"},
        status: "fetchComplete"
    },
    {
        "id" : 2,
        "provider": { "id": 22, "name": "Fitbit", "category": "Device Manufacturer"},
        status: "fetchComplete"
    },
    {
        "id" : 3,
        "provider": { "id": 22, "name": "FitBit", "category": "Device Manufacturer"} ,
        status: "unauthorized"
    },
    {
        "id" : 4,
        "provider": { "id": 44, "name": "Health Plan 1", "category": "Health Plan"} ,
        status: "fetchComplete"
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
            off: jest.fn()
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
         expect(newActivityState.providersConnected).toEqual([44]);
    });

    it("should award points for connecting multiple external accounts", async () => {
        const activity = {
            type: "connectExternalAccount",
            points: 10,
            providerCategories: ["Health Plan", 'Provider', 'Device Manufacturer']
        } as ConnectExternalAccountActivity;
        const activityState = {
            pointsAwarded: 0,
            providersConnected: []
        };
        const newActivityState = await awardConnectExternalAccountActivityPoints(activity, activityState);
        expect(newActivityState.pointsAwarded).toBe(30);
        expect(newActivityState.providersConnected).toEqual([11, 22, 44]);
   });

    it("should NOT award points for multiple external accounts connected to same provider", async () => {
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
        expect(newActivityState.providersConnected).toEqual([11, 22]);
   });

   it("should recaluclate points across all providers. Awarding points should be based on newly connected", async () => {
        const activity = {
            type: "connectExternalAccount",
            points: 10,
            providerCategories: ["Health Plan"]
        } as ConnectExternalAccountActivity;
        const activityState = {
            pointsAwarded: 20,
            providersConnected: [1,2]
        };
        const newActivityState = await awardConnectExternalAccountActivityPoints(activity, activityState);
        expect(newActivityState.pointsAwarded).toBe(30);
        expect(newActivityState.providersConnected).toEqual([1, 2, 44]);
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
