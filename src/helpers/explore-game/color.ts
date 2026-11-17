export type RevealColors = {
    backgroundColor: string;
    backgroundGradient: string;
};

const toCssColor = (color: number[]) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

export function getRevealColorsFromImage(image: HTMLImageElement): RevealColors | undefined {
    try {
        if (!image.naturalWidth || !image.naturalHeight) return undefined;

        const canvas = document.createElement('canvas');

        const scale = Math.min(1, 100 / Math.max(image.naturalWidth, image.naturalHeight));
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

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
            return {
                backgroundColor: toCssColor(backgroundColor),
                backgroundGradient: `linear-gradient(to bottom, ${toCssColor(topColor)}, ${toCssColor(bottomColor)})`
            };
        }
    } catch (error) {
        console.error("Error getting reveal colors from image.", error);
    }
    return undefined;
}

