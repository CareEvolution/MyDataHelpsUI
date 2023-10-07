import React from "react";
import Layout from "../Layout"
import CallToAction, { CallToActionProps } from "./CallToAction"
import Card from "../Card";
import FitbitIcon from '../../../assets/fitbit.svg';
import LibraryImage from "../LibraryImage/LibraryImage";

export default {
	title: "Presentational/CallToAction",
	component: CallToAction,
	parameters: {
		layout: 'fullscreen',
	}
};

let render = (args: CallToActionProps) => <Layout><Card><CallToAction {...args} /></Card></Layout>

export const Large = {
	args: {
        title: "Connect Fitbit",
        text: "Connect your Fitbit to track your activity and sleep.",
        image: <LibraryImage width={40} image="FitbitLogo" />,
        variant: "large"
	},
	render: render
};


export const Medium = {
	args: {
        title: "Connect Fitbit",
        text: "Connect your Fitbit to track your activity and sleep.",        
		image: <LibraryImage width={40} image="FitbitLogo" />,
        variant: "medium"
	},
	render: render
};

