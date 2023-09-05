import React from 'react'
import { Layout } from '../../..'
import NewPoints from '../../container/NewPoints';
import { NewPointsProps } from "../../container/NewPoints/NewPoints";

export interface NewPointsViewProps {
    newPointsProps: NewPointsProps
    colorScheme?: 'auto' | 'light' | 'dark';
    primaryColor?: string;
}

export default function (props: NewPointsViewProps) {
    return (
        <Layout bodyBackgroundColor={props.colorScheme === 'dark' ? '' : '#fff'} colorScheme={props.colorScheme ?? 'auto'} primaryColor={props.primaryColor}>
            <NewPoints {...props.newPointsProps} />
        </Layout>
    )
}