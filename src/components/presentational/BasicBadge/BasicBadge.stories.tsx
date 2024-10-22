import React from 'react';
import resourceImage from '../../../assets/resource-image.png'
import { noop } from '../../../helpers/functions';
import BasicBadge, { BasicBadgeProps } from './BasicBadge';
import Layout from '../Layout';

export default {
    title: 'Presentational/BasicBadge',
    component: BasicBadge,
    parameters: { layout: 'fullscreen' }
};

const render = (args: BasicBadgeProps) => {
    return <Layout colorScheme="auto">
        <BasicBadge {...args} />
    </Layout>;
};

export const XS = {
    args: {
        backgroundColor: "blue",
        size: "xs"
    },
    render: render
};

export const Label = {
    args: {
        backgroundColor: "blue",
        size: "xl",
        children: <>1000<br />points</>
    },
    render: render
};
