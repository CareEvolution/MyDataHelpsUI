import { ExternalAccount, ExternalAccountProvider } from '@careevolution/mydatahelps-js';

export type ProviderSearchPreviewState = 'Default' | 'Searching' |
    'Connected Provider' | 'Connected Provider - Unauthorized' |
    'Disabled Provider - Same Endpoint' | 'Disabled Provider - Same Managing Org' | 'Disabled Provider - Unavailable';

export interface ProviderSearchPreviewData {
    searchResults: ExternalAccountProvider[];
    externalAccounts: ExternalAccount[];
}

export function createPreviewData(previewState: ProviderSearchPreviewState): ProviderSearchPreviewData {
    const providers: ExternalAccountProvider[] = [
        {
            id: 20,
            name: '1upHealth sandbox',
            category: 'Health Plan',
            logoUrl: 'https://mydatahelps.dev/api/v1/delegated/externalaccountproviders/20/logo',
            enabled: previewState === 'Default',
            relatedProvider: previewState.startsWith('Disabled') ? 'Some Related Provider' : undefined,
            managingOrganization: previewState === 'Disabled Provider - Same Managing Org' ? 'Some Managing Org' : undefined,
            message: previewState === 'Disabled Provider - Unavailable' ? 'Unavailable' : undefined
        } as ExternalAccountProvider,
        {
            id: 2,
            name: 'Fitbit',
            category: 'Device Manufacturer',
            logoUrl: 'https://mydatahelps.dev/api/v1/delegated/externalaccountproviders/2/logo',
            enabled: true
        } as ExternalAccountProvider,
        {
            id: 130,
            name: 'Abington Jefferson Health',
            category: 'Provider',
            logoUrl: 'https://mydatahelps.dev/api/v1/delegated/externalaccountproviders/130/logo',
            enabled: true
        } as ExternalAccountProvider,
        {
            id: 1,
            name: 'CareEvolution FHIR',
            category: 'Provider',
            logoUrl: 'https://mydatahelps.dev/api/v1/delegated/externalaccountproviders/1/logo',
            enabled: true
        } as ExternalAccountProvider,
        {
            id: 37,
            name: 'Cedars-Sinai Health System',
            category: 'Provider',
            logoUrl: 'https://mydatahelps.dev/api/v1/delegated/externalaccountproviders/37/logo',
            enabled: true
        } as ExternalAccountProvider,
        {
            id: 27,
            name: 'Maui Medical Group',
            category: 'Provider',
            logoUrl: 'https://mydatahelps.dev/api/v1/delegated/externalaccountproviders/27/logo',
            enabled: true
        } as ExternalAccountProvider
    ];

    const externalAccounts: ExternalAccount[] = [];
    if (previewState.startsWith('Connected Provider')) {
        externalAccounts.push({
            provider: providers[0],
            status: previewState === 'Connected Provider - Unauthorized' ? 'unauthorized' : 'fetchComplete'
        } as ExternalAccount);
    }

    return {
        searchResults: providers,
        externalAccounts: externalAccounts
    };
}