import React, { useContext } from "react";
import "./SymptomMatrix.css"
import { getDatesForMonth } from "../../../../helpers/date-helpers";
import { DateRangeContext, MonthlyEventMatrix, TextBlock, getDayKey, language } from "../../../..";
import { SymptomSharkVisualizationContext } from "../../container/VisualizationCoordinator/VisualizationCoordinator";
import { startOfMonth } from "date-fns";

export interface SymptomSharkSymptomMatrixProps {
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SymptomSharkSymptomMatrixProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Symptom Matrix must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = props.intervalStart || startOfMonth(new Date());
    if (dateRangeContext) {
        intervalStart = dateRangeContext.intervalStart;
    }

    if (!visualizationContext.symptoms.length && !visualizationContext.treatments.length) {
        return null;
    }

    var monthDays = getDatesForMonth(intervalStart.getFullYear(), intervalStart.getMonth());

    var symptomSelected = function (date: Date, symptomId: string) {
        var key = getDayKey(date);
        if (!visualizationContext!.logEntries[key]) {
            return false;
        }
        return visualizationContext!.logEntries[key].symptoms.find((s) => s.id == symptomId);
    }

    var treatmentSelected = function (date: Date, treatmentId: string) {
        var key = getDayKey(date);
        if (!visualizationContext!.logEntries[key]) {
            return false;
        }
        return visualizationContext!.logEntries[key].treatments.find((s) => s.id == treatmentId);
    }

    var symptomRows = visualizationContext.symptoms.map((s) => {
        return {
            label: s.name,
            color: s.color,
            data: monthDays.map((m) => !!symptomSelected(m, s.id))
        };
    });

    var treatmentRows = visualizationContext.treatments.map((s) => {
        return {
            label: s.name,
            color: s.color,
            data: monthDays.map((m) => !!treatmentSelected(m, s.id))
        };
    });

    return <div ref={props.innerRef} className="ss-symptom-matrix">
        <MonthlyEventMatrix title={language("symptoms")} rows={symptomRows} intervalStart={intervalStart} />
        <MonthlyEventMatrix title={language("treatments")} rows={treatmentRows} intervalStart={intervalStart} />
    </div>;
}