import React from 'react';
import { Card, Layout } from '../../presentational';
import ValueSelector, { ValueSelectorProps } from './ValueSelector'

export default {
	title: 'Presentational/ValueSelector',
	component: ValueSelector,
	parameters: {layout: 'fullscreen'}
};

let render = (args: ValueSelectorProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
	<Card>
		<ValueSelector {...args} />
	</Card>
</Layout>;

let now = new Date();

export const Default = {
	args: {
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		]
	},
	render: render
};

export const Buttons = {
	args: {
		title: 'Some title',
		subtitle: 'Select one',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		]
	},
	render: render
};

export const ButtonsPreventEmptySelections = {
	args: {
		title: 'Some title',
		subtitle: 'Select one',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		],
		preventEmptySelections: true
	},
	render: render
};

export const ButtonsMultiSelect = {
	args: {
		title: 'Some title',
		subtitle: 'Select all that apply',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		],
		multiSelect: true
	},
	render: render
};

export const ButtonsMultiSelectPreventEmptySelections = {
	args: {
		title: 'Some title',
		subtitle: 'Select all that apply',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		],
		multiSelect: true,
		preventEmptySelections: true
	},
	render: render
};

export const ButtonsCustomColors = {
	args: {
		backgroundColor: '#badbe8',
		title: 'Some title',
		titleColor: '#946105',
		subtitle: 'Select one',
		subtitleColor: '#29a4d2',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		valueBackgroundColor: '#f8ead1',
		valueTextColor: '#c58208',
		selectedValues: [
			'Option 2'
		],
		selectedButtonBackgroundColor: '#ee9e0f',
		selectedButtonTextColor: '#946105'
	},
	render: render
};

export const Checkboxes = {
	args: {
		title: 'Some title',
		subtitle: 'Select one',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		],
		variant: 'checkboxes'
	},
	render: render
};

export const CheckboxesPreventEmptySelections = {
	args: {
		title: 'Some title',
		subtitle: 'Select one',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		],
		variant: 'checkboxes',
		preventEmptySelections: true
	},
	render: render
};

export const CheckboxesMultiSelect = {
	args: {
		title: 'Some title',
		subtitle: 'Select all that apply',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		],
		variant: 'checkboxes',
		multiSelect: true
	},
	render: render
};

export const CheckboxesMultiSelectPreventEmptySelections = {
	args: {
		title: 'Some title',
		subtitle: 'Select all that apply',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		selectedValues: [
			'Option 2'
		],
		variant: 'checkboxes',
		multiSelect: true,
		preventEmptySelections: true
	},
	render: render
};

export const CheckboxesCustomColors = {
	args: {
		backgroundColor: '#badbe8',
		title: 'Some title',
		titleColor: '#946105',
		subtitle: 'Select all that apply',
		subtitleColor: '#29a4d2',
		values: [
			'Option 1',
			'Option 2',
			'Option 3',
			'Option 4'
		],
		valueBackgroundColor: '#f8ead1',
		valueTextColor: '#c58208',
		selectedValues: [
			'Option 2'
		],
		checkboxColor: '#ee9e0f',
		selectedCheckboxColor: '#946105',
		variant: 'checkboxes',
		multiSelect: true
	},
	render: render
};