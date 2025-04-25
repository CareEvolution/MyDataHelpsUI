import MyDataHelps, { SurveyAnswer, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { ReactElement, useContext, useRef, useState } from "react";
import { getDayKey, language, useInitializeView } from "../../../helpers";
import queryAllSurveyAnswers from "../../../helpers/query-all-survey-answers";
import { Action, Button, Card, DateRangeContext, LoadingIndicator, Title, UnstyledButton } from "../../presentational";
import React from "react";
import { add, formatDate, parseISO } from "date-fns";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faCircle, faDownload, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./SurveyResultList.css"
import renderPdf from "../../../helpers/renderPdf";
import previewSurveyResultListEntries from "./previewData";
import { core, global, lightColorScheme } from "../../../helpers/globalCss";

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
    allowSearch?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
    iconKeyResultIdentifier?: string;
    iconProvider?: (iconKey: string) => ReactElement;
}

export interface SurveyResultListEntry {
    surveyResultID?: string;
    date?: Date;
    title?: string;
    subtitle?: string;
    icon?: string;
}

export default function SurveyResultTimeline(props: SurveyResultListProps) {
    let [entries, setEntries] = useState<SurveyResultListEntry[]>();
    let [participantID, setParticipantID] = useState<string>();
    let [searchString, setSearchString] = useState<string>("");
    const dateRangeContext = useContext(DateRangeContext);
    const listRef = useRef<HTMLDivElement>(null);

    useInitializeView(async () => {
        if (props.previewState === "default") {
            setEntries(previewSurveyResultListEntries);
            return;
        }

        if (!props.titleResultIdentifier && !props.subtitleResultIdentifier) {
            console.error("SurveyResultList: titleResultIdentifier or subtitleResultIdentifier is required");
            setEntries([]);
            return;
        }

        let parameters: SurveyAnswersQuery = {
            resultIdentifier: []
        };
        if (props.surveyName) {
            parameters.surveyName = props.surveyName;
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
        if (props.iconKeyResultIdentifier) {
            resultIdentifiers.push(props.iconKeyResultIdentifier);
        }
        parameters.resultIdentifier = resultIdentifiers;

        let participantInfo = await MyDataHelps.getParticipantInfo();
        setParticipantID(participantInfo.participantID as string);

        let answers = await queryAllSurveyAnswers(parameters);

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
            if (answer.resultIdentifier == props.iconKeyResultIdentifier && answer.answers.length > 0) {
                entry.icon = answer.answers[0];
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
    }, []);

    function groupEntries(entries: SurveyResultListEntry[]) {
        // filter entries not in date range context, if there is one
        if (dateRangeContext) {
            let intervalEnd = dateRangeContext.intervalType === "Week" ? add(dateRangeContext.intervalStart, { days: 7 })
                : dateRangeContext.intervalType === "Month" ? add(dateRangeContext.intervalStart, { months: 1 })
                    : dateRangeContext.intervalStart;
            entries = entries.filter((entry) => {
                return entry.date && entry.date >= dateRangeContext.intervalStart && entry.date < intervalEnd;
            });
        }

        // sort entries by date
        entries.sort((a, b) => {
            if (a.date && b.date) {
                return props.sortOrder == "asc" ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime();
            }
            return 0;
        });

        if (searchString) {
            entries = entries.filter((entry) => {
                let title = entry.title ? entry.title.toLowerCase() : "";
                let subtitle = entry.subtitle ? entry.subtitle.toLowerCase() : "";
                let search = searchString.toLowerCase();
                return title.includes(search) || subtitle.includes(search);
            });
        }

        //group entries by day
        let groups: { date: Date, entries: SurveyResultListEntry[] }[] = [];
        let currentGroup: { date: Date, entries: SurveyResultListEntry[] } | null = null;
        entries.forEach((entry) => {
            if (entry.date) {
                let dayKey = getDayKey(entry.date);
                if (!currentGroup || getDayKey(currentGroup.date) != dayKey) {
                    currentGroup = { date: entry.date, entries: [] };
                    groups.push(currentGroup);
                }
                currentGroup.entries.push(entry);
            }
        });
        return groups;
    };

    function deleteEntry(entry: SurveyResultListEntry) {
        if (!window.confirm("Are you sure you want to delete this entry?")) {
            return;
        }
        MyDataHelps.deleteSurveyResult(entry.surveyResultID as string).then(() => {
            setEntries(entries!.filter((e) => e.surveyResultID != entry.surveyResultID));
        });
    }

    function download() {
        //hack: get the styles from the document and add them to the report so they are included in the PDF
        var documentStyles = document.head.getElementsByTagName("style");
        var html = "";
        html += `<style>${core.styles}</style>`;
        html += `<style>${lightColorScheme.styles}</style>`;
        html += `<style>${global.styles}</style>`;
        for (var i = 0; i < documentStyles.length; i++) {
            html += documentStyles[i].outerHTML;
        }
        html += `<div class="mdhui-layout" style="background-color:#FFF"><div class="mdhui-survey-result-list-print">${listRef.current!.innerHTML}</div></div>`;
        console.log(html);
        renderPdf(html, participantID!);
    }

    let groups = entries ? groupEntries(entries) : undefined;

    return <div ref={props.innerRef} className="mdhui-survey-result-list">
        <div className="mdhui-survey-result-list" ref={listRef}>
            <div>
                <Title style={{ marginTop: "0px" }} order={3} defaultMargin accessory={props.allowDownload ? <UnstyledButton onClick={() => download()} className="mdhui-survey-result-list-title-accessory">
                    Download <FontAwesomeSvgIcon icon={faDownload} />
                </UnstyledButton> : undefined}>
                    {props.title ?? <>&nbsp;</>}
                </Title>
                {props.allowSearch &&
                    <Card className="mdhui-survey-result-list-search">
                        <div className="mdhui-survey-result-list-search-bar">
                            <input title={language("search")}
                                type="text"
                                value={searchString}
                                onChange={(event) => setSearchString(event.target.value)}
                                placeholder={language("search")}
                                spellCheck="false"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off" />
                            <FontAwesomeSvgIcon icon={faSearch} />
                        </div>
                    </Card>
                }
            </div>
            <div className="mdhui-survey-result-list-scroll-container">
                {!groups && <LoadingIndicator />}
                {groups && groups.map((group, index) => {
                    let formattedDate = formatDate(group.entries[0].date!, "MMMM d, yyyy");
                    return (
                        <Card style={{ marginTop: index == 0 ? "0" : undefined }} key={formattedDate} className="mdhui-survey-result-list-entry">
                            <Title order={4} style={{ marginBottom: 0, marginTop: 16, marginLeft: 16, marginRight: 16 }} className="mdhui-survey-result-timeline-entry-date">{formattedDate}</Title>
                            {group.entries.map((entry, index) =>
                                <Action bottomBorder={index != (group.entries.length - 1)} key={entry.surveyResultID}
                                    icon={
                                        <div className="mdhui-survey-result-list-entry-icon" style={{ width: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            {entry.icon && props.iconProvider ? props.iconProvider(entry.icon) : <FontAwesomeSvgIcon icon={faCircle} color={"var(--mdhui-color-primary)"} />}
                                        </div>
                                    }
                                    className="mdhui-survey-result-list-entry"
                                    onClick={props.allowEdit ? () => { } : undefined}
                                    renderAs="div"
                                    indicator={
                                        props.allowDelete ?
                                            <Button color="var(--mdhui-text-color-3)" className="mdhui-survey-result-list-entry-button" fullWidth={false} variant="light" onClick={(e) => {
                                                deleteEntry(entry);
                                                e.stopPropagation();
                                            }}><FontAwesomeSvgIcon icon={faTrash} /></Button> : <></>
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
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    </div>;
}