import React from 'react'
import ConnectDexcom, { ConnectDexcomProps } from './ConnectDexcom'
import { Card, Layout } from '../../presentational'

export default {
    title: 'Container/ConnectDexcom',
    component: ConnectDexcom,
    parameters: {
        layout: 'fullscreen',
    }
};

interface ConnectDexcomStoryArgs extends ConnectDexcomProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: ConnectDexcomStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <ConnectDexcom title="Dexcom" {...args} />
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'notConnected',
        disabledBehavior: undefined,
        hideWhenConnected: undefined
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['notConnected', 'unauthorized', 'error', 'fetchComplete', 'fetchingData', 'notEnabled']
        },
        disabledBehavior: {
            name: 'disabled behavior',
            control: 'radio',
            options: [undefined, 'hide', 'displayError'],
            if: { arg: 'previewState', eq: 'notEnabled' }
        },
        hideWhenConnected: {
            name: 'hide when connected?',
            control: 'radio',
            options: [undefined, false, true],
            if: { arg: 'previewState', neq: 'notEnabled' }
        }
    },
    render: render
};


