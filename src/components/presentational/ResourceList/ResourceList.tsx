import React from 'react';
import './ResourceList.css';
import { Resource, ResourceButtonVariant, ResourceImageAlignment } from '../../presentational';
import language from '../../../helpers/language';
import { previewData, ResourceListPreviewState } from './ResourceList.previewData';

export interface ResourceDefinition {
    title: string;
    subTitle?: string;
    url: string;
    imageUrl?: string;
}

export interface ResourceListProps {
    previewState?: ResourceListPreviewState;
    resources: ResourceDefinition[];
    onViewResource: (resource: ResourceDefinition) => void;
    emptyText?: string;
    imageAlignment?: ResourceImageAlignment;
    buttonVariant?: ResourceButtonVariant;
    buttonText?: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: ResourceListProps) {
    let resources = props.previewState ? previewData[props.previewState].resources : props.resources;

    return <div className="mdhui-resource-list" ref={props.innerRef}>
        <>
            {resources.length > 0 && resources.map((resource, index) => {
                return <Resource
                    key={index}
                    title={resource.title}
                    subTitle={resource.subTitle}
                    imageUrl={resource.imageUrl}
                    onClick={() => props.onViewResource(resource)}
                    imageAlignment={props.imageAlignment}
                    hideButton={!props.buttonVariant}
                    buttonVariant={props.buttonVariant}
                    buttonText={props.buttonText}
                />;
            })}
            {resources.length === 0 &&
                <div className="mdhui-resource-list-empty-text">{props.emptyText || language('resource-list-empty-text')}</div>
            }
        </>
    </div>;
}