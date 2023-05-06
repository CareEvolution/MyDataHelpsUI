import React from "react";
import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js";
import { add, isAfter } from "date-fns";
import { parseISO } from "date-fns/esm";
import { useEffect, useState } from "react";
import "../../hw.css";
import { useInterval } from "../../../hooks";

export default function () {
    let [externalAccounts, setExternalAccounts] = useState<ExternalAccount[]>([]);

    function initialize() {
        MyDataHelps.getExternalAccounts().then(function (accounts) {
            accounts.forEach(account => {
                if (account.status == 'fetchComplete' && isAfter(new Date(), add(parseISO(account.lastRefreshDate), { hours: 3 }))) {
                    MyDataHelps.refreshExternalAccount(account.id);
                    account.status = 'fetchingData';
                }
            });
            setExternalAccounts(accounts);
        });
    }

    useEffect(function () {
        initialize();
        
        MyDataHelps.on("externalAccountSyncComplete", initialize);
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", initialize);
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
        }
    });

    let anyRefreshingAccounts = externalAccounts.find(e => e.status == "fetchingData");

    useInterval(() => {
        initialize();
    }, anyRefreshingAccounts ? 3000 : null);

    return <div className="wrapper">
        {anyRefreshingAccounts &&
            <div className="health-profile-section" style={{ paddingRight: "16px", cursor: "default" }}>
                <div className="external-accounts-status">
                    <i className="fa fa-refresh fa-spin"></i>
                    <span>&nbsp;Retrieving data...</span>
                </div>
            </div>
        }
        {externalAccounts.find(e => e.status == "error" || e.status == "unauthorized") &&
            <div className="health-profile-section" onClick={() => MyDataHelps.openApplication(new URL("/external-accounts/", document.location as any).href)}>
                <div className="external-accounts-status error-status">
                    <i className="fa fa-exclamation-circle"></i>
                    <span>&nbsp;One of your accounts requires attention</span>
                </div>
                <i className="fa fa-chevron-right"></i>
            </div>
        }
    </div>;
}