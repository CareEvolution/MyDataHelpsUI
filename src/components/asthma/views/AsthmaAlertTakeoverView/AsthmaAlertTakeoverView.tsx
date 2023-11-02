import React from 'react';
import { Layout, NavigationBar, Section } from '../../../presentational';
import { AsthmaAlertTakeoverNotice } from "../../components";

export interface AsthmaActivityViewProps {
    previewState?: 'default';
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: AsthmaActivityViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <NavigationBar showCloseButton={true} backgroundColor="#fff"/>
            <div style={{background: '#ccc', height: 160, width: 160, borderRadius: '50%', margin: '32px auto'}}/>
            <AsthmaAlertTakeoverNotice message="Multiple data points are outside your normal levels."/>
        </Section>
    </Layout>;
}
