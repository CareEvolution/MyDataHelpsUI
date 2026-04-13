import React, { RefObject, useEffect, useRef, useState } from "react";
import { getNewsFeedPage } from "../../../helpers/news-feed/data";
import { Action, Card, LoadingIndicator, TermInformationButton, TextBlock, Title } from "../../presentational";
import StatBlock from "../../presentational/StatBlock";
import { eventTypeDefinitions } from "../../../helpers/news-feed/eventTypeDefinitions";
import { EhrNewsFeedClaimProcedureModel, EhrNewsFeedClaimServiceModel, EhrNewsFeedEventModel, EhrNewsFeedEventType, EhrNewsFeedLabReportModel, EhrNewsFeedProcedureModel, EhrNewsFeedType } from "../../../helpers/news-feed/types";
import "./EhrNewsFeedEventDetail.css";
import language from "../../../helpers/language";
import { getDayAndDateAndTimeString, getTimeOfDayString } from "../../../helpers/date-helpers";
import EhrDownloadButton from "../EhrDownloadButton";

export interface EhrNewsFeedEventDetailProps {
    feed: EhrNewsFeedType;
    pageId?: string;
    pageDate?: string;
    previewState?: EhrNewsFeedEventType;
    onViewLabObservationTermInfo?: (labObservationID: string) => void;
}

export default function EhrNewsFeedEventDetail(props: EhrNewsFeedEventDetailProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [event, setEvent] = useState<EhrNewsFeedEventModel>();

    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.previewState) {
            setEvent(eventTypeDefinitions[props.previewState].getPreviewEvent());
            setLoading(false);
            return;
        }
        getNewsFeedPage(props.feed, props.pageId, props.pageDate).then((result) => {
            setEvent(result.Events[0]);
            setLoading(false);
        });
    }, []);

    return <div ref={reportRef}>
        <div className="mdhui-ehr-news-feed-event-detail">
            {loading && <LoadingIndicator />}
            {event &&
                <>
                    <NewsFeedDetailTitle preview={!!props.previewState} event={event} reportRef={reportRef} loading={loading} />
                    {event.Type === "ProcedureGroup" && <ProcedureGroupDetail event={event} />}
                    {event.Type === "ClaimProcedureGroup" && <ClaimProcedureGroupDetail event={event} />}
                    {event.Type === "LabReport" && <LabReportDetail event={event} onViewLabObservationTermInfo={props.onViewLabObservationTermInfo} />}
                    {event.Type === "ClaimServiceGroup" && <ClaimServiceGroupDetail event={event} />}
                </>
            }
        </div>
    </div>;
}

function NewsFeedDetailTitle(props: { preview?: boolean, event: EhrNewsFeedEventModel, reportRef: RefObject<HTMLDivElement>, loading?: boolean }) {
    const handler = eventTypeDefinitions[props.event.Type];

    const title = handler.getDetailTitle ? handler.getDetailTitle(props.event) : undefined;
    if (!title) return null;

    let subtitle = `${getDayAndDateAndTimeString(props.event.Date)} • ${props.event.Patient.RecordAuthority}`;
    if (getTimeOfDayString(props.event.Date) === "") {
        subtitle = props.event.Patient.RecordAuthority;
    }

    const getDownloadFileName = (event: EhrNewsFeedEventModel): string => {
        let fileName: string = event.Type;
        if (["ProcedureGroup", "ClaimProcedureGroup", "ClaimServiceGroup"].includes(event.Type)) {
            fileName = "Procedures";
        }
        return fileName;
    };

    return <Action
        icon={<img src={handler.icon} width={24} alt="icon" />}
        title={title}
        subtitle={subtitle}
        indicator={<EhrDownloadButton preview={props.preview} reportRef={props.reportRef} fileName={getDownloadFileName(props.event)} hidden={props.loading} />}
        renderAs="div"
    />;
}

function ProcedureGroupDetail(props: { event: EhrNewsFeedEventModel }) {
    const procedures = props.event.Event as EhrNewsFeedProcedureModel[];
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
    </>;
}

function LabReportDetail(props: { event: EhrNewsFeedEventModel, onViewLabObservationTermInfo?: (labObservationID: string) => void }) {
    const labReport = props.event.Event as EhrNewsFeedLabReportModel;
    return <div className="mdhui-lab-report-detail">
        <Title defaultMargin order={3}>{labReport.Service}</Title>
        <TextBlock>{labReport.Comment}</TextBlock>
        {labReport.LabObservations.map((observation, index) =>
            <Card key={observation.ID}>
                <Action
                    subtitle={observation.Type}
                    indicator={
                        <TermInformationButton labObservationID={observation.ID} onViewLabObservationTermInfo={props.onViewLabObservationTermInfo} />
                    }
                    renderAs="div"
                >
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
    const procedures = props.event.Event as EhrNewsFeedClaimProcedureModel[];
    return <>
        {procedures.map((procedure) =>
            <Card key={procedure.ID} style={{ marginTop: "0" }}>
                <Title defaultMargin order={5}>{procedure.Procedure}</Title>
                <StatBlock labelWidth="90px" defaultMargin stats={[
                    { label: language("type"), value: procedure.Type }
                ]} />
            </Card>
        )}
    </>;
}

function ClaimServiceGroupDetail(props: { event: EhrNewsFeedEventModel }) {
    const services = props.event.Event as EhrNewsFeedClaimServiceModel[];
    return <>
        {services.map((service) =>
            <Card key={service.ID} style={{ marginTop: "0" }}>
                <Title defaultMargin order={5}>{service.Service}</Title>
            </Card>
        )}
    </>;
}