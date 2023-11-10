import React from "react";
import { EhrNewsFeedLabReportModel } from "../../helpers/types";
import { Action, Card, TextBlock, Title, UnstyledButton } from "../../../presentational";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./LabReportDetail.css"

export interface LabReportDetailProps {
    labReport: EhrNewsFeedLabReportModel
    onViewTermInfo: (labObservationID: string) => void
}

export default function (props: LabReportDetailProps) {
    return <div className="mdhui-lab-report-detail">
        <Title defaultMargin order={3}>{props.labReport.Service}</Title>
        <TextBlock>{props.labReport.Comment}</TextBlock>
        {props.labReport.LabObservations.map((observation, index) =>
            <Card>
                <Action renderAs="div" subtitle={observation.Type} indicator={
                    <UnstyledButton onClick={() => props.onViewTermInfo(observation.ID)}><FontAwesomeSvgIcon color="var(--mdhui-color-primary)" icon={faQuestionCircle} /></UnstyledButton>
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
                            Normal Range: {observation.NormalRange}
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