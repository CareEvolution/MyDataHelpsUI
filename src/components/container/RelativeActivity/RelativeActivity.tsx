import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { add, startOfDay } from "date-fns";
import React, { useContext } from "react";
import { useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import getDayKey from "../../../helpers/get-day-key";
import { DailyDataQueryResult, getDailyDataTypeDefinition, queryDailyData } from "../../../helpers/query-daily-data";
import { ActivityMeter, CardTitle, DateRangeContext, } from "../../presentational";
import "./RelativeActivity.css"
import language from "../../../helpers/language";
import { useInitializeView } from "../../../helpers/Initialization";
import { ColorDefinition } from "../../../helpers/colors";
import { RelativeActivityContext } from "../RelativeActivityWeekCoordinator/RelativeActivityWeekCoordinator";
import { DailyDataType } from "../../../helpers/daily-data-types";

export interface RelativeActivityProps {
    dataTypes: RelativeActivityDataType[];
    useDataTypesFromContext?: boolean;
    previewState?: "Default";
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>
    specifyThresholds?: boolean;
    date?: Date;
}

export interface RelativeActivityDataType {
    dailyDataType: DailyDataType;
    color?: ColorDefinition;
    overThresholdColor?: ColorDefinition;
    threshold?: number;
}

interface RelativeActivityResult {
    dataType: RelativeActivityDataType;
    fillPercent: number;
    value: string;
}

export default function (props: RelativeActivityProps) {
    let [result, setResults] = useState<RelativeActivityResult[] | null>(null);
    let dataTypeContext = useContext(RelativeActivityContext);

    let dataTypes: RelativeActivityDataType[] = props.dataTypes;
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
        function queryData() {
            let startDate = add(date!, { days: -31 });
            if (props.specifyThresholds) {
                startDate = add(date!, { days: -1 });
            }
            let promises = props.dataTypes.map(dataType => queryDailyData(dataType.dailyDataType, startDate, add(date!, { days: 1 }), !!props.previewState));
            return Promise.all(promises);
        }

        queryData().then(results => {
            let dailyData: { [key: string]: DailyDataQueryResult } = {};
            results.forEach((result, index) => {
                dailyData[props.dataTypes[index].dailyDataType] = result;
            });

            let computedResults: RelativeActivityResult[] = [];
            let dayKey = getDayKey(date!);
            props.dataTypes.forEach(dataType => {
                let data = dailyData![dataType.dailyDataType];
                if (!data || !data[dayKey]) {
                    return;
                }
                if (props.specifyThresholds && !dataType.threshold) {
                    return;
                }

                let threshold = dataType.threshold;
                if (!props.specifyThresholds) {
                    let sumValues = 0;
                    let totalValues = 0;
                    for (var i = 1; i < 31; i++) {
                        let key = getDayKey(add(date!, { days: -i }));
                        if (data[key] !== undefined) {
                            sumValues += data[key];
                            totalValues++;
                        }
                    }

                    if (totalValues >= 5) {
                        threshold = sumValues / totalValues;
                    }
                }

                if (threshold == undefined) { return; }

                let fillPercent = data[dayKey] / (threshold * 2);
                if (fillPercent > 1) { fillPercent = 1; }
                computedResults.push({
                    dataType: dataType,
                    fillPercent: fillPercent,
                    value: getDailyDataTypeDefinition(dataType.dailyDataType).formatter(data[dayKey])
                });
                setResults(computedResults);
            });
        });
    }

    useInitializeView(() => {
        loadData();
    }, ["externalAccountSyncComplete"], [dateRangeContext, props.date, props.dataTypes], 0);

    if (result == null || !result.length) {
        return null;
    }

    function getColor(dataType: RelativeActivityDataType, fillPercent: number) {
        if (props.specifyThresholds && dataType.overThresholdColor && fillPercent > .5) {
            return dataType.overThresholdColor;
        }
        return dataType.color || "var(--mdhui-color-primary)";
    }

    return <div ref={props.innerRef} className="mdhui-relative-activity">
        {props.title && <CardTitle title={props.title} />}
        {result.map(c => <div key={c.dataType.dailyDataType} className="mdhui-relative-activity-datatype">
            <ActivityMeter className="mdhui-relative-activity-meter"
                label={getDailyDataTypeDefinition(c.dataType.dailyDataType).getLabel()}
                value={c.value}
                fillPercent={c.fillPercent}
                averageFillPercent={0.5}
                icon={getDailyDataTypeDefinition(c.dataType.dailyDataType).icon}
                color={getColor(c.dataType, c.fillPercent)} />
            {c.dataType.threshold !== undefined &&
                <div className="mdhui-relative-activity-threshold">
                    {getDailyDataTypeDefinition(c.dataType.dailyDataType).formatter(c.dataType.threshold)}
                    <div>
                        <FontAwesomeSvgIcon icon={faChevronDown} />
                    </div>
                </div>
            }
        </div>
        )}

        {!props.specifyThresholds &&
            <div className="mdhui-relative-activity-average-marker">
                <div>
                    <FontAwesomeSvgIcon icon={faChevronUp} />
                </div>
                {language("30-day-average")}
            </div>
        }
    </div>
}