import { NewPointsViewProps } from './NewPointsView';

export const previewProps: NewPointsViewProps = {
    entries: [
        {
            name: 'Some Activity',
            points: 125,
            message: {
                title: 'Great Job!',
                text: 'Great job completing some activity.'
            }
        },
        {
            name: 'Some Other Activity',
            points: 85,
            bonusPoints: 10,
            message: {
                title: 'Great Job!',
                text: 'Great job completing some other activity.'
            }
        }
    ],
    colorScheme: 'auto',
    pointsToNextReward: 220,
    primaryColor: '#04b112',
    doneButtonText: 'Done'
};