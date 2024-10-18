import MyDataHelps from "@careevolution/mydatahelps-js";
import type { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState } from "./Activities";

export type ConnectExternalActivityType = "Provider" | "Health Plan" | "Device Manufacturer";

export interface ConnectExternalAccountActivity extends BasicPointsForBadgesActivity {
    type: "connectExternalAccount";
    providerCategories: ConnectExternalActivityType[];
}

interface ConnectExternalAccountActivityState extends BasicPointsForBadgesActivityState {
    providersConnected?: number[];
}

export async function awardConnectExternalAccountActivityPoints(activity: ConnectExternalAccountActivity, activityState: ConnectExternalAccountActivityState) {
    //convert to array to protect against new types added in consumers but not yet here
    const activityProviderCategories = activity.providerCategories as string[]; 

    //Get the external accounts
    const connectedAccounts = await MyDataHelps.getExternalAccounts();
    //Filter for the accounts that match this activity. Return the external account id
    const allProviders = connectedAccounts.filter(account => activityProviderCategories.includes(account.provider.category)).map(t => t.id);
    //Filter the external accounts that have not already been connected
    const newProviders = allProviders.filter(provider => !activityState.providersConnected?.includes(provider));
    if (newProviders.length > 0) {
        const newPoints = newProviders.length * activity.points;
        const newActivityState = { pointsAwarded: activityState.pointsAwarded + newPoints, providersConnected: allProviders };
        return newActivityState;
    }
    return activityState;
}
