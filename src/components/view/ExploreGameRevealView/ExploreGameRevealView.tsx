import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../../presentational/Layout';
import Card from '../../presentational/Card';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { ExploreGamePlace, getRevealColorsFromImage, language, loadGameState, loadPlace, placeImageUrl, RevealColors } from '../../../helpers';
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
    const [colors, setColors] = useState<RevealColors>();

    const backgroundImageUrl = useMemo(() => place ? placeImageUrl(place) : undefined, [place]);

    const dismiss = () => {
        if (props.previewState) return;
        MyDataHelps.dismiss();
    };

    useEffect(() => {
        setLoading(true);
        if (props.previewState === 'loading') {
            return;
        }
        if (!!props.previewState) {
            loadPlace('preview').then(place => {
                setPlace(place);
                setLoading(false);
            }).catch(error => {
                console.error("Error loading place: preview", error);
            });
            return;
        }
        loadGameState(props.gameStateCustomFieldName).then(gameState => {
            if (!gameState) {
                console.error("Game state not found.");
                dismiss();
                return;
            }
            if (!gameState.unlocked.includes(props.placeId)) {
                console.error("Place not unlocked: " + props.placeId);
                dismiss();
                return;
            }
            loadPlace(props.placeId).then(place => {
                setPlace(place);
                setLoading(false);
            }).catch(error => {
                console.error("Error loading place: " + props.placeId, error);
                dismiss();
            });
        }).catch(error => {
            console.error("Error loading game state.", error);
            dismiss();
        });
    }, [props.previewState, props.gameStateCustomFieldName, props.placeId]);

    useEffect(() => {
        setColors(undefined);
        if (!backgroundImageUrl) return;

        let cancelled = false;
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            if (cancelled) return;
            setColors(getRevealColorsFromImage(image));
        };
        image.src = backgroundImageUrl;

        return () => {
            cancelled = true;
            image.onload = null;
        };
    }, [backgroundImageUrl]);

    if (loading || !place) {
        if (!loading) dismiss();
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
        </div>
    </Layout>;
}