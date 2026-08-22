import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { ColorDefinition } from "../../../helpers/colors";
import { ContrastInsightConfig, ContrastInsightResult, ContrastInsightSplitRule, computePreviewContrastInsight, ContrastInsightPreviewState, defaultContrastInsightConfig, queryContrastInsight } from "../../../helpers/contrast-insight";
import { useInitializeView } from "../../../helpers/Initialization";
import language from "../../../helpers/language";
import { getDailyDataTypeDefinition } from "../../../helpers/query-daily-data";
import { CardTitle, ContrastChart, SparkBarChart } from "../../presentational";
import { SparkBarChartBar } from "../../presentational/SparkBarChart/SparkBarChart";
import "./ContrastInsight.css";

export interface ContrastInsightProps {
    driverDataType: string;
    outcomeDataType: string;
    /** Number of days the outcome trails the driver.  0 = same day, 1 = outcome measured the day after the driver. */
    lagDays?: 0 | 1;
    split?: ContrastInsightSplitRule;
    windowDays?: number;
    minimumTotalDays?: number;
    minimumDaysPerBucket?: number;
    minimumEffectSize?: number;
    minimumDelta?: number;
    weekendDays?: number[];
    /** Hide the widget entirely when no clear pattern exists in the participant's data.  Default true. */
    hideIfNoRelationship?: boolean;
    title?: string;
    highColor?: ColorDefinition;
    lowColor?: ColorDefinition;
    defaultExpanded?: boolean;
    previewState?: ContrastInsightPreviewState;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function ContrastInsight(props: ContrastInsightProps) {
    const [result, setResult] = useState<ContrastInsightResult | undefined>(undefined);
    const [expanded, setExpanded] = useState(props.defaultExpanded ?? false);

    const config: ContrastInsightConfig = {
        driverDataType: props.driverDataType,
        outcomeDataType: props.outcomeDataType,
        lagDays: props.lagDays,
        split: props.split,
        windowDays: props.windowDays,
        minimumTotalDays: props.minimumTotalDays,
        minimumDaysPerBucket: props.minimumDaysPerBucket,
        minimumEffectSize: props.minimumEffectSize,
        minimumDelta: props.minimumDelta,
        weekendDays: props.weekendDays
    };

    useInitializeView(() => {
        if (props.previewState) {
            setResult(computePreviewContrastInsight(config, props.previewState));
            return;
        }
        queryContrastInsight(config).then(setResult);
    }, ["externalAccountSyncComplete"], [props.driverDataType, props.outcomeDataType, props.lagDays, props.split, props.windowDays, props.previewState]);

    if (!result) {
        return null;
    }

    const hideIfNoRelationship = props.hideIfNoRelationship ?? true;
    if (result.status !== "pattern" && hideIfNoRelationship) {
        return null;
    }

    const driverDefinition = getDailyDataTypeDefinition(props.driverDataType);
    const outcomeDefinition = getDailyDataTypeDefinition(props.outcomeDataType);
    const driverLabel = driverDefinition.labelKey ? language(driverDefinition.labelKey) : props.driverDataType;
    const outcomeLabel = outcomeDefinition.labelKey ? language(outcomeDefinition.labelKey) : props.outcomeDataType;
    const title = props.title ?? `${driverLabel} & ${outcomeLabel}`;

    if (result.status !== "pattern") {
        return <div ref={props.innerRef} className="mdhui-contrast-insight">
            <CardTitle title={title} />
            <div className="mdhui-contrast-insight-empty">
                {language(result.status === "insufficient-data" ? "contrast-insight-insufficient-data" : "contrast-insight-no-pattern")}
            </div>
        </div>;
    }

    const split = config.split ?? defaultContrastInsightConfig.split;
    const windowDays = config.windowDays ?? defaultContrastInsightConfig.windowDays;
    const lagDays = config.lagDays ?? defaultContrastInsightConfig.lagDays;
    const isWeekendSplit = split.kind === "weekendVsWeekday";

    const formattedSplitValue = result.splitValue !== undefined ? driverDefinition.formatter(result.splitValue) : "";
    const formattedDelta = outcomeDefinition.formatter(Math.round(Math.abs(result.delta)));
    const direction = result.delta > 0 ? "more" : "less";

    const sentenceKey = isWeekendSplit
        ? `contrast-insight-sentence-weekend-${direction}`
        : lagDays === 1
            ? `contrast-insight-sentence-after-above-${direction}`
            : `contrast-insight-sentence-above-${direction}`;
    // The delta is injected as a token so it can be rendered in bold within the localized sentence.
    const deltaToken = "@@delta@@";
    const sentenceParts = language(sentenceKey, undefined, {
        delta: deltaToken,
        outcome: outcomeLabel,
        driver: driverLabel,
        value: formattedSplitValue
    }).split(deltaToken);

    const highLabel = isWeekendSplit ? language("contrast-insight-weekends") : language("contrast-insight-above", undefined, { value: formattedSplitValue });
    const lowLabel = isWeekendSplit ? language("contrast-insight-weekdays") : language("contrast-insight-below", undefined, { value: formattedSplitValue });
    const highColor = props.highColor ?? "var(--mdhui-color-primary)";
    const lowColor = props.lowColor ?? "var(--mdhui-border-color-2)";

    const highDays = result.days.filter(d => d.high);
    const lowDays = result.days.filter(d => !d.high);
    const groups = [
        { label: highLabel, average: result.highAverage, formattedAverage: outcomeDefinition.formatter(Math.round(result.highAverage)), values: highDays.map(d => d.outcomeValue), color: highColor },
        { label: lowLabel, average: result.lowAverage, formattedAverage: outcomeDefinition.formatter(Math.round(result.lowAverage)), values: lowDays.map(d => d.outcomeValue), color: lowColor }
    ];

    const consistent = Math.min(result.highDayCount, result.lowDayCount) >= 10;
    const confidenceLabel = language(consistent ? "contrast-insight-consistent" : "contrast-insight-emerging");

    const maxOutcome = Math.max(...result.days.map(d => d.outcomeValue));
    const stripBars: SparkBarChartBar[] = [...result.days]
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(day => ({
            color: day.high ? highColor : lowColor,
            barFillPercent: maxOutcome > 0 ? day.outcomeValue / maxOutcome : 0
        }));

    const methodText = isWeekendSplit
        ? language("contrast-insight-method-weekend", undefined, { outcome: outcomeLabel, highCount: result.highDayCount.toString(), lowCount: result.lowDayCount.toString() })
        : language("contrast-insight-method", undefined, { outcome: outcomeLabel, driver: driverLabel, highCount: result.highDayCount.toString(), lowCount: result.lowDayCount.toString() });

    return <div ref={props.innerRef} className="mdhui-contrast-insight">
        <CardTitle title={title} />
        <div className="mdhui-contrast-insight-sentence">
            {sentenceParts[0]}
            <strong>{formattedDelta}</strong>
            {sentenceParts[1]}
        </div>
        <ContrastChart variant="bars" groups={groups} />
        <div className="mdhui-contrast-insight-footer">
            <span>{language("contrast-insight-footer", undefined, { window: windowDays.toString(), days: result.days.length.toString() })}</span>
            <span className="mdhui-contrast-insight-confidence" title={confidenceLabel}>
                <span className="mdhui-contrast-insight-confidence-dot mdhui-contrast-insight-confidence-dot-filled" />
                <span className="mdhui-contrast-insight-confidence-dot mdhui-contrast-insight-confidence-dot-filled" />
                <span className={"mdhui-contrast-insight-confidence-dot" + (consistent ? " mdhui-contrast-insight-confidence-dot-filled" : "")} />
                {confidenceLabel}
            </span>
            {result.weekdaysOnly && <span className="mdhui-contrast-insight-weekdays-only">{language("contrast-insight-weekdays-only")}</span>}
        </div>
        {expanded &&
            <div className="mdhui-contrast-insight-detail">
                <ContrastChart variant="dotColumns" groups={groups} />
                <div className="mdhui-contrast-insight-strip">
                    <SparkBarChart bars={stripBars} gap={2} variant="rounded" />
                </div>
                <div className="mdhui-contrast-insight-method">{methodText}</div>
            </div>
        }
        <button className="mdhui-contrast-insight-expander" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <FontAwesomeSvgIcon icon={faChevronDown} rotation={expanded ? 180 : undefined} />
        </button>
    </div>;
}
