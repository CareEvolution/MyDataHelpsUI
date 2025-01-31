import MyDataHelps from "@careevolution/mydatahelps-js";
import React, { useEffect, useState } from "react";
import { Action, LoadingIndicator, UnstyledButton } from "../../presentational";
import "./LabResultsSummary.css";
import icon from '../../../assets/icon-labreport.svg';
import LabResultWithSparkline from "../../presentational/LabResultWithSparkline";
import "../HealthPreviewSection/HealthPreviewSection.css"
import language from "../../../helpers/language";
import { importantLabs, recentLabs } from "./LabResultsSummary.previewdata";
import { TermInformationReference } from "../TermInformation/TermInformation";

export interface LabResultsSummaryProps {
    previewState?: "ImportantLabs" | "RecentLabs" | "NoData"
    onClick(): void;
    onViewTermInfo(termInfo: TermInformationReference): void
    innerRef?: React.Ref<HTMLDivElement>
}

/** Displays participant EHR Lab data. A connection to an EHR provider is required to display the data.
 * Can be configured to show Recent, or Important labs. Important labs can include sparklines. 
 * An onClick event is supported for customizing where the user will go when drillin into the full lab report
 * A onViewTermInfo event is supported for customizing what happens when the user clicks on a term information button
*/
export default function LabResultsSummary(props: LabResultsSummaryProps) {
    const [model, setModel] = useState<any>(null);
    const [noOverflow, setNoOverflow] = useState<boolean>(false);

    function getLabResultsSummary() {
        if (props.previewState == "ImportantLabs") {
            setModel(importantLabs);
            return;
        }
        if (props.previewState == "RecentLabs") {
            setModel(recentLabs);
            return;
        }
        if (props.previewState == "NoData") {
            setModel({
                ImportantLabs: [],
                RecentLabs: {
                    RecentLabReports: []
                }
            });
            return;
        }

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

    if (!model) {
        return <div ref={props.innerRef} className="mdhui-health-preview-section"><LoadingIndicator /></div>
    }

    if (model && !model.ImportantLabs.length && !model.RecentLabs?.RecentLabReports.length) {
        return null;
    }

    function drilldown() {
        if (!model) { return; }
        props.onClick();
    }

    return <div ref={props.innerRef}>
        <Action
            className="mdhui-lab-results-summary mdhui-health-preview-section"
            bottomBorder
            title={language("lab-results-title")}
            titleIcon={<img className="mdhui-health-preview-icon" src={icon} alt="Lab Results" />}
            onClick={() => drilldown()}
            indicatorValue={model?.RecentLabs?.TotalLabReports}
            indicatorPosition={model.ImportantLabs?.length ? "topRight" : undefined}>
            {!model &&
                <LoadingIndicator />
            }
            {model &&
                <>
                    {!!model.ImportantLabs.length &&
                        <div className={"mdhui-lab-results-values-container" + (noOverflow ? " no-overflow" : "")} style={{ height: model.ImportantLabs[0].length * 5.64 + "em" }}>
                            <div className="mdhui-lab-results-values-slider" style={{ width: (model.ImportantLabs.length * 13 + 0.5) + "em" }}>
                                {model.ImportantLabs.map((column: any, index: number) =>
                                    <div key={index} className="mdhui-lab-results-values-column">
                                        {column.map((lab: any, index: number) =>
                                            <LabResultWithSparkline onViewTermInfo={(t) => props.onViewTermInfo(t)} labResultValue={lab} key={index} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    {!model.ImportantLabs.length &&
                        <div>
                            {model.RecentLabs.RecentLabReports.map((item: any) => <div key={item} className="mdhui-health-preview-item">{item}</div>)}
                        </div>
                    }
                </>
            }
        </Action>
    </div>
}