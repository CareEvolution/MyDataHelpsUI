import MyDataHelps, { ExternalAccount } from "@careevolution/mydatahelps-js";
import React, { useState } from "react";
import language from "../../../helpers/language";
import { Action } from "../../presentational";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useInitializeView } from "../../../helpers/Initialization";

export interface ExternalAccountConnectionAlertProps {
    previewState?: "externalAccountWithIssue" | "externalAccountNoIssue"
    onClick(): void
    text?: string
    externalAccountCategories?: string[];
    innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: ExternalAccountConnectionAlertProps) {
    let [externalAccounts, setExternalAccounts] = useState<ExternalAccount[]>([]);

    useInitializeView(() => {
        if (props.previewState === 'externalAccountNoIssue') {
            setExternalAccounts([{
                id: 1,
                provider: {
                    id: 1,
                    name: "Provider",
                    category: "Provider",
                    logoUrl: ""
                },
                status: "fetchingData",
                lastRefreshDate: new Date().toISOString(),
            }]);
            return;
        }
        if (props.previewState === 'externalAccountWithIssue') {
            setExternalAccounts([{
                id: 1,
                provider: {
                    id: 1,
                    name: "Provider",
                    category: "Provider",
                    logoUrl: ""
                },
                status: "unauthorized",
                lastRefreshDate: new Date().toISOString(),
            }]);
            return;
        }

        MyDataHelps.getExternalAccounts().then((accounts) => {
            setExternalAccounts(accounts);
        });
    }, ['externalAccountSyncComplete'], [props.previewState])

    if (!externalAccounts
        .filter(a => props.externalAccountCategories?.indexOf(a.provider.category) != -1)
        .some(s => s.status == "unauthorized" || s.status == "error")) {
        return null;
    }

    return <Action bottomBorder
        icon={<FontAwesomeSvgIcon color="var(--mdhui-color-danger)" icon={faTriangleExclamation} />}
        subtitle={language("connect-ehr-needs-attention")}
        onClick={props.onClick} />
}