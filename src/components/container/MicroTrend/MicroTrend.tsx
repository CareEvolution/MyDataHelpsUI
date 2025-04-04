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
    const context = useContext(LayoutContext);
    const [results, setResults] = useState<{ [key: string]: RelativeActivityQueryResult } | undefined>(undefined);
    const dateRangeContext = useContext(DateRangeContext);
    const date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    function loadData() {
        queryRelativeActivity(add(date, { days: -6 }), date, [props.dataType], !!props.previewState).then(results => {
            setResults(results[props.dataType.dailyDataType]);
        });
    }

    useInitializeView(loadData, ["externalAccountSyncComplete"]);

    if (!results) {
        return null;
    }

    const hasRecentData = Object.values(results).some(r => r.value > 0);
    if (props.hideIfNoRecentData && !hasRecentData) {
        return null;
    }

    const definition = getDailyDataTypeDefinition(props.dataType.dailyDataType);
    const formatter = props.dataType.formatter ?? definition.formatter;
    const todayKey = getDayKey(date);
    const todayValue = results[todayKey]?.value ?? 0;
    const noData = todayValue === 0;
    const formattedValue = noData ? "--" : formatter(todayValue);

    const bars: SparkBarChartBar[] = [];
    for (var i = -6; i <= 0; i++) {
        const dayKey = getDayKey(add(date, { days: i }));
        const dayData = results[dayKey];
        const value = dayData?.value ?? 0;
        const threshold = dayData?.threshold ?? 0;
        const relativePercent = dayData?.relativePercent ?? 0;
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