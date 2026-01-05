import { ExternalAccount, ExternalAccountProvider } from "@careevolution/mydatahelps-js";
import { add } from 'date-fns';

export var previewExternalAccounts: ExternalAccount[] =
    [{
        id: 1,
        lastRefreshDate: add(new Date(), { days: -1 }).toISOString(),
        status: "fetchComplete",
        provider:
        {
            "id": 37,
            "name": "Cedars-Sinai Health System",
            "category": "Provider",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo",
            "enabled": true,
            "successorID": 99
        } as ExternalAccountProvider
    }, {
        id: 2,
        lastRefreshDate: add(new Date(), { hours: -8 }).toISOString(),
        status: "unauthorized",
        provider:
        {
            "id": 1,
            "name": "CareEVolution",
            "category": "Provider",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/1/logo",
            "enabled": true,
            "successorID": 1
        } as ExternalAccountProvider
    }, {
        id: 3,
        lastRefreshDate: add(new Date(), { hours: -2 }).toISOString(),
        status: "fetchComplete",
        provider:
        {
            "id": 17,
            "name": "Medicare / CMS",
            "category": "Health Plan",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/17/logo",
            "enabled": true
        } as ExternalAccountProvider
    }, {
        id: 4,
        lastRefreshDate: add(new Date(), { hours: -3 }).toISOString(),
        status: "fetchComplete",
        provider:
        {
            "id": 2,
            "name": "Fitbit",
            "category": "Device Manufacturer",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/2/logo",
            "enabled": true
        } as ExternalAccountProvider
    }];