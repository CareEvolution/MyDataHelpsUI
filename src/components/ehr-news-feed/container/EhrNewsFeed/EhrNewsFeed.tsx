import React, { useState } from 'react';
import OnVisibleTrigger from '../../../presentational/OnVisibleTrigger';
import { getNewsFeedPage } from '../../helpers/dataService';
import { EhrNewsFeedEventModel } from '../../helpers/types';
import { format, parseISO } from 'date-fns';
import { Card, LoadingIndicator, Title } from '../../../presentational';
import NewsFeedListItem from '../../presentational/NewsFeedListItem';

export interface EhrNewsFeedProps {
    feed: string
}

interface EhrNewsFeedDayBucket {
    day: string
    items: EhrNewsFeedEventModel[]
}

export default function (props: EhrNewsFeedProps) {
    let [loading, setLoading] = useState<boolean>(false);
    let [dayBuckets, setDayBuckets] = useState<EhrNewsFeedDayBucket[]>([]);
    let [nextPageId, setNextPageId] = useState<string | undefined>(undefined);
    let [nextPageDate, setNextPageDate] = useState<string | undefined>(undefined);
    let [finished, setFinished] = useState<boolean>(false);

    function dayLabel(date: string) {
        return format(parseISO(date), 'MMMM do, yyyy');
    }

    function loadMore() {
        setLoading(true);
        getNewsFeedPage(props.feed, nextPageId, nextPageDate).then((result) => {
            let newDayBuckets = [...dayBuckets];
            result.Events.forEach((event) => {
                let eventDayLabel = dayLabel(event.Date);
                if (newDayBuckets.length && newDayBuckets[newDayBuckets.length - 1].day == eventDayLabel) {
                    newDayBuckets[newDayBuckets.length - 1].items.push(event);
                } else {
                    newDayBuckets.push({
                        day: eventDayLabel,
                        items: [event]
                    });
                }
            });
            setDayBuckets(newDayBuckets);
            setNextPageDate(result.NextPageDate);
            setNextPageId(result.NextPageID);
            if (!result.NextPageID && !result.NextPageDate) {
                setFinished(true);
            }
            setLoading(false);
        });
    }

    return (
        <div>
            {dayBuckets.map((bucket) =>
                <Card key={bucket.day}>
                    <Title style={{ margin:"var(--mdhui-padding-md)", marginBottom: 0 }} order={4}>{bucket.day}</Title>
                    {bucket.items.map((item) =>
                        <NewsFeedListItem key={item.ID} event={item} onClick={() => { }} />
                    )}
                </Card>
            )}
            {loading &&
                <LoadingIndicator />
            }
            <OnVisibleTrigger onTrigger={() => loadMore()} enabled={!loading && !finished} />
        </div>
    )
}