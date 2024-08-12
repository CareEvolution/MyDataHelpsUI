import MyDataHelps from "@careevolution/mydatahelps-js";
import type { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState } from "./Activities";

export interface ConnectExternalAccountActivity extends BasicPointsForBadgesActivity {
    type: "connectExternalAccount";
    providerCategories: string[];
}

interface ConnectExternalAccountActivityState extends BasicPointsForBadgesActivityState {
    providersConnected?: number[];
}

export async function awardConnectExternalAccountActivityPoints(activity: ConnectExternalAccountActivity, activityState: ConnectExternalAccountActivityState) {
    const connectedAccounts = await MyDataHelps.getExternalAccounts();
    const allProviders = connectedAccounts.filter(account => activity.providerCategories.includes(account.provider.category)).map(t => t.id);
    const newProviders = allProviders.filter(provider => !activityState.providersConnected?.includes(provider));
    if (newProviders.length > 0) {
        const newPoints = newProviders.length * activity.points;
        const newActivityState = { pointsAwarded: activityState.pointsAwarded + newPoints, providersConnected: allProviders };
        return newActivityState;
    }
    return activityState;
}
