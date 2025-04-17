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
    chartPosition?: "bottom" | "right" | "responsive"
    indicator?: React.ReactNode
}

export default function MicroTrend(props: MicroTrendProps) {
    const context = useContext(LayoutContext);
    const [results, setResults] = useState<{ [key: string]: RelativeActivityQueryResult } | undefined>(undefined);
    const dateRangeContext = useContext(DateRangeContext);
    const date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());
    const widthReferenceRef = React.useRef<HTMLDivElement>(null);
    const [barsToDisplay, setBarsToDisplay] = useState<number | null>(null);
    const [chartPosition, setChartPosition] = useState<"right" | "bottom">("bottom");

    useEffect(() => {
        function getChartPosition(): "right" | "bottom" {
            if (props.chartPosition === "bottom" || props.chartPosition === "right") {
                return props.chartPosition;
            }
            if (!props.chartPosition || props.chartPosition !== "responsive") {
                return "bottom";
            }
            let chartWidth = widthReferenceRef.current?.clientWidth;
            if (!chartWidth) { return "bottom"; }
            if (chartWidth < 150) {
                return "bottom";
            }
            return "right";
        }

        let calculateBars = () => {
            let chartWidth = widthReferenceRef.current?.clientWidth;
            const approximateBarWidth = 24;
            if (!chartWidth) { return 7; }
            let chartPosition = getChartPosition();
            if (chartPosition === "right") {
                chartWidth = chartWidth / 2;
            }
            setChartPosition(chartPosition);
            setBarsToDisplay(Math.floor(chartWidth / approximateBarWidth));
        }
        // window.addEventListener("resize", calculateBars);
        calculateBars();
        // return () => {
        //     window.removeEventListener("resize", calculateBars)
        // }
    }, [props.chartPosition]);

    function loadData() {

        if (barsToDisplay === null) { return; }
        if (props.previewState === "noTrend") {

            setResults({
                [getDayKey(date)]: {
                    value: 5000
                }
            });
        } else {
            queryRelativeActivity(add(date, { days: -1 * barsToDisplay }), date, [props.dataType], !!props.previewState).then(results => {
                setResults(results[props.dataType.dailyDataType]);
            });
        }
    }

    useInitializeView(loadData, ["externalAccountSyncComplete"], [barsToDisplay, props.dataType, props.previewState, props.date, dateRangeContext?.intervalStart]);

    if (!barsToDisplay) {
        //return an empty div initially so we have a ref to calculate the size of the chart
        return <div ref={widthReferenceRef} />;
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
                {props.dataType.icon ?? getDailyDataTypeDefinition(props.dataType.dailyDataType).icon}&nbsp;
                {props.dataType.label ?? language(getDailyDataTypeDefinition(props.dataType.dailyDataType).labelKey!)}
            </div>
            <div style={{ color: noData ? "var(--mdhui-text-color-3)" : undefined }} className="mdhui-micro-trend-value">
                {formattedValue}
            </div>
            <div ref={widthReferenceRef} className="mdhui-micro-trend-chart">
                {hasRecentData &&
                    <SparkBarChart variant="rounded" gap={4} style={{ height: "100%" }} bars={bars} averageFillPercent={0.5} />
                }
            </div>
            {props.indicator &&
                <div className="mdhui-micro-trend-indicator">
                    {props.indicator}
                </div>
            }
        </>
    }

    let classes = ["mdhui-micro-trend"];
    if (chartPosition === "right") {
        classes.push("mdhui-micro-trend-chart-right");
    }
    if (props.indicator) {
        classes.push("mdhui-micro-trend-has-indicator");
    }

    if (props.onClick) {
        return <div ref={props.innerRef} key={props.dataType.dailyDataType}>
            <UnstyledButton className={classes.join(" ")} onClick={props.onClick}>
                <div ref={widthReferenceRef}>
                    {getInnerComponents()}
                </div>
            </UnstyledButton>
        </div>
    }

    return <div ref={props.innerRef} className={classes.join(" ")} key={props.dataType.dailyDataType}>
        <div ref={widthReferenceRef}>
            {getInnerComponents()}
        </div>
    </div>
}