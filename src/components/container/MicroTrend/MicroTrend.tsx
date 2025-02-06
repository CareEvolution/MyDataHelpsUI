import React, { useContext, useState } from "react"
import { getDailyDataTypeDefinition, getDayKey, language, queryRelativeActivity, RelativeActivityDataType, RelativeActivityQueryResult, resolveColor, useInitializeView } from "../../../helpers"
import { DateRangeContext, LayoutContext, SparkBarChart, SparkBarChartBar } from "../../presentational"
import { add, startOfDay } from "date-fns"
import "./MicroTrend.css"

export interface MicroTrendProps {
    date?: Date
    dataType: RelativeActivityDataType
    previewState?: "default"
    innerRef?: React.Ref<HTMLDivElement>
    hideIfNoRecentData?: boolean
}

export default function MicroTrend(props: MicroTrendProps) {
    let context = useContext(LayoutContext);
    let [results, setResults] = useState<{ [key: string]: RelativeActivityQueryResult } | undefined>(undefined);
    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    function loadData() {
        queryRelativeActivity(add(date, { days: -6 }), date, [props.dataType], !!props.previewState).then(results => {
            setResults(results[props.dataType.dailyDataType]);
        });
    }

    useInitializeView(loadData, ["externalAccountSyncComplete"]);

    if (!results) {
        return null;
    }

    const hasRecentData = Object.keys(results).some(k => results[k].value > 0);
    // if no results in the last 7 days, don't render
    if (props.hideIfNoRecentData && !hasRecentData) {
        return null;
    }

    let definition = getDailyDataTypeDefinition(props.dataType.dailyDataType);
    let formatter = props.dataType.formatter ?? definition.formatter;
    let formattedValue = "--";
    let noData = true;
    if (results![getDayKey(new Date())]?.value) {
        formattedValue = formatter(results![getDayKey(new Date())].value);
        noData = false;
    }

    var bars: SparkBarChartBar[] = [];
    for (var i = -6; i <= 0; i++) {
        let dayKey = getDayKey(add(new Date(), { days: i }));
        let dayData = results[dayKey];
        let value = dayData?.value ?? 0;
        let threshold = dayData?.threshold ?? 0;
        let relativePercent = dayData?.relativePercent ?? 0;
        bars.push({
            barFillPercent: relativePercent,
            color: (value > threshold ? (props.dataType.overThresholdColor ?? props.dataType.color) : props.dataType.color) || "var(--mdhui-color-primary)"
        });
    }

    let iconColor = resolveColor(context.colorScheme, props.dataType.color) || "var(--mdhui-color-primary)";
    if (noData) {
        iconColor = "var(--mdhui-text-color-3)";
    }

    return <div ref={props.innerRef} className="mdhui-micro-trend" key={props.dataType.dailyDataType}>
        <div className="mdhui-micro-trend-label">
            {language(getDailyDataTypeDefinition(props.dataType.dailyDataType).labelKey!)}
        </div>
        <div className="mdhui-micro-trend-info">
            <span className="mdhui-micro-trend-value">
                <span style={{ color: iconColor }}>{props.dataType.icon ?? getDailyDataTypeDefinition(props.dataType.dailyDataType).icon}</span>
                &nbsp;<span style={{ color: noData ? "var(--mdhui-text-color-3)" : undefined }}>{formattedValue}</span>
            </span>
            <div className="mdhui-micro-trend-chart">
                {hasRecentData &&
                    <SparkBarChart style={{ height: "100%" }} bars={bars} averageFillPercent={0.5} />
                }
            </div>
        </div>
    </div>
}