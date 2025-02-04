import React, { useContext, useState } from "react"
import { getDailyDataTypeDefinition, getDayKey, language, queryRelativeActivity, RelativeActivityDataType, RelativeActivityQueryResult, resolveColor, useInitializeView } from "../../../helpers"
import { Action, DateRangeContext, LayoutContext, LoadingIndicator, SparkBarChart, SparkBarChartBar } from "../../presentational"
import { add, startOfDay } from "date-fns"
import icon from '../../../assets/fitness-wearable.svg';
import "../HealthPreviewSection/HealthPreviewSection.css"
import "./DeviceActivityPreview.css"

export interface DeviceActivityPreviewProps {
    date?: Date
    dataTypes: RelativeActivityDataType[]
    previewState?: "default"
    innerRef?: React.Ref<HTMLDivElement>
}

export default function DeviceActivityPreview(props: DeviceActivityPreviewProps) {
    let context = useContext(LayoutContext);
    let [results, setResults] = useState<{ [key: string]: { [key: string]: RelativeActivityQueryResult } } | undefined>(undefined);
    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    function loadData() {
        //prevent requests from returning back out of order, since some of these can be long running
        queryRelativeActivity(add(date, { days: -6 }), date, props.dataTypes, !!props.previewState).then(results => {
            setResults(results);
        });
    }

    useInitializeView(loadData, ["externalAccountSyncComplete"]);

    function drilldown() {

    };

    function getSparkBarChart(dataType: RelativeActivityDataType, data: { [key: string]: RelativeActivityQueryResult },) {
        var bars: SparkBarChartBar[] = [];
        for (var i = -6; i <= 0; i++) {
            let dayKey = getDayKey(add(new Date(), { days: i }));
            let dayData = data[dayKey];
            bars.push({
                barFillPercent: dayData.relativePercent,
                color: (dayData.value > dayData.threshold ? (dataType.overThresholdColor ?? dataType.color) : dataType.color) || "var(--mdhui-color-primary)"
            });
        }

        return <SparkBarChart style={{ height: "100%" }} bars={bars} averageFillPercent={0.5} />
    }

    function getPreviewItem(dataType: RelativeActivityDataType) {
        let definition = getDailyDataTypeDefinition(dataType.dailyDataType);
        let value = results![dataType.dailyDataType][getDayKey(new Date())].value;
        let formatter = dataType.formatter ?? definition.formatter;
        return <div className="mdhui-device-activity-preview-item" key={dataType.dailyDataType}>
            <div className="mdhui-device-activity-preview-info">
                <div className="mdhui-device-activity-preview-label">
                    {language(getDailyDataTypeDefinition(dataType.dailyDataType).labelKey!)}
                </div>
                <span className="mdhui-device-activity-preview-value">
                    <span style={{ color: resolveColor(context.colorScheme, dataType.color) || "var(--mdhui-color-primary)" }}>{dataType.icon ?? getDailyDataTypeDefinition(dataType.dailyDataType).icon}</span>
                    &nbsp;{formatter(value)}
                </span>
            </div>
            <div className="mdhui-device-activity-preview-chart">
                {getSparkBarChart(dataType, results![dataType.dailyDataType])}
            </div>
        </div>
    }

    return <div ref={props.innerRef}>
        <Action
            className="mdhui-device-activity-preview mdhui-health-preview-section"
            bottomBorder
            title={language("device-activity")}
            titleIcon={<img className="mdhui-health-preview-icon" src={icon} />}
            onClick={() => drilldown()}
            indicatorValue={"All"}
            indicatorPosition={"topRight"}>
            {!results &&
                <LoadingIndicator />
            }
            <div className="mdhui-device-activity-preview-items">
                {results && props.dataTypes.map(d =>
                    getPreviewItem(d)
                )}
            </div>
        </Action>
    </div>


}