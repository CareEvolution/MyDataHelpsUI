import React from "react";
import Layout from "../../presentational/Layout";
import Chat, { ChatProps } from "./Chat";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';

export default {
    title: 'Presentational/Chat',
    component: Chat,
    parameters: { layout: 'fullscreen' },
    argTypes: {
        loading: {
            control: 'text',
            description: 'Loading text to display when a backend operation is executing.',
            defaultValue: {
                summary: ''
            }
        },
        messages: {
            control: 'object',
            description: 'Messages to display in the chat.',
            defaultValue: {
                summary: []
            }
        }
    }
};

const render = (args: ChatProps) => {
    return <Layout colorScheme='auto'>
        <Chat {...args} />
    </Layout>
};

export const Default = {
    args: {
        messages: [{
            icon: <FontAwesomeSvgIcon icon={faUser} />,
            content: "Hi!",
            type: "sent"
        },
        {
            icon: <FontAwesomeSvgIcon icon={faGear} />,
            content: "Hello! How may I assist you today?",
            type: "received"
        },
        {
            icon: <FontAwesomeSvgIcon icon={faUser} />,
            content: "How has my sleep been in the past 7 days?",
            type: "sent"
        },
        {
            icon: <FontAwesomeSvgIcon icon={faPaperPlane} />,
            content: "Your sleep has been decent.",
            type: "received"
        }]
    },
    render: render
};

export const Loading = {
    args: {
        loading: "Calling the mothership...",
        messages: [{
            icon: <FontAwesomeSvgIcon icon={faUser} />,
            content: "How has my sleep been in the past 7 days?",
            type: "sent"
        }]
    },
    render: render
};
