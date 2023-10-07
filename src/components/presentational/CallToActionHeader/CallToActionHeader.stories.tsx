import React from "react";
import Layout from "../Layout"
import CallToActionHeader, { CallToActionHeaderProps } from "./CallToActionHeader"
import Card from "../Card";
import FitbitIcon from '../../../assets/fitbit.svg';

export default {
	title: "Presentational/CallToActionHeader",
	component: CallToActionHeader,
	parameters: {
		layout: 'fullscreen',
	}
};

let render = (args: CallToActionHeaderProps) => <Layout><Card><CallToActionHeader {...args} /></Card></Layout>

export const Large = {
	args: {
        title: "Connect Fitbit",
        text: "Connect your Fitbit to track your activity and sleep.",
        image: <img width="40" src={FitbitIcon} />,
        variant: "large"
	},
	render: render
};


export const Medium = {
	args: {
        title: "Connect Fitbit",
        text: "Connect your Fitbit to track your activity and sleep.",
        image: <img width="24" src={FitbitIcon} />,
        variant: "medium"
	},
	render: render
};

