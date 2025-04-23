import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { startOfDay } from "date-fns";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import getDayKey from "../../../helpers/get-day-key";
import { getDailyDataTypeDefinition } from "../../../helpers/query-daily-data";
import { ActivityMeter, CardTitle, DateRangeContext, } from "../../presentational";
import "./RelativeActivity.css"
import language from "../../../helpers/language";
import { useInitializeView } from "../../../helpers/Initialization";
import { RelativeActivityContext } from "../RelativeActivityDayCoordinator/RelativeActivityDayCoordinator";
import { RelativeActivityDataType, RelativeActivityQueryResult } from "../../../helpers";
import { queryRelativeActivity } from "../../../helpers/relative-activity";

export interface RelativeActivityProps {
    dataTypes?: RelativeActivityDataType[];
    useContext?: boolean;
    previewState?: "Default";
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>
    date?: Date;
}

export default function (props: RelativeActivityProps) {
    let [results, setResults] = useState<{ [key: string]: RelativeActivityQueryResult } | undefined>(undefined);
    let relativeActivityContext = useContext(RelativeActivityContext);
    let currentRequestID = useRef<number>(0);

    let dataTypes: RelativeActivityDataType[] = props.dataTypes || [];
    if (props.useContext && relativeActivityContext?.dataTypes) {
        dataTypes = [...relativeActivityContext.dataTypes];
    }

    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    function loadData() {
        function transformResults(results: { [key: string]: { [key: string]: RelativeActivityQueryResult } } | undefined) {
            if (!results) return;
            let transformedResults: { [key: string]: RelativeActivityQueryResult } = {};
            dataTypes.forEach(dataType => {
                if (results[dataType.dailyDataType]?.[getDayKey(date)]?.value) {
                    transformedResults[dataType.dailyDataType] = results[dataType.dailyDataType][getDayKey(date)];
                }
            });
            return transformedResults;
        }

        setResults(undefined);
        if (props.useContext) {
            if (!relativeActivityContext?.data) {
                return;
            }
            setResults(transformResults(relativeActivityContext!.data));
            return;
        }

        //prevent requests from returning back out of order, since some of these can be long running
        let requestID = ++currentRequestID.current;
        queryRelativeActivity(date, date, dataTypes, !!props.previewState).then(results => {
            if (requestID == currentRequestID.current) {
                setResults(transformResults(results));
            }
        });
    }

    useInitializeView(() => {
        loadData();
    }, ["externalAccountSyncComplete"], [dateRangeContext, relativeActivityContext, props.date, props.dataTypes]);

    if (!results || !Object.keys(results).length) {
        return null;
    }

    function getBarColor(dataType: RelativeActivityDataType, fillPercent: number) {
        if (dataType.threshold !== undefined && dataType.overThresholdColor && fillPercent > .5) {
            return dataType.overThresholdColor;
        }
        return dataType.color || "var(--mdhui-color-primary)";
    }

    function getThresholdLabel(dataType: RelativeActivityDataType, threshold: number) {
        if (dataTypes.every(d => d.threshold === undefined)) {
            return undefined;
        }

        let dataTypeDefinition = getDailyDataTypeDefinition(dataType.dailyDataType);
        return dataTypeDefinition.formatter(threshold);
    }

    return <div ref={props.innerRef} className="mdhui-relative-activity">
        {props.title && <CardTitle title={props.title} />}
        {dataTypes.map(d => {
            let dataTypeResult = results![d.dailyDataType];
            if (!dataTypeResult || dataTypeResult.threshold === undefined || dataTypeResult.relativePercent === undefined) {
                return null;
            }
            let dataTypeDefinition = getDailyDataTypeDefinition(d.dailyDataType);
            let formatter = d.formatter || dataTypeDefinition.formatter;

            return <div key={d.dailyDataType} className="mdhui-relative-activity-datatype">
                <ActivityMeter className="mdhui-relative-activity-meter"
                    label={d.label || (dataTypeDefinition.labelKey ? language(dataTypeDefinition.labelKey) : d.dailyDataType)}
                    value={formatter(dataTypeResult.value)}
                    fillPercent={dataTypeResult.relativePercent}
                    averageFillPercent={0.5}
                    icon={d.icon || dataTypeDefinition.icon}
                    color={getBarColor(d, dataTypeResult.relativePercent)}
                    thresholdLabel={getThresholdLabel(d, dataTypeResult.threshold)} />
            </div>
        })}

        {dataTypes.every(d => d.threshold === undefined) &&
            <div className="mdhui-relative-activity-average-marker">
                <div>
                    <FontAwesomeSvgIcon icon={faChevronUp} />
                </div>
                {language("30-day-average")}
            </div>
        }
    </div>
}