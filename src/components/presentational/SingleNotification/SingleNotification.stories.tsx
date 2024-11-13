import React from "react"
import { StoryObj } from "@storybook/react"
import { Notification } from "@careevolution/mydatahelps-js"
import SingleNotification, { SingleNotificationProps } from "./SingleNotification"
import Layout from "../../presentational/Layout"
import { Card } from "../../presentational"
import add from 'date-fns/add'

export default {
    title: 'Presentational/SingleNotification',
    component: SingleNotification,
    parameters: { layout: 'fullscreen' }
};

interface SingleNotificationStoryArgs {
  notification: Notification
}

type Story = StoryObj<typeof SingleNotification>;

const render = (args: SingleNotificationProps) => {
	return <Layout>
		<Card>
			<SingleNotification {...args} />
		</Card>
	</Layout>;
};

export const Default: Story = {
	args: {
		notification: {
            "id": "4",
            "identifier": "SurveyReminder",
            "sentDate": add(new Date(), { days: -1 }).toISOString(),
            "statusCode": "Succeeded",
            "type": "Push",
            "content": {
                "title": "Have you received your Fitbit? Connect it!"
            },
            recipients: [],
            contentVersion: 1
        }        
	},	
	render: render
};

