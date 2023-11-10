import { format, parseISO } from "date-fns";
import { Action } from "../../../presentational";
import { EhrNewsFeedEventModel } from "../../helpers/types";
import React from "react";
import { eventTypeHandlers } from "../../helpers/eventHandlers";

export interface NewsFeedDetailTitleProps {
    event: EhrNewsFeedEventModel
}

export default function (props: NewsFeedDetailTitleProps) {
    let handler = eventTypeHandlers[props.event.Type];

    let title = handler.getDetailTitle ? handler.getDetailTitle(props.event) : undefined;
    if (!title) { return null; }

    let subtitle = `${format(parseISO(props.event.Date), "EEEE, MMMM do h:mm:ss b")} • ${props.event.Patient.RecordAuthority}`
    return <Action
        indicator={<></>}
        title={title}
        subtitle={subtitle}
        icon={<img src={handler.icon} width={24} />} />;
}