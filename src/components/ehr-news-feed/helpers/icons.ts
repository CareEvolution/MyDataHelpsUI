

import { EhrNewsFeedEventModel } from "./types";
import reportIcon from "../../../assets/icon-report.svg";
import procedureIcon from "../../../assets/icon-procedure.svg";
import immunizationIcon from "../../../assets/icon-immunization.svg";
import labReportIcon from "../../../assets/icon-labreport.svg";

export default function getIcon(event: EhrNewsFeedEventModel) {
    if (event.Type == "ProcedureGroup" ||
        event.Type == "ClaimProcedureGroup" ||
        event.Type == "ClaimServiceGroup") {
        return procedureIcon;
    }
    if (event.Type == "Immunization") {
        return immunizationIcon;
    }
    if (event.Type == "Report") {
        return reportIcon;
    }
    if (event.Type == "LabReport") {
        return labReportIcon;
    }
}