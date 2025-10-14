import React from 'react';
import { getLanguageCodeFromIso, language } from '../../../../helpers';
import { Layout, NavigationBar, Resource, Title } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaActionPlanInfoViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    libraryBaseUrl: string;
}

export default function (props: AsthmaActionPlanInfoViewProps) {
    const onViewArticle = () => {
        const languageCode = getLanguageCodeFromIso(MyDataHelps.getCurrentLanguage());
        const url = new URL(`atedu_50${languageCode === 'es' ? '_es' : ''}.html`, props.libraryBaseUrl).href;
        MyDataHelps.openEmbeddedUrl(url);
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar variant="compressed" showCloseButton={true} />
        <Title defaultMargin order={2}>{language('asthma-action-plan-info-view-title')}</Title>
        <div style={{ padding: '0 16px' }}>
            <p>{language('asthma-action-plan-info-view-info')}</p>
        </div>
        <Resource
            title={language('asthma-action-plan-info-view-title')}
            subTitle={language('asthma-action-plan-info-view-subtitle')}
            imageAlignment="left"
            buttonVariant="link"
            buttonText={language('asthma-action-plan-info-view-button-text')}
            onClick={() => onViewArticle()}
            imageUrl={new URL('images/article_category_medicalteam.svg', props.libraryBaseUrl).href}
        />
    </Layout>;
}