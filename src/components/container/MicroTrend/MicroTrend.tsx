import React, { ReactNode, Ref, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getDayKey, language, RelativeActivityDataType, resolveColor, useInitializeView } from "../../../helpers";
import { DateRangeContext, LayoutContext, SparkBarChart, SparkBarChartBar, UnstyledButton } from "../../presentational";
import { add, startOfToday } from "date-fns";
import "./MicroTrend.css";
import { debounce } from "lodash";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { convertToMicroTrendDataType, getDataTypeKey, getFormatter, getIcon, getLabel, isMicroTrendDataType, loadMicroTrendResults, MicroTrendChartPosition, MicroTrendDataType, MicroTrendPreviewState, MicroTrendResults } from "../../../helpers/micro-trend";
import { safeValues } from "../../../helpers/functions";

export interface MicroTrendProps {
    previewState?: MicroTrendPreviewState | "loading";
    dataType: MicroTrendDataType | RelativeActivityDataType;
    date?: Date;
    hideIfNoRecentData?: boolean;
    chartPosition?: MicroTrendChartPosition | "responsive";
    indicator?: ReactNode;
    onClick?: () => void;
    innerRef?: Ref<HTMLDivElement>;
}

export default function MicroTrend(props: MicroTrendProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);

    const [chartPosition, setChartPosition] = useState<MicroTrendChartPosition>("bottom");
    const [barsToDisplay, setBarsToDisplay] = useState<number>();
    const [results, setResults] = useState<MicroTrendResults>();

    const widthReferenceRef = useRef<HTMLDivElement>(null);

    const dataType = useMemo<MicroTrendDataType>(() => {
        return isMicroTrendDataType(props.dataType) ? props.dataType : convertToMicroTrendDataType(props.dataType);
    }, [props.dataType]);

    const date = useMemo<Date>(() => {
        return props.date ?? dateRangeContext?.intervalStart ?? startOfToday();
    }, [props.date, dateRangeContext?.intervalStart, getDayKey(new Date())]);

    useEffect(() => {
        const calculateBars = () => {
            const clientWidth = widthReferenceRef.current?.clientWidth;
            if (!clientWidth) return;

            const getChartPosition = (): MicroTrendChartPosition => {
                if (props.chartPosition === "bottom" || props.chartPosition === "right") {
                    return props.chartPosition;
                }
                if (props.chartPosition === "responsive") {
                    return clientWidth < 150 ? "bottom" : "right";
                }
                return "bottom";
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
        if (barsToDisplay === undefined || props.previewState === "loading") {
            setResults(undefined);
            return;
        }
        loadMicroTrendResults(dataType, date, barsToDisplay, props.previewState).then(setResults);
    }, ["externalAccountSyncComplete"], [props.previewState, dataType, date, barsToDisplay]);

    if (!barsToDisplay) {
        // Return an empty div initially so we have a ref to calculate the size of the chart.
        return <div ref={widthReferenceRef} />;
    }

    const hasRecentData = safeValues(results).some(result => result.value > 0);
    if (props.hideIfNoRecentData && !hasRecentData) return null;

    const showChart = safeValues(results).some(result => result.value > 0 && !!result.threshold);

    const classes = ["mdhui-micro-trend"];
    if (chartPosition === "right") {
        classes.push("mdhui-micro-trend-chart-right");
    }
    if (props.indicator) {
        classes.push("mdhui-micro-trend-has-indicator");
    }

    const dayKey = getDayKey(date);
    const dayValue = results?.[dayKey]?.value ?? 0;
    const noData = dayValue === 0;

    const color = noData ? "var(--mdhui-text-color-3)" : resolveColor(layoutContext.colorScheme, props.dataType.color) ?? "var(--mdhui-color-primary)";

    const getBars = (): SparkBarChartBar[] => {
        const bars: SparkBarChartBar[] = [];
        for (let i = -1 * barsToDisplay; i <= 0; i++) {
            const dayKey = getDayKey(add(date, { days: i }));
            const dayResult = results?.[dayKey];
            const value = dayResult?.value ?? 0;
            const threshold = dayResult?.threshold ?? 0;
            const fillPercent = dayResult?.fillPercent ?? 0;
            bars.push({
                barFillPercent: fillPercent,
                color: (value > threshold ? (dataType.overThresholdColor ?? dataType.color) : dataType.color) || "var(--mdhui-color-primary)",
                opacity: (i === 0 ? 1 : 0.4)
            });
        }
        return bars;
    };

    const content = <div ref={widthReferenceRef}>
        <div className="mdhui-micro-trend-header" style={{ color: color }}>
            <div className="mdhui-micro-trend-icon">{getIcon(dataType)}</div>
            <div className="mdhui-micro-trend-label">{getLabel(dataType)}</div>
        </div>
        <div style={{ color: noData ? "var(--mdhui-text-color-3)" : undefined }} className="mdhui-micro-trend-value">
            {!results && <FontAwesomeSvgIcon icon={faRefresh} spin style={{ fontSize: ".7em" }} />}
            {results && (noData ? "--" : getFormatter(dataType)(dayValue))}
        </div>
        {showChart &&
            <div className="mdhui-micro-trend-chart" aria-label={`${language("recent-trend-of")} ${getLabel(dataType)}`}>
                <SparkBarChart variant="rounded" gap={4} style={{ height: "100%" }} bars={getBars()} averageFillPercent={0.5} />
            </div>
        }
        {props.indicator &&
            <div className="mdhui-micro-trend-indicator">{props.indicator}</div>
        }
    </div>;

    return <div ref={props.innerRef} key={getDataTypeKey(dataType)}>
        {props.onClick
            ? <UnstyledButton className={classes.join(" ")} onClick={props.onClick}>{content}</UnstyledButton>
            : <div className={classes.join(" ")}>{content}</div>
        }
    </div>;
}
