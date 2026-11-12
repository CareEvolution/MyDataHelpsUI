import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../presentational/Layout';
import Card from '../../presentational/Card';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { ExploreGamePlace, ExploreGamePlaceImageColors, ExploreGameState, fetchGameState, fetchPlace, fetchPlaceImage, language, resolvePlaceImageColors } from '../../../helpers';
import { Button, LoadingIndicator, NavigationBar, TextBlock } from '../../presentational';
import './ExploreGameRevealView.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export interface ExploreGameRevealViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'default' | 'loading';
    gameStateCustomFieldName?: string;
    placeId: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function ExploreGameRevealView(props: ExploreGameRevealViewProps) {
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState<ExploreGamePlace>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [colors, setColors] = useState<ExploreGamePlaceImageColors>();

    const dismiss = useCallback((): void => {
        if (props.previewState) return;
        MyDataHelps.dismiss();
    }, [props.previewState]);

    const loadPlace = useCallback((placeId: string, signal: AbortSignal): void => {
        if (signal.aborted) return;
        Promise.all([
            fetchPlace(placeId, signal),
            fetchPlaceImage(placeId, signal)
        ]).then(([place, imageBlob]) => {
            if (signal.aborted) return;
            return resolvePlaceImageColors(imageBlob).then(colors => {
                if (signal.aborted) return;
                setPlace(place);
                setImageUrl(URL.createObjectURL(imageBlob));
                setColors(colors);
                setLoading(false);
            });
        }).catch(error => {
            if (signal.aborted) return;
            console.error(`Error loading place: ${placeId}`, error);
            dismiss();
        });
    }, [dismiss]);

    const initialize = useCallback(async (signal: AbortSignal): Promise<void> => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            loadPlace('preview', signal);
            return;
        }

        let gameState: ExploreGameState | undefined;
        try {
            gameState = await fetchGameState(props.gameStateCustomFieldName);
            if (signal.aborted) return;
            if (!gameState) {
                console.error('Game state not found.');
                dismiss();
                return;
            }
        } catch (error) {
            if (signal.aborted) return;
            console.error('Error loading game state: ', error);
            dismiss();
            return;
        }

        if (!gameState.unlocked.includes(props.placeId)) {
            console.error(`Place ${props.placeId} is not unlocked.`);
            dismiss();
            return;
        }

        loadPlace(props.placeId, signal);
    }, [props.previewState, props.gameStateCustomFieldName, props.placeId, loadPlace, dismiss]);

    useEffect(() => {
        const controller = new AbortController();
        initialize(controller.signal).then();
        return () => controller.abort();
    }, [initialize]);

    useEffect(() => {
        if (!imageUrl) return;
        return () => URL.revokeObjectURL(imageUrl);
    }, [imageUrl]);

    if (loading || !place || !imageUrl) {
        return <Layout
            colorScheme={props.colorScheme ?? 'auto'}
            className="mdhui-explore-game-reveal"
            flex={true}
            innerRef={props.innerRef}>
            <LoadingIndicator className="mdhui-explore-game-reveal-loading" />
        </Layout>;
    }

    return <Layout
        colorScheme={props.colorScheme ?? 'auto'}
        className="mdhui-explore-game-reveal"
        bodyBackgroundColor={colors?.backgroundColor}
        background={colors?.backgroundGradient}
        flex={true}
        innerRef={props.innerRef}>
        <div className="mdhui-explore-game-reveal-content">
            <img className="mdhui-explore-game-reveal-background" src={imageUrl} alt="" aria-hidden="true" />
            <NavigationBar
                backgroundColor={'transparent'}
                navigationBarRight={
                    <div className="mdhui-explore-game-reveal-close-button-wrapper">
                        <div className={'mdhui-explore-game-reveal-close-button' + (loading ? ' loading' : '')} onClick={dismiss}><FontAwesomeSvgIcon icon={faXmark} /></div>
                    </div>
                }
            />
            <Card className="mdhui-explore-game-reveal-card">
                <TextBlock className="mdhui-explore-game-reveal-category">{place.category}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-name">{place.name}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-location">{place.location}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-fact">{place.fact}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-added-to-album">{language('explore-game-reveal-added-to-album')}</TextBlock>
                <Button className="mdhui-explore-game-reveal-done-button" onClick={dismiss} defaultMargin>{language('done')}</Button>
            </Card>
        </div>
    </Layout>;
}
