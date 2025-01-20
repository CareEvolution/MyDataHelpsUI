import React, { useState } from 'react';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger';
import { getNewsFeedPage } from '../../../helpers/news-feed/data';
import { Action, Card, LoadingIndicator, Title } from '../../presentational';
import language from '../../../helpers/language';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./EhrNewsFeed.css"
import { EhrNewsFeedEventModel, EhrNewsFeedType } from '../../../helpers/news-feed/types';
import { previewFeed } from '../../../helpers/news-feed/previewData';
import { eventTypeDefinitions } from '../../../helpers/news-feed/eventTypeDefinitions';
import { getFullDateString, getTimeOfDayString, toDate } from '../../../helpers/date-helpers';

export interface EhrNewsFeedProps {
    previewState?: "default" | "procedures" | "labReports" | "immunizations" | "reports"
    onEventSelected(eventReference: EhrNewsFeedEventReference): void
    feed: EhrNewsFeedType
    onReportSelected(reportID: string): void
}

export interface EhrNewsFeedEventReference {
    feed: EhrNewsFeedType
    pageId?: string
    pageDate?: string
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

    function loadMore() {
        function addEvents(events: EhrNewsFeedEventModel[]) {
            let newDayBuckets = [...dayBuckets];
            events.forEach((event) => {
                let eventDayLabel = getFullDateString(event.Date);
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
            if (props.feed == "Procedures") {
                addEvents(previewFeed.filter((event) => event.Type == "ProcedureGroup" || event.Type == "ClaimProcedureGroup" || event.Type == "ClaimServiceGroup"));
            }
            else if (props.feed == "Reports") {
                addEvents(previewFeed.filter((event) => event.Type == "Report"));
            }
            else if (props.feed == "LabReports") {
                addEvents(previewFeed.filter((event) => event.Type == "LabReport"));
            }
            else if (props.feed == "Immunizations") {
                addEvents(previewFeed.filter((event) => event.Type == "Immunization"));
            }
            setFinished(true);
            return;
        }

        setLoading(true);
        getNewsFeedPage(props.feed, nextPageId, nextPageDate).then((result) => {
            addEvents(result.Events)
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
            let keywords = eventTypeDefinitions[event.Type].getKeywords(event);
            if (event.Type == "Immunization" && !keywords.length) { return false; }
            if (!keywords.length) { return !filter; }
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

    const selectEvent = function (dayBucket: EhrNewsFeedDayBucket, event: EhrNewsFeedEventModel) {
        if (event.Type == "Report") {
            props.onReportSelected(event.ID);
            return;
        }

        let index = dayBucket.items.indexOf(event);
        if (index != 0) {
            props.onEventSelected({
                feed: props.feed,
                pageId: dayBucket.items[index - 1].ID,
                pageDate: dayBucket.items[index - 1].Date
            });
        } else {
            let bucketIndex = dayBuckets.findIndex(v => v.day == dayBucket.day);
            if (bucketIndex == 0) {
                props.onEventSelected({
                    feed: props.feed
                });
            }
            else {
                let previousBucket = dayBuckets[bucketIndex - 1];
                props.onEventSelected({
                    feed: props.feed,
                    pageId: previousBucket.items[previousBucket.items.length - 1].ID,
                    pageDate: previousBucket.items[previousBucket.items.length - 1].Date
                });
            }
        }
    }

    return (
        <div className="mdhui-news-feed" style={{ paddingBottom: "48px" }}>
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
                        <NewsFeedListItem onClick={() => selectEvent(bucket, item)} key={item.ID} event={item} />
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

function NewsFeedListItem(props: { event: EhrNewsFeedEventModel, onClick: (event: EhrNewsFeedEventModel) => void }) {
    let definition = eventTypeDefinitions[props.event.Type];
    let date = toDate(props.event.Date);
    let timeString = getTimeOfDayString(date!);

    function getTitle() {
        let titleItems = definition.getTitleItems(props.event);
        if (titleItems.length <= 3) {
            return titleItems.join(" • ");
        }
        else {
            let shownItems = titleItems.slice(0, 3);
            return <>{shownItems.join(" • ") + " • "}<span className="mdhui-news-feed-list-item-more">{titleItems.length - 3} {language("more")}</span></>;
        }
    }

    return <Action
        className="mdhui-news-feed-list-item"
        bottomBorder
        icon={<img src={definition.icon} width={24} />}
        onClick={definition.hasDetail ? () => props.onClick!(props.event) : undefined}
        indicator={definition.hasDetail ? undefined : <></>}
    >
        <div className="mdhui-news-feed-list-item-title">{getTitle()}</div>
        {definition.getPreview && definition.getPreview(props.event)}
        <div className="mdhui-news-feed-list-item-date">{`${timeString ? timeString + " • " : ""}${props.event.Patient.RecordAuthority}`}</div>
    </Action>;
}
