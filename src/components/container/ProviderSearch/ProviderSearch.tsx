import React, { useEffect, useMemo, useRef, useState } from 'react'
import MyDataHelps, { ConnectExternalAccountOptions, ExternalAccount, ExternalAccountProvider } from "@careevolution/mydatahelps-js"
import { Action, LoadingIndicator, UnstyledButton } from '../../presentational';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./ProviderSearch.css"
import language from "../../../helpers/language"
import { previewProviders } from './ProviderSearch.previewdata';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger/OnVisibleTrigger';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

const UNAVAILABLE_PROVIDER_MESSAGE = "Unavailable";

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
    /** List of providers to display at the top when no search is active. */
    featuredProviders?: ExternalAccountProvider[];
}

export type ProviderSearchPreviewState = "Default" | "Searching";

let currentRequestID = 0;

/** Supports searching for Providers, and Health Plans for the purpose of connecting to participant data
 */
export default function ProviderSearch(props: ProviderSearchProps) {
    const [linkedExternalAccounts, setLinkedExternalAccounts] = useState<{ [id: number]: ExternalAccount; }>({});
    const [searchResults, setSearchResults] = useState<ExternalAccountProvider[]>([]);
    const [searching, setSearching] = useState(true);
    const [searchString, _setSearchString] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const addNewProviderUrl = "https://help.mydatahelps.org/hc/en-us/requests/new?ticket_form_id=34288897775635";

    const searchStringRef = useRef(searchString);
    const setSearchString = (data: string) => {
        searchStringRef.current = data;
        _setSearchString(data);
    };

    const pageSize = 100;

    function initialize() {
        if (props.previewState) {
            if (props.previewState == "Default") {
                updateSearchResults(previewProviders);
                setSearching(false);
            }
            return;
        }

        loadExternalAccounts().then(function () {
            performSearch("");
        });
    }

    async function loadExternalAccounts() {
        MyDataHelps.getExternalAccounts().then(function (accounts) {
            let externalAccounts: { [id: number]: ExternalAccount; } = {};
            for (let i = 0; i < accounts.length; i++) {
                externalAccounts[accounts[i].provider.id] = accounts[i];
            }
            setLinkedExternalAccounts(externalAccounts);
        });
    }

    function performSearch(search: string) {
        setSearching(true);
        let requestID = ++currentRequestID;

        if (!props.publicProviderSearchApiUrl) {
            MyDataHelps.getExternalAccountProviders(search, props.providerCategories?.length == 1 ? props.providerCategories[0] : null, pageSize, currentPage).then(function (searchResultsResponse) {
                if (requestID == currentRequestID) {
                    updateSearchResults(searchResultsResponse.externalAccountProviders);
                    setTotalResults(searchResultsResponse.totalExternalAccountProviders);
                    setSearching(false);
                }
            }).catch(function (error) {
                console.error("Error fetching external account providers", error);
                setSearching(false);
            });
        }
        else {
            const url = new URL(props.publicProviderSearchApiUrl);
            url.searchParams.append('keyword', search);
            url.searchParams.append('pageSize', String(pageSize));
            url.searchParams.append('pageNumber', String(currentPage + 1));
            fetch(url.toString(), {
                method: "GET",
                headers: { "Accept": "application/json" },
            })
                .then((response) => response.json())
                .then(function (searchResultsResponse) {
                    if (requestID == currentRequestID) {
                        updateSearchResults(searchResultsResponse.Providers.map((p: any) => ({ id: p.ID, name: p.OrganizationName, logoUrl: p.LogoURL, category: p.Category } as ExternalAccountProvider)) || []);
                        setTotalResults(searchResultsResponse.TotalCount);
                        setSearching(false);
                    }
                }).catch(function (error) {
                    console.error("Error fetching external account providers", error);
                    setSearching(false);
                });
        }
    }

    function updateSearchResults(providers: ExternalAccountProvider[]) {
        let newResults: ExternalAccountProvider[] = searchResults;
        if (searchStringRef.current === "" && props.featuredProviders) {
            newResults = newResults.concat(props.featuredProviders);
            providers = providers.filter(a => !props.featuredProviders!.find(b => b.id == a.id));
        }
        setSearchResults(newResults.concat(providers).filter(a => props.providerCategories?.indexOf(a.category) != -1 && a.message !== UNAVAILABLE_PROVIDER_MESSAGE));
    }

    const debounce = (fn: Function, ms = 300) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), ms);
        };
    };

    const debouncedPerformSearch = useMemo(() => debounce(performSearch, 300), []);

    function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchString(event.target.value);
        setSearchResults([]);
        setCurrentPage(0);
        if (props.previewState) {
            return;
        }
        debouncedPerformSearch(event.target.value);
    }

    function connectToProvider(provider: ExternalAccountProvider) {
        const providerID = provider.id;
        if (provider.enabled && !props.previewState && !(linkedExternalAccounts[providerID] && linkedExternalAccounts[providerID].status != 'unauthorized')) {
            MyDataHelps.connectExternalAccount(providerID, props.connectExternalAccountOptions || { openNewWindow: true })
                .then(function () {
                    if (props.onProviderConnected) {
                        props.onProviderConnected(provider);
                    }

                    return loadExternalAccounts();
                });
        }
    }

    function onApplicationDidBecomeVisible() {
        loadExternalAccounts().then(function () {
            performSearch(searchStringRef.current);
        });
    }

    function canLoadNextPage() {
        return pageSize > 0 && (currentPage + 1) * pageSize < totalResults;
    }

    function loadNextPage() {
        setCurrentPage(currentPage + 1);
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", onApplicationDidBecomeVisible);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", onApplicationDidBecomeVisible);
        }
    }, []);

    useEffect(() => {
        if (!searching) {
            performSearch(searchStringRef.current)
        }
    }, [currentPage]);

    const supportsRequestProviderAction = (): boolean => {
        return !props.providerCategories
            || props.providerCategories.length == 0
            || props.providerCategories.includes("Provider")
            || props.providerCategories.includes("Health Plan");
    };

    const shouldShowRequestProviderAction = (): boolean => {
        return !searching && !props.hideRequestProviderButton && supportsRequestProviderAction();
    };

    const buildRequestProviderActionTitle = (): string => {
        let titleSuffix = "";

        if (!props.providerCategories || props.providerCategories.length == 0 || props.providerCategories.includes("Provider")) {
            titleSuffix += language('external-accounts-title-providers');
        }

        if (!props.providerCategories || props.providerCategories.length == 0 || props.providerCategories.includes("Health Plan")) {
            if (titleSuffix.length > 0) {
                titleSuffix += language('external-accounts-title-divider');
            }
            titleSuffix += language('external-accounts-title-health-plans');
        }

        return `${(language("request-add"))} ${titleSuffix}`;
    };

    const requestProviderAction = (): void => {
        MyDataHelps.openEmbeddedUrl(addNewProviderUrl);
    };

    return (
        <div ref={props.innerRef} className="mdhui-provider-search">
            <div className="search-bar-wrapper">
                <div className="search-bar">
                    <input title={language("search")} type="text" value={searchString} onChange={(event) => updateSearch(event)} placeholder={language("search")} spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
                    <FontAwesomeSvgIcon icon={faSearch} />
                </div>
            </div>
            <div className="search-results">
                {searchResults && searchResults.map((provider) =>
                    <UnstyledButton key={provider.id} className={provider.enabled ? 'provider' : 'provider disabled'} onClick={() => {
                        if (props.onProviderSelected) {
                            props.onProviderSelected(provider);
                        } else {
                            connectToProvider(provider);
                        }
                    }}>
                        <div className="provider-info">
                            <div className="provider-name">{provider.name}</div>
                            {linkedExternalAccounts[provider.id] && linkedExternalAccounts[provider.id].status == 'unauthorized' &&
                                <div className="provider-status error-status">{language("expired-reconnect")}</div>
                            }
                            {linkedExternalAccounts[provider.id] && linkedExternalAccounts[provider.id].status != 'unauthorized' &&
                                <div className="provider-status connected-status">{language("connected")}</div>
                            }
                            {!linkedExternalAccounts[provider.id] && !provider.enabled &&
                                <div className="provider-status connected-status">
                                    {(() => {
                                        const params: { provider: string; relatedProvider?: string; managingOrganization?: string } = {
                                            "provider": provider.name
                                        };
                                        if (provider.relatedProvider) {
                                            params.relatedProvider = provider.relatedProvider;
                                        }
                                        if (provider.managingOrganization) {
                                            params.managingOrganization = provider.managingOrganization;
                                        }
                                        const key = provider.managingOrganization 
                                            ? "provider-disabled-reason-with-managing-organization" 
                                            : "provider-disabled-reason-without-managing-organization";
                                        
                                        return language(key, undefined, params);
                                    })()}
                                </div>
                            }
                        </div>
                        {provider.logoUrl &&
                            <div className="provider-logo" style={{ backgroundImage: "url('" + provider.logoUrl + "')" }}></div>
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