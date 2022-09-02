import { ExternalAccount } from "@careevolution/mydatahelps-js";
import add from 'date-fns/add'

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
			"logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/37/logo"
		}
	}, {
		id: 2,
		lastRefreshDate: add(new Date(), { hours: -8 }).toISOString(),
		status: "unauthorized",
		provider:
		{
			"id": 1,
			"name": "CareEvolution FHIR",
			"category": "Provider",
			"logoUrl": "https://mdhorg.ce.dev/api/v1/delegated/externalaccountproviders/1/logo"
		}
	}];