import React from "react";
import DayTrackerSymbol, { DayTrackerSymbolProps } from "./DayTrackerSymbol";
import Layout from "../Layout"
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof DayTrackerSymbol> = {
	title: "Presentational/DayTrackerSymbol",
	component: DayTrackerSymbol,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof DayTrackerSymbol>;

const render = (args:DayTrackerSymbolProps) => <Layout colorScheme="auto">
	<DayTrackerSymbol {...args} />
</Layout>;

export const Default: Story = {
	args: {
		primaryColors: [
			"#c4291c",
			"#e35c33",
			"#5db37e",
			"#429bdf",
			"#7b88c6",
			"#616161"
		],
		secondaryColors: [
			"#eec04c",
			"#2dad6e",
			"#d21a55",
			"#eec04c"
		]
	},
	render: render
};