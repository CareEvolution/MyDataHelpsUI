import MyDataHelps from "@careevolution/mydatahelps-js";
import { faBed, faChevronDown, faChevronUp, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { add } from "date-fns";
import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import getDayKey from "../../../helpers/get-day-key";
import { DailyDataQueryResult, DailyDataType, queryDailyData } from "../../../helpers/query-daily-data";
import { ActivityMeter, CardTitle } from "../../presentational";
import "./ActivityThresholdsToday.css"

export interface ActivityThresholdTodayProps {
    dataTypes: ActivityThresholdsDataType[];
    previewState?: "Default";
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>
}

export interface ActivityThresholdsDataType {
    dailyDataType: string;
    threshold: number;
    label: string;
    icon: React.ReactElement;
    color: string;
    formatter: (number: number) => string;
}

export default function (props: ActivityThresholdTodayProps) {
    let [dailyData, setDailyData] = useState<{ [key: string]: DailyDataQueryResult } | null>(null);

    function loadData() {
        if (props.previewState === "Default") {
            setDailyData({});
            return;
        };
        let today = new Date();
        let startDate = add(new Date(), { days: -2 });
        let promises = props.dataTypes.map(dataType => queryDailyData(dataType.dailyDataType, startDate, add(today, { days: 1 })));
        Promise.all(promises).then(results => {
            let resultsMap: { [key: string]: DailyDataQueryResult } = {};
            results.forEach((result, index) => {
                resultsMap[props.dataTypes[index].dailyDataType] = result;
            });
            setDailyData(resultsMap);
        });
    }

    useEffect(() => {
        loadData();
        MyDataHelps.on("externalAccountSyncComplete", loadData);
        MyDataHelps.on("applicationDidBecomeVisible", loadData);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", loadData);
            MyDataHelps.off("applicationDidBecomeVisible", loadData);
        }
    }, []);

    let computedResults: {
        dailyDataType: string,
        fillPercent: number,
        value: string
    }[] = [];

    if (!dailyData) return null;

    let todayKey = getDayKey(new Date());
    props.dataTypes.forEach(dataType => {
        let data = dailyData![dataType.dailyDataType];
        if (!data || !data[todayKey]) {
            return;
        }

        let threshold = dataType.threshold;
        let fillPercent = data[todayKey] / (threshold * 2);
        if (fillPercent > 1) { fillPercent = 1; }
        computedResults.push({
            dailyDataType: dataType.dailyDataType,
            fillPercent: fillPercent,
            value: dataType.formatter(data[todayKey])
        });
    });

    if (props.previewState === "Default") {
        computedResults = [
            {
                dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
                fillPercent: 0.42,
                value: "90 bpm"
            },
            {
                dailyDataType: DailyDataType.Steps,
                fillPercent: 0.7,
                value: "3,995"
            },
            {
                dailyDataType: DailyDataType.FitbitActiveMinutes,
                fillPercent: 0.8,
                value: "140"
            },
            {
                dailyDataType: DailyDataType.FitbitSleepMinutes,
                fillPercent: 0.55,
                value: "8h 12m"
            }
        ]
    }

    if (!computedResults.length) {
        return null;
    }

    return <div ref={props.innerRef} className="mdhui-activity-thresholds-today">
        {props.title && <CardTitle title={props.title} />}
        {computedResults.map(c => {
            let dataType = props.dataTypes.find(dt => dt.dailyDataType === c.dailyDataType)!;
            return <div className="mdhui-activity-threshold">
                <ActivityMeter key={dataType.dailyDataType} className="mdhui-activity-threshold-meter" label={dataType.label} value={c.value} fillPercent={c.fillPercent} averageFillPercent={0.5} icon={dataType.icon} color={dataType.color} />
                <div className="mdhui-activity-threshold-marker">
                    {dataType.formatter(dataType.threshold)}
                    <div>
                        <FontAwesomeSvgIcon icon={faChevronDown} />
                    </div>
                </div>
            </div>
        })}

    </div>
}