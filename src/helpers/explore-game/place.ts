import { fetchGameState } from './state';

export interface ExploreGamePlace {
    id: string;
    category: string;
    hint: string;
    name: string;
    location: string;
    fact: string;
    altText: string;
}

export type ExploreGamePlaceImageColors = {
    backgroundColor: string;
    backgroundGradient: string;
};

export async function isPlaceUnlocked(gameStateCustomFieldName: string | undefined, placeId: string): Promise<boolean> {
    return fetchGameState(gameStateCustomFieldName).then(gameState => {
        return !!gameState?.unlocked.includes(placeId);
    });
}

export async function fetchPlace(placeId: string, signal?: AbortSignal): Promise<ExploreGamePlace> {
    return fetch(`https://assets.careevolutionapps.com/MDH-UI/explore-game/places/${placeId}/spec.json?cacheBust=${new Date().getTime()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal
    }).then(response => {
        if (!response.ok) throw new Error(`Failed to load place: ${placeId} - ${response.status} ${response.statusText}`);
        return response.json() as Promise<ExploreGamePlace>;
    });
}

export async function fetchPlaceImage(placeId: string, signal?: AbortSignal): Promise<Blob> {
    const url = `https://assets.careevolutionapps.com/MDH-UI/explore-game/places/${placeId}/image.webp?cacheBust=${new Date().getTime()}`;
    const response = await fetch(url, { signal });
    if (!response.ok) {
        throw new Error("Failed to load image: " + url);
    }
    return response.blob();
}

export async function resolvePlaceImageColors(imageBlob: Blob): Promise<ExploreGamePlaceImageColors | undefined> {
    let image: ImageBitmap | undefined;
    try {
        image = await createImageBitmap(imageBlob);
        if (!image.width || !image.height) return undefined;

        const canvas = document.createElement('canvas');

        const scale = Math.min(1, 100 / Math.max(image.width, image.height));
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));

        const context = canvas.getContext('2d');
        if (!context) return undefined;

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const averageColor = (row: number): [number, number, number] | undefined => {
            let red = 0;
            let green = 0;
            let blue = 0;
            let alpha = 0;

            for (let x = 0; x < canvas.width; x++) {
                const index = (row * canvas.width + x) * 4;
                const pixelAlpha = pixels[index + 3] / 255;
                red += pixels[index] * pixelAlpha;
                green += pixels[index + 1] * pixelAlpha;
                blue += pixels[index + 2] * pixelAlpha;
                alpha += pixelAlpha;
            }

            if (alpha === 0) return undefined;
            return [Math.round(red / alpha), Math.round(green / alpha), Math.round(blue / alpha)];
        };

        const topColor = averageColor(0);
        const bottomColor = averageColor(canvas.height - 1);

        if (topColor && bottomColor) {
            const backgroundColor = [
                Math.round((topColor[0] + bottomColor[0]) / 2),
                Math.round((topColor[1] + bottomColor[1]) / 2),
                Math.round((topColor[2] + bottomColor[2]) / 2)
            ];
            const toCssColor = (color: number[]) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            return {
                backgroundColor: toCssColor(backgroundColor),
                backgroundGradient: `linear-gradient(to bottom, ${toCssColor(topColor)}, ${toCssColor(bottomColor)})`
            };
        }
    } catch (error) {
        console.error("Error getting reveal colors from image.", error);
    } finally {
        image?.close();
    }
    return undefined;
}
