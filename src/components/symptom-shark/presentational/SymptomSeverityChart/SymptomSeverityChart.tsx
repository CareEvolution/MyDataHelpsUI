import React, { useContext } from "react";
import "./SymptomSeverityChart.css"
import { CardTitle, ShinyOverlay, SymptomConfiguration, TextBlock, getDayKey, language } from "../../../..";
import { getDatesForMonth } from "../../../../helpers/date-helpers";
import { SymptomSharkVisualizationContext } from "../../container/VisualizationCoordinator/VisualizationCoordinator";
import { DateRangeContext } from "../../../presentational/DateRangeCoordinator/DateRangeCoordinator";
import { startOfMonth } from "date-fns";

export interface SymptomSeverityChartProps {
    intervalStart?: Date;
    symptom: SymptomConfiguration;
    showAllDays?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SymptomSeverityChartProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock>Error: Symptom Severity Chart must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }
    let { logEntries } = visualizationContext;

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = props.intervalStart || startOfMonth(new Date());
    if (dateRangeContext) {
        intervalStart = dateRangeContext.intervalStart;
    }

    let monthDays = getDatesForMonth(intervalStart.getFullYear(), intervalStart.getMonth());

    let calculateSymptomAverage = function () {
        var total = 0;

        var relevantEntries = [];
        for (var i = 0; i < monthDays.length; i++) {
            var day = getDayKey(monthDays[i]);
            if (logEntries[day]) {
                var matchingSymptom = logEntries[day].symptoms.find((s) => s.id == props.symptom.id);
                if (matchingSymptom && matchingSymptom.severity) {
                    relevantEntries.push(matchingSymptom);
                }
            }
        }

        if (props.symptom.severityTracking == '3PointScale') {
            total += relevantEntries.filter((s) => s.severity && s.severity < 4).length;
            total += 2 * relevantEntries.filter((s) => s.severity && s.severity >= 4 && s.severity < 8).length;
            total += 3 * relevantEntries.filter((s) => s.severity && s.severity >= 8).length;
        }
        else {
            for (var j = 0; j < relevantEntries.length; j++) {
                total += relevantEntries[j].severity ?? 0;
            }
        }
        return total / relevantEntries.length;
    }

    let symptomSeverity = function (date: Date) {
        var day = getDayKey(date);
        if (logEntries[day]) {
            var matchingSymptom = logEntries[day].symptoms.find((s) => props.symptom.id == s.id);
            if (matchingSymptom && matchingSymptom.severity) {
                if (props.symptom.severityTracking == '3PointScale') {
                    if (matchingSymptom.severity < 4) { return 1; }
                    if (matchingSymptom.severity >= 4 && matchingSymptom.severity < 8) { return 2; }
                    return 3;
                } else {
                    return matchingSymptom.severity;
                }
            }
        }
        return 0;
    }

    let daysMatchingScore = function (score: number) {
        var result = 0;
        for (var i = 0; i < monthDays.length; i++) {
            var severity = symptomSeverity(monthDays[i]);
            if (severity == score) {
                result++;
            }
        }
        return result;
    }

    let symptomAverage = calculateSymptomAverage();

    if (isNaN(symptomAverage)) {
        return null;
    }

    return <div ref={props.innerRef} className="mdhui-ss-severity-chart">
        <CardTitle title={props.symptom.name + " " + language("severity")} />
        {props.symptom.severityTracking == "3PointScale" &&
            <>
                <div className="mdhui-ss-severity-chart-inner mdhui-ss-severity-chart-three-point-scale">
                    <div className="mdhui-ss-severity-chart-y-axis">
                        <div className="mdhui-ss-severity-chart-value">
                            <span className="mdhui-ss-severity-chart-total">{daysMatchingScore(3)}</span>sev
                        </div>
                        <div className="mdhui-ss-severity-chart-value">
                            <span className="mdhui-ss-severity-chart-total">{daysMatchingScore(2)}</span>mod
                        </div>
                        <div className="mdhui-ss-severity-chart-value">
                            <span className="mdhui-ss-severity-chart-total">{daysMatchingScore(1)}</span>mild
                        </div>
                        <div className="mdhui-ss-severity-chart-value">
                            <span className="mdhui-ss-severity-chart-total"></span>n/a
                        </div>
                    </div>
                    <div className="mdhui-ss-severity-chart-x-axis-line"></div>
                    <div className="mdhui-ss-severity-chart-x-axis-line" style={{ top: "48px" }}></div>
                    <div className="mdhui-ss-severity-chart-x-axis-line" style={{ top: "72px" }}></div>
                    <div className="mdhui-ss-severity-chart-x-axis-line" style={{ top: "96px" }}></div>
                    <div style={{ position: "relative", height: "100%" }}>
                        {monthDays.map(m =>
                            <div key={m.toISOString()} className="mdhui-ss-severity-chart-day-wrapper" style={{ width: 100 / monthDays.length + '%' }}>
                                {(props.showAllDays || (m.getDate() - 1) % 2 == 0) &&
                                    <div className="mdhui-ss-severity-chart-day-marker">
                                        {m.getDate()}
                                    </div>
                                }
                                <div className="mdhui-ss-severity-chart-bar" style={{ height: (symptomSeverity(m) * 24) + 'px', backgroundColor: props.symptom.color }}>
                                    <ShinyOverlay />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {symptomAverage &&
                    <div className="mdhui-ss-severity-chart-average-wrapper">
                        {language("average")} <div className="mdhui-ss-severity-chart-average">
                            {symptomAverage.toFixed(1)} / 3
                        </div>
                    </div>
                }
            </>
        }
        {props.symptom.severityTracking == "10PointScale" &&
            <div>
                <div className="mdhui-ss-severity-chart-inner mdhui-ss-severity-chart-ten-point-scale">
                    <div className="mdhui-ss-severity-chart-y-axis">
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((i) =>
                            <div key={i} className="mdhui-ss-severity-chart-value">
                                <span className="mdhui-ss-severity-chart-total">{daysMatchingScore(i)}</span><div className="mdhui-ss-severity-chart-value-label">{i}</div>
                            </div>
                        )}
                        <div className="mdhui-ss-severity-chart-value">
                            <span className="mdhui-ss-severity-chart-total"></span><div className="mdhui-ss-severity-chart-value-label">0</div>
                        </div>
                    </div>
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((i) =>
                        <div key={i} className="mdhui-ss-severity-chart-x-axis-line" style={{ top: (11 - i) * 24 + 'px' }}></div>
                    )}
                    <div style={{ position: "relative", height: "100%" }}>
                        {monthDays.map(m =>
                            <div key={m.toISOString()} className="mdhui-ss-severity-chart-day-wrapper" style={{ width: 100 / monthDays.length + '%' }}>
                                {(props.showAllDays || (m.getDate() - 1) % 2 == 0) &&
                                    <div className="mdhui-ss-severity-chart-day-marker">
                                        {m.getDate()}
                                    </div>
                                }
                                <div className="mdhui-ss-severity-chart-bar" style={{ height: (symptomSeverity(m) * 24) + 'px', backgroundColor: props.symptom.color }}>
                                    <ShinyOverlay />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {symptomAverage &&
                    <div className="mdhui-ss-severity-chart-average-wrapper">
                        {language("average")} <div className="mdhui-ss-severity-chart-average">
                            {symptomAverage.toFixed(1)} / 10
                        </div>
                    </div>
                }
            </div>
        }
    </div>;
}