import React, { ReactNode, useEffect, useState } from 'react';
import Layout from '../../presentational/Layout';
import Card from '../../presentational/Card';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { ExploreGamePlace, ExploreGameState, language } from '../../../helpers';
import { Button, LoadingIndicator, NavigationBar, TextBlock } from '../../presentational';
import './ExploreGameRevealView.css';

export interface ExploreGameRevealViewProps {
    colorScheme?: 'auto' | 'light' | 'dark';
    previewState?: 'loading' | 'loaded';
    place: ExploreGamePlace;
    gameStateCustomFieldName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function ExploreGameRevealView(props: ExploreGameRevealViewProps) {
    const [loading, setLoading] = useState(true);
    const [gameState, setGameState] = useState<ExploreGameState>();

    useEffect(() => {
        if (props.previewState === 'loading') {
            setLoading(true);
            return;
        }
        if (props.previewState === 'loaded') {
            setGameState({ spent: 1, unlocked: [props.place.id] });
            setLoading(false);
            return;
        }

        MyDataHelps.getParticipantInfo().then(participantInfo => {
            const gameStateJson = participantInfo.customFields[props.gameStateCustomFieldName];
            if (gameStateJson) {
                try {
                    setGameState(JSON.parse(gameStateJson));
                } catch (error) {
                    // Suppress.
                }
            }
        }).finally(() => {
            setLoading(false);
        });
    }, [props.previewState]);

    const dismiss = () => {
        if (props.previewState) return;
        MyDataHelps.dismiss();
    };

    const wrapContent = (content: ReactNode, backgroundImageUrl?: string) => {
        return <Layout
            colorScheme={props.colorScheme ?? 'auto'}
            className="mdhui-explore-game-reveal"
            bodyBackgroundImageUrl={backgroundImageUrl}
            flex={true}
            innerRef={props.innerRef}>

            {content}
        </Layout>;
    };

    if (loading || !gameState || !gameState.unlocked.includes(props.place.id)) {
        if (!loading) dismiss();
        return wrapContent(<LoadingIndicator />);
    }

    return wrapContent(
        <>
            <NavigationBar
                backgroundColor={'transparent'}
                navigationBarRight={
                    <div className="mdhui-explore-game-reveal-close-button-wrapper">
                        <div className={'mdhui-explore-game-reveal-close-button' + (loading ? ' loading' : '')} onClick={dismiss}>&#x1F5D9;</div>
                    </div>
                }
            />
            <Card className="mdhui-explore-game-reveal-card">
                <TextBlock className="mdhui-explore-game-reveal-card-category">{props.place.category}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-card-name">{props.place.name}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-card-location">{props.place.location}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-card-fact">{props.place.fact}</TextBlock>
                <TextBlock className="mdhui-explore-game-reveal-card-added-to-album">{language('explore-game-reveal-added-to-album')}</TextBlock>
                <Button className="mdhui-explore-game-reveal-card-done-button" onClick={dismiss} defaultMargin>{language('done')}</Button>
            </Card>
        </>,
        props.place.imageUrl
    );
}