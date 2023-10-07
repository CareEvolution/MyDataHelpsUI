import React from "react";
import Layout from "../Layout"
import LibraryImage, { LibraryImageProps } from "./LibraryImage"

export default {
	title: "Presentational/LibraryImage",
	component: LibraryImage,
	parameters: {
		layout: 'fullscreen',
	}
};

let render = (args: LibraryImageProps) => <Layout><LibraryImage {...args} /></Layout>

export const Default = {
	args: {
        image: "FitbitLogo"
	},
	render: render
};