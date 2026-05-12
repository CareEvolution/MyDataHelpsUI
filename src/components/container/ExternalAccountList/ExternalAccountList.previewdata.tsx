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
            "enabled": true
        } as ExternalAccountProvider
    }, {
        id: 2,
        lastRefreshDate: add(new Date(), { hours: -8 }).toISOString(),
        status: "unauthorized",
        provider:
        {
            "id": 1,
            "name": "Kaiser Permanente",
            "category": "Provider",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/1/logo",
            "enabled": true
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

export var previewExternalAccountsWithSuccessor: ExternalAccount[] =
    [{
        id: 10,
        lastRefreshDate: add(new Date(), { days: -1 }).toISOString(),
        status: "fetchComplete",
        provider:
        {
            "id": 200,
            "name": "Legacy DSTU2 Provider",
            "category": "Provider",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/200/logo",
            "enabled": true,
            "successorID": 201
        } as ExternalAccountProvider
    }, {
        id: 11,
        lastRefreshDate: add(new Date(), { hours: -8 }).toISOString(),
        status: "unauthorized",
        provider:
        {
            "id": 202,
            "name": "Legacy Unauthorized Provider",
            "category": "Provider",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/202/logo",
            "enabled": true,
            "successorID": 203
        } as ExternalAccountProvider
    }, {
        id: 12,
        lastRefreshDate: add(new Date(), { hours: -2 }).toISOString(),
        status: "fetchComplete",
        provider:
        {
            "id": 37,
            "name": "Cedars-Sinai Health System",
            "category": "Provider",
            "logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo",
            "enabled": true
        } as ExternalAccountProvider
    }];