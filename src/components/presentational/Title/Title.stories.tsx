import React from "react";
import { Layout } from "../../presentational";
import Title, { TitleProps } from "./Title";

export default { title: "Presentational/Title", component: Title, parameters: { layout: 'fullscreen' } };
let render = (args: TitleProps) => <Layout><Title {...args} /></Layout>


export const ImageLeft = {
    args: {
        children: "H1 Title",
        order: 1,
        libraryImage: "FitbitLogo"
    },
    render: render
};


export const ImageTop = {
    args: {
        children: "H1 Title",
        order: 1,
        libraryImage: "FitbitLogo",
        imageAlignment: "top"
    },
    render: render
};


export const H1 = {
    args: {
        children: "H1 Title",
        order: 1
    },
    render: render
};

export const H2 = {
    args: {
        children: "H2 Title",
        order: 2
    },
    render: render
};

export const H3 = {
    args: {
        children: "H3 Title",
        order: 3
    },
    render: render
};

export const H4 = {
    args: {
        children: "H4 Title",
        order: 4
    },
    render: render
};

export const H5 = {
    args: {
        children: "H5 Title",
        order: 5
    },
    render: render
};

export const H6 = {
    args: {
        children: "H6 Title",
        order: 6
    },
    render: render
};
