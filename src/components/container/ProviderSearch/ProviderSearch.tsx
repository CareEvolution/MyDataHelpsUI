import React, { useEffect, useMemo, useRef, useState } from 'react';
import MyDataHelps, { ConnectExternalAccountOptions, ExternalAccount, ExternalAccountProvider } from '@careevolution/mydatahelps-js';
import { Action, LoadingIndicator, UnstyledButton } from '../../presentational';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './ProviderSearch.css';
import language from '../../../helpers/language';
import { previewProviders } from './ProviderSearch.previewdata';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger/OnVisibleTrigger';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { getFeaturedPublicProviders, getPublicProviders } from '../../../helpers/public-providers';
import debounce from 'lodash/debounce';

export interface ProviderSearchProps {
    previewState?: ProviderSearchPreviewState;
    providerCategories?: string[];
    /** Callback function triggered when a provider is selected. If this function is defined it will override the normal action taken when selecting provider.*/
    onProviderSelected?: (provider: ExternalAccountProvider) => void;
    /** Callback function triggered after a provider is connected. */
    onProviderConnected?: (provider: ExternalAccountProvider) => void;
    innerRef?: React.Ref<HTMLDivElement>;
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
    /** List of connected external accounts.  If populated, disables the dynamic external account lookup. */
    externalAccounts?: ExternalAccount[];
}

export type ProviderSearchPreviewState = 'Default' | 'Searching';

let currentRequestID = 0;

/** Supports searching for Providers, and Health Plans for the purpose of connecting to participant data
 */
export default function ProviderSearch(props: ProviderSearchProps) {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [featuredProviders, setFeaturedProviders] = useState<ExternalAccountProvider[] | undefined>(props.featuredProviders);
    const [externalAccounts, setExternalAccounts] = useState<ExternalAccount[] | undefined>(props.externalAccounts);
    const [searchResults, setSearchResults] = useState<ExternalAccountProvider[]>([]);
    const [searching, setSearching] = useState(true);
    const [searchString, setSearchString] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const pageSize = 100;

    const applyPreviewState = (): void => {
        if (props.previewState === 'Default') {
            updateSearchResults(previewProviders);
            setSearching(false);
        }
    };

    const loadFeaturedProviders = async (): Promise<void> => {
        const featuredProviders = props.publicFeaturedProvidersApiUrl
            ? await getFeaturedPublicProviders(props.publicFeaturedProvidersApiUrl, props.featuredProvidersContext)
            : await MyDataHelps.getFeaturedProviders(props.featuredProvidersContext);

        setFeaturedProviders(featuredProviders.sort((a, b) => a.name.localeCompare(b.name)));
    };

    const loadExternalAccounts = async (): Promise<void> => {
        setExternalAccounts(await MyDataHelps.getExternalAccounts());
    };

    useEffect(() => {
        if (props.previewState) {
            applyPreviewState();
            return;
        }

        if (!featuredProviders) {
            loadFeaturedProviders();
        }

        if (!externalAccounts) {
            loadExternalAccounts();
        }

        if (featuredProviders && externalAccounts) {
            setInitialized(true);
        }
    }, [props.previewState, featuredProviders, externalAccounts]);

    const reloadExternalAccountsIfNecessary = (): void => {
        if (props.externalAccounts) return;
        loadExternalAccounts();
    };

    const onApplicationDidBecomeVisible = (): void => {
        reloadExternalAccountsIfNecessary();
    };

    useEffect(() => {
        MyDataHelps.on('applicationDidBecomeVisible', onApplicationDidBecomeVisible);
        return () => {
            MyDataHelps.off('applicationDidBecomeVisible', onApplicationDidBecomeVisible);
        }
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

        if (searchString === '' && searchResults.length === 0 && featuredProviders!.length > 0) {
            updatedSearchResults.push(...filterProviders(featuredProviders!));
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
            const providersPage = props.publicProviderSearchApiUrl
                ? await getPublicProviders(props.publicProviderSearchApiUrl, searchString, pageSize, currentPage)
                : await MyDataHelps.getExternalAccountProviders(searchString, props.providerCategories?.length === 1 ? props.providerCategories[0] : null, pageSize, currentPage);

            if (requestID == currentRequestID) {
                updateSearchResults(providersPage.externalAccountProviders);
                setTotalResults(providersPage.totalExternalAccountProviders);
                setSearching(false);
            }
        } catch (error) {
            console.error('Error fetching external account providers', error);
            setSearching(false);
        }
    };

    const performSearchRef = useRef(performSearch);
    useEffect(() => {
        performSearchRef.current = performSearch;
    }, [performSearch]);
    const debouncedPerformSearch = useMemo(() => debounce(() => performSearchRef.current(), 300), []);

    useEffect(() => {
        if (initialized) {
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

        await MyDataHelps.connectExternalAccount(provider.id, props.connectExternalAccountOptions || { openNewWindow: true });
        props.onProviderConnected?.(provider);
        reloadExternalAccountsIfNecessary();
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
                            {externalAccountsById[provider.id] && externalAccountsById[provider.id].status == 'unauthorized' &&
                                <div className="provider-status error-status">{language('expired-reconnect')}</div>
                            }
                            {externalAccountsById[provider.id] && externalAccountsById[provider.id].status != 'unauthorized' &&
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