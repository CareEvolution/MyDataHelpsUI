import { Notification } from "@careevolution/mydatahelps-js";
import { add } from 'date-fns'
import { v4 as uuid } from 'uuid';

const participantID =uuid();

export var previewNotifications: Notification[] =
	[{
		"id": "1",
		"identifier": "SurveyReminder-Thanks",
		"participantID": participantID,
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
		"participantID": participantID,
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
		"identifier": "SurveyReminder-Fitbit",
		"participantID": participantID,
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
		"identifier": "SurveyReminder-Fitbit2",
		"participantID": participantID,
		"sentDate": add(new Date(), { days: -2 }).toISOString(),
		"statusCode": "Succeeded",
		"type": "Push",
		"content": {
			"title": "Consent and get a Fitbit",
			"body": "Are you missing out on a Fitbit device? Complete your consent - you could get a new Fitbit at no cost to you!"
		},
		recipients: [],
		contentVersion: 1
	},
	{
		"id": "6",
		"identifier": "EmailSurveyReminder",
		"participantID": participantID,
		"sentDate": add(new Date(), { days: -3 }).toISOString(),
		"statusCode": "Succeeded",
		"type": "Email",
		"content": {
			"subject": "Subject - Email reminder to complete daily survey",
			"body": "Complete your daily survey to earn rewards!"
		},
		recipients: [],
		contentVersion: 1
	},
	{
		"id": "7",
		"identifier": "SMSSurveyReminder",
		"participantID": participantID,
		"sentDate": add(new Date(), { days: -4 }).toISOString(),
		"statusCode": "Succeeded",
		"type": "Sms",
		"content": {
			"title": "SMS Title - complete daily survey",
			"body": "Visit MDH to complete your daily survey"
		},
		recipients: [],
		contentVersion: 1
	}];
