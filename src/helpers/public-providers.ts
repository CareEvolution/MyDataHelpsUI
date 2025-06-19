import { ExternalAccountProvider, ExternalAccountProvidersPage } from '@careevolution/mydatahelps-js';

const toExternalAccountProvider = (provider: any): ExternalAccountProvider => {
    return {
        id: provider.ID,
        name: provider.OrganizationName,
        logoUrl: provider.LogoURL,
        category: provider.Category,
        enabled: true
    };
};

export function getFeaturedPublicProviders(publicFeaturedProvidersApiUrl: string, featuredProvidersContext?: string): Promise<ExternalAccountProvider[]> {
    const url = new URL(publicFeaturedProvidersApiUrl);
    if (featuredProvidersContext) {
        url.searchParams.append('featuredProvidersContext', featuredProvidersContext);
    }
    return fetch(url.toString(), { method: 'GET', headers: { 'Accept': 'application/json' } })
        .then(response => response.json())
        .then(providers => providers.map(toExternalAccountProvider));
}

export function getPublicProviders(publicProviderSearchApiUrl: string, search: string, pageSize: number, currentPageIndex: number): Promise<ExternalAccountProvidersPage> {
    const url = new URL(publicProviderSearchApiUrl);
    url.searchParams.append('keyword', search);
    url.searchParams.append('pageSize', String(pageSize));
    url.searchParams.append('pageNumber', String(currentPageIndex + 1));
    return fetch(url.toString(), { method: 'GET', headers: { 'Accept': 'application/json' }, })
        .then((response) => response.json())
        .then(pagedResult => {
            return {
                externalAccountProviders: pagedResult.Providers.map(toExternalAccountProvider),
                totalExternalAccountProviders: pagedResult.TotalCount
            };
        });
}