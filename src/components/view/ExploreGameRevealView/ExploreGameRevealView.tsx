import React, { ReactNode, useEffect, useState } from 'react';
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

export default function ExploreGameRevealView(props: ExploreGameRevealViewProps) {
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState<ExploreGamePlace>();

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

    if (loading || !place) {
        if (!loading) dismiss();
        return wrapContent(<LoadingIndicator />);
    }

    return wrapContent(
        <>
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
        </>,
        placeImageUrl(place)
    );
}