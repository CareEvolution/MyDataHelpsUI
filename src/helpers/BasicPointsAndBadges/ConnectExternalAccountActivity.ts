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
    const connectedAccounts = await MyDataHelps.getExternalAccounts();
    const providerCategories = activity.providerCategories as string[];
    const allProviders = connectedAccounts.filter(account => providerCategories.includes(account.provider.category)).map(t => t.id);
    const newProviders = allProviders.filter(provider => !activityState.providersConnected?.includes(provider));
    if (newProviders.length > 0) {
        const newPoints = newProviders.length * activity.points;
        const newActivityState = { pointsAwarded: activityState.pointsAwarded + newPoints, providersConnected: allProviders };
        return newActivityState;
    }
    return activityState;
}
