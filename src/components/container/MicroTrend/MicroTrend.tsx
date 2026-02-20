import React, { ReactElement, ReactNode, Ref, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ColorDefinition, getDailyDataTypeDefinition, getDayKey, isSurveyDataType, language, RelativeActivityDataType, resolveColor, useInitializeView } from "../../../helpers";
import { DateRangeContext, LayoutContext, SparkBarChart, SparkBarChartBar, UnstyledButton } from "../../presentational";
import { add, startOfToday } from "date-fns";
import "./MicroTrend.css";
import { debounce } from "lodash";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faList, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { isMicroTrendDataType, loadMicroTrendData, MicroTrendDataType, MicroTrendResults } from "../../../helpers/micro-trend";

export interface MicroTrendProps {
    previewState?: "default" | "noTrend" | "loading";
    date?: Date;
    dataType: RelativeActivityDataType | MicroTrendDataType;
    hideIfNoRecentData?: boolean;
    chartPosition?: "bottom" | "right" | "responsive";
    indicator?: ReactNode;
    onClick?: () => void;
    innerRef?: Ref<HTMLDivElement>;
}

export default function MicroTrend(props: MicroTrendProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [results, setResults] = useState<MicroTrendResults>();
    const [barsToDisplay, setBarsToDisplay] = useState<number>();
    const [chartPosition, setChartPosition] = useState<"right" | "bottom">("bottom");

    const widthReferenceRef = useRef<HTMLDivElement>(null);

    const date = useMemo<Date>(() => {
        return props.date ?? dateRangeContext?.intervalStart ?? startOfToday();
    }, [props.date, dateRangeContext?.intervalStart, getDayKey(new Date())]);

    // This is for backward compatibility.
    // If existing code is using a RelativeActivityDataType, we convert it.
    const dataType = useMemo<MicroTrendDataType>(() => {
        if (isMicroTrendDataType(props.dataType)) {
            return props.dataType;
        }
        return {
            icon: props.dataType.icon,
            rawDataType: props.dataType.dailyDataType,
            label: props.dataType.label,
            color: props.dataType.color,
            threshold: props.dataType.threshold,
            overThresholdColor: props.dataType.overThresholdColor,
            formatter: props.dataType.formatter
        };
    }, [props.dataType]);

    const icon = useMemo<ReactElement>(() => {
        if (dataType.icon) {
            return dataType.icon;
        }
        if (isSurveyDataType(dataType.rawDataType)) {
            return <FontAwesomeSvgIcon icon={faList} />;
        }
        return getDailyDataTypeDefinition(dataType.rawDataType).icon;
    }, [dataType.icon, dataType.rawDataType]);

    const label = useMemo<string>(() => {
        if (dataType.label) {
            return dataType.label;
        }
        if (isSurveyDataType(dataType.rawDataType)) {
            const { surveyName, stepIdentifier, resultIdentifier } = dataType.rawDataType;
            return resultIdentifier || stepIdentifier || surveyName || "Survey";
        }
        const dataTypeDefinition = getDailyDataTypeDefinition(dataType.rawDataType);
        return dataTypeDefinition.labelKey ? language(dataTypeDefinition.labelKey) : dataType.rawDataType;
    }, [dataType.label, dataType.rawDataType]);

    const formatter = useMemo<(value: number) => string>(() => {
        if (dataType.formatter) {
            return dataType.formatter;
        }
        if (isSurveyDataType(dataType.rawDataType)) {
            return (value: number) => value.toString();
        }
        return getDailyDataTypeDefinition(dataType.rawDataType).formatter;
    }, [dataType.formatter, dataType.rawDataType]);

    const dataTypeKey = useMemo<string>(() => {
        if (isSurveyDataType(dataType.rawDataType)) {
            const { surveyName, stepIdentifier, resultIdentifier, useEventAsDate } = dataType.rawDataType;
            return `${surveyName}-${stepIdentifier}-${resultIdentifier}-${useEventAsDate}`;
        }
        return dataType.rawDataType;
    }, [dataType.rawDataType]);

    useEffect(() => {
        const calculateBars = () => {
            const clientWidth = widthReferenceRef.current?.clientWidth;
            if (!clientWidth) return;

            const getChartPosition = (): "right" | "bottom" => {
                if (props.chartPosition === "bottom" || props.chartPosition === "right") {
                    return props.chartPosition;
                }
                if (!props.chartPosition || props.chartPosition !== "responsive") {
                    return "bottom";
                }
                const chartWidth = widthReferenceRef.current?.clientWidth;
                return !chartWidth || chartWidth < 150 ? "bottom" : "right";
            };

            const chartPosition = getChartPosition();
            const chartWidth = chartPosition === "right" ? clientWidth / 2 : clientWidth;
            const approximateBarWidth = 24;

            setChartPosition(chartPosition);
            setBarsToDisplay(Math.floor(chartWidth / approximateBarWidth));
        };

        const debouncedCalculateBars = debounce(calculateBars, 1000);
        window.addEventListener("resize", debouncedCalculateBars);
        calculateBars();
        return () => {
            window.removeEventListener("resize", debouncedCalculateBars);
        };
    }, [props.chartPosition]);

    useInitializeView(() => {
        if (barsToDisplay === undefined) return;
        if (props.previewState === "noTrend") {
            setResults({ [getDayKey(date)]: { value: 5000 } });
        } else if (props.previewState !== "loading") {
            loadMicroTrendData(dataType, date, barsToDisplay, !!props.previewState).then(setResults);
        }
    }, ["externalAccountSyncComplete"], [barsToDisplay, props.previewState, date, dataType]);

    if (!barsToDisplay) {
        // Return an empty div initially so we have a ref to calculate the size of the chart.
        return <div ref={widthReferenceRef} />;
    }

    const hasRecentData = !!results && Object.values(results).some(r => r.value > 0);
    if (props.hideIfNoRecentData && !hasRecentData) return null;

    const showChart = !!results && Object.values(results).some(r => r.value > 0 && !!r.threshold);

    const classes = ["mdhui-micro-trend"];
    if (chartPosition === "right") {
        classes.push("mdhui-micro-trend-chart-right");
    }
    if (props.indicator) {
        classes.push("mdhui-micro-trend-has-indicator");
    }

    const content = <div ref={widthReferenceRef}>
        <MicroTrendContent
            icon={icon}
            label={label}
            formatter={formatter}
            barsToDisplay={barsToDisplay}
            color={dataType.color}
            overThresholdColor={dataType.overThresholdColor}
            date={date}
            results={results}
            widthReferenceRef={widthReferenceRef}
            showChart={showChart}
            hasRecentData={hasRecentData}
            indicator={props.indicator}
        />
    </div>;

    return <div ref={props.innerRef} key={dataTypeKey}>
        {props.onClick
            ? <UnstyledButton className={classes.join(" ")} onClick={props.onClick}>{content}</UnstyledButton>
            : <div className={classes.join(" ")}>{content}</div>
        }
    </div>;
}

