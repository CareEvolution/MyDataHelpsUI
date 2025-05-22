import React from "react";
import Layout from "../Layout";
import SingleNotification, { SingleNotificationProps } from "./SingleNotification";
import { Meta, StoryObj } from "@storybook/react";
import { Card } from "..";
import { addDays } from "date-fns";

const meta: Meta<typeof SingleNotification> = {
	title:  "Presentational/SingleNotification",
    component: SingleNotification,
    parameters: {
		layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof SingleNotification>;

const render = (args: SingleNotificationProps) => <Layout>
        <Card>
            <SingleNotification {...args} />
        </Card>
</Layout>;

export const Default: Story = {
    args: {
        notification: {
            "id": "4",
            "identifier": "SurveyReminder",
            "sentDate": addDays(new Date(), -1).toISOString(),
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

export const NoNotifications: Story = {
    args: {
        notification: null
    },
    render: render
};
