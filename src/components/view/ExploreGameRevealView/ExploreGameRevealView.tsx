import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import Layout from '../../presentational/Layout';
import Card from '../../presentational/Card';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { ExploreGamePlace, language, loadGameState, loadPlace, placeImageUrl } from '../../../helpers';
import { Button, LoadingIndicator, NavigationBar, TextBlock } from '../../presentational';
import './ExploreGameRevealView.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export interface ExploreGameRevealViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'default' | 'loading';
    placeId: string;
    gameStateCustomFieldName?: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

type BackgroundColors = {
    gradient: string;
    representativeColor: string;
};

export default function ExploreGameRevealView(props: ExploreGameRevealViewProps) {
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState<ExploreGamePlace>();
    const [backgroundColors, setBackgroundColors] = useState<BackgroundColors>();

    const backgroundImageUrl = useMemo(() => place ? placeImageUrl(place) : undefined, [place]);

    const initialize = async () => {
        if (props.previewState === 'loading') {
            setLoading(true);
            return;
        }

        try {
            if (!!props.previewState) {
                setPlace(await loadPlace('preview'));
            } else {
                const gameState = await loadGameState(props.gameStateCustomFieldName);
                if (gameState?.unlocked.includes(props.placeId)) {
                    setPlace(await loadPlace(props.placeId));
                }
            }
        } catch {
            // Suppress.
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initialize().then();
    }, [props.previewState, props.placeId, props.gameStateCustomFieldName]);

    useEffect(() => {
        setBackgroundColors(undefined);
        if (!backgroundImageUrl) return;

        let cancelled = false;
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            if (cancelled || !image.naturalWidth || !image.naturalHeight) return;

            const canvas = document.createElement('canvas');
            const scale = Math.min(1, 100 / Math.max(image.naturalWidth, image.naturalHeight));
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

            const context = canvas.getContext('2d');
            if (!context) return;

            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            try {
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
                if (!cancelled && topColor && bottomColor) {
                    const representativeColor = [
                        Math.round((topColor[0] + bottomColor[0]) / 2),
                        Math.round((topColor[1] + bottomColor[1]) / 2),
                        Math.round((topColor[2] + bottomColor[2]) / 2)
                    ];
                    const toCssColor = (color: number[]) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    setBackgroundColors({
                        gradient: `linear-gradient(to bottom, ${toCssColor(topColor)}, ${toCssColor(bottomColor)})`,
                        representativeColor: toCssColor(representativeColor)
                    });
                }
            } catch (error) {
                console.warn('Unable to sample background image colors.', error);
            }
        };
        image.src = backgroundImageUrl;

        return () => {
            cancelled = true;
            image.onload = null;
        };
    }, [backgroundImageUrl]);

    const dismiss = () => {
        if (props.previewState) return;
        MyDataHelps.dismiss();
    };

    const wrapContent = (content: ReactNode, backgroundColors: BackgroundColors | undefined = undefined) => {
        return <Layout
            colorScheme={props.colorScheme ?? 'auto'}
            className="mdhui-explore-game-reveal"
            background={backgroundColors?.gradient}
            bodyBackgroundColor={backgroundColors?.representativeColor}
            flex={true}
            innerRef={props.innerRef}>
            {content}
        </Layout>;
    };

    if (loading || !place) {
        if (!loading) dismiss();
        return wrapContent(<LoadingIndicator className="mdhui-explore-game-reveal-loading" />);
    }

    return wrapContent(
        <div className="mdhui-explore-game-reveal-content" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <NavigationBar
                backgroundColor={'transparent'}
                navigationBarRight={
                    <div className="mdhui-explore-game-reveal-close-button-wrapper">
                        <div className={'mdhui-explore-game-reveal-close-button' + (loading ? ' loading' : '')} onClick={dismiss}><FontAwesomeSvgIcon icon={faXmark} /></div>
                    </div>
                }
            />
            <Card>
                <TextBlock className="mdhui-explore-game-reveal-category">{place.category}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-name">{place.name}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-location">{place.location}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-fact">{place.fact}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-added-to-album">{language('explore-game-reveal-added-to-album')}</TextBlock>
                <Button className="mdhui-explore-game-reveal-done-button" onClick={dismiss} defaultMargin>{language('done')}</Button>
            </Card>
        </div>,
        backgroundColors
    );
}