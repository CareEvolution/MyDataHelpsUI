import React from 'react';
import { Layout, NavigationBar, ResourceImageAlignment, Title } from '../../../presentational';
import { AsthmaLibraryArticles } from '../../components';
import { AsthmaLibraryCategoryViewPreviewState } from './AsthmaLibraryCategoryView.previewData';
import { AsthmaLibraryArticle } from '../../model';

export interface AsthmaLibraryCategoryViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: AsthmaLibraryCategoryViewPreviewState;
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
