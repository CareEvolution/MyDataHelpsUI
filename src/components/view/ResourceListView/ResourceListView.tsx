import React from 'react';
import { Layout, NavigationBar, ResourceButtonVariant, ResourceDefinition, ResourceImageAlignment, ResourceList, ResourceListPreviewState, Title } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface ResourceListViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: ResourceListPreviewState;
    title: string;
    resources: ResourceDefinition[];
    emptyText?: string;
    resourceImageAlignment?: ResourceImageAlignment;
    resourceButtonVariant?: ResourceButtonVariant;
    resourceButtonText?: string;
}

export default function (props: ResourceListViewProps) {

    const onViewResource = (resource: ResourceDefinition): void => {
        if (props.previewState) return;
        MyDataHelps.openEmbeddedUrl(resource.url);
    };

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar variant="compressed" showCloseButton={true}>
            <Title order={1}>{props.title}</Title>
        </NavigationBar>
        <ResourceList
            previewState={props.previewState}
            resources={props.resources}
            onViewResource={onViewResource}
            emptyText={props.emptyText}
            imageAlignment={props.resourceImageAlignment}
            buttonVariant={props.resourceButtonVariant}
            buttonText={props.resourceButtonText}
        />
    </Layout>;
}
