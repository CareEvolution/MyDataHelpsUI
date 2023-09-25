import React from 'react';
import './InboxHistoryView.css';
import Layout from '../../presentational/Layout';
import NavigationBar from '../../presentational/NavigationBar';
import Title from '../../presentational/Title';
import InboxItemList from '../../container/InboxItemList';
import language from '../../../helpers/language';

export interface InboxHistoryViewProps {
    previewState?: 'default'
    colorScheme?: 'light' | 'dark' | 'auto';
    messageViewerUrl: string;
}

export default function (props: InboxHistoryViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar showCloseButton={true}/>
        <div className="mdhui-inbox-history">
            <Title order={3}>{language('inbox-history-view-title')}</Title>
            <InboxItemList previewState={props.previewState === 'default' ? 'complete items' : undefined} status="complete" messageViewerUrl={props.messageViewerUrl} emptyText={language('inbox-history-view-empty-text')}/>
        </div>
    </Layout>;
}