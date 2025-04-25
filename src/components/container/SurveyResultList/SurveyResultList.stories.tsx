import React from "react"
import SurveyResultList, { SurveyResultListProps } from "./SurveyResultList";
import { Button, Layout, Section } from "../../presentational";
import { css, Global } from "@emotion/react";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faAsterisk, faBandAid, faEllipsis, faHospital, faPills } from "@fortawesome/free-solid-svg-icons";

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
        titleResultIdentifier: "timeline_entry_title",
        subtitleResultIdentifier: "timeline_entry_notes",
        dateResultIdentifier: "timeline_entry_date",
        allowDownload: true,
        allowEdit: true,
        allowDelete: true,
        allowSearch: true,
        iconKeyResultIdentifier: "timeline_entry_category",
        iconProvider: (iconName: string) => {
            console.log(iconName);
            if (iconName === "health event") {
                return <FontAwesomeSvgIcon icon={faHospital} />
            }
            if (iconName === "medication") {
                return <FontAwesomeSvgIcon icon={faPills} />
            }
            if (iconName === "procedure") {
                return <FontAwesomeSvgIcon icon={faBandAid} />
            }
            return <FontAwesomeSvgIcon icon={faEllipsis} />
        }
    },
    render: render
};
