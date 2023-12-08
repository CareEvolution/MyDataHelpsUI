import React from 'react';
import { ColorDefinition } from '../../../helpers/colors';
import { Card, Layout } from '../../presentational';
import ValueSelector, { ValueSelectorProps } from './ValueSelector'

export default {
	title: 'Presentational/ValueSelector',
	component: ValueSelector,
	parameters: {layout: 'fullscreen'}
};

let render = (cardColor: ColorDefinition, args: ValueSelectorProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
	<Card backgroundColor={cardColor}>
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
};

export const ButtonsCustomColors = {
	args: {
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
	render: (args: ValueSelectorProps) => render('#badbe8', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
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
	render: (args: ValueSelectorProps) => render('#f5f5f5', args)
};

export const CheckboxesCustomColors = {
	args: {
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
	render: (args: ValueSelectorProps) => render('#badbe8', args)
};