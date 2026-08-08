import React from 'react';
import { addons, types, useGlobals } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';

// Single-click light/dark toggle. "system" (follow the OS) applies until the first
// click; the pinned choice then persists in the URL. Binary by design — no third
// "System" state. Background: see the PR description.
const ADDON_ID = 'mdhui/theme-toggle';

const ThemeToggle = () => {
	const [globals, updateGlobals] = useGlobals();
	const theme = globals.theme;
	const effective = theme === 'light' || theme === 'dark'
		? theme
		: (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	const next = effective === 'dark' ? 'light' : 'dark';
	return React.createElement(
		IconButton,
		{
			key: 'mdhui-theme-toggle',
			title: 'Theme: ' + effective + ' — click to switch to ' + next,
			onClick: () => updateGlobals({ theme: next }),
		},
		React.createElement('span', { style: { fontSize: 14, lineHeight: 1 } }, effective === 'dark' ? '☾' : '☀'),
		React.createElement('span', { style: { marginLeft: 6 } }, effective === 'dark' ? 'Dark' : 'Light')
	);
};

addons.register(ADDON_ID, () => {
	addons.add(ADDON_ID + '/tool', {
		type: types.TOOL,
		title: 'Theme',
		match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
		render: ThemeToggle,
	});
});
