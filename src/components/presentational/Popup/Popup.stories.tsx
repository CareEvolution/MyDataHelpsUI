import React from "react";
import Layout from "../../presentational/Layout";
import Popup, { PopupProps } from "./Popup";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';

export default {
    title: 'Presentational/Popup',
    component: Popup,
    parameters: { layout: 'fullscreen' },
    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the popup displayed in the upper left corner.',
            defaultValue: {
                summary: ''
            }
        }
    }
};

const render = (args: PopupProps) => {
    return <Layout colorScheme='auto'>
        <Popup {...args} />
    </Layout>
};

export const Default = {
    args: {
        title: 'The popup title',
        titleIcon:<FontAwesomeSvgIcon icon={faPaperPlane} />,
        children: <p>The popup contents</p>,
        onCollapse: () => {
            console.log("onCollapse was called!");
        }
    },
    render: render
};