interface MicroTrendContentProps {
    icon: ReactElement;
    label: string;
    formatter: (value: number) => string;
    barsToDisplay: number;
    color?: ColorDefinition;
    overThresholdColor?: ColorDefinition;
    date: Date;
    results: MicroTrendResults | undefined;
    widthReferenceRef?: Ref<HTMLDivElement>;
    showChart: boolean;
    hasRecentData: boolean;
    indicator?: ReactNode;
}

function MicroTrendContent(props: MicroTrendContentProps) {
    const context = useContext(LayoutContext);

    const todayKey = getDayKey(props.date);
    const todayValue = props.results?.[todayKey]?.value ?? 0;
    const noData = todayValue === 0;
    const formattedValue = noData ? "--" : props.formatter(todayValue);

    const bars: SparkBarChartBar[] = [];
    for (let i = -1 * props.barsToDisplay; i <= 0; i++) {
        const dayKey = getDayKey(add(props.date, { days: i }));
        const dayData = props.results?.[dayKey];
        const value = dayData?.value ?? 0;
        const threshold = dayData?.threshold ?? 0;
        const fillPercent = dayData?.fillPercent ?? 0;
        bars.push({
            barFillPercent: fillPercent,
            color: (value > threshold ? (props.overThresholdColor ?? props.color) : props.color) || "var(--mdhui-color-primary)",
            opacity: (i === 0 ? 1 : 0.4)
        });
    }

    const iconColor = noData ? "var(--mdhui-text-color-3)" : resolveColor(context.colorScheme, props.color) ?? "var(--mdhui-color-primary)";

    return <>
        <div className="mdhui-micro-trend-label" style={{ color: iconColor }}>
            {props.icon} &nbsp;
            {props.label}
        </div>
        <div style={{ color: noData ? "var(--mdhui-text-color-3)" : undefined }} className="mdhui-micro-trend-value">
            {!props.results && <FontAwesomeSvgIcon icon={faRefresh} spin style={{ fontSize: ".7em" }} />}
            {props.results && formattedValue}
        </div>
        <div className="mdhui-micro-trend-chart" aria-label={`${language("recent-trend-of")} ${props.label}`}>
            {props.hasRecentData && props.showChart && props.results &&
                <SparkBarChart variant="rounded" gap={4} style={{ height: "100%" }} bars={bars} averageFillPercent={0.5} />
            }
        </div>
        {props.indicator &&
            <div className="mdhui-micro-trend-indicator">
                {props.indicator}
            </div>
        }
    </>;
}
