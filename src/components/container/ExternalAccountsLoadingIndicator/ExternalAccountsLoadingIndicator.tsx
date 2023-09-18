import React from "react";
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js";
import { add, isAfter } from "date-fns";
import { parseISO } from "date-fns/esm";
import { useEffect, useState } from "react";
import { useInterval } from "../../../hooks";
import { LoadingIndicator } from "../../presentational";
import "./ExternalAccountsLoadingIndicator.css"
import language from "../../../helpers/language";

export interface ExternalAccountsLoadingIndicatorProps {
    previewState?: "externalAccountsFetchingData" | "externalAccountsLoaded"
    externalAccountCategories?: string[];
	innerRef?: React.Ref<HTMLDivElement>
}

let previewStateAccounts: ExternalAccount[] = [{
    id: 1,
    lastRefreshDate: add(new Date(), { days: -1 }).toISOString(),
    status: "fetchingData",
    provider:
    {
        "id": 37,
        "name": "Cedars-Sinai Health System",
        "category": "Provider",
        "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
    }
}];

export default function (props: ExternalAccountsLoadingIndicatorProps) {
    let [isWeb, setIsWeb] = useState<boolean>(false);
    let [externalAccounts, setExternalAccounts] = useState<ExternalAccount[]>([]);

    function refresh() {
        if (props.previewState == "externalAccountsFetchingData") {
            previewStateAccounts[0].status = "fetchingData";
            setExternalAccounts(previewStateAccounts);
            return;
        }
        if (props.previewState == "externalAccountsLoaded") {
            previewStateAccounts[0].status = "fetchComplete";
            setExternalAccounts(previewStateAccounts);
            return;
        }

        MyDataHelps.getExternalAccounts().then(function (accounts) {
            if (!!props.externalAccountCategories) {
                accounts = accounts.filter(account => props.externalAccountCategories!.includes(account.provider.category));
            }
            accounts.forEach(account => {
                if (account.status == 'fetchComplete' && isAfter(new Date(), add(parseISO(account.lastRefreshDate), { hours: 3 }))) {
                    MyDataHelps.refreshExternalAccount(account.id);
                    account.status = 'fetchingData';
                }
            });
            setExternalAccounts(accounts);
        });
    }

    function initialize() {
        if (props.previewState) {
            setIsWeb(true);
            refresh();
            return;
        }
        MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
            setIsWeb(deviceInfo.platform == "Web");
        }).catch(function () {
            setIsWeb(true);
        }).finally(function () {
            refresh();
        });
    }

    useEffect(function () {
        initialize();

        MyDataHelps.on("externalAccountSyncComplete", refresh);
        MyDataHelps.on("applicationDidBecomeVisible", refresh);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", refresh);
            MyDataHelps.off("applicationDidBecomeVisible", refresh);
        }
    }, []);

    let anyRefreshingAccounts = !!externalAccounts.find(e => e.status == "fetchingData");
    useInterval(() => {
        refresh();
    }, (isWeb && anyRefreshingAccounts) ? 5000 : null);

    if (!anyRefreshingAccounts) return null;

    return <div ref={props.innerRef} className="mdhui-external-accounts-loading-indicator">
        <LoadingIndicator variant="inline" />
        <span className="mdhui-external-accounts-loading-indicator-message">{language("external-account-fetching-data")}</span>
    </div>
}