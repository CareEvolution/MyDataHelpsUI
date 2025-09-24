import React from 'react';
import { language } from '../../../../helpers';
import { Layout, NavigationBar, Title } from '../../../presentational';

export interface AsthmaLogEntryInfoViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: AsthmaLogEntryInfoViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <NavigationBar variant="compressed" backgroundColor="var(--mdhui-background-color-0)" showCloseButton={true} />
        <div style={{ padding: '16px' }}>
            <Title order={2}>{language('asthma-log-entry-info-view-title')}</Title>
            <p>{language('asthma-log-entry-info-view-p1')}</p>
            <p>{language('asthma-log-entry-info-view-p2')}</p>
        </div>
    </Layout>;
}