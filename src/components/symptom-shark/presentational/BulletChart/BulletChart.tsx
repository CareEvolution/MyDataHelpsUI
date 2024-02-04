import React, { useContext } from "react";
import "./BulletChart.css"
import { getDatesForMonth } from "../../../../helpers/date-helpers";
import { DateRangeContext, SymptomConfiguration, TextBlock, TreatmentConfiguration, getDayKey, language } from "../../../..";
import { SymptomSharkVisualizationContext } from "../../container/VisualizationCoordinator/VisualizationCoordinator";
import { startOfMonth } from "date-fns";

export interface SymptomSharkBulletChartProps {
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SymptomSharkBulletChartProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Bullet Chart must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
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

    var symptomTotal = function (symptom: SymptomConfiguration) {
        var total = 0;
        for (var i = 0; i < monthDays.length; i++) {
            if (symptomSelected(monthDays[i], symptom.id)) {
                total++;
            }
        }
        return total;
    }

    var treatmentTotal = function (treatment: TreatmentConfiguration) {
        var total = 0;
        for (var i = 0; i < monthDays.length; i++) {
            if (treatmentSelected(monthDays[i], treatment.id)) {
                total++;
            }
        }
        return total;
    }

    return <div ref={props.innerRef} className="ss-bullet-chart">
        {visualizationContext.symptoms.length > 0 &&
            <table cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th colSpan={100}>{language("symptoms")}</th>
                    </tr>
                    <tr>
                        <td className="ss-bullet-chart-item-name"></td>
                        <td></td>
                        {monthDays.map((m) =>
                            <td key={m.toISOString()} style={{ width: (75 / monthDays.length) + '%' }}>
                                <div className="ss-bullet-chart-day-number">{m.getDate()}</div>
                            </td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {visualizationContext.symptoms.map((s) =>
                        <tr>
                            <td className="ss-bullet-chart-item-name">{s.name} </td>
                            <td className="ss-bullet-chart-total">
                                <span>{symptomTotal(s) > 0 ? symptomTotal(s) : <>&nbsp;</>}</span>
                            </td>
                            {monthDays.map((m) =>
                                <td key={m.toISOString()} style={{ width: (75 / monthDays.length) + '%' }}>
                                    <div className="ss-bullet-chart-circle" style={{ backgroundColor: symptomSelected(m, s.id) ? s.color : '#ddd' }}>
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        }
        {visualizationContext.treatments.length > 0 &&
            <table cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th colSpan={100} style={{ paddingTop: '16px' }}>{language("treatments")}</th>
                    </tr>
                    <tr>
                        <td className="ss-bullet-chart-item-name"></td>
                        <td></td>
                        {monthDays.map((m) =>
                            <td key={m.toISOString()} style={{ width: (75 / monthDays.length) + '%' }}>
                                <div className="ss-bullet-chart-day-number">{m.getDate()}</div>
                            </td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {visualizationContext.treatments.map((t) =>
                        <tr>
                            <td className="ss-bullet-chart-item-name">{t.name}</td>
                            <td className="ss-bullet-chart-total">
                                {treatmentTotal(t) > 0 ? treatmentTotal(t) : <>&nbsp;</>}
                            </td>
                            {monthDays.map((m) =>
                                <td key={m.toISOString()} style={{ width: (75 / monthDays.length) + '%' }}>
                                    <div className="ss-bullet-chart-circle" style={{ backgroundColor: treatmentSelected(m, t.id) ? t.color : '#ddd' }}></div>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        }
    </div>;
}