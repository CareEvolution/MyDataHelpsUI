import React from 'react';
import { Layout, NavigationBar, ResourceDefinition, ResourceImageAlignment, ResourceList, ResourceListPreviewState, Title } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface ResourceListViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: ResourceListPreviewState;
    title: string;
    resources: ResourceDefinition[];
    emptyText?: string;
    resourceImageAlignment?: ResourceImageAlignment;
}

export default function (props: ResourceListViewProps) {

    const onViewResource = (resource: ResourceDefinition): void => {
        if (props.previewState) return;
        MyDataHelps.openEmbeddedUrl(resource.url);
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}>
            <Title order={1} style={{paddingTop: '32px'}}>{props.title}</Title>
        </NavigationBar>
        <ResourceList
            previewState={props.previewState}
            resources={props.resources}
            onViewResource={onViewResource}
            emptyText={props.emptyText}
            imageAlignment={props.resourceImageAlignment}
        />
    </Layout>;
}
