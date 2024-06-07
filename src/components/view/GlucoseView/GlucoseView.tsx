import React from 'react';
import './GlucoseView.css';
import Layout from '../../presentational/Layout';
import NavigationBar from '../../presentational/NavigationBar';
import language from '../../../helpers/language';
import { DateRangeCoordinator } from "../../presentational";
import GlucoseChart from '../../container/GlucoseChart';

export interface GlucoseViewProps {
    previewState?: 'default'
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: GlucoseViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'} className="mdhui-glucose">
        <NavigationBar title={language('glucose-view-title')} showCloseButton={true} variant="compressedModal"/>
        <DateRangeCoordinator intervalType="Day" variant="rounded">
            <GlucoseChart previewState={props.previewState === 'default' ? 'with data and meals' : undefined}/>
        </DateRangeCoordinator>
    </Layout>;
}