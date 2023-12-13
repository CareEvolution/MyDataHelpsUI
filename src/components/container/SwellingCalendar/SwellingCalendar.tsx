import { useEffect, useState } from "react";
import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import React from "react";
import surveyResults from "../../../helpers/get-survey-answers";
import Calendar from "../../presentational/Calendar/Calendar";
import { parseISO, startOfDay, startOfMonth } from "date-fns";
import { Button, CalendarDay, CalendarDayStateConfiguration, DateRangeNavigator, LoadingIndicator } from "../../presentational";
import { previewSwellingData } from "./SwellingCalendar.previewdata";
import language from "../../../helpers/language";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
export type SwellingCalendarPreviewState = "WithData" | "NoData" | "Loading" | "Live";

export interface SwellingCalendarProps {
    surveyName : string,
    dateRecordedResultIdentifier : string, 
    severityResultIdentifier : string, 
    previewState? : SwellingCalendarPreviewState,
}

interface SwellingDay {
    dateRecorded : string,
    severity : string
}

export default function (props: SwellingCalendarProps) {
    const surveyAnswerQuery : SurveyAnswersQuery = {
        surveyName : props.surveyName,
        resultIdentifier : [props.dateRecordedResultIdentifier, props.severityResultIdentifier]
    }
    const [datePagerMonth, setMonth] = useState<Date>(startOfMonth(new Date()));
    const [data, setData] = useState<Map<string, SwellingDay> | undefined>();

    async function initialize(){
        if (!data){
            if (props.previewState && props.previewState == "NoData")
            {
                transformToCalendarData([]);
            } else {
                if (props.previewState && props.previewState == "WithData"){
                    transformToCalendarData(previewSwellingData);
                }
                else
                {
                    surveyResults(surveyAnswerQuery).then((results: SurveyAnswer[]) => {
                        transformToCalendarData(results);
                    });
                }
            }
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
        let key : string = startOfDay(date).toDateString();
        return (data && data?.get(key)?.severity) ?? "";
    };

    function transformToCalendarData(results : SurveyAnswer[]){
        var swellingEntries : Map<Guid, SwellingDay> = createResultsMap(results);

        var calendarData : Map<string, SwellingDay> = new Map<string, SwellingDay>();
        swellingEntries.forEach( swellingEntry => {
            let key : string = startOfDay(parseISO(swellingEntry.dateRecorded)).toDateString();
            let exists = calendarData.get(key);
            if (exists){
                if (parseISO(swellingEntry.dateRecorded) > parseISO(exists.dateRecorded)){
                    exists.severity = swellingEntry.severity;
                    calendarData.set(key, exists);
                }
            }
            else {
                calendarData.set(key, swellingEntry);
            }
        });

        setData(calendarData);
    }

    function createResultsMap(results : SurveyAnswer[]){
        var groupedByResult = new  Map<Guid, SwellingDay>();

        results.forEach( (r) => {
            var exists = groupedByResult.get(r.surveyResultID);
            var swellingDay = exists ?? {dateRecorded : "", severity : ""};

            if (r.resultIdentifier === props.dateRecordedResultIdentifier && r.answers)
            {
                swellingDay.dateRecorded = r.answers[0];
            }

            if (r.resultIdentifier === props.severityResultIdentifier && r.answers)
            {
                var severity = "";
                switch (r.answers[0]){
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

                    swellingDay.severity = severity;
            }

            groupedByResult.set(r.surveyResultID, swellingDay);
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

    function pageMonth(newStart: Date) {
        setMonth(startOfMonth(newStart));
    } 


    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);

        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
        }
    }, []);


    if (!data){
        return <LoadingIndicator/>
    }
    else {
        return <>
            <DateRangeNavigator intervalType={"Month"} intervalStart={datePagerMonth} onIntervalChange={pageMonth}></DateRangeNavigator>
            <Calendar className="mdhui-simple-calendar" year={datePagerMonth.getFullYear()} month={datePagerMonth.getMonth()} dayRenderer={renderDay}/>
            <Button defaultMargin onClick={() => MyDataHelps.startSurvey(props.surveyName)}>{language("log-swelling")} <FontAwesomeSvgIcon icon={faPlus} /></Button>
        </>
    }
} 