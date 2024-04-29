import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
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
import { RelativeActivityContext } from "../RelativeActivityWeekCoordinator/RelativeActivityWeekCoordinator";
import { RelativeActivityDataType, RelativeActivityQueryResult } from "../../../helpers";
import queryRelativeActivity from "../../../helpers/relative-activity";

export interface RelativeActivityProps {
    dataTypes: RelativeActivityDataType[];
    useDataTypesFromContext?: boolean;
    previewState?: "Default";
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>
    date?: Date;
}

export default function (props: RelativeActivityProps) {
    let [results, setResults] = useState<{ [key: string]: RelativeActivityQueryResult } | null>(null);
    let dataTypeContext = useContext(RelativeActivityContext);

    let dataTypes: RelativeActivityDataType[] = [...props.dataTypes];
    if (props.useDataTypesFromContext && dataTypeContext?.dataTypes) {
        dataTypes = dataTypeContext.dataTypes;
    }

    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date;
    if (!date && dateRangeContext) {
        date = dateRangeContext.intervalStart;
    } else if (!date) {
        date = startOfDay(new Date());
    }

    function loadData() {
        setResults(null);
        queryRelativeActivity(date!, date!, dataTypes, !!props.previewState).then(results => {
            let computedResult: { [key: string]: RelativeActivityQueryResult } = {};
            dataTypes.forEach(dataType => {
                computedResult[dataType.dailyDataType] = results[dataType.dailyDataType][getDayKey(date!)];
            });
            setResults(computedResult);
        });
    }

    useInitializeView(() => {
        loadData();
    }, ["externalAccountSyncComplete"], [dateRangeContext, dataTypeContext, props.date, props.dataTypes], 0);

    if (results == null || !results.length) {
        return null;
    }

    function getColor(dataType: RelativeActivityDataType, fillPercent: number) {
        if (dataType.threshold !== undefined && dataType.overThresholdColor && fillPercent > .5) {
            return dataType.overThresholdColor;
        }
        return dataType.color || "var(--mdhui-color-primary)";
    }

    return <div ref={props.innerRef} className="mdhui-relative-activity">
        {props.title && <CardTitle title={props.title} />}
        {dataTypes.map(d => {
            let dataTypeResult = results![d.dailyDataType];
            if (!dataTypeResult) {
                return null;
            }
            let dataTypeDefinition = getDailyDataTypeDefinition(d.dailyDataType);
            if (!dataTypeDefinition) {
                return null;
            }

            return <div key={d.dailyDataType} className="mdhui-relative-activity-datatype">
                <ActivityMeter className="mdhui-relative-activity-meter"
                    label={dataTypeDefinition.getLabel()}
                    value={dataTypeDefinition.formatter(dataTypeResult.value) || dataTypeResult.value.toString()}
                    fillPercent={dataTypeResult.relativePercent}
                    averageFillPercent={0.5}
                    icon={dataTypeDefinition.icon}
                    color={getColor(d, dataTypeResult.relativePercent)} />
                {dataTypes.some(d => d.threshold !== undefined) &&
                    <div className="mdhui-relative-activity-threshold">
                        {d.threshold}
                        <div>
                            <FontAwesomeSvgIcon icon={faChevronDown} />
                        </div>
                    </div>
                }
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