import React from 'react';
import { Layout, NavigationBar, ResourceImageAlignment, Title } from '../../../presentational';
import { AsthmaLibraryArticles, AsthmaLibraryArticlesPreviewState } from '../../components';
import { AsthmaLibraryArticle } from '../../model';

export interface AsthmaLibraryCategoryViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: AsthmaLibraryArticlesPreviewState;
    title: string;
    articles: AsthmaLibraryArticle[];
    articleImageAlignment?: ResourceImageAlignment;
}

export default function (props: AsthmaLibraryCategoryViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}>
            <Title order={1} style={{paddingTop: '32px'}}>{props.title}</Title>
        </NavigationBar>
        <AsthmaLibraryArticles previewState={props.previewState} articles={props.articles} imageAlignment={props.articleImageAlignment}/>
    </Layout>;
}
