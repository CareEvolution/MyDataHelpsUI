import React, { useState } from 'react';
import OnVisibleTrigger from '../../../presentational/OnVisibleTrigger';
import { getNewsFeedPage } from '../../helpers/dataService';
import { EhrNewsFeedEventModel } from '../../helpers/types';
import { format, parseISO } from 'date-fns';
import { Card, LoadingIndicator, Title } from '../../../presentational';
import NewsFeedListItem from '../../presentational/NewsFeedListItem';
import language from '../../../../helpers/language';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./EhrNewsFeed.css"
import { eventTypeHandlers } from '../../helpers/eventHandlers';
import { previewFeed } from '../../helpers/previewData';

export interface EhrNewsFeedProps {
    previewState?: "default"
    feed: string
}

interface EhrNewsFeedDayBucket {
    day: string
    items: EhrNewsFeedEventModel[]
}

export default function (props: EhrNewsFeedProps) {
    let [searchString, setSearchString] = useState<string>("");
    let [loading, setLoading] = useState<boolean>(false);
    let [dayBuckets, setDayBuckets] = useState<EhrNewsFeedDayBucket[]>([]);
    let [nextPageId, setNextPageId] = useState<string | undefined>(undefined);
    let [nextPageDate, setNextPageDate] = useState<string | undefined>(undefined);
    let [finished, setFinished] = useState<boolean>(false);

    function dayLabel(date: string) {
        return format(parseISO(date), 'MMMM do, yyyy');
    }

    function loadMore() {
        function addEvents(events: EhrNewsFeedEventModel[]) {
            let newDayBuckets = [...dayBuckets];
            events.forEach((event) => {
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
        }

        if (props.previewState == "default") {
            addEvents(previewFeed);
            setFinished(true);
            return;
        }

        setLoading(true);
        getNewsFeedPage(props.feed, nextPageId, nextPageDate).then((result) => {

            setNextPageDate(result.NextPageDate);
            setNextPageId(result.NextPageID);
            if (!result.NextPageID && !result.NextPageDate) {
                setFinished(true);
            }
            setLoading(false);
        });
    }

    function filterEvents(events: EhrNewsFeedEventModel[], filter: string) {
        return events.filter((event) => {
            let keywords = eventTypeHandlers[event.Type].getKeywords(event);
            return keywords.some((keyword) => keyword.toLowerCase().includes(filter.toLowerCase()));
        });
    }

    let filteredDayBuckets = dayBuckets.map((bucket) => {
        let newBucket = {
            ...bucket,
            items: filterEvents(bucket.items, searchString)
        }

        if (!newBucket.items.length) {
            return null;
        }
        return newBucket;
    }).filter((bucket) => bucket != null) as EhrNewsFeedDayBucket[];

    return (
        <div style={{ paddingBottom: "48px" }}>
            <Card className="mdhui-news-feed-search">
                <div className="mdhui-news-feed-search-bar">
                    <input title={language("search")} type="text" value={searchString} onChange={(event) => setSearchString(event.target.value)} placeholder={language("search")} spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
                    <FontAwesomeSvgIcon icon={faSearch} />
                </div>
            </Card>
            {filteredDayBuckets.map((bucket) =>
                <Card key={bucket.day}>
                    <Title style={{ margin: "var(--mdhui-padding-md)", marginBottom: 0 }} order={4}>{bucket.day}</Title>
                    {bucket.items.map((item) =>
                        <NewsFeedListItem showIcon key={item.ID} event={item} onClick={() => { }} />
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