import React from 'react';
import { Card, Layout, Section, TextBlock } from '../../../presentational';
import { AsthmaFacts } from '../../components';

export interface AsthmaLibraryViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
}

export default function (props: AsthmaLibraryViewProps) {
    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <Section backgroundColor="#fff" noTopMargin={true}>
            <TextBlock style={{marginTop: 32, marginBottom: 16}}>
                <h1 style={{margin: 0}}>Library</h1>
            </TextBlock>
            <Card backgroundColor="#f2f2f7" style={{marginTop: 0, marginBottom: 20}}>
                <AsthmaFacts/>
            </Card>
        </Section>
        <Card>
            <TextBlock>
                TODO: Category List
            </TextBlock>
        </Card>
    </Layout>;
}