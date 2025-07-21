import React, { useEffect, useMemo, useRef, useState } from 'react';
import MyDataHelps, { ConnectExternalAccountOptions, ExternalAccount, ExternalAccountProvider } from '@careevolution/mydatahelps-js';
import { Action, LoadingIndicator, UnstyledButton } from '../../presentational';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './ProviderSearch.css';
import language from '../../../helpers/language';
import { createPreviewData, ProviderSearchPreviewState } from './ProviderSearch.previewdata';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger/OnVisibleTrigger';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { getFeaturedPublicProviders, getPublicProviders } from '../../../helpers/public-providers';
import debounce from 'lodash/debounce';

export type ProviderSearchOperatingMode = 'authenticated' | 'unauthenticated';

export interface ProviderSearchProps {
    previewState?: ProviderSearchPreviewState;
    /**
     * The mode this provider search should operate in.
     *
     * - The 'authenticated' mode uses delegated APIs to query for providers.  It also queries for existing external accounts.
     * - The 'unauthenticated' mode uses public APIs to query for providers.  It does not attempt to load existing external accounts.
     *
     * The mode defaults to `authenticated` unless specified, or when either of the provider or featured provider public API URLs are specified.
     */
    operatingMode?: ProviderSearchOperatingMode;
    providerCategories?: string[];
    /** Callback function triggered when a provider is selected. If this function is defined it will override the normal action taken when selecting provider.*/
    onProviderSelected?: (provider: ExternalAccountProvider) => void;
    /** Callback function triggered after a provider is connected. */
    onProviderConnected?: (provider: ExternalAccountProvider) => void;
    connectExternalAccountOptions?: ConnectExternalAccountOptions;
    hideRequestProviderButton?: boolean;
    /** URL for the public provider search API. If provided, this endpoint will be used instead of MyDataHelps.getExternalAccountProviders. */
    publicProviderSearchApiUrl?: string;
    /** List of providers to display at the top when no search is active. If populated, disables the dynamic featured provider lookup. */
    featuredProviders?: ExternalAccountProvider[];
    /** The context to use when querying for featured providers.  Only used if featuredProviders is not set. */
    featuredProvidersContext?: string;
    /** URL for the public featured provider API. If provided, this endpoint will be used instead of MyDataHelps.getFeaturedProviders. */
    publicFeaturedProvidersApiUrl?: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

let currentRequestID = 0;

/** Supports searching for Providers, and Health Plans for the purpose of connecting to participant data
 */
export default function ProviderSearch(props: ProviderSearchProps) {
    const [featuredProviders, setFeaturedProviders] = useState<ExternalAccountProvider[]>();
    const [externalAccounts, setExternalAccounts] = useState<ExternalAccount[]>();
    const [searchResults, setSearchResults] = useState<ExternalAccountProvider[]>([]);
    const [searching, setSearching] = useState(true);
    const [searchString, setSearchString] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [initialized, setInitialized] = useState<boolean>(false);

    const pageSize = 45;

    const operatingMode = props.operatingMode ?? ((props.publicProviderSearchApiUrl || props.publicFeaturedProvidersApiUrl) ? 'unauthenticated' : 'authenticated');

    useEffect(() => {
        setFeaturedProviders(undefined);
        setExternalAccounts(undefined);
        setSearchResults([]);
        setSearching(true);
        setSearchString('');
        setCurrentPage(0);
        setTotalResults(0);
        setInitialized(false);
    }, [
        props.previewState,
        props.providerCategories, props.publicProviderSearchApiUrl,
        props.featuredProviders, props.featuredProvidersContext, props.publicFeaturedProvidersApiUrl
    ]);

    const applyPreviewState = (previewState: ProviderSearchPreviewState): void => {
        const previewData = createPreviewData(previewState);
        if (!featuredProviders) {
            setFeaturedProviders(props.featuredProviders ?? []);
            return;
        }
        if (!externalAccounts) {
            setExternalAccounts(previewData.externalAccounts);
            return;
        }
        if (previewState !== 'Searching') {
            updateSearchResults(previewData.searchResults);
            setTotalResults(previewData.searchResults.length);
            setSearching(false);
        }
        setInitialized(true);
    };

    const getFeaturedProviders = async (): Promise<ExternalAccountProvider[]> => {
        if (props.featuredProviders) return props.featuredProviders;

        try {
            return operatingMode === 'authenticated'
                ? await MyDataHelps.getFeaturedProviders(props.featuredProvidersContext)
                : await getFeaturedPublicProviders(props.publicFeaturedProvidersApiUrl, props.featuredProvidersContext);
        } catch (error) {
            console.error('Error loading featured providers.', error);
            return [];
        }
    };

    const getExternalAccounts = async (): Promise<ExternalAccount[]> => {
        try {
            return operatingMode === 'authenticated' ? await MyDataHelps.getExternalAccounts() : [];
        } catch (error) {
            console.error('Error loading external accounts.', error);
            return [];
        }
    };

    const initialize = async (): Promise<void> => {
        const [featuredProviders, externalAccounts] = await Promise.all([getFeaturedProviders(), getExternalAccounts()]);
        setFeaturedProviders(featuredProviders);
        setExternalAccounts(externalAccounts);
        setInitialized(true);
    };

    useEffect(() => {
        if (initialized) return;

        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }

        initialize();
    }, [initialized, featuredProviders, externalAccounts]);

    const reloadExternalAccounts = async (): Promise<void> => {
        setExternalAccounts(await getExternalAccounts());
    };

    useEffect(() => {
        if (props.previewState) return;
        MyDataHelps.on('applicationDidBecomeVisible', reloadExternalAccounts);
        return () => {
            MyDataHelps.off('applicationDidBecomeVisible', reloadExternalAccounts);
        };
    }, []);

    const filterProviders = (providers: ExternalAccountProvider[], providersToExclude?: ExternalAccountProvider[]): ExternalAccountProvider[] => {
        const providerIdsToExclude = providersToExclude?.map(provider => provider.id) ?? [];
        return providers.filter(provider => {
            if (providerIdsToExclude.includes(provider.id)) return false;
            if (props.providerCategories && !props.providerCategories.includes(provider.category)) return false;
            return provider.message !== 'Unavailable';
        })
    };

    const updateSearchResults = (newProviders: ExternalAccountProvider[]): void => {
        const updatedSearchResults: ExternalAccountProvider[] = [];

        if (searchString === '' && searchResults.length === 0 && featuredProviders && featuredProviders.length > 0) {
            updatedSearchResults.push(...filterProviders(featuredProviders));
        } else if (searchResults.length > 0) {
            updatedSearchResults.push(...searchResults);
        }
        updatedSearchResults.push(...filterProviders(newProviders, updatedSearchResults));

        // HACK: Temporarily default all provider enabled flags to true when they have not been set by the API.
        // This should remain while the API is not setting the enabled flag.
        // This should also remain until any hard coded featured provider lists are updated to include the enabled flag.
        updatedSearchResults.forEach(provider => {
            if (provider.enabled === undefined) {
                provider.enabled = true;
            }
        });

        setSearchResults(updatedSearchResults);
    };

    const performSearch = async (): Promise<void> => {
        setSearching(true);
        const requestID = ++currentRequestID;

        try {
            const searchCategory = props.providerCategories?.length === 1 ? props.providerCategories[0] : null;
            const providersPage = operatingMode === 'authenticated'
                ? await MyDataHelps.getExternalAccountProviders(searchString, searchCategory, pageSize, currentPage)
                : await getPublicProviders(props.publicProviderSearchApiUrl, searchString, pageSize, currentPage)

            if (requestID == currentRequestID) {
                updateSearchResults(providersPage.externalAccountProviders);
                setTotalResults(providersPage.totalExternalAccountProviders);
                setSearching(false);
            }
        } catch (error) {
            console.error('Error searching for providers.', error);
            setSearching(false);
        }
    };

    const performSearchRef = useRef(performSearch);
    useEffect(() => {
        performSearchRef.current = performSearch;
    }, [performSearch]);
    const debouncedPerformSearch = useMemo(() => debounce(() => performSearchRef.current(), 300), []);

    useEffect(() => {
        if (initialized && !props.previewState) {
            debouncedPerformSearch();
        }
    }, [initialized, searchString, currentPage]);

    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchString(event.target.value);
        setCurrentPage(0);
        setSearchResults([]);
    };

    const canConnectToProvider = (provider: ExternalAccountProvider): boolean => {
        return provider.enabled || externalAccountsById[provider.id]?.status === 'unauthorized';
    };

    const connectToProvider = async (provider: ExternalAccountProvider): Promise<void> => {
        if (props.previewState || !canConnectToProvider(provider)) return;

        await MyDataHelps.connectExternalAccount(provider.id, props.connectExternalAccountOptions ?? { openNewWindow: true });
        props.onProviderConnected?.(provider);
        reloadExternalAccounts();
    };

    const getDisabledProviderStatus = (provider: ExternalAccountProvider): string => {
        const key = provider.managingOrganization
            ? 'provider-disabled-reason-with-managing-organization'
            : 'provider-disabled-reason-without-managing-organization';

        const args = {
            provider: provider.name,
            relatedProvider: provider.relatedProvider ?? '',
            managingOrganization: provider.managingOrganization ?? ''
        };

        return language(key, undefined, args);
    };

    const shouldShowRequestProviderAction = (): boolean => {
        if (searching || props.hideRequestProviderButton) return false;
        return !props.providerCategories
            || props.providerCategories.length === 0
            || props.providerCategories.includes('Provider')
            || props.providerCategories.includes('Health Plan');
    };

    const buildRequestProviderActionTitle = (): string => {
        let titleSuffix = '';

        if (!props.providerCategories || props.providerCategories.length == 0 || props.providerCategories.includes('Provider')) {
            titleSuffix += language('external-accounts-title-providers');
        }

        if (!props.providerCategories || props.providerCategories.length == 0 || props.providerCategories.includes('Health Plan')) {
            if (titleSuffix.length > 0) {
                titleSuffix += language('external-accounts-title-divider');
            }
            titleSuffix += language('external-accounts-title-health-plans');
        }

        return `${(language('request-add'))} ${titleSuffix}`;
    };

    const requestProviderAction = (): void => {
        MyDataHelps.openEmbeddedUrl('https://help.mydatahelps.org/hc/en-us/requests/new?ticket_form_id=34288897775635');
    };

    const canLoadNextPage = (): boolean => {
        return !searching && (currentPage + 1) * pageSize < totalResults;
    };

    const loadNextPage = (): void => {
        setCurrentPage(currentPage + 1);
    };

    const externalAccountsById = (externalAccounts ?? []).reduce((linkedExternalAccounts, externalAccount) => {
        linkedExternalAccounts[externalAccount.provider.id] = externalAccount;
        return linkedExternalAccounts;
    }, {} as Record<number, ExternalAccount>);

    return (
        <div ref={props.innerRef} className="mdhui-provider-search">
            <div className="search-bar-wrapper">
                <div className="search-bar">
                    <input title={language('search')} type="text" value={searchString} onChange={updateSearch} placeholder={language('search')} spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
                    <FontAwesomeSvgIcon icon={faSearch} />
                </div>
            </div>
            <div className="search-results">
                {searchResults && searchResults.map((provider) =>
                    <UnstyledButton key={provider.id} className={canConnectToProvider(provider) ? 'provider' : 'provider disabled'} onClick={() => {
                        if (props.onProviderSelected) {
                            props.onProviderSelected(provider);
                        } else {
                            connectToProvider(provider);
                        }
                    }}>
                        <div className="provider-info">
                            <div className="provider-name">{provider.name}</div>
                            {externalAccountsById[provider.id] && externalAccountsById[provider.id].status === 'unauthorized' &&
                                <div className="provider-status error-status">{language('expired-reconnect')}</div>
                            }
                            {externalAccountsById[provider.id] && externalAccountsById[provider.id].status !== 'unauthorized' &&
                                <div className="provider-status connected-status">{language('connected')}</div>
                            }
                            {!externalAccountsById[provider.id] && !provider.enabled &&
                                <div className="provider-status connected-status">{getDisabledProviderStatus(provider)}</div>
                            }
                        </div>
                        {provider.logoUrl &&
                            <div className="provider-logo" style={{ backgroundImage: 'url(\'' + provider.logoUrl + '\')' }}></div>
                        }
                    </UnstyledButton>
                )}
                {shouldShowRequestProviderAction() &&
                    <Action onClick={requestProviderAction} title={buildRequestProviderActionTitle()} />
                }
                {searching &&
                    <LoadingIndicator />
                }
            </div>
            <OnVisibleTrigger onTrigger={loadNextPage} enabled={canLoadNextPage()}></OnVisibleTrigger>
        </div>
    );
}