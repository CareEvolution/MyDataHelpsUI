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
    const connectedProviders = connectedAccounts.filter(account => activity.providerCategories.includes(account.provider.category as ConnectExternalActivityType)).map(account => account.provider.id);
    let uniqueConnectedProviders = [...new Set(connectedProviders)];
    const newProviders = uniqueConnectedProviders.filter(provider => !activityState.providersConnected?.includes(provider)); 
    if (newProviders.length > 0) {
        const newPoints = newProviders.length * activity.points;
        const updatedProviders = !activityState.providersConnected ? newProviders : activityState.providersConnected.concat(newProviders);
        const newActivityState = { pointsAwarded: activityState.pointsAwarded + newPoints, providersConnected: updatedProviders };
        return newActivityState;
    }
    return activityState;
}
