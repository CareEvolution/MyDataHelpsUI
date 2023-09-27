import React, { useContext } from "react";
import "./SymptomSeveritySummary.css"
import { SymptomConfiguration } from "../../helpers/symptom-shark-data";
import { TextBlock } from "../../../presentational";
import { SymptomSharkVisualizationContext } from "../../container/VisualizationCoordinator/VisualizationCoordinator";
import { DateRangeContext } from "../../../presentational/DateRangeCoordinator/DateRangeCoordinator";
import { startOfMonth } from "date-fns";
import { getDatesForMonth } from "../../../../helpers/date-helpers";
import getDayKey from "../../../../helpers/get-day-key";
import language from "../../../../helpers/language";

export interface SymptomSeveritySummaryProps {
    symptom: SymptomConfiguration;
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SymptomSeveritySummaryProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock>Error: Symptom Severity Summary must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }
    let { logEntries } = visualizationContext;

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = props.intervalStart || startOfMonth(new Date());
    if (dateRangeContext) {
        intervalStart = dateRangeContext.intervalStart;
    }


    var monthDays = getDatesForMonth(intervalStart.getFullYear(), intervalStart.getMonth());
    var symptomSeverity = function (date: Date) {
        var day = getDayKey(date);
        if (logEntries[day]) {
            var matchingSymptom = logEntries[day].symptoms.find((s) => props.symptom.id == s.id);
            if (matchingSymptom && matchingSymptom.severity) {
                return matchingSymptom.severity;
            }
        }
        return 0;
    }

    var daysMatchingScore = function (minScore: number, maxScore: number) {
        var result = 0;
        for (var i = 0; i < monthDays.length; i++) {
            var severity = symptomSeverity(monthDays[i]);
            if (severity >= minScore && severity <= maxScore) {
                result++;
            }
        }
        return result;
    }

    if (props.symptom.severityTracking != '3PointScale') {
        return null;
    }

    return <div ref={props.innerRef} className="mdhui-ss-symptom-severity-summaries">
        <div className="mdhui-ss-symptom-severity-summary">
            <div className="mdhui-ss-symptom-severity-summary-label">{language("severe")}</div>
            <div className="mdhui-ss-symptom-severity-summary-count">{daysMatchingScore(8, 10)}</div>
        </div>
        <div className="mdhui-ss-symptom-severity-summary">
            <div className="mdhui-ss-symptom-severity-summary-label">{language("moderate")}</div>
            <div className="mdhui-ss-symptom-severity-summary-count">{daysMatchingScore(4, 7)}</div>
        </div>
        <div className="mdhui-ss-symptom-severity-summary">
            <div className="mdhui-ss-symptom-severity-summary-label">{language("mild")}</div>
            <div className="mdhui-ss-symptom-severity-summary-count">{daysMatchingScore(1, 3)}</div>
        </div>
        <div style={{ clear: "both" }}></div>
    </div>;
}