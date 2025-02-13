import React from "react";
import { Button, Layout, UnstyledButton } from "../../presentational";
import Title, { TitleProps } from "./Title";
import FitbitLogo from '../../../assets/fitbit-logo.svg';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default { title: "Presentational/Title", component: Title, parameters: { layout: 'fullscreen' } };
let render = (args: TitleProps) => <Layout><Title {...args} /></Layout>

export const ImageLeft = {
    args: {
        children: "H1 Title",
        order: 1,
        autosizeImage: true,
        image: <img src={FitbitLogo} />,
    },
    render: render
};


export const ImageTop = {
    args: {
        children: "H1 Title",
        order: 1,
        image: <img src={FitbitLogo} />,
        autosizeImage: true,
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

export const Accessory = {
    args: {
        children: "Health Records",
        order: 3,
        defaultMargin: true,
        accessory: <UnstyledButton style={{ color: "var(--mdhui-color-primary)" }} onClick={() => { }}>Add <FontAwesomeSvgIcon icon={faCirclePlus} /></UnstyledButton>
    },
    render: render
};

export const AccessoryButton = {
    args: {
        children: "Health Records",
        order: 3,
        defaultMargin: true,
        accessory: <Button fullWidth={false} onClick={() => { }}>Add <FontAwesomeSvgIcon icon={faCirclePlus} /></Button>
    },
    render: render
};