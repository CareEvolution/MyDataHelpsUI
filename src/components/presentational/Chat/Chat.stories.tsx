import React from "react";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane, faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import { Global, css } from '@emotion/react';
import { Description } from "@storybook/blocks";

import Layout from "../../presentational/Layout";
import Chat, { ChatProps } from "./Chat";

export default {
    title: 'Presentational/Chat',
    component: Chat,
    parameters: { layout: 'fullscreen' },
    docs: {
        Description: <Description />
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        loading: {
            control: 'text',
            description: 'Loading text to display when a backend operation is executing.',
        },
        messages: {
            control: 'object',
            description: 'Messages to display in the chat.',
        },
        suggestions: {
            control: 'object',
            description: 'Suggestions to display to the user that they might ask the AI Assistant.',
        }
    },
    args: {
        messages: [],
        suggestions: [],
        loading: ""
    }
};

interface ChatStoryArgs extends ChatProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: ChatStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Global styles={css`
html {
    height: 100%;
}

body {
    height: 100%;
}

#storybook-root {
    height: 100%;
}

.mdhui-layout {
    height: 100%;
}
        `} />
        <Chat {...args} />
    </Layout>
};

export const Default = {
    args: {
        colorScheme: "auto",
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

export const Suggestions = {
    args: {
        suggestions: [
            "What is my temperature?",
            "What was my weight on January 1st?",
            "How tall am I?"
        ],
        onSuggestionSelected: (suggestion: string) => alert(`You selected: ${suggestion}`)
    },
    render: render
};
