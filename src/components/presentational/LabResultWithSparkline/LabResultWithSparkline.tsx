import React, { useEffect, useRef, useState } from "react";
import "./LabResultWithSparkline.css"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { TermInformationReference } from "../../container/TermInformation/TermInformation";
import { formatDate } from '../../../helpers/locale';

export interface LabResultValue {
    Type: string,
    MostRecentValue: string,
    AcuityHighlight: string,
    MostRecentDate: string,
    NormalRangeTopY: number,
    NormalRangeBottomY: number,
    SparklinePoints: SparklinePoint[],
    TermInformation?: TermInformationReference
}

export interface SparklinePoint {
    X: number,
    Y: number
}

export interface LabResultWithSparklineProps {
    labResultValue: LabResultValue;
    onViewTermInfo(termInfo: TermInformationReference): void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: LabResultWithSparklineProps) {
    let [sparklineXRange, setSparklineXRange] = useState(0);
    let [sparklineYRange, setSparklineYRange] = useState(0);
    let sparklineSvg = useRef<SVGSVGElement>(null);

    useEffect(() => {
        setSparklineXRange(sparklineSvg.current?.getBoundingClientRect().width || 0);
        setSparklineYRange(sparklineSvg.current?.getBoundingClientRect().height || 0);
    });

    function showTermInfo(e: React.MouseEvent<HTMLDivElement, MouseEvent>, termInfo: TermInformationReference) {
        e.preventDefault();
        e.stopPropagation();
        props.onViewTermInfo(termInfo);
    }

    return <div ref={props.innerRef} className="mdhui-lab-result-with-sparkline">
        <div className="mdhui-lab-result-with-sparkline-title">{props.labResultValue.Type}</div>
        <div className="mdhui-lab-result-with-sparkline-flex">
            <div className="mdhui-lab-result-with-sparkline-value">
                <div className="mdhui-lab-result-with-sparkline-quantity">
                    <span style={{ verticalAlign: "middle" }}>{props.labResultValue.MostRecentValue}</span>
                    &nbsp;
                    {props.labResultValue.AcuityHighlight == 'High' &&
                        <span className="mdhui-lab-result-with-sparkline-acuity mdhui-lab-result-with-sparkline-acuity-high">H</span>
                    }
                    {props.labResultValue.AcuityHighlight == 'Low' &&
                        <span className="mdhui-lab-result-with-sparkline-acuity mdhui-lab-result-with-sparkline-acuity-low">L</span>
                    }
                </div>
                <div className="mdhui-lab-result-with-sparkline-date">{formatDate(props.labResultValue.MostRecentDate, "MM/dd/yy")}</div>
            </div>
            <div className="mdhui-lab-result-with-sparkline-container">
                {!!props.labResultValue.SparklinePoints.length &&
                    <svg ref={sparklineSvg} className="mdhui-lab-result-with-sparkline-sparkline">
                        {props.labResultValue.NormalRangeTopY &&
                            <rect x="0"
                                y="0"
                                width={sparklineXRange}
                                height={props.labResultValue.NormalRangeTopY * sparklineYRange}
                                fill="var(--mdhui-color-danger)" />
                        }
                        {props.labResultValue.NormalRangeBottomY &&
                            <rect
                                x="0"
                                y={props.labResultValue.NormalRangeBottomY * sparklineYRange}
                                width={sparklineXRange}
                                height={props.labResultValue.NormalRangeBottomY * sparklineYRange}
                                fill="var(--mdhui-color-primary)" />
                        }
                        {props.labResultValue.SparklinePoints.slice(0, props.labResultValue.SparklinePoints.length - 1).map((point: any, index: number) =>
                            <line
                                key={index}
                                x1={point.X * sparklineXRange}
                                y1={point.Y * sparklineYRange}
                                x2={props.labResultValue.SparklinePoints[index + 1].X * sparklineXRange}
                                y2={props.labResultValue.SparklinePoints[index + 1].Y * sparklineYRange}
                                style={{ stroke: "var(--mdhui-border-color-2)", strokeWidth: 2 }} />
                        )}
                        <circle cx={props.labResultValue.SparklinePoints[props.labResultValue.SparklinePoints.length - 1].X * sparklineXRange}
                            cy={props.labResultValue.SparklinePoints[props.labResultValue.SparklinePoints.length - 1].Y * sparklineYRange}
                            r="3"
                            fill="var(--mdhui-color-primary)" />
                    </svg>
                }
                {!!props.labResultValue.TermInformation &&
                    <div className="mdhui-lab-result-with-sparkline-term-info" onClick={(e) => showTermInfo(e, props.labResultValue.TermInformation!)}>
                        <FontAwesomeSvgIcon icon={faInfoCircle} />
                    </div>
                }
            </div>
        </div>
    </div>
}