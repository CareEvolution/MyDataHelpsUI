

import procedureIcon from "./icon-procedure.svg";
import { EhrNewsFeedEventModel } from "./types";

export default function getIcon(event: EhrNewsFeedEventModel) {
    if (event.Type == "ProcedureGroup") {
        return procedureIcon;
    }
}