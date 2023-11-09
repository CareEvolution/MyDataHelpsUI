import React, { useEffect, useState } from 'react';
import { getNewsFeedPage } from '../../helpers/dataService';
import { EhrNewsFeedEventModel } from '../../helpers/types';
import { LoadingIndicator } from '../../../presentational';
import "./EhrNewsFeed.css"
import ProcedureGroupDetail from '../../presentational/ProcedureGroupDetail/ProcedureGroupDetail';

export interface EventDetailProps {
    feed: string
    pageId: string
    pageDate: string
}

export default function (props: EventDetailProps) {
    let [loading, setLoading] = useState<boolean>(false);
    let [event, setEvent] = useState<EhrNewsFeedEventModel | null>(null);

    function load() {
        setLoading(true);
        getNewsFeedPage(props.feed, props.pageId, props.pageDate).then((result) => {
            setEvent(result.Events[0]);
            setLoading(false);
        });
    }

    useEffect(() => {
        load();
    }, []);

    return <div>
        {loading &&
            <LoadingIndicator />
        }
        {event &&
            <>
                {event.Type == "ProcedureGroup" && <ProcedureGroupDetail event={event} />}
            </>
        }
    </div>
}