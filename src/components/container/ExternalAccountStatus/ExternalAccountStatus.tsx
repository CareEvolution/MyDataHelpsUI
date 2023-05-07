import React from "react";
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js";
import { add, isAfter } from "date-fns";
import { parseISO } from "date-fns/esm";
import { useEffect, useState } from "react";
import { useInterval } from "../../../hooks";
import { Action } from "../../presentational";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faExclamationTriangle, faRefresh } from "@fortawesome/free-solid-svg-icons";

export interface ExternalAccountStatusProps {
    previewState?: "externalAccountsFetchingData" | "externalAccountsRequireAttention" | "externalAccountsLoaded"
    externalAccountCategories?: string[];
    onClick(): void;
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

export default function (props: ExternalAccountStatusProps) {
    let [isWeb, setIsWeb] = useState<boolean>(false);
    let [externalAccounts, setExternalAccounts] = useState<ExternalAccount[]>([]);

    function refresh() {
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
        MyDataHelps.getDeviceInfo().then(function (deviceInfo) {
            setIsWeb(deviceInfo.platform == "Web");
        }).catch(function () {
            setIsWeb(true);
        }).finally(function () {
            refresh();
        });

        if (props.previewState == "externalAccountsFetchingData") {
            previewStateAccounts[0].status = "fetchingData";
            setExternalAccounts(previewStateAccounts);
            return;
        }
        if (props.previewState == "externalAccountsRequireAttention") {
            previewStateAccounts[0].status = "unauthorized";
            setExternalAccounts(previewStateAccounts);
            return;
        }
        if (props.previewState == "externalAccountsLoaded") {
            previewStateAccounts[0].status = "fetchComplete";
            setExternalAccounts(previewStateAccounts);
            return;
        }
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
    let anyErroredAccounts = !!externalAccounts.find(e => e.status == "error" || e.status == "unauthorized");
    useInterval(() => {
        refresh();
    }, (isWeb && anyRefreshingAccounts) ? 5000 : null);

    console.log(externalAccounts);
    if (!anyRefreshingAccounts && !anyErroredAccounts) return null;

    return <Action bottomBorder subtitle={anyRefreshingAccounts ? "Retrieving data..." : "One of your accounts requires attention"} onClick={() => props.onClick()}
        icon={anyRefreshingAccounts ? <FontAwesomeSvgIcon color="var(--mdhui-text-color-4)" icon={faRefresh} spin /> : <FontAwesomeSvgIcon color="var(--mdhui-color-danger)" icon={faExclamationTriangle} />}>
    </Action>
}