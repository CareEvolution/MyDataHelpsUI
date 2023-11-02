import React from 'react';
import { Layout, NavigationBar, ResourceImageAlignment, Title } from '../../../presentational';
import { AsthmaLibraryArticles } from '../../components';
import { AsthmaLibraryCategoryViewPreviewState, previewData } from './AsthmaLibraryCategoryView.previewData';

export interface AsthmaLibraryCategoryViewProps {
    previewState?: AsthmaLibraryCategoryViewPreviewState;
    colorScheme?: 'light' | 'dark' | 'auto';
    title: string;
    categoryConfigUrl: string;
    category: string;
    articleImageAlignment?: ResourceImageAlignment;
}

export default function (props: AsthmaLibraryCategoryViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}>
            <Title order={1} style={{paddingTop: '32px'}}>{props.title}</Title>
        </NavigationBar>
        <AsthmaLibraryArticles
            previewState={props.previewState ? previewData[props.previewState].articlesPreviewState : undefined}
            categoryConfigUrl={props.categoryConfigUrl}
            category={props.category}
            imageAlignment={props.articleImageAlignment}
        />
    </Layout>;
}
