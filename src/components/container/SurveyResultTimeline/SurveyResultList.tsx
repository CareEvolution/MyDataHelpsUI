import MyDataHelps, { SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { useContext, useState } from "react";
import { useInitializeView } from "../../../helpers";
import queryAllSurveyAnswers from "../../../helpers/query-all-survey-answers";
import { Action, Button, Card, DateRangeContext, LoadingIndicator, Title, UnstyledButton } from "../../presentational";
import React from "react";
import { format, formatDate, parseISO } from "date-fns";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faCircle, faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./SurveyResultList.css"

export interface SurveyResultListProps {
    title: string;
    allowDownload?: boolean;
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

interface SurveyResultListEntry {
    surveyResultID?: string;
    date: string;
    title?: string;
    subtitle?: string;
}

export default function SurveyResultTimeline(props: SurveyResultListProps) {
    let [entries, setEntries] = useState<SurveyResultListEntry[]>();
    const dateRangeContext = useContext(DateRangeContext);

    if (!props.surveyName && !props.titleResultIdentifier && !props.subtitleResultIdentifier) {
        console.error("SurveyResultTimeline: surveyName and one of titleResultIdentifier or subtitleResultIdentifier are required");
        return null;
    }

    useInitializeView(() => {
        if (props.previewState === "default") {
            let entries: SurveyResultListEntry[] = [];
            entries.push({
                title: "Started Rosuvastatin",
                date: "2017-06-01",
            });
            entries.push({
                title: "Achilles Tendon Rupture",
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
            let entries: SurveyResultListEntry[] = [];
        });
    }, []);

    if (!entries) {
        return <LoadingIndicator />;
    }

    return <div className="mdhui-survey-result-list">
        <Title style={{ marginTop: "0px" }} order={3} defaultMargin accessory={<UnstyledButton onClick={() => { }} className="mdhui-survey-result-list-title-accessory">
            Download <FontAwesomeSvgIcon icon={faDownload} />
        </UnstyledButton>}>
            {props.title ?? <>&nbsp;</>}
        </Title>
        {entries.map((entry, index) => {
            let date = parseISO(entry.date);
            let formattedDate = formatDate(date, "MMMM d, yyyy");
            return (
                <Card key={entry.surveyResultID} className="mdhui-survey-result-list-entry">
                    <Title order={4} style={{ marginBottom: 0, marginTop: 16, marginLeft: 16, marginRight: 16 }} className="mdhui-survey-result-timeline-entry-date">{formattedDate}</Title>
                    <Action key={entry.surveyResultID}
                        icon={<FontAwesomeSvgIcon icon={faCircle} color={"var(--mdhui-color-primary)"} />}
                        className="mdhui-survey-result-list-entry"
                        onClick={() => { }}
                        indicator={
                            <>
                                <Button color="var(--mdhui-text-color-3)" className="mdhui-survey-result-list-entry-button" fullWidth={false} variant="light" onClick={() => { }}><FontAwesomeSvgIcon icon={faTrash} /></Button>
                            </>
                        }>
                        {entry.title &&
                            <div className="mdhui-survey-result-list-entry-title">
                                {entry.title}
                            </div>
                        }
                        {entry.subtitle &&
                            <div className="mdhui-survey-result-list-entry-subtitle">
                                {entry.subtitle}
                            </div>
                        }
                    </Action>
                </Card>
            );
        })}
    </div>;
}