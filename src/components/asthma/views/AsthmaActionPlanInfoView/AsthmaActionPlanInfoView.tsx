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
        console.log(url);
        MyDataHelps.openEmbeddedUrl(url);
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar variant="compressed" showCloseButton={true} />
        <div>
            <Title style={{ padding: '0 16px' }} order={2}>{language('asthma-action-plan-info-view-title')}</Title>
            <p style={{ padding: '0 16px', marginTop: '8px' }}>{language('asthma-action-plan-info-view-info')}</p>
            <Resource
                title={language('asthma-action-plan-info-view-title')}
                subTitle={language('asthma-action-plan-info-view-subtitle')}
                onClick={() => onViewArticle()}
                imageUrl={new URL('images/article_category_medicalteam.svg', props.libraryBaseUrl).href}
            />
        </div>
    </Layout>;
}