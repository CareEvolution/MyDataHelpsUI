import { useContext, useState } from "react";
import { Guid, SurveyAnswer, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import React from "react";
import surveyResults from "../../../helpers/get-survey-answers";
import Calendar from "../../presentational/Calendar/Calendar";
import { parseISO, startOfDay, startOfMonth } from "date-fns";
import { CalendarDay, CalendarDayStateConfiguration, DateRangeContext, LoadingIndicator } from "../../presentational";
import { previewSeverityData } from "./SeverityCalendar.previewdata";
import { useInitializeView } from "../../../helpers/Initialization";
export type SeverityCalendarPreviewState = "WithData" | "NoData" | "Loading" | "Live";

export interface SeverityCalendarProps {
    surveyName: string,
    dateRecordedResultIdentifier: string,
    severityResultIdentifier: string,
    intervalStart?: Date,
    previewState?: SeverityCalendarPreviewState,
}

interface SeverityDay {
    dateRecorded: string,
    severity: string
}

export default function (props: SeverityCalendarProps) {
    const surveyAnswerQuery: SurveyAnswersQuery = {
        surveyName: props.surveyName,
        resultIdentifier: [props.dateRecordedResultIdentifier, props.severityResultIdentifier]
    }

    const [data, setData] = useState<Map<string, SeverityDay> | undefined>();
    const dateRangeContext = useContext(DateRangeContext);
    let intervalStart = dateRangeContext?.intervalStart ?? props.intervalStart ?? startOfMonth(new Date());

    async function initialize() {
        if (props.previewState !== "Live") {
            transformToCalendarData(props.previewState === "WithData" ? previewSeverityData : []);
        } else {
            surveyResults(surveyAnswerQuery).then((results: SurveyAnswer[]) => {
                transformToCalendarData(results);
            });
        }
    }

    const stateConfiguration: CalendarDayStateConfiguration = {
        'mild': {
            style: {
                background: '#F7DA19'
            },
            streak: true,
            streakColor: '#FDEF97'
        },
        'moderate': {
            style: {
                background: 'var(--mdhui-color-warning)'
            },
            streak: true,
            streakColor: '#FCCCC7'
        },
        'severe': {
            style: {
                background: 'var(--mdhui-color-danger)'
            },
            streak: true,
            streakColor: '#FCCCC7'
        },
    };

    const computeStateForDay = (date: Date): string => {
        let key: string = startOfDay(date).toDateString();
        return data?.get(key)?.severity ?? "";
    };

    function transformToCalendarData(results: SurveyAnswer[]) {
        var severityEntries: Map<Guid, SeverityDay> = createResultsMap(results);

        var calendarData: Map<string, SeverityDay> = new Map<string, SeverityDay>();
        severityEntries.forEach(severityEntry => {
            let key: string = startOfDay(parseISO(severityEntry.dateRecorded)).toDateString();
            let exists = calendarData.get(key);
            if (exists) {
                if (parseISO(severityEntry.dateRecorded) > parseISO(exists.dateRecorded)) {
                    exists.severity = severityEntry.severity;
                }
            }
            else {
                calendarData.set(key, severityEntry);
            }
        });

        setData(calendarData);
    }

    function createResultsMap(results: SurveyAnswer[]) {
        var groupedByResult = new Map<Guid, SeverityDay>();

        results.forEach((r) => {
            var exists = groupedByResult.get(r.surveyResultID);
            var severityDay = exists ?? { dateRecorded: "", severity: "" };

            if (r.resultIdentifier === props.dateRecordedResultIdentifier && r.answers) {
                severityDay.dateRecorded = r.answers[0];
            }

            if (r.resultIdentifier === props.severityResultIdentifier && r.answers) {
                var severity = "";
                switch (r.answers[0]) {
                    case "mild":
                    case "severity1":
                        severity = "mild";
                        break;
                    case "moderate":
                    case "severity2":
                        severity = "moderate";
                        break;
                    case "severe":
                    case "severity3":
                        severity = "severe";
                        break;
                }

                severityDay.severity = severity;
            }

            groupedByResult.set(r.surveyResultID, severityDay);
        });

        return groupedByResult;
    }

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        return <CalendarDay
            year={year}
            month={month}
            day={day}
            stateConfiguration={stateConfiguration}
            computeStateForDay={computeStateForDay}
        />;
    };

    useInitializeView(initialize, [], [props.previewState]);

    if (!data) {
        return <LoadingIndicator />
    }
    else {
        return <Calendar className="mdhui-simple-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
    }
} 