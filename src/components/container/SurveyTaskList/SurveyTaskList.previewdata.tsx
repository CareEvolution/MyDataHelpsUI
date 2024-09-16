import { SurveyTask } from "@careevolution/mydatahelps-js";

import add from 'date-fns/add'

export var previewIncompleteTasks: SurveyTask[] =
	[
		{
			"id": "ecf8a7df-caa3-ec11-aaab-f47bb6835a10",
			"surveyID": "53ad3e98-9777-ec11-aaa8-89aad5fbf200",
			"surveyName": "Mood Survey",
			"surveyDisplayName": "Mood Survey",
			"surveyDescription": "3 minutes",
			"status": "incomplete",
			"hasSavedProgress": false,
			"dueDate": add(new Date(), { days: -1 }).toISOString(),
			"insertedDate": "2022-03-14T19:13:48.283Z",
			"modifiedDate": "2022-03-14T19:13:48.283Z",
			linkIdentifier: "1"
		},
		{
			"id": "e7f8a7df-caa3-ec11-aaab-f47bb6835a10",
			"surveyID": "53ad3e98-9777-ec11-aaa8-89aad5fbf200",
			"surveyName": "Pregnancy (Followup)",
			"surveyDisplayName": "Pregnancy: Followup",
			"surveyDescription": "3 minutes",
			"status": "incomplete",
			"hasSavedProgress": true,
			"dueDate": add(new Date(), { days: 0 }).toISOString(),
			"insertedDate": "2022-03-14T19:13:48.283Z",
			"modifiedDate": "2022-03-14T19:13:48.283Z",
			linkIdentifier: "1"
		},
		{
			"id": "2c9ab4d9-80a4-ec11-aaab-f47bb6835a11",
			"surveyID": "a7f58ba8-9777-ec11-aaa8-89aad5fbf200",
			"surveyName": "Rating: CheckIn",
			"surveyDisplayName": "Let us know how we're doing",
			"surveyDescription": "10 minutes",
			"status": "incomplete",
			"hasSavedProgress": false,
			"dueDate": null,
			"insertedDate": "2022-03-15T16:56:26.703Z",
			"modifiedDate": "2022-03-15T16:56:26.703Z",
			linkIdentifier: "1"
		},
		{
			"id": "b1c9bcd2-80a4-ec11-aaab-f47bb6835a10",
			"surveyID": "cd452353-7674-ec11-aaa8-89aad5fbf200",
			"surveyName": "Alcohol and Tobacco",
			"surveyDisplayName": "Alcohol and Tobacco",
			"surveyDescription": "5 minutes",
			"status": "incomplete",
			"hasSavedProgress": false,
			"dueDate": add(new Date(), { days: 1 }).toISOString(),
			"insertedDate": "2022-03-15T16:56:15.007Z",
			"modifiedDate": "2022-03-15T16:56:15.007Z",
			linkIdentifier: "1"
		},
		{
			"id": "2c9ab4d9-80a4-ec11-aaab-f47bb6835a10",
			"surveyID": "a7f58ba8-9777-ec11-aaa8-89aad5fbf200",
			"surveyName": "SDOH: Followup",
			"surveyDisplayName": "Social Determinants of Health: Followup",
			"surveyDescription": "5 minutes",
			"status": "incomplete",
			"hasSavedProgress": false,
			"dueDate": add(new Date(), { days: 10 }).toISOString(),
			"insertedDate": "2022-03-15T16:56:26.703Z",
			"modifiedDate": "2022-03-15T16:56:26.703Z",
			linkIdentifier: "1"
		},
		{
			"id": "2c9ab4d9-80a4-ec11-aaab-f47bb6835a12",
			"surveyID": "a7f58ba8-9777-ec11-aaa8-89aad5fbf200",
			"surveyName": "Rating2: CheckIn",
			"surveyDisplayName": "Rate Later",
			"surveyDescription": "10 minutes",
			"status": "incomplete",
			"hasSavedProgress": false,
			"dueDate": add(new Date(), { years: 10 }).toISOString(),
			"insertedDate": "2022-03-15T16:56:26.703Z",
			"modifiedDate": "2022-03-15T16:56:26.703Z",
			linkIdentifier: "1"
		},
	];

export var previewCompleteTasks:SurveyTask[] = [
	{
		"id": "2c9ab4d9-80a4-ec11-aaab-f47bb6835a10",
		"surveyID": "a7f58ba8-9777-ec11-aaa8-89aad5fbf200",
		"surveyName": "SDOH: Followup",
		"surveyDisplayName": "Social Determinants of Health: Followup",
		"surveyDescription": "5 minutes",
		"status": "complete",
		"endDate": new Date().toISOString(),
		"hasSavedProgress": false,
		"dueDate": add(new Date(), { days: 10 }).toISOString(),
		"insertedDate": "2022-03-15T16:56:26.703Z",
		"modifiedDate": "2022-03-15T16:56:26.703Z",
		linkIdentifier: "1"
	},
	{
		"id": "b1c9bcd2-80a4-ec11-aaab-f47bb6835a10",
		"surveyID": "cd452353-7674-ec11-aaa8-89aad5fbf200",
		"surveyName": "Alcohol and Tobacco",
		"surveyDisplayName": "Alcohol and Tobacco",
		"surveyDescription": "5 minutes",
		"status": "complete",
		"hasSavedProgress": false,
		"endDate": add(new Date(), { days: -1 }).toISOString(),
		"dueDate": add(new Date(), { days: 10 }).toISOString(),
		"insertedDate": "2022-03-15T16:56:15.007Z",
		"modifiedDate": "2022-03-15T16:56:15.007Z",
		linkIdentifier: "1"
	},
	{
		"id": "e7f8a7df-caa3-ec11-aaab-f47bb6835a10",
		"surveyID": "53ad3e98-9777-ec11-aaa8-89aad5fbf200",
		"surveyName": "Pregnancy (Followup)",
		"surveyDisplayName": "Pregnancy: Followup",
		"surveyDescription": "3 minutes",
		"status": "complete",
		"hasSavedProgress": false,
		"endDate": add(new Date(), { days: -2 }).toISOString(),
		"dueDate": add(new Date(), { days: 10 }).toISOString(),
		"insertedDate": "2022-03-14T19:13:48.283Z",
		"modifiedDate": "2022-03-14T19:13:48.283Z",
		linkIdentifier: "1"
	}
];