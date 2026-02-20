import myDataHelps from "@careevolution/mydatahelps-js";

export const globalTypes = {
	language: {
		name: 'Language',
		description: 'Language',
		defaultValue: '',
		toolbar: {
			icon: 'globe',
			title: 'Language',
			items: [
				{ value: '', title: 'Default Language' },
				{ value: 'en', title: 'English' },
				{ value: 'es', title: 'Spanish' },
				{ value: 'nl', title: 'Dutch' },
				{ value: 'de', title: 'German' },
				{ value: 'fil', title: 'Filipino' },
				{ value: 'fr', title: 'French' },
				{ value: 'fr-ca', title: 'French (Canada)' },
				{ value: 'it', title: 'Italian' },
				{ value: 'pl', title: 'Polish' },
				{ value: 'pt', title: 'Portuguese (Brazil)' },
				{ value: 'pt-pt', title: 'Portuguese (Portugal)' },
				{ value: 'ro', title: 'Romanian' },
				{ value: 'so', title: 'Somali' },
				{ value: 'sw', title: 'Swahili' },
				{ value: 'tl', title: 'Tagalog' },
				{ value: 'vi', title: 'Vietnamese' },
			],			
			showName: true,
			dynamicTitle: true,
		}
	},
};

export const decorators = [(story, context) => {
    myDataHelps.setParticipantAccessToken({ "access_token": process.env.STORYBOOK_PARTICIPANT_ACCESS_TOKEN, "expires_in": 21600, "token_type": "Bearer" }, process.env.STORYBOOK_PARTICIPANT_ENVIRONMENT_API ? process.env.STORYBOOK_PARTICIPANT_ENVIRONMENT_API : "https://mydatahelps.org/");
	if (context.globals.language) {
		myDataHelps.setCurrentLanguage(context.globals.language);
	} else {
		// MDH.js does not currently support clearing current language
		myDataHelps.language = "";
	}
	
	return story();
}];

export const parameters = {
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}
export const tags = ["autodocs"];