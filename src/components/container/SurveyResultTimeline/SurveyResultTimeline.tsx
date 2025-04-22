import MyDataHelps, { SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { useState } from "react";
import { useInitializeView } from "../../../helpers";
import queryAllSurveyAnswers from "../../../helpers/query-all-survey-answers";
import { Action, Card, LoadingIndicator, Title } from "../../presentational";
import React from "react";
import { format, formatDate, parseISO } from "date-fns";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface SurveyResultTimelineProps {
    surveyName?: string;
    titleResultIdentifier?: string;
    subtitleResultIdentifier?: string;
    dateResultIdentifier?: string;
    allowEdit?: boolean;
    allowDelete?: boolean;
    previewState?: "default";
    sortOrder?: "asc" | "desc";
    soryBy?: "date" | "title" | "subtitle" | string;
}

interface SurveyResultTimelineEntry {
    surveyResultID?: string;
    date: string;
    title?: string;
    subtitle?: string;
}

export default function SurveyResultTimeline(props: SurveyResultTimelineProps) {
    let [entries, setEntries] = useState<SurveyResultTimelineEntry[]>();

    if (!props.surveyName && !props.titleResultIdentifier && !props.subtitleResultIdentifier) {
        console.error("SurveyResultTimeline: surveyName and one of titleResultIdentifier or subtitleResultIdentifier are required");
        return null;
    }

    useInitializeView(() => {
        if (props.previewState === "default") {
            let entries: SurveyResultTimelineEntry[] = [];
            entries.push({
                title: "Started Escitalopram",
                date: "2017-06-01",
            });
            entries.push({
                title: "Ovarian Cyst Rupture",
                subtitle: "Treated in ER",
                date: "2017-09-01",
            });
            setEntries(entries);
            return;
        }

        let resultIdentifiers = [];
        if (props.titleResultIdentifier) {
            resultIdentifiers.push(props.titleResultIdentifier);
        }
        if (props.subtitleResultIdentifier) {
            resultIdentifiers.push(props.subtitleResultIdentifier);
        }
        if (props.dateResultIdentifier) {
            resultIdentifiers.push(props.dateResultIdentifier);
        }
        queryAllSurveyAnswers({
            surveyName: props.surveyName,
            resultIdentifier: resultIdentifiers,
        }).then((response: SurveyAnswer[]) => {
            let entries: SurveyResultTimelineEntry[] = [];
        });
    }, []);

    if (!entries) {
        return <LoadingIndicator />;
    }

    return entries.map((entry, index) => {
        let date = parseISO(entry.date);
        let formattedDate = formatDate(date, "MMMM d, yyyy");
        return (
            <Card key={entry.surveyResultID} className="mdhui-survey-result-timeline-entry">
                <Title order={3} style={{ marginBottom: 0, marginTop: 16, marginLeft: 16, marginRight: 16, fontWeight:"normal" }} className="mdhui-survey-result-timeline-entry-date">{formattedDate}</Title>
                <Action key={entry.surveyResultID}
                    className="mdhui-survey-result-timeline-entry"
                    title={entry.title}
                    subtitle={entry.subtitle} indicator={
                        <><FontAwesomeSvgIcon icon={faEdit} />&nbsp;<FontAwesomeSvgIcon icon={faTrash} /></>
                    }>
                </Action>
            </Card>
        );
    });
}