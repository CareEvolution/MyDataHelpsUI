import React from 'react'
import ProviderSearch from './ProviderSearch'
import Layout from '../../presentational/Layout'
import { ExternalAccountProvider } from '@careevolution/mydatahelps-js'
import { Meta, StoryObj } from '@storybook/react'
import { Card } from '../../presentational'
import { argTypesToHide } from "../../../../.storybook/helpers";
import { createPreviewData } from "./ProviderSearch.previewdata";

type ProviderSearchStoryArgs = React.ComponentProps<typeof ProviderSearch> & {
    colorScheme: 'auto' | 'light' | 'dark';
    featuredProviderSource: 'hard coded' | 'dynamic';
    standaloneModeFinalRedirectPath: string;
};

const meta: Meta<ProviderSearchStoryArgs> = {
    title: 'Container/ProviderSearch',
    component: ProviderSearch,
    parameters: {
        layout: 'fullscreen'
    },
    render: args => {
        const previewProviders = createPreviewData('Default').searchResults;

        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <ProviderSearch
                    {...args}
                    providerCategories={args.providerCategories!.length > 0 ? args.providerCategories : undefined}
                    publicProviderSearchApiUrl={
                        args.operatingMode === 'unauthenticated'
                            ? 'https://designer.mydatahelps.dev/api/fhirpublicproviders'
                            : undefined
                    }
                    featuredProviders={
                        args.featuredProviderSource === 'hard coded'
                            ? [
                                { ...previewProviders[2], name: previewProviders[2].name + ' (Featured)' } as ExternalAccountProvider,
                                { ...previewProviders[4], name: previewProviders[4].name + ' (Featured)' } as ExternalAccountProvider
                            ]
                            : undefined
                    }
                    publicFeaturedProvidersApiUrl={
                        args.operatingMode === 'unauthenticated'
                            ? 'https://designer.mydatahelps.dev/api/featuredfhirpublicproviders'
                            : undefined
                    }
                    connectExternalAccountOptions={
                        args.standaloneModeFinalRedirectPath
                            ? {
                                openNewWindow: false,
                                standaloneModeFinalRedirectPath: args.standaloneModeFinalRedirectPath
                            } : undefined
                    }
                />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<ProviderSearchStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'Default',
        providerCategories: [],
        featuredProviderSource: false as any,
        hideRequestProviderButton: false,
        onProviderSelected: false as any
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
            options: [
                'Default', 'Searching',
                'Connected Provider', 'Connected Provider - Unauthorized',
                'Disabled Provider - Same Endpoint', 'Disabled Provider - Same Managing Org', 'Disabled Provider - Unavailable'
            ]
        },
        providerCategories: {
            name: 'provider categories',
            control: 'check',
            options: ['Provider', 'Health Plan', 'Device Manufacturer']
        },
        featuredProviderSource: {
            name: 'with featured providers?',
            control: 'boolean',
            mapping: {
                true: 'hard coded',
                false: undefined
            }
        },
        hideRequestProviderButton: {
            name: 'hide request provider button?',
            control: 'boolean'
        },
        onProviderSelected: {
            name: 'with custom provider selected handler?',
            control: 'boolean',
            mapping: {
                true: (provider: ExternalAccountProvider) => alert(`Provider selected: ${provider.name}.`),
                false: undefined
            }
        },
        ...argTypesToHide([
            'operatingMode', 'onProviderConnected', 'connectExternalAccountOptions', 'publicProviderSearchApiUrl', 'featuredProviders',
            'featuredProvidersContext', 'publicFeaturedProvidersApiUrl', 'externalAccounts', 'innerRef'
        ])
    }
}

export const Live: Story = {
    args: {
        colorScheme: 'auto',
        operatingMode: 'unauthenticated',
        providerCategories: [],
        featuredProviderSource: 'dynamic',
        featuredProvidersContext: 'Default',
        hideRequestProviderButton: false,
        onProviderSelected: false as any,
        onProviderConnected: false as any,
        standaloneModeFinalRedirectPath: ''
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        operatingMode: {
            name: 'operating mode',
            control: 'radio',
            options: ['unauthenticated', 'authenticated']
        },
        providerCategories: {
            name: 'provider categories',
            control: 'check',
            options: ['Provider', 'Health Plan', 'Device Manufacturer']
        },
        featuredProviderSource: {
            name: 'featured provider source',
            control: 'radio',
            options: ['hard coded', 'dynamic']
        },
        featuredProvidersContext: {
            name: 'featured provider context',
            if: { arg: 'featuredProviderSource', neq: 'hard coded' }
        },
        hideRequestProviderButton: {
            name: 'hide request provider button?',
            control: 'boolean'
        },
        onProviderSelected: {
            name: 'with custom provider selected handler?',
            control: 'boolean',
            mapping: {
                true: (provider: ExternalAccountProvider) => alert(`Provider selected: ${provider.name}.`),
                false: undefined
            }
        },
        onProviderConnected: {
            name: 'with custom provider connected handler?',
            control: 'boolean',
            mapping: {
                true: (provider: ExternalAccountProvider) => alert(`Provider connected: ${provider.name}.`),
                false: undefined
            }
        },
        standaloneModeFinalRedirectPath: {
            name: 'standalone mode final redirect path'
        },
        ...argTypesToHide([
            'previewState', 'connectExternalAccountOptions', 'publicProviderSearchApiUrl', 'featuredProviders',
            'publicFeaturedProvidersApiUrl', 'externalAccounts', 'innerRef'
        ])
    }
}