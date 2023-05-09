import MyDataHelps from "@careevolution/mydatahelps-js";
import { faBed, faChevronUp, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { add } from "date-fns";
import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import getDayKey from "../../../helpers/get-day-key";
import { DailyDataQueryResult, DailyDataType, queryDailyData } from "../../../helpers/query-daily-data";
import { ActivityMeter } from "../../presentational";
import "./RelativeActivityToday.css"

export interface RelativeActivityTodayProps {
    dataTypes: RelativeActivityDataType[];
    previewState?: "Default";
}

export interface RelativeActivityDataType {
    dailyDataType: string;
    label: string;
    icon: React.ReactElement;
    color: string;
    formatter: (number: number) => string;
}

export default function (props: RelativeActivityTodayProps) {
    let [dailyData, setDailyData] = useState<{ [key: string]: DailyDataQueryResult } | null>(null);

    function loadData() {
        if (props.previewState === "Default") {
            setDailyData({});
            return;
        };
        let today = new Date();
        let startDate = add(new Date(), { days: -31 });
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

        let sumValues = 0;
        let totalValues = 0;
        for (var i = 1; i < 31; i++) {
            let key = getDayKey(add(new Date(), { days: -i }));
            if (data[key] !== undefined) {
                sumValues += data[key];
                totalValues++;
            }
        }

        if (totalValues < 5) {
            return;
        }

        let average = sumValues / totalValues;
        let fillPercent = data[todayKey] / (average * 2);
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
                dailyDataType: DailyDataType.Steps,
                fillPercent: 0.7,
                value: "3,995"
            },
            {
                dailyDataType: DailyDataType.AppleHealthSleepMinutes,
                fillPercent: 0.55,
                value: "8h 12m"
            },
            {
                dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
                fillPercent: 0.42,
                value: "90 bpm"
            }
        ]
    }

    if (!computedResults.length) {
        return null;
    }

    return <div className="mdhui-relative-activity-today">
        {computedResults.map(c => {
            let dataType = props.dataTypes.find(dt => dt.dailyDataType === c.dailyDataType)!;
            return <ActivityMeter key={dataType.dailyDataType} className="mdhui-relative-activity-today-meter" label={dataType.label} value={c.value} fillPercent={c.fillPercent} averageFillPercent={0.5} icon={dataType.icon} color={dataType.color} />
        })}
        <div className="mdhui-relative-activity-average-marker">
            <div>
                <FontAwesomeSvgIcon icon={faChevronUp} />
            </div>
            30 day average
        </div>
    </div>
}