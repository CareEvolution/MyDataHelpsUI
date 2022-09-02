import { Notification } from "@careevolution/mydatahelps-js";
import add from 'date-fns/add'

export var previewNotifications: Notification[] =
	[{
		"id": "1",
		"identifier": "SurveyReminder",
		"sentDate": (new Date()).toISOString(),
		"statusCode": "Succeeded",
		"type": "Push",
		"content": {
			"body": "Thank you for completing your surveys!"
		},
		recipients: [],
		contentVersion: 1
	}, {
		"id": "2",
		"identifier": "SurveyReminder",
		"sentDate": add(new Date(), { hours: -1 }).toISOString(),
		"statusCode": "Succeeded",
		"type": "Push",
		"content": {
			"title": "Please Complete Your Surveys",
			"body": "Your latest surveys are due"
		},
		recipients: [],
		contentVersion: 1
	}, {
		"id": "4",
		"identifier": "SurveyReminder",
		"sentDate": add(new Date(), { days: -1 }).toISOString(),
		"statusCode": "Succeeded",
		"type": "Push",
		"content": {
			"title": "Have you received your Fitbit? Connect it!"
		},
		recipients: [],
		contentVersion: 1
	}, {
		"id": "5",
		"identifier": "SurveyReminder",
		"sentDate": add(new Date(), { days: -2 }).toISOString(),
		"statusCode": "Succeeded",
		"type": "Push",
		"content": {
			"title": "Consent and get a Fitbit",
			"body": "Are you missing out on a Fitbit device? Complete your consent - you could get a new Fitbit at no cost to you!"
		},
		recipients: [],
		contentVersion: 1
	}];
