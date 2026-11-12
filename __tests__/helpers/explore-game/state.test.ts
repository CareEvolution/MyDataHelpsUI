import MyDataHelps, { ParticipantInfo } from '@careevolution/mydatahelps-js';
import { ExploreGameState, fetchGameState } from '../../../src/helpers/explore-game/state';

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: {
        getParticipantInfo: jest.fn()
    }
}));

describe('Explore Game: State Helper Tests', () => {
    const getParticipantInfo = jest.mocked(MyDataHelps.getParticipantInfo);
    const participantInfo = (customFields: ParticipantInfo['customFields']) =>
        ({ customFields } as Awaited<ReturnType<typeof MyDataHelps.getParticipantInfo>>);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should read and parse the default game state custom field.', async () => {
        const gameState: ExploreGameState = { spent: 2, unlocked: ['place-one', 'place-two'] };
        getParticipantInfo.mockResolvedValue(participantInfo({
            ExploreGameState: JSON.stringify(gameState)
        }));

        const fetchedGameState = await fetchGameState(undefined);

        expect(fetchedGameState).toEqual(gameState);
        expect(getParticipantInfo).toHaveBeenCalledTimes(1);
    });

    it('Should read and parse a named game state custom field.', async () => {
        const gameState: ExploreGameState = { spent: 2, unlocked: ['place-one', 'place-two'] };
        getParticipantInfo.mockResolvedValue(participantInfo({
            ExploreGameState: JSON.stringify({ spent: 99, unlocked: [] }),
            MyGameState: JSON.stringify(gameState)
        }));

        const fetchedGameState = await fetchGameState('MyGameState');

        expect(fetchedGameState).toEqual(gameState);
        expect(getParticipantInfo).toHaveBeenCalledTimes(1);
    });

    const undefinedScenarios: { scenario: string, customFieldName: string | undefined, customFields: ParticipantInfo['customFields'] }[] = [
        { scenario: 'default state custom field missing', customFieldName: undefined, customFields: {} },
        { scenario: 'default state custom field empty', customFieldName: undefined, customFields: { ExploreGameState: '' } },
        { scenario: 'named state custom field missing', customFieldName: 'MissingGameState', customFields: {} },
        { scenario: 'named state custom field empty', customFieldName: 'MissingGameState', customFields: { MissingGameState: '' } }
    ];
    it.each(undefinedScenarios)('Should return undefined when the game state custom field is empty or missing ($scenario).', async ({ customFieldName, customFields }) => {
        getParticipantInfo.mockResolvedValue(participantInfo(customFields));

        const fetchedGameState = await fetchGameState(customFieldName);

        expect(fetchedGameState).toBeUndefined();
    });

    it('Should reject when the game state custom field contains invalid JSON.', async () => {
        getParticipantInfo.mockResolvedValue(participantInfo({ ExploreGameState: '{invalid json' }));

        await expect(fetchGameState(undefined)).rejects.toThrow();
    });
});
