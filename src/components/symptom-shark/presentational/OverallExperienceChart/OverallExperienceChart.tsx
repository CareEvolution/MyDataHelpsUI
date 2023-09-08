import React from "react";
import "./OverallExperienceChart.css"
import { CardTitle, DailyLogEntry, Face, getDayKey, language } from "../../../..";
import { getDatesForMonth } from "../../../../helpers/date-helpers";

export interface OverallExperienceChartProps {
    logEntries: { [key: string]: DailyLogEntry };
    currentMonth: number;
    currentYear: number;
    showAllDays?: boolean;
}

export default function (props: OverallExperienceChartProps) {
    var monthDays = getDatesForMonth(props.currentYear, props.currentMonth);

    function daysWithOverallFeeling(faceValue?: number) {
        return monthDays.filter((m) => {
            if (props.logEntries[getDayKey(m)] &&
                props.logEntries[getDayKey(m)].overallFeeling &&
                (!faceValue || props.logEntries[getDayKey(m)].overallFeeling == faceValue)) {
                return true;
            }
        });
    }

    function overallFeelingAverage() {
        var total = 0;
        var overallFeelingDays = daysWithOverallFeeling();
        if (overallFeelingDays.length == 0) {
            return null;
        }
        for (var i = 0; i < overallFeelingDays.length; i++) {
            total += props.logEntries[getDayKey(overallFeelingDays[i])].overallFeeling!;
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
    var lines = [];
    for (var i = 0; i < daysWithScore.length - 1; i++) {
        var currentDay = daysWithScore[i];
        var nextDay = daysWithScore[i + 1];
        var currentDayFeeling = props.logEntries[getDayKey(currentDay)].overallFeeling!;
        var nextDayFeeling = props.logEntries[getDayKey(nextDay)].overallFeeling!;
        var color = "#429bdf"

        lines.push({
            x1: initialSpace + ticks * (currentDay.getDate() - 1),
            y1: 128 - currentDayFeeling * 24,
            x2: initialSpace + ticks * (nextDay.getDate() - 1),
            y2: 128 - nextDayFeeling * 24,
            color: color
        });
    }

    return <div className="mdhui-ss-oe-chart">
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
                        {props.logEntries[getDayKey(m)]?.overallFeeling &&
                            <div className="mdhui-ss-oe-chart-dot" style={{ bottom: ((props.logEntries[getDayKey(m)].overallFeeling! * 24) - 16) + 'px' }}></div>
                        }
                    </div>
                )}
            </div>
        </div>
        {overallFeelingAverage() &&
            <div className="mdhui-ss-oe-chart-average-wrapper">
                {language("average")}: <div className="mdhui-ss-oe-chart-average">
                    {overallFeelingAverage()!.toFixed(1)}
                    <Face className="mdhui-ss-oe-chart-face" selected={true} faceValue={parseInt(overallFeelingAverage()!.toFixed(0))} />
                </div>
            </div>
        }
    </div>;
}