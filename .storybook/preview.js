import myDataHelps from "@careevolution/mydatahelps-js";

export const globalTypes = {
	language: {
	  name: 'Language',
	  description: 'Language',
	  toolbar: {
		icon: 'globe',
		items: [
		  { value: 'en', title: 'English' },
		  { value: 'es', title: 'Spanish' },
		],
		showName: true,
	  }
	},
   };

export const decorators = [(story, context) => {
	myDataHelps.setParticipantAccessToken({ "access_token": process.env.PARTICIPANT_ACCESS_TOKEN, "expires_in": 21600, "token_type": "Bearer" }, process.env.PARTICIPANT_ENVIRONMENT_API ? process.env.PARTICIPANT_ENVIRONMENT_API : "https://mydatahelps.org/");
	if (context.globals.language) {
		myDataHelps.setCurrentLanguage(context.globals.language);
	}
	return story();
}];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}