import myDataHelps from "@careevolution/mydatahelps-js";

export const decorators = [(story) => {
	myDataHelps.setParticipantAccessToken({ "access_token": process.env.PARTICIPANT_ACCESS_TOKEN, "expires_in": 21600, "token_type": "Bearer" }, "https://mydatahelps.org/");
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