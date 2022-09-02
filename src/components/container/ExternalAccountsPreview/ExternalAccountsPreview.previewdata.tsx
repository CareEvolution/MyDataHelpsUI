import { ExternalAccount } from "@careevolution/mydatahelps-js";
import add from 'date-fns/add'

export var previewAccounts: ExternalAccount[] =
	[
		{
			id: 1,
			lastRefreshDate: add(new Date(), { days: -1 }).toISOString(),
			provider:
			{
				"id": 37,
				"name": "Cedars-Sinai Health System",
				"category": "Provider",
				"logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
			},
			status: "fetchComplete"
		},
		{
			id: 2,
			lastRefreshDate: add(new Date(), { days: -4 }).toISOString(),
			provider:
			{
				"id": 20,
				"name": "Anthem",
				"category": "Provider",
				"logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
			},
			status: "fetchComplete"
		}
	];
