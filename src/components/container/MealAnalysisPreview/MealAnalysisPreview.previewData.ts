import { parseISO } from 'date-fns';
import { Meal } from '../../../helpers';

export type MealAnalysisPreviewState = 'default';

export interface MealAnalysisPreviewData {
    mealsByDate: Record<string, Meal[]>;
    mealImageUrls: Record<string, string>;
}

export function getPreviewData(previewState: MealAnalysisPreviewState | undefined): MealAnalysisPreviewData | undefined {
    if (previewState === 'default') {
        return {
            mealsByDate: {
                '2025-08-06': [
                    {
                        id: '6880b4d7-6818-4fad-8e9f-1e060ff3fc2c',
                        timestamp: parseISO('2025-08-06T20:38:00.000Z'),
                        type: 'meal',
                        created: parseISO('2025-08-06T20:38:49.022Z'),
                        lastModified: parseISO('2025-08-06T20:46:37.794Z'),
                        description: 'Taco night!',
                        items: [
                            { name: 'ground beef' },
                            { name: 'tomato' },
                            { name: 'lettuce' },
                            { name: 'tortilla' },
                            { name: 'cheese' }
                        ],
                        analysis: {
                            timestamp: parseISO('2025-08-06T20:46:37.794Z'),
                            items: [
                                { name: 'ground beef', 'confidenceScore': 0.95 },
                                { name: 'cheese', 'confidenceScore': 0.89 },
                                { name: 'onion', 'confidenceScore': 0.7 }
                            ]
                        },
                        hasImage: true
                    }
                ]
            },
            mealImageUrls: {
                '6880b4d7-6818-4fad-8e9f-1e060ff3fc2c': 'https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.png'
            }
        };
    }
    return undefined;
}