import React from "react";
import Layout from "../Layout"
import TextBlock, { TextBlockProps } from "./TextBlock"

export default {
	title: "Presentational/TextBlock",
	component: TextBlock,
	parameters: {
		layout: 'fullscreen',
	}
};

let render = (args: TextBlockProps) => <Layout><TextBlock {...args} /></Layout>

export const Default = {
	args: {
		children: "Hello world"
	},
	render: render
};

export const CustomStyle = {
	args: {
        style: {marginTop:"0", marginBottom:"0", fontWeight:"bold"},
		children: "Hello world"
	},
	render: render
};

export const CustomColor = {
	args: {
        style: {marginTop:"0", marginBottom:"0", color:"blue"},
        color: "red",
		children: "Hello world"
	},
	render: render
};