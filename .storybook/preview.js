import React, { useEffect, useState } from "react";
import { DocsContainer } from "@storybook/blocks";
import { themes } from "@storybook/theming";
import myDataHelps from "@careevolution/mydatahelps-js";

// Docs-page chrome is themed by a docs theme, not story decorators; the decorator
// publishes the `theme` global into this subscription for the docs container.
let currentTheme = "system";
const themeSubscribers = new Set();
const publishTheme = (theme) => {
	if (theme === currentTheme) return;
	currentTheme = theme;
	themeSubscribers.forEach((fn) => fn(theme));
};
// Seed from a pinned `&globals=theme:...` URL — the decorator hasn't run at first mount.
if (typeof window !== "undefined" && window.location) {
	const m = /[?&]globals=([^&]*)/.exec(window.location.search);
	const pin = m && /(?:^|;)theme:(dark|light)/.exec(decodeURIComponent(m[1]));
	if (pin) currentTheme = pin[1];
}

const effectiveDark = (theme) =>
	theme === "dark" || (theme !== "light" && typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

const ThemedDocsContainer = (props) => {
	const [theme, setTheme] = useState(currentTheme);
	useEffect(() => {
		themeSubscribers.add(setTheme);
		return () => themeSubscribers.delete(setTheme);
	}, []);
	return React.createElement(DocsContainer, { ...props, theme: effectiveDark(theme) ? themes.dark : themes.light });
};

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'App color scheme (emulates prefers-color-scheme); toggled by the manager.js button',
		defaultValue: 'system',
	},
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

// Layout resolves colorScheme="auto" from matchMedia, so the toggle emulates the OS
// preference; "system" restores the real matchMedia.
const realMatchMedia = typeof window !== "undefined" && window.matchMedia ? window.matchMedia.bind(window) : undefined;

function applyThemeGlobal(theme) {
	if (!realMatchMedia) return;
	if (theme !== 'light' && theme !== 'dark') {
		window.matchMedia = realMatchMedia;
		return;
	}
	const wantsDark = theme === 'dark';
	window.matchMedia = (query) => {
		if (/prefers-color-scheme/.test(query)) {
			// Listener hooks are no-ops: components read the scheme at render (the toggle
			// re-renders every story); a 'change' subscriber would not hear toolbar toggles.
			return {
				matches: /dark/.test(query) ? wantsDark : !wantsDark,
				media: query,
				onchange: null,
				addEventListener() { },
				removeEventListener() { },
				addListener() { },
				removeListener() { },
				dispatchEvent() { return false; },
			};
		}
		return realMatchMedia(query);
	};
}

export const decorators = [(story, context) => {
	publishTheme(context.globals.theme);
	applyThemeGlobal(context.globals.theme);
	// Paint the canvas behind the story too (semantic token; fallback = shipped dark bg).
	if (typeof document !== "undefined") {
		const wantsDark = context.globals.theme === "dark"
			|| (context.globals.theme !== "light" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.body.style.backgroundColor = wantsDark ? "var(--mdhui-background-color-1, #1d1c22)" : "";
	}
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
	docs: {
		container: ThemedDocsContainer,
	},
}
export const tags = ["autodocs"];