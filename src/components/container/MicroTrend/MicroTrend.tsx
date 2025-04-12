import React, { useContext, useEffect, useState } from "react"
import { getDailyDataTypeDefinition, getDayKey, language, queryRelativeActivity, RelativeActivityDataType, RelativeActivityQueryResult, resolveColor, useInitializeView } from "../../../helpers"
import { DateRangeContext, LayoutContext, SparkBarChart, SparkBarChartBar, UnstyledButton } from "../../presentational"
import { add, startOfDay } from "date-fns"
import "./MicroTrend.css"

export interface MicroTrendProps {
    date?: Date
    dataType: RelativeActivityDataType
    previewState?: "default" | "noTrend"
    innerRef?: React.Ref<HTMLDivElement>
    hideIfNoRecentData?: boolean
    onClick?: () => void
}

export default function MicroTrend(props: MicroTrendProps) {
    const context = useContext(LayoutContext);
    const [results, setResults] = useState<{ [key: string]: RelativeActivityQueryResult } | undefined>(undefined);
    const dateRangeContext = useContext(DateRangeContext);
    const date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());
    const chartRef = React.useRef<HTMLDivElement>(null);
    const [barsToDisplay, setBarsToDisplay] = useState<number | null>(null);

    useEffect(() => {
        let calculateBars = () => {
            let chartWidth = chartRef.current?.clientWidth;
            if (!chartWidth) { return 7 }
            let approximateBarWidth = 24;
            setBarsToDisplay(Math.floor(chartWidth / approximateBarWidth));
        }
        window.addEventListener("resize", calculateBars);
        calculateBars();
        return () => {
            window.removeEventListener("resize", calculateBars)
        }
    }, []);

    function loadData() {
        if (barsToDisplay === null) { return; }
        if (props.previewState === "noTrend") {
            setResults({
                [getDayKey(date)]: {
                    value: 5000
                }
            });
        } else {
            queryRelativeActivity(add(date, { days: -6 }), date, [props.dataType], !!props.previewState).then(results => {
                setResults(results[props.dataType.dailyDataType]);
            });
        }

        queryRelativeActivity(add(date, { days: -1 * barsToDisplay }), date, [props.dataType], !!props.previewState).then(results => {
            setResults(results[props.dataType.dailyDataType]);
        });
    }

    useInitializeView(loadData, ["externalAccountSyncComplete"], [barsToDisplay]);

    if (!barsToDisplay) {
        return <div ref={chartRef} />;
    }

    if (!results) {
        return null;
    }

    const hasRecentData = Object.values(results).some(r => r.value > 0 && r.threshold !== undefined);
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
    for (var i = -1 * barsToDisplay; i <= 0; i++) {
        const dayKey = getDayKey(add(date, { days: i }));
        const dayData = results[dayKey];
        const value = dayData?.value ?? 0;
        const threshold = dayData?.threshold ?? 0;
        const relativePercent = dayData?.relativePercent ?? 0;
        bars.push({
            barFillPercent: relativePercent,
            color: (value > threshold ? (props.dataType.overThresholdColor ?? props.dataType.color) : props.dataType.color) || "var(--mdhui-color-primary)",
            opacity: (i === 0 ? 1 : 0.4)
        });
    }

    let iconColor = resolveColor(context.colorScheme, props.dataType.color) || "var(--mdhui-color-primary)";
    if (noData) {
        iconColor = "var(--mdhui-text-color-3)";
    }

    function getInnerComponents() {
        return <>
            <div className="mdhui-micro-trend-label" style={{ color: iconColor }}>
                {language(getDailyDataTypeDefinition(props.dataType.dailyDataType).labelKey!)}
            </div>
            <div className="mdhui-micro-trend-icon">{props.dataType.icon ?? getDailyDataTypeDefinition(props.dataType.dailyDataType).icon}</div>
            <div style={{ color: noData ? "var(--mdhui-text-color-3)" : undefined }} className="mdhui-micro-trend-value">
                {formattedValue}
            </div>
            <div ref={chartRef} className="mdhui-micro-trend-chart">
                {hasRecentData &&
                    <SparkBarChart variant="rounded" gap={4} style={{ height: "100%" }} bars={bars} averageFillPercent={0.5} />
                }
            </div>
        </>
    }

    if (props.onClick) {
        return <div ref={props.innerRef} key={props.dataType.dailyDataType}>
            <UnstyledButton className="mdhui-micro-trend" onClick={props.onClick}>
                {getInnerComponents()}
            </UnstyledButton>
        </div>
    }

    return <div ref={props.innerRef} className="mdhui-micro-trend" key={props.dataType.dailyDataType}>
        {getInnerComponents()}
    </div>
}