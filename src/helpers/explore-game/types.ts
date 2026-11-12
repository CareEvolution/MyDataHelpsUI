export interface ExploreGamePlace {
    id: string;
    category: string;
    hint: string;
    name: string;
    location: string;
    fact: string;
    imageUrl: string;
    altText: string;
}

export interface ExploreGameState {
    spent: number;
    unlocked: string[];
}