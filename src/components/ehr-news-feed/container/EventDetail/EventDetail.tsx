import React, { useEffect, useState } from 'react';
import { getNewsFeedPage } from '../../helpers/dataService';
import { EhrNewsFeedEventModel, EhrNewsFeedEventType } from '../../helpers/types';
import { LoadingIndicator } from '../../../presentational';
import { eventTypeHandlers } from '../../helpers/eventHandlers';

export interface EventDetailProps {
    feed: string
    pageId: string
    pageDate: string
    previewState?: EhrNewsFeedEventType
}

export default function (props: EventDetailProps) {
    let [loading, setLoading] = useState<boolean>(false);
    let [event, setEvent] = useState<EhrNewsFeedEventModel | null>(null);

    function load() {
        if (props.previewState) {
            let handler = eventTypeHandlers[props.previewState];
            setEvent(handler.getPreviewEvent());
            return;
        }

        setLoading(true);
        getNewsFeedPage(props.feed, props.pageId, props.pageDate).then((result) => {
            setEvent(result.Events[0]);
            setLoading(false);
        });
    }

    useEffect(() => {
        load();
    }, []);

    function getDetail() {
        let handler = eventTypeHandlers[event!.Type];
        return handler.getDetail!(event!);
    }

    return <div>
        {loading &&
            <LoadingIndicator />
        }
        {event && getDetail()}
    </div>
}