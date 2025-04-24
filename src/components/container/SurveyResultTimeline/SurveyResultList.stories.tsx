import React from "react"
import SurveyResultList, { SurveyResultListProps } from "./SurveyResultList";
import { Button, Card, Layout, Section } from "../../presentational";
import { css, Global } from "@emotion/react";

export default {
    title: "Container/SurveyResultList",
    component: SurveyResultList,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: SurveyResultListProps) => <Layout flex={true} colorScheme="auto">
    <Global styles={css`
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
    <SurveyResultList {...args} />
    <Section style={{ margin: 0 }}><Button defaultMargin onClick={() => { }}>Add Entry</Button></Section>
</Layout>;

export const Default = {
    args: {
        title: "Health Timeline",
        titleResultIdentifier: "title",
        previewState: "default"
    },
    render: render
};
