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

export interface ProviderSearchProps {
    previewState?: ProviderSearchPreviewState;
    providerCategories?: string[];
    onProviderSelected?: (provider: ExternalAccountProvider) => void;
    onProviderConnected?: (provider: ExternalAccountProvider) => void;
    innerRef?: React.Ref<HTMLDivElement>;
    connectExternalAccountOptions?: ConnectExternalAccountOptions;
    hideRequestProviderButton?: boolean;
    publicProviderSearchApiUrl?: string;
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
    const addNewProviderUrl = "https://support.mydatahelps.org/hc/en-us/requests/new?ticket_form_id=34288897775635";

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
            });
        }
        else {
            fetch(`${props.publicProviderSearchApiUrl}?keyword=${search}&pageSize=${pageSize}&pageNumber=${currentPage}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            })
                .then((response) => response.json())
                .then(function (searchResultsResponse) {
                    if (requestID == currentRequestID) {
                        updateSearchResults(searchResultsResponse.Providers.map((p: any) => ({ id: p.ID, name: p.OrganizationName, logoUrl: p.LogoURL, category: p.Category } as ExternalAccountProvider)) || []);
                        setTotalResults(searchResultsResponse.TotalCount);
                        setSearching(false);
                    }
                });
        }
    }

    function updateSearchResults(providers: ExternalAccountProvider[]) {
        setSearchResults(searchResults.concat(providers.filter(a => props.providerCategories?.indexOf(a.category) != -1)));
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
        if (!props.previewState && !(linkedExternalAccounts[providerID] && linkedExternalAccounts[providerID].status != 'unauthorized')) {
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

    function buildActionTitle() {
        let title = language("request-add");

        if (!props.providerCategories || props.providerCategories.length == 0) {
            return `${title} ${language('external-accounts-title-providers')} ${language('external-accounts-title-divider')} ${language('external-accounts-title-health-plans')}`;
        }

        if (props.providerCategories.length == 1 && props.providerCategories[0] === "Provider") {
            return `${title} ${language('external-accounts-title-providers')}`;
        }

        if (props.providerCategories.length == 1 && props.providerCategories[0] === "Health Plan") {
            return `${title} ${language('external-accounts-title-health-plans')}`;
        }
    }

    const requestProviderAction = () => {
        MyDataHelps.openEmbeddedUrl(addNewProviderUrl);
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
                    <UnstyledButton key={provider.id} className="provider" onClick={() => {
                        if (props.onProviderSelected) {
                            props.onProviderSelected(provider);
                        } else {
                            connectToProvider(provider);
                        }
                    }}>
                        {provider.logoUrl &&
                            <div className="provider-logo" style={{ backgroundImage: "url('" + provider.logoUrl + "')" }}></div>
                        }
                        <div className="provider-info">
                            <div className="provider-name">{provider.name}</div>
                            {linkedExternalAccounts[provider.id] && linkedExternalAccounts[provider.id].status == 'unauthorized' &&
                                <div className="provider-status error-status">{language("expired-reconnect")}</div>
                            }
                            {linkedExternalAccounts[provider.id] && linkedExternalAccounts[provider.id].status != 'unauthorized' &&
                                <div className="provider-status connected-status">{language("connected")}</div>
                            }
                        </div>
                    </UnstyledButton>
                )}
                {!searching &&
                    !props.hideRequestProviderButton &&
                    <Action onClick={requestProviderAction} title={buildActionTitle()} />}
                {searching &&
                    <LoadingIndicator />
                }
            </div>
            <OnVisibleTrigger onTrigger={loadNextPage} enabled={canLoadNextPage()}></OnVisibleTrigger>
        </div>
    );
}