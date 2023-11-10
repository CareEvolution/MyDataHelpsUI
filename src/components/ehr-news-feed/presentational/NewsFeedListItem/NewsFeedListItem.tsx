import React from "react";
import { EhrNewsFeedEventModel } from "../../helpers/types";
import { Action } from "../../../presentational";
import { format, parseISO } from "date-fns";
import "./NewsFeedListItem.css"
import { eventTypeHandlers } from "../../helpers/eventHandlers";

export interface NewsFeedListItemProps {
    event: EhrNewsFeedEventModel
    onClick(event: EhrNewsFeedEventModel): void
}

export default function (props: NewsFeedListItemProps) {
    let handler = eventTypeHandlers[props.event.Type];

    let date = format(parseISO(props.event.Date), "h:mm a");
    if (date === "12:00 AM") {
        date = "";
    }

    function getTitle() {
        let titleItems = handler.getTitleItems(props.event);
        if (titleItems.length <= 3) {
            return titleItems.join(" • ");
        }
        else {
            let shownItems = titleItems.slice(0, 3);
            return <>{shownItems.join(" • ") + " • "}<span className="mdhui-news-feed-list-item-more">{titleItems.length - 3} More</span></>;
        }
    }

    return <Action
        className="mdhui-news-feed-list-item"
        bottomBorder
        icon={<img src={handler.icon} width={24} />}
        onClick={handler.getDetail ? () => props.onClick!(props.event) : undefined}
        indicator={handler.getDetail ? undefined : <></>}
    >
        <div className="mdhui-news-feed-list-item-title">{getTitle()}</div>
        {handler.getPreview && handler.getPreview(props.event)}
        <div className="mdhui-news-feed-list-item-date">{`${date ? date + " • " : ""}${props.event.Patient.RecordAuthority}`}</div>
    </Action>;
}
