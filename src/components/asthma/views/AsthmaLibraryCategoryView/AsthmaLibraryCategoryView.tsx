import React from 'react';
import language from '../../../../helpers/language';
import { Layout, NavigationBar, ResourceDefinition, ResourceImageAlignment, ResourceList, Title } from '../../../presentational';
import MyDataHelps from "@careevolution/mydatahelps-js";

export interface AsthmaLibraryCategoryViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'no articles' | 'some articles';
    title: string;
    articles: ResourceDefinition[];
    articleImageAlignment?: ResourceImageAlignment;
}

export default function (props: AsthmaLibraryCategoryViewProps) {

    const onViewArticle = (article: ResourceDefinition): void => {
        if (props.previewState) return;
        MyDataHelps.openEmbeddedUrl(article.url);
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}>
            <Title order={1} style={{paddingTop: '32px'}}>{props.title}</Title>
        </NavigationBar>
        <ResourceList
            previewState={props.previewState === 'no articles' ? 'no resources' : props.previewState === 'some articles' ? 'some resources' : undefined}
            resources={props.articles}
            onViewResource={onViewArticle}
            emptyText={language('asthma-library-category-view-empty-text')}
            imageAlignment={props.articleImageAlignment}
        />
    </Layout>;
}
