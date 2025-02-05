import React, { useContext, useState } from "react"
import { getDailyDataTypeDefinition, getDayKey, language, queryRelativeActivity, RelativeActivityDataType, RelativeActivityQueryResult, resolveColor, useInitializeView } from "../../../helpers"
import { DateRangeContext, LayoutContext, SparkBarChart, SparkBarChartBar } from "../../presentational"
import { add, startOfDay } from "date-fns"
import "../HealthPreviewSection/HealthPreviewSection.css"
import "./DeviceActivityPreview.css"

export interface DeviceActivityPreviewProps {
    date?: Date
    dataType: RelativeActivityDataType
    previewState?: "default"
    innerRef?: React.Ref<HTMLDivElement>
}

export default function DeviceActivityPreview(props: DeviceActivityPreviewProps) {
    let context = useContext(LayoutContext);
    let [results, setResults] = useState<{ [key: string]: RelativeActivityQueryResult } | undefined>(undefined);
    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    function loadData() {
        //prevent requests from returning back out of order, since some of these can be long running
        queryRelativeActivity(add(date, { days: -6 }), date, [props.dataType], !!props.previewState).then(results => {
            setResults(results[props.dataType.dailyDataType]);
        });
    }

    useInitializeView(loadData, ["externalAccountSyncComplete"]);

    if (!results) {
        return null;
    }

    let definition = getDailyDataTypeDefinition(props.dataType.dailyDataType);
    let value = results![getDayKey(new Date())].value;
    let formatter = props.dataType.formatter ?? definition.formatter;
    var bars: SparkBarChartBar[] = [];
    for (var i = -6; i <= 0; i++) {
        let dayKey = getDayKey(add(new Date(), { days: i }));
        let dayData = results[dayKey];
        bars.push({
            barFillPercent: dayData.relativePercent,
            color: (dayData.value > dayData.threshold ? (props.dataType.overThresholdColor ?? props.dataType.color) : props.dataType.color) || "var(--mdhui-color-primary)"
        });
    }

    return <div ref={props.innerRef} className="mdhui-device-activity-preview" key={props.dataType.dailyDataType}>
        <div className="mdhui-device-activity-preview-info">
            <div className="mdhui-device-activity-preview-label">
                {language(getDailyDataTypeDefinition(props.dataType.dailyDataType).labelKey!)}
            </div>
            <span className="mdhui-device-activity-preview-value">
                <span style={{ color: resolveColor(context.colorScheme, props.dataType.color) || "var(--mdhui-color-primary)" }}>{props.dataType.icon ?? getDailyDataTypeDefinition(props.dataType.dailyDataType).icon}</span>
                &nbsp;{formatter(value)}
            </span>
        </div>
        <div className="mdhui-device-activity-preview-chart">
            <SparkBarChart style={{ height: "100%" }} bars={bars} averageFillPercent={0.5} />
        </div>
    </div>
}