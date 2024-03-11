import React, { useContext } from "react";
import "./MonthReport.css";
import NotesTimeline from "../NotesTimeline/NotesTimeline";
import SymptomMatrix from "../SymptomMatrix/SymptomMatrix";
import OverallExperienceChart from "../OverallExperienceChart/OverallExperienceChart";
import SymptomSeverityChart from "../SymptomSeverityChart/SymptomSeverityChart";
import { getMonthName } from "../../../../helpers/date-helpers";
import { DateRangeContext, TextBlock } from "../../../presentational";
import { SymptomSharkVisualizationContext } from "../../container/VisualizationCoordinator/VisualizationCoordinator";
import { startOfMonth } from "date-fns";

export interface SymptomSharkMonthReportProps {
    includeNotes: boolean;
    includeDailyOverallFeeling: boolean;
    productLogo?: string;
    productName?: string;
    productUrl?: string;
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLTableElement>;
}

export default function (props: SymptomSharkMonthReportProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Month report must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = dateRangeContext?.intervalStart ?? props.intervalStart ?? startOfMonth(new Date());

    if (!visualizationContext.symptoms.length && !visualizationContext.treatments.length) {
        return null;
    }

    return <table ref={props.innerRef} className="ss-month-report" cellPadding="0" cellSpacing="0">
        <thead>
            <tr>
                <th>
                    <div className="header">
                        {getMonthName(intervalStart.getMonth())} {intervalStart.getFullYear()}
                        <div className="product">
                            {props.productLogo &&
                                <img src={props.productLogo} />
                            }
                            {props.productName &&
                                <div className="product-name">{props.productName}</div>
                            }
                            {props.productUrl &&
                                <a href={props.productUrl} className="product-url">{props.productUrl}</a>
                            }
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <SymptomMatrix />
                    {props.includeDailyOverallFeeling &&
                        <OverallExperienceChart variant="monthReport" showAllDays={true} />
                    }
                    {visualizationContext.symptoms.filter((s) => !s.inactive && s.severityTracking && s.severityTracking != 'None').map(s =>
                        <SymptomSeverityChart key={s.id} variant="monthReport" symptom={s} showAllDays={true} />
                    )}
                    {props.includeNotes &&
                        <NotesTimeline />
                    }
                </td>
            </tr>
        </tbody>
    </table>;
}