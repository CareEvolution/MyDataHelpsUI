import React from "react"
import SurveyResultList, { SurveyResultListProps } from "./SurveyResultList";
import { Button, Layout, Section } from "../../presentational";
import { css, Global } from "@emotion/react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faAsterisk, faBandAid, faHospital, faPills } from "@fortawesome/free-solid-svg-icons";
import MyDataHelps, { SurveyAnswer } from "@careevolution/mydatahelps-js";

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
    <Section style={{ margin: 0 }}><Button defaultMargin onClick={() => MyDataHelps.startSurvey("TimelineEntry")}>Add Entry</Button></Section>
</Layout>;

let props: SurveyResultListProps = {
    title: "Health Timeline",
    surveyNames: ["TimelineEntry"],
    resultIdentifiers: ["timeline_entry_title", "timeline_entry_notes", "timeline_entry_date", "timeline_entry_category"],
    dateResultIdentifier: "timeline_entry_date",
    allowDownload: true,
    allowDelete: true,
    allowSearch: true,
    getBody: (answers: SurveyAnswer[]) => {
        return <div>
            <div><strong>{answers.find(r => r.resultIdentifier == "timeline_entry_title")?.answers[0]}</strong></div>
            <div>{answers.find(r => r.resultIdentifier == "timeline_entry_notes")?.answers[0]}</div>
        </div>
    },
    getIcon: (answers: SurveyAnswer[]) => {
        let iconName = answers.find(r => r.resultIdentifier == "timeline_entry_category")?.answers[0];
        if (!iconName) {
            return <FontAwesomeSvgIcon icon={faAsterisk} />
        }
        if (iconName === "medical event") {
            return <FontAwesomeSvgIcon icon={faHospital} />
        }
        if (iconName === "medication") {
            return <FontAwesomeSvgIcon icon={faPills} />
        }
        if (iconName === "procedure") {
            return <FontAwesomeSvgIcon icon={faBandAid} />
        }
        return <FontAwesomeSvgIcon icon={faAsterisk} />
    }
};
export const Default = {
    args: props,
    render: render
};
