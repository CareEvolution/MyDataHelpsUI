import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
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
    title?: string;
    allowDownload?: boolean;
    surveyName?: string;
    titleResultIdentifier?: string;
    subtitleResultIdentifier?: string;
    dateResultIdentifier?: string;
    allowEdit?: boolean;
    allowDelete?: boolean;
    previewState?: "default";
    sortOrder?: "asc" | "desc";
}

interface SurveyResultListEntry {
    surveyResultID?: string;
    date?: Date;
    title?: string;
    subtitle?: string;
}

export default function SurveyResultTimeline(props: SurveyResultListProps) {
    let [entries, setEntries] = useState<SurveyResultListEntry[]>();
    const dateRangeContext = useContext(DateRangeContext);

    if (!props.titleResultIdentifier && !props.subtitleResultIdentifier) {
        console.error("SurveyResultTimeline: one of titleResultIdentifier or subtitleResultIdentifier are required");
        return null;
    }

    useInitializeView(() => {
        if (props.previewState === "default") {
            let entries: SurveyResultListEntry[] = [];
            entries.push({
                title: "Started Rosuvastatin",
                date: parseISO("2017-06-01"),
            });
            entries.push({
                title: "Achilles Tendon Rupture",
                subtitle: "Treated in ER",
                date: parseISO("2017-09-01"),
            });
            entries.push({
                title: "Achilles Tendon Rupture",
                subtitle: "Treated in ER",
                date: parseISO("2017-09-01"),
            });
            entries.push({
                title: "Achilles Tendon Rupture",
                subtitle: "Treated in ER",
                date: parseISO("2017-09-01"),
            });
            entries.push({
                title: "Achilles Tendon Rupture",
                subtitle: "Treated in ER",
                date: parseISO("2017-09-01"),
            });
            entries.push({
                title: "Achilles Tendon Rupture",
                subtitle: "Treated in ER",
                date: parseISO("2017-09-01"),
            });
            entries.push({
                title: "Achilles Tendon Rupture",
                subtitle: "Treated in ER",
                date: parseISO("2017-09-01"),
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
        }).then((answers: SurveyAnswer[]) => {
            let entryLookup: { [key: string]: SurveyResultListEntry } = {};

            answers.forEach((answer: SurveyAnswer) => {
                let entry: SurveyResultListEntry = { surveyResultID: answer.surveyResultID as string, date: parseISO(answer.date) };
                if (entryLookup[answer.surveyResultID as string]) {
                    entry = entryLookup[answer.surveyResultID as string];
                }
                if (answer.resultIdentifier == props.titleResultIdentifier) {
                    entry.title = answer.answers.join(", ");
                }
                if (answer.resultIdentifier == props.subtitleResultIdentifier) {
                    entry.subtitle = answer.answers.join(", ");
                }
                if (answer.resultIdentifier == props.dateResultIdentifier && answer.answers.length > 0) {
                    entry.date = parseISO(answer.answers[0]);
                }
                entryLookup[answer.surveyResultID as string] = entry;
            });

            let entries: SurveyResultListEntry[] = [];
            Object.keys(entryLookup).forEach((key) => {
                let entry = entryLookup[key];
                if (entry.date && (entry.title || entry.subtitle)) {
                    entries.push(entry);
                }
            });

            setEntries(entries);
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
        <div className="mdhui-survey-result-list-scroll-container">
            {entries.map((entry, index) => {
                let formattedDate = formatDate(entry.date!, "MMMM d, yyyy");
                return (
                    <Card style={{ marginTop: index == 0 ? "0" : undefined }} key={entry.surveyResultID} className="mdhui-survey-result-list-entry">
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
        </div>
    </div>;
}