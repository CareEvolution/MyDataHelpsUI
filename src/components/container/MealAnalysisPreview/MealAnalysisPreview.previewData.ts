import { getDayKey, Meal } from '../../../helpers';
import { add, startOfToday } from 'date-fns';
import { v4 as uuid } from 'uuid';

export type MealAnalysisPreviewState = 'default';

export interface MealAnalysisPreviewData {
    mealsByDate: Record<string, Meal[]>;
    mealImageUrls: Record<string, string>;
}

export function getPreviewData(previewState: MealAnalysisPreviewState | undefined): MealAnalysisPreviewData | undefined {
    const today = startOfToday();

    if (previewState === 'default') {
        const mealsByDate: Record<string, Meal[]> = {
            [getDayKey(add(today, { days: -2 }))]: [
                {
                    id: uuid(),
                    timestamp: add(today, { days: -2, hours: 11, minutes: 5 }),
                    type: 'drink',
                    created: add(today, { days: -2, hours: 11, minutes: 10 }),
                    lastModified: add(today, { days: -2, hours: 11, minutes: 10 }),
                    description: 'Ice cold Coke.',
                    items: [
                        { name: 'coke' }
                    ]
                },
                {
                    id: uuid(),
                    timestamp: add(today, { days: -2, hours: 14, minutes: 42 }),
                    type: 'snack',
                    created: add(today, { days: -2, hours: 14, minutes: 50 }),
                    lastModified: add(today, { days: -2, hours: 14, minutes: 50 }),
                    description: 'doritos',
                    items: [],
                    analysis: {
                        timestamp: add(today, { days: -1, hours: 14 }),
                        items: [
                            { name: 'potato chips', 'confidenceScore': 0.95 }
                        ],
                        reviewTimestamp: add(today, { hours: 10, minutes: 22 })
                    },
                    hasImage: true
                },
                {
                    id: uuid(),
                    timestamp: add(today, { days: -2, hours: 16, minutes: 23 }),
                    type: 'meal',
                    created: add(today, { days: -2, hours: 16, minutes: 28 }),
                    lastModified: add(today, { days: -2, hours: 16, minutes: 28 }),
                    description: 'Taco night!',
                    items: [
                        { name: 'ground beef' },
                        { name: 'tomato' },
                        { name: 'lettuce' },
                        { name: 'tortilla' }
                    ],
                    analysis: {
                        timestamp: add(today, { days: -1, hours: 14 }),
                        items: [
                            { name: 'ground beef', 'confidenceScore': 0.95 },
                            { name: 'cheese', 'confidenceScore': 0.89 },
                            { name: 'onion', 'confidenceScore': 0.4 }
                        ]
                    },
                    hasImage: true
                }
            ],
            [getDayKey(add(today, { days: -1 }))]: [
                {
                    id: uuid(),
                    timestamp: add(today, { days: -1, hours: 12, minutes: 15 }),
                    type: 'meal',
                    created: add(today, { days: -1, hours: 12, minutes: 20 }),
                    lastModified: add(today, { days: -1, hours: 12, minutes: 20 }),
                    description: 'Famous Chicken',
                    items: [
                        { name: 'chicken' },
                        { name: 'broccoli' },
                        { name: 'mashed potatoes' }
                    ],
                    analysis: {
                        timestamp: add(today, { days: -1, hours: 14 }),
                        items: [
                            { name: 'chicken', 'confidenceScore': 0.9 },
                            { name: 'potatoes', 'confidenceScore': 0.8 },
                            { name: 'green beans', 'confidenceScore': 0.3 }
                        ]
                    },
                    hasImage: true
                }
            ]
        };
        const mealImageUrls = Object.values(mealsByDate).flat().filter(meal => meal.hasImage).reduce((mealImageUrls, meal) => {
            mealImageUrls[meal.id.toString()] = 'https://assets.careevolutionapps.com/MDH-UI/grilled_cheese.png';
            return mealImageUrls;
        }, {} as Record<string, string>);
        return { mealsByDate, mealImageUrls };
    }
    return undefined;
}