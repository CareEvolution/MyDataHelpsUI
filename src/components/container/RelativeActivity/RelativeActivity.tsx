import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { startOfDay } from "date-fns";
import React, { useContext } from "react";
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

    let dataTypes: RelativeActivityDataType[] = props.dataTypes || [];
    if (props.useContext && relativeActivityContext?.dataTypes) {
        dataTypes = relativeActivityContext.dataTypes;
    }

    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    function loadData() {
        function transformResults(results: { [key: string]: { [key: string]: RelativeActivityQueryResult } } | undefined) {
            if (!results) return;
            let computedResult: { [key: string]: RelativeActivityQueryResult } = {};
            dataTypes.forEach(dataType => {
                computedResult[dataType.dailyDataType] = results[dataType.dailyDataType][getDayKey(date!)];
            });
            return computedResult;
        }

        setResults(undefined);
        if (props.useContext) {
            setResults(transformResults(relativeActivityContext!.data));
            return;
        }
        queryRelativeActivity(date!, date!, dataTypes, !!props.previewState).then(results => {
            setResults(transformResults(results));
        });
    }

    useInitializeView(() => {
        loadData();
    }, ["externalAccountSyncComplete"], [dateRangeContext, relativeActivityContext, props.date, props.dataTypes], 0);

    if (results == null || !Object.keys(results).length) {
        return null;
    }

    function getBarColor(dataType: RelativeActivityDataType, fillPercent: number) {
        if (dataType.threshold !== undefined && dataType.overThresholdColor && fillPercent > .5) {
            return dataType.overThresholdColor;
        }
        return dataType.color || "var(--mdhui-color-primary)";
    }

    function getThresholdLabel(dataType: RelativeActivityDataType, threshold: number) {
        if (!dataTypes.some(d => d.threshold !== undefined)) {
            return undefined;
        }

        let dataTypeDefinition = getDailyDataTypeDefinition(dataType.dailyDataType);
        return dataTypeDefinition.formatter(threshold);
    }

    return <div ref={props.innerRef} className="mdhui-relative-activity">
        {props.title && <CardTitle title={props.title} />}
        {dataTypes.map(d => {
            let dataTypeResult = results![d.dailyDataType];
            if (!dataTypeResult) {
                return null;
            }
            let dataTypeDefinition = getDailyDataTypeDefinition(d.dailyDataType);

            return <div key={d.dailyDataType} className="mdhui-relative-activity-datatype">
                <ActivityMeter className="mdhui-relative-activity-meter"
                    label={dataTypeDefinition.getLabel()}
                    value={dataTypeDefinition.formatter(dataTypeResult.value) || dataTypeResult.value.toString()}
                    fillPercent={dataTypeResult.relativePercent}
                    averageFillPercent={0.5}
                    icon={dataTypeDefinition.icon}
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