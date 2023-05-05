import MyDataHelps from "@careevolution/mydatahelps-js";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { LoadingIndicator, UnstyledButton } from "../../presentational";
import "./LabResultsSummary.css";
import icon from './icon-labreport.svg';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import LabResultWithSparkline from "../../presentational/LabResultWithSparkline";

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
        if (!model) return;
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/LabReports.html?lang=en");
    }

    return <UnstyledButton onClick={() => drilldown()} className="mdhui-lab-results-summary">
        {!model &&
            <LoadingIndicator />
        }
        {model &&
            <>
                <div className="mdhui-hw-section-header">
                    <img className="mdhui-hw-section-header-icon" src={icon} alt="Lab Results" />
                    <span>Lab Results</span>
                </div>
                <div className="mdhui-hw-section-indicator">
                    {model.TotalLabReports}
                    <FontAwesomeSvgIcon icon={faChevronRight} />
                </div>
                {!!model.ImportantLabs.length &&
                    <div className={"values-container" + (noOverflow ? " no-overflow" : "")} style={{ height: model.ImportantLabs[0].length * 5.64 + "em" }}>
                        <div className="values-slider" style={{ width: (model.ImportantLabs.length * 13 + 0.5) + "em" }}>
                            {model.ImportantLabs.map((column: any, index: number) =>
                                <div key={index} className="values-column">
                                    {column.map((lab: any, index: number) =>
                                        <LabResultWithSparkline labResultValue={lab} key={index} />
                                    )}
                                </div>
                            )}
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
                        {model.RecentLabReports.map((labReport: any) =>
                            <div className="list-item" ng-repeat="labReport in $ctrl.model.RecentLabReports">{labReport}</div>
                        )}
                    </div>
                }
            </>

        }
    </UnstyledButton>
}