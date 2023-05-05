import MyDataHelps from "@careevolution/mydatahelps-js";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../../presentational";
import "../LabResultsSummary.css";

export interface LabResultsSummaryProps {
    previewState: "default" | "loading" | "noData"
}

export default function (props: LabResultsSummaryProps) {
    const [model, setModel] = useState<any>(null);
    const [noOverflow, setNoOverflow] = useState<boolean>(false);

    function getLabResultsSummary() {
        var endpoint = 'HealthAndWellnessApi.LabResults';
        return MyDataHelps.invokeCustomApi(endpoint, 'GET', "", true)
            .then(function (response) {
                setModel(response);
            });
    }

    useEffect(() => {
        if (getScrollbarWidth() > 0) {
            setNoOverflow(true);
        }

        getLabResultsSummary();

        MyDataHelps.on("externalAccountSyncComplete", getLabResultsSummary);
        MyDataHelps.on("applicationDidBecomeVisible", getLabResultsSummary);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", getLabResultsSummary);
            MyDataHelps.off("applicationDidBecomeVisible", getLabResultsSummary);
        }
    }, []);

    var getScrollbarWidth = function () {
        var div: any, width: any = (getScrollbarWidth as any).width;
        if (width === undefined) {
            div = document.createElement('div');
            div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
            div = div.firstChild;
            document.body.appendChild(div);
            width = (getScrollbarWidth as any).width = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
        }
        return width;
    };

    if (model && !model.ImportantLabs.length && !model.RecentLabs.length) {
        return null;
    }

    function drilldown() {
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/LabReports.html?lang=en");
    }

    function showTermInfo(e: React.MouseEvent<HTMLDivElement, MouseEvent>, termInfo: any) {
        e.preventDefault();
        e.stopPropagation();
        var queryString = new URLSearchParams({ termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode }).toString();
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/TermInformation.html?" + queryString, { modal: true });
    }

    function formatDate(d: any) {
        return format(parseISO(d), "MM/dd/yy");
    }

    let sparklineXRange = 70;
    let sparklineYRange = 40;

    return <div className="wrapper">
        {!model &&
            <LoadingIndicator />
        }
        {model &&
            <>
                {!!model.ImportantLabs.length &&
                    <div className="health-profile-section important-values-section" onClick={() => drilldown()}>
                        <div className="more">
                            {model.TotalLabReports}
                            <i className="fa fa-chevron-right"></i>
                        </div>
                        <div className="section-header">
                            <img className="icon" src="/images/icon-labreport.svg" alt="Lab Results" />
                            <span>Lab Results</span>
                        </div>
                        <div className={"values-container" + (noOverflow ? " no-overflow" : "")} style={{ height: model.ImportantLabs[0].length * 5.64 + "em" }}>
                            <div className="values-slider" style={{ width: model.ImportantLabs.length * 11.5 + "em" }}>
                                {model.ImportantLabs.map((column: any, index: number) =>
                                    <div key={index} className="values-column">
                                        {column.map((lab: any, index: number) =>
                                            <div key={index} className="value-container">
                                                <div className="value-title">{lab.Type}</div>
                                                <div className="value">
                                                    <div className="quantity {{lab.AcuityHighlight || lowercase}}">
                                                        {lab.MostRecentValue}
                                                        {lab.AcuityHighlight == 'High' &&
                                                            <span className="acuity">H</span>
                                                        }
                                                        {lab.AcuityHighlight == 'Low' &&
                                                            <span className="acuity">L</span>
                                                        }
                                                    </div>
                                                    <div className="date">{formatDate(lab.MostRecentDate)}</div>
                                                </div>
                                                {!!lab.SparklinePoints.length &&
                                                    <svg className="sparkline">
                                                        {lab.NormalRangeTopY &&
                                                            <rect x="0"
                                                                y="0"
                                                                width={sparklineXRange}
                                                                height={lab.NormalRangeTopY * sparklineYRange}
                                                                fill="#f8eeee" />
                                                        }
                                                        {lab.NormalRangeBottomY &&
                                                            <rect
                                                                x="0"
                                                                y={lab.NormalRangeBottomY * sparklineYRange}
                                                                width={sparklineXRange}
                                                                height={lab.NormalRangeBottomY * sparklineYRange}
                                                                fill="#ebeef8" />
                                                        }
                                                        {lab.SparklinePoints.slice(0, lab.SparklinePoints.length - 1).map((point: any, index: number) =>
                                                            <line
                                                                key={index}
                                                                x1={point.X * sparklineXRange}
                                                                y1={point.Y * sparklineYRange}
                                                                x2={lab.SparklinePoints[index + 1].X * sparklineXRange}
                                                                y2={lab.SparklinePoints[index + 1].Y * sparklineYRange}
                                                                style={{ stroke: "rgb(0,0,0)", strokeWidth: 1 }} />
                                                        )}
                                                        <circle cx={lab.SparklinePoints[lab.SparklinePoints.length - 1].X * sparklineXRange}
                                                            cy={lab.SparklinePoints[lab.SparklinePoints.length - 1].Y * sparklineYRange}
                                                            r="3"
                                                            fill="#2e6e9e" />
                                                    </svg>

                                                }
                                                {lab.TermInformation &&
                                                    <div ng-if="lab.TermInformation" className="term-info" onClick={(e) => showTermInfo(e, lab.TermInformation)}><i className="fa fa-info-circle"></i></div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
                {!model.ImportantLabs.length &&
                    <div className="health-profile-section" onClick={() => drilldown()}>
                        <div className="middle-anchor">
                            <div className="more">
                                {model.TotalLabReports}
                                <i className="fa fa-chevron-right"></i>
                            </div>
                        </div>
                        <div className="section-header">
                            <img className="icon" src="../images/icon-labreport.svg" />
                            <span>Lab Results</span>
                        </div>
                        {model.RecentLabReports.map((labReport: any) =>
                            <div className="list-item" ng-repeat="labReport in $ctrl.model.RecentLabReports">{labReport}</div>
                        )}
                    </div>
                }
            </>

        }
    </div>
}