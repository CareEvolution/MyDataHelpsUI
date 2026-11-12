/**
 * @jest-environment jsdom
 */

import { ExploreGamePlace, fetchPlace, fetchPlaceImage, resolvePlaceImageColors } from '../../../src/helpers/explore-game/place';

describe('Explore Game: Place Helper Tests', () => {
    const invalidPlaceIds = ['', '../other', 'place/other', 'place?other', 'place%2Fother'];

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    describe('fetchPlace', () => {
        it('Should fetch the place by ID.', async () => {
            const responsePlace = { id: 'valid-place' } as ExploreGamePlace;
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(responsePlace)
            });

            const signal = { aborted: false } as AbortSignal;

            const place = await fetchPlace('valid-place', signal);

            expect(place).toBe(responsePlace);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringMatching(/\/places\/valid-place\/spec\.json\?cacheBust=/),
                expect.objectContaining({ method: 'GET', headers: { 'Accept': 'application/json' }, signal })
            );
        });

        it("Should throw an error if the fetch response is not ok.", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });
            await expect(fetchPlace('valid-place')).rejects.toThrow('Failed to fetch place: valid-place - 404 Not Found');
        });

        it.each(invalidPlaceIds)('Should reject invalid place ID "%s" before making a request.', async placeId => {
            await expect(fetchPlace(placeId)).rejects.toThrow('Invalid place ID.');
            expect(global.fetch).not.toHaveBeenCalled();
        });
    });

    describe('fetchPlaceImage', () => {
        it('Should fetch the image by place ID.', async () => {
            const responseImageBlob = new Blob();
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                blob: jest.fn().mockResolvedValue(responseImageBlob)
            });

            const signal = {} as AbortSignal;

            const imageBlob = await fetchPlaceImage('valid-place', signal);

            expect(imageBlob).toBe(responseImageBlob);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringMatching(/\/places\/valid-place\/image\.webp\?cacheBust=/),
                expect.objectContaining({ signal })
            );
        });

        it("Should throw an error if the fetch response is not ok.", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });
            await expect(fetchPlaceImage('valid-place')).rejects.toThrow('Failed to fetch place image: valid-place - 404 Not Found');
        });

        it.each(invalidPlaceIds)('Should reject invalid place ID "%s" before making a request.', async placeId => {
            await expect(fetchPlaceImage(placeId)).rejects.toThrow('Invalid place ID.');
            expect(global.fetch).not.toHaveBeenCalled();
        });
    });

    describe('resolvePlaceImageColors', () => {
        const originalCreateImageBitmap = Object.getOwnPropertyDescriptor(globalThis, 'createImageBitmap');

        const mockImageBitmap = (width: number, height: number): ImageBitmap => {
            const image = { width, height, close: jest.fn() } as unknown as ImageBitmap;
            Object.defineProperty(globalThis, 'createImageBitmap', {
                configurable: true,
                value: jest.fn().mockResolvedValue(image)
            });
            return image;
        };

        const mockCanvasContext = (pixels: Uint8ClampedArray) => {
            const context = {
                drawImage: jest.fn(),
                getImageData: jest.fn().mockReturnValue({ data: pixels })
            };
            jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D);
            return context;
        };

        afterEach(() => {
            jest.restoreAllMocks();
            if (originalCreateImageBitmap) {
                Object.defineProperty(globalThis, 'createImageBitmap', originalCreateImageBitmap);
            } else {
                Reflect.deleteProperty(globalThis, 'createImageBitmap');
            }
        });

        it('Should average the top and bottom image colors and use them for the background and gradient.', async () => {
            const image = mockImageBitmap(2, 2);
            mockCanvasContext(new Uint8ClampedArray([
                20, 40, 60, 255, 60, 80, 100, 255,
                100, 120, 140, 255, 140, 160, 180, 255
            ]));

            const colors = await resolvePlaceImageColors(new Blob());

            expect(colors).toEqual({
                backgroundColor: 'rgb(80, 100, 120)',
                backgroundGradient: 'linear-gradient(to bottom, rgb(40, 60, 80), rgb(120, 140, 160))'
            });
            expect(image.close).toHaveBeenCalled();
        });

        it.each([
            { width: 0, height: 2 },
            { width: 2, height: 0 }
        ])('Should return undefined for an image with zero dimensions (%p).', async ({ width, height }) => {
            const image = mockImageBitmap(width, height);

            const colors = await resolvePlaceImageColors(new Blob());

            expect(colors).toBeUndefined();
            expect(image.close).toHaveBeenCalled();
        });

        it('Should return undefined when the canvas context is unavailable.', async () => {
            const image = mockImageBitmap(2, 2);
            jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

            const colors = await resolvePlaceImageColors(new Blob());

            expect(colors).toBeUndefined();
            expect(image.close).toHaveBeenCalled();
        });

        it.each([
            {
                row: 'top',
                pixels: [255, 0, 0, 0, 0, 0, 255, 255]
            },
            {
                row: 'bottom',
                pixels: [255, 0, 0, 255, 0, 0, 255, 0]
            }
        ])('Should return undefined when the $row row is fully transparent.', async ({ pixels }) => {
            const image = mockImageBitmap(1, 2);
            mockCanvasContext(new Uint8ClampedArray(pixels));

            const colors = await resolvePlaceImageColors(new Blob());

            expect(colors).toBeUndefined();
            expect(image.close).toHaveBeenCalled();
        });

        it('Should return undefined when image decoding fails.', async () => {
            const error = new Error('Image decode failed.');
            Object.defineProperty(globalThis, 'createImageBitmap', {
                configurable: true,
                value: jest.fn().mockRejectedValue(error)
            });
            const consoleError = jest.spyOn(console, 'error');

            const colors = await resolvePlaceImageColors(new Blob());

            expect(colors).toBeUndefined();
            expect(consoleError).toHaveBeenCalledWith('Error getting reveal colors from image.', error);
        });
    });
});
