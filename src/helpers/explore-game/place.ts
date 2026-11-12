export interface ExploreGamePlace {
    id: string;
    category: string;
    hint: string;
    name: string;
    location: string;
    fact: string;
    altText: string;
}

export async function loadPlace(placeId: string): Promise<ExploreGamePlace> {
    return fetch(`https://assets.careevolutionapps.com/MDH-UI/explore-game/places/${placeId}/spec.json?cacheBust=${new Date().getTime()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (!response.ok) throw new Error(`Failed to load place: ${placeId} - ${response.status} ${response.statusText}`);
        return response.json() as Promise<ExploreGamePlace>;
    });
}

export function placeImageUrl(place: ExploreGamePlace): string {
    return `https://assets.careevolutionapps.com/MDH-UI/explore-game/places/${place.id}/image.webp?cacheBust=${new Date().getTime()}`;
}