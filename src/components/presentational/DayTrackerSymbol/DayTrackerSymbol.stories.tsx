import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DayTrackerSymbol, { DayTrackerSymbolProps } from "./DayTrackerSymbol";
import Layout from "../Layout"

export default {
	title: "Presentational/DayTrackerSymbol",
	component: DayTrackerSymbol,
	parameters: {
		layout: 'fullscreen',
	}
} as ComponentMeta<typeof DayTrackerSymbol>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DayTrackerSymbol> = (args:DayTrackerSymbolProps) =>
	<Layout autoDarkMode>
		<DayTrackerSymbol {...args} />
	</Layout>;

export const Default = Template.bind({});
Default.args = {
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
}