import React, { useContext } from "react";
import "./OverallExperienceChart.css"
import { CardTitle, Face, TextBlock, getDayKey, language } from "../../../..";
import { getDatesForMonth } from "../../../../helpers/date-helpers";
import { SymptomSharkVisualizationContext } from "../../container/VisualizationCoordinator/VisualizationCoordinator";
import { DateRangeContext } from "../../../presentational/DateRangeCoordinator/DateRangeCoordinator";
import { startOfMonth } from "date-fns";

export interface OverallExperienceChartProps {
    intervalStart?: Date;
    showAllDays?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: OverallExperienceChartProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Symptom Severity Chart must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }
    let { logEntries } = visualizationContext;

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = props.intervalStart || startOfMonth(new Date());
    if (dateRangeContext) {
        intervalStart = dateRangeContext.intervalStart;
    }

    var monthDays = getDatesForMonth(intervalStart.getFullYear(), intervalStart.getMonth());

    function daysWithOverallFeeling(faceValue?: number) {
        return monthDays.filter((m) => {
            if (logEntries[getDayKey(m)] &&
                logEntries[getDayKey(m)].overallFeeling &&
                (!faceValue || logEntries[getDayKey(m)].overallFeeling == faceValue)) {
                return true;
            }
        });
    }

    function calculateOverallFeelingAverage() {
        var total = 0;
        var overallFeelingDays = daysWithOverallFeeling();
        if (overallFeelingDays.length == 0) {
            return null;
        }
        for (var i = 0; i < overallFeelingDays.length; i++) {
            total += logEntries[getDayKey(overallFeelingDays[i])].overallFeeling!;
        }
        return (total / overallFeelingDays.length);
    }

    var daysWithScore = daysWithOverallFeeling();

    if (!daysWithScore.length) {
        return null;
    }

    var daysThisMonth = monthDays.length;
    var ticks = 100 / daysThisMonth;
    var initialSpace = (100 / (daysThisMonth * 2));
    var lines: any[] = [];
    for (var i = 0; i < daysWithScore.length - 1; i++) {
        var currentDay = daysWithScore[i];
        var nextDay = daysWithScore[i + 1];
        var currentDayFeeling = logEntries[getDayKey(currentDay)].overallFeeling!;
        var nextDayFeeling = logEntries[getDayKey(nextDay)].overallFeeling!;
        var color = "#429bdf"

        lines.push({
            x1: initialSpace + ticks * (currentDay.getDate() - 1),
            y1: 128 - currentDayFeeling * 24,
            x2: initialSpace + ticks * (nextDay.getDate() - 1),
            y2: 128 - nextDayFeeling * 24,
            color: color
        });
    }

    let overallFeelingAverage = calculateOverallFeelingAverage();

    return <div ref={props.innerRef} className="mdhui-ss-oe-chart">
        <CardTitle title={language("daily-overall-experience")} />
        <div className="mdhui-ss-oe-chart-inner">
            <div className="mdhui-ss-oe-chart-y-axis">
                <div className="mdhui-ss-oe-chart-face-total">
                    {daysWithOverallFeeling(5).length > 0 &&
                        <span className="total">{daysWithOverallFeeling(5).length}</span>
                    }
                    <Face className="mdhui-ss-oe-chart-face" selected={true} faceValue={5} />
                </div>
                <div className="mdhui-ss-oe-chart-face-total">
                    {daysWithOverallFeeling(4).length > 0 &&
                        <span className="total">{daysWithOverallFeeling(4).length}</span>
                    }
                    <Face className="mdhui-ss-oe-chart-face" selected={true} faceValue={4} />
                </div>
                <div className="mdhui-ss-oe-chart-face-total">
                    {daysWithOverallFeeling(3).length > 0 &&
                        <span className="total">{daysWithOverallFeeling(3).length}</span>
                    }
                    <Face className="mdhui-ss-oe-chart-face" selected={true} faceValue={3} />
                </div>
                <div className="mdhui-ss-oe-chart-face-total">
                    {daysWithOverallFeeling(2).length > 0 &&
                        <span className="total">{daysWithOverallFeeling(2).length}</span>
                    }
                    <Face className="mdhui-ss-oe-chart-face" selected={true} faceValue={2} />
                </div>
                <div className="mdhui-ss-oe-chart-face-total">
                    {daysWithOverallFeeling(1).length > 0 &&
                        <span className="total">{daysWithOverallFeeling(1).length}</span>
                    }
                    <Face className="mdhui-ss-oe-chart-face" selected={true} faceValue={1} />
                </div>
            </div>
            <div className="mdhui-ss-oe-chart-x-axis-line"></div>
            <div className="mdhui-ss-oe-chart-x-axis-line" style={{ top: "48px" }}></div>
            <div className="mdhui-ss-oe-chart-x-axis-line" style={{ top: "72px" }}></div>
            <div className="mdhui-ss-oe-chart-x-axis-line" style={{ top: "96px" }}></div>
            <div className="mdhui-ss-oe-chart-x-axis-line" style={{ top: "120px" }}></div>
            <div style={{ position: "relative", height: "100%" }}>
                <svg className="mdhui-ss-oe-chart-lines">
                    {lines.map(l =>
                        <line key={l.x1} x1={l.x1 + "%"} y1={l.y1} x2={l.x2 + "%"} y2={l.y2} style={{ stroke: l.color, strokeWidth: 4, opacity: .5 }} />
                    )}
                </svg>
                {monthDays.map(m =>
                    <div key={m.getDate()} className="mdhui-ss-oe-chart-day-wrapper" style={{ width: (100 / monthDays.length) + '%' }}>
                        {(props.showAllDays || (m.getDate() - 1) % 2 == 0) &&
                            <div className="mdhui-ss-oe-chart-day-marker">
                                {m.getDate()}
                            </div>
                        }
                        {logEntries[getDayKey(m)]?.overallFeeling &&
                            <div className="mdhui-ss-oe-chart-dot" style={{ bottom: ((logEntries[getDayKey(m)].overallFeeling! * 24) - 16) + 'px' }}></div>
                        }
                    </div>
                )}
            </div>
        </div>
        {overallFeelingAverage &&
            <div className="mdhui-ss-oe-chart-average-wrapper">
                {language("average")}: <div className="mdhui-ss-oe-chart-average">
                    {overallFeelingAverage!.toFixed(1)}
                    <Face className="mdhui-ss-oe-chart-face" selected={true} faceValue={parseInt(overallFeelingAverage!.toFixed(0))} />
                </div>
            </div>
        }
    </div>;
}