import MyDataHelps from '@careevolution/mydatahelps-js';

export interface ExploreGameState {
    spent: number;
    unlocked: string[];
}

export async function loadGameState(customFieldName: string | undefined): Promise<ExploreGameState | undefined> {
    const participantInfo = await MyDataHelps.getParticipantInfo();
    const gameStateJson = participantInfo.customFields[customFieldName ?? 'ExploreGameState'];
    return gameStateJson ? JSON.parse(gameStateJson) as ExploreGameState : undefined;
}