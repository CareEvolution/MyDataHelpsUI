import React, { useEffect, useState } from 'react';
import { getNewsFeedPage } from '../../../helpers/news-feed/data';
import { Action, Card, LoadingIndicator, TextBlock, Title, UnstyledButton } from '../../presentational';
import StatBlock from '../../presentational/StatBlock';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { eventTypeDefinitions } from '../../../helpers/news-feed/eventTypeDefinitions';
import { EhrNewsFeedClaimProcedureModel, EhrNewsFeedClaimServiceModel, EhrNewsFeedEventModel, EhrNewsFeedEventType, EhrNewsFeedType, EhrNewsFeedLabReportModel, EhrNewsFeedProcedureModel } from '../../../helpers/news-feed/types';
import "./EhrNewsFeedEventDetail.css"
import language from '../../../helpers/language';

export interface EhrNewsFeedEventDetailProps {
    feed: EhrNewsFeedType
    pageId?: string
    pageDate?: string
    previewState?: EhrNewsFeedEventType
    onViewLabObservationTermInfo(labObservationID: string): void
}

export default function (props: EhrNewsFeedEventDetailProps) {
    let [loading, setLoading] = useState<boolean>(false);
    let [event, setEvent] = useState<EhrNewsFeedEventModel | null>(null);

    function load() {
        if (props.previewState) {
            let handler = eventTypeDefinitions[props.previewState!];
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

    return <div className="mdhui-ehr-news-feed-event-detail">
        {loading &&
            <LoadingIndicator />
        }
        {event &&
            <>
                <NewsFeedDetailTitle event={event} />
                {event.Type == "ProcedureGroup" && <ProcedureGroupDetail event={event} />}
                {event.Type == "ClaimProcedureGroup" && <ClaimProcedureGroupDetail event={event} />}
                {event.Type == "LabReport" && <LabReportDetail event={event} onViewLabObservationTermInfo={props.onViewLabObservationTermInfo} />}
                {event.Type == "ClaimServiceGroup" && <ClaimServiceGroupDetail event={event} />}
            </>
        }
    </div>
}

function NewsFeedDetailTitle(props: { event: EhrNewsFeedEventModel }) {
    let handler = eventTypeDefinitions[props.event.Type];

    let title = handler.getDetailTitle ? handler.getDetailTitle(props.event) : undefined;
    if (!title) { return null; }

    let date = parseISO(props.event.Date);
    let subtitle = `${format(parseISO(props.event.Date), "EEEE, MMMM do, y h:mm a")} • ${props.event.Patient.RecordAuthority}`
    if (format(date, "h:mm a") == "12:00 AM") {
        subtitle = props.event.Patient.RecordAuthority;
    }

    return <Action
        indicator={<></>}
        title={title}
        subtitle={subtitle}
        icon={<img src={handler.icon} width={24} />} />;
}

function ProcedureGroupDetail(props: { event: EhrNewsFeedEventModel }) {
    let procedures = props.event.Event as EhrNewsFeedProcedureModel[];
    return <>
        {procedures.map((procedure, index) =>
            <Card key={procedure.ID} style={{ marginTop: "0" }}>
                <Title defaultMargin order={5}>{procedure.Procedure}</Title>
                <StatBlock labelWidth="90px" defaultMargin stats={[
                    { label: language("type"), value: procedure.Type },
                    { label: language("location"), value: procedure.Location },
                    { label: language("description"), value: procedure.Description == procedure.Procedure ? undefined : procedure.Description },
                    { label: language("performed-by"), value: procedure.PerformedByCaregiver?.CaregiverName },
                    { label: language("verified-by"), value: procedure.VerifiedByCaregiver?.CaregiverName }
                ]} />
            </Card>
        )}
    </>
}

function LabReportDetail(props: { event: EhrNewsFeedEventModel, onViewLabObservationTermInfo: (labObservationID: string) => void }) {
    let labReport = props.event.Event as EhrNewsFeedLabReportModel;
    return <div className="mdhui-lab-report-detail">
        <Title defaultMargin order={3}>{labReport.Service}</Title>
        <TextBlock>{labReport.Comment}</TextBlock>
        {labReport.LabObservations.map((observation, index) =>
            <Card key={observation.ID}>
                <Action renderAs="div" subtitle={observation.Type} indicator={
                    <UnstyledButton onClick={() => props.onViewLabObservationTermInfo(observation.ID)}><FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} /></UnstyledButton>
                }>
                    <Title order={2}>
                        <div className="mdhui-lab-report-detail-value">
                            <div>{observation.Value} {observation.Units}</div>

                            {observation.Acuity && observation.Acuity != "Normal" &&
                                <span className={"mdhui-lab-report-detail-acuity" + (observation.AcuityHighlight ? ` mdhui-lab-report-detail-acuity-${observation.AcuityHighlight.toLowerCase()}` : "")}>
                                    {observation.Acuity}
                                </span>
                            }
                        </div>
                    </Title>
                    {observation.NormalRange &&
                        <div className="mdhui-lab-report-detail-normal-range">
                            {language("normal-range")}: {observation.NormalRange}
                        </div>
                    }
                </Action>
                {observation.Comment &&
                    <div className="mdhui-lab-report-detail-comment">
                        {observation.Comment}
                    </div>
                }
            </Card>
        )}
    </div>;
}

function ClaimProcedureGroupDetail(props: { event: EhrNewsFeedEventModel }) {
    let procedures = props.event.Event as EhrNewsFeedClaimProcedureModel[];
    return <>
        {procedures.map((procedure) =>
            <Card key={procedure.ID} style={{ marginTop: "0" }}>
                <Title defaultMargin order={5}>{procedure.Procedure}</Title>
                <StatBlock labelWidth="90px" defaultMargin stats={[
                    { label: language("type"), value: procedure.Type }
                ]} />
            </Card>
        )}
    </>
}

function ClaimServiceGroupDetail(props: { event: EhrNewsFeedEventModel }) {
    let services = props.event.Event as EhrNewsFeedClaimServiceModel[];
    return <>
        {services.map((service) =>
            <Card key={service.ID} style={{ marginTop: "0" }}>
                <Title defaultMargin order={5}>{service.Service}</Title>
            </Card>
        )}
    </>
}