import React from "react";
import { EhrNewsFeedEventModel } from "../../helpers/types";
import { Action } from "../../../presentational";
import { format, parseISO } from "date-fns";
import "./NewsFeedListItem.css"
import { eventTypeHandlers } from "../../helpers/eventHandlers";

export interface NewsFeedListItemProps {
    event: EhrNewsFeedEventModel
    onClick(event: EhrNewsFeedEventModel): void
    showIcon?: boolean
}

export default function (props: NewsFeedListItemProps) {
    let handler = eventTypeHandlers[props.event.Type];

    let date = format(parseISO(props.event.Date), "h:mm a");
    if (date === "12:00 AM") {
        date = "";
    }

    return <Action
        className="mdhui-news-feed-list-item"
        bottomBorder
        icon={props.showIcon ? <img src={handler.icon} width={24} /> : undefined}
        onClick={handler.getDetail ? () => props.onClick!(props.event) : undefined}
        indicator={handler.getDetail ? undefined : <></>}
    >
        <div className="mdhui-news-feed-list-item-title">{handler.getTitle(props.event)}</div>
        {handler.getPreview && handler.getPreview(props.event)}
        <div className="mdhui-news-feed-list-item-date">{`${date ? date + " • " : ""}${props.event.Patient.RecordAuthority}`}</div>
    </Action>;
}
