import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyDataHelps, { ExternalAccount, ExternalAccountProvider } from "@careevolution/mydatahelps-js"
import { LoadingIndicator } from '../../presentational';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./ProviderSearch.css"
import language from "../../../helpers/language"
import { previewProviders } from './ProviderSearch.previewdata';
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import InfiniteScroller from '../../presentational/InfiniteScroller/InfiniteScroller';

export interface ProviderSearchProps {
	previewState?: ProviderSearchPreviewState;
	providerCategories?: string[];
	pageSize: number;
}

export type ProviderSearchPreviewState = "Default"

let currentRequestID = 0;

export default function (props: ProviderSearchProps) {
	const [linkedExternalAccounts, setLinkedExternalAccounts] = useState<{ [id: number]: ExternalAccount; }>({});
	const [searchResults, setSearchResults] = useState<ExternalAccountProvider[]>([]);
	const [searching, setSearching] = useState(true);
	const [searchString, _setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [totalResults, setTotalResults] = useState(0);

	const searchStringRef = useRef(searchString);
	const setSearchString = (data: string) => {
		searchStringRef.current = data;
		_setSearchString(data);
	};

	function initialize() {
		if (props.previewState == "Default") {
			setSearchResults(previewProviders);
			setSearching(false);
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

		MyDataHelps.getExternalAccountProviders(search, null, props.pageSize, currentPage).then(function (searchResultsResponse) {
			if (requestID == currentRequestID) {
				if (props.pageSize === 0) {
					// @ts-ignore
					setSearchResults(searchResultsResponse.filter(a => props.providerCategories?.indexOf(a.category) != -1));
				}
				else {
					var newResults = searchResults.concat(searchResultsResponse.externalAccountProviders.filter(a => props.providerCategories?.indexOf(a.category) != -1));
					setSearchResults(newResults);
					setTotalResults(searchResultsResponse.totalExternalAccountProviders);
				}
				setSearching(false);
			}
		});
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

	function connectToProvider(providerID: number) {
		if (!(linkedExternalAccounts[providerID] && linkedExternalAccounts[providerID].status != 'unauthorized')) {
			MyDataHelps.connectExternalAccount(providerID);
		}
	}

	function onApplicationDidBecomeVisible() {
		loadExternalAccounts().then(function () {
			performSearch(searchStringRef.current);
		});
	}

	function canLoadNextPage() {
		return props.pageSize > 0 && (currentPage + 1) * props.pageSize < totalResults;
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

	return (
		<div className="mdhui-provider-search">
			<div className="search-bar-wrapper">
				<div className="search-bar">
					<input type="text" value={searchString} onChange={(event) => updateSearch(event)} placeholder={language["search"]} spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
					<FontAwesomeIcon icon={faSearch} />
				</div>
			</div>
			<div className="search-results">
				{searchResults && searchResults.map((provider) =>
					<div key={provider.id} className="provider" onClick={() => connectToProvider(provider.id)}>
						{provider.logoUrl &&
							<div className="provider-logo" style={{ backgroundImage: "url('" + provider.logoUrl + "')" }}></div>
						}
						<div className="provider-info">
							<div className="provider-name">{provider.name}</div>
							{linkedExternalAccounts[provider.id] && linkedExternalAccounts[provider.id].status == 'unauthorized' &&
								<div className="provider-status error-status">{language["reconnect"]}</div>
							}
							{linkedExternalAccounts[provider.id] && linkedExternalAccounts[provider.id].status != 'unauthorized' &&
								<div className="provider-status connected-status">{language["connected"]}</div>
							}
						</div>
					</div>
				)}
				{searching &&
					<LoadingIndicator />
				}
			</div>
			<InfiniteScroller onTrigger={loadNextPage} enabled={canLoadNextPage()}></InfiniteScroller>
		</div>
	);
}