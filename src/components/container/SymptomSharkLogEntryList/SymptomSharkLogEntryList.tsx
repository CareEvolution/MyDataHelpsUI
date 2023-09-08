import React, { useEffect, useState } from "react";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";
import MyDataHelps from "@careevolution/mydatahelps-js"
import symptomSharkData, { DailyLogEntry, SymptomSharkConfiguration } from "../../../helpers/symptom-shark-data";
import { LoadingIndicator, SymptomSharkLogEntry } from "../../presentational";
import OnVisibleTrigger from "../../presentational/OnVisibleTrigger";
import { set } from "lodash";
import { previewConfiguration, previewLogEntry } from "../SymptomSharkLogToday/SymptomSharkLogToday.previewData";
import language from "../../../helpers/language";

export interface SymptomSharkLogEntryListProps {
    onDaySelected(d: Date): void;
    previewState?: "default";
}

export default function (props: SymptomSharkLogEntryListProps) {
    const [logEntries, setLogEntries] = useState<{ [key: string]: DailyLogEntry }>({});
    const [configuration, setConfiguration] = useState<SymptomSharkConfiguration | null>(null);
    const [days, setDays] = useState<Date[]>([new Date()]);

    function addDays() {
        var newDays = [...days];
        for (var i = 0; i < 30; i++) {
            var newDate = add(newDays[newDays.length - 1], { days: -1 });
            newDays.push(newDate);
        }
        setDays(newDays);
    }

    function initialize() {
        //ensures we reload when it passes midnight
        if (getDayKey(days[0]) != getDayKey(new Date())) {
            setDays([new Date()]);
        }

        if (props.previewState == "default") {
            setConfiguration(previewConfiguration);
            let previousDayKey = getDayKey(add(new Date(), { days: -1 }));
            setLogEntries({ ...logEntries, [previousDayKey]: previewLogEntry });
            return;
        }

        symptomSharkData.getConfiguration().then(function (configuration) {
            symptomSharkData.getDailyLogEntries().then(function (logEntries) {
                setConfiguration(configuration);
                setLogEntries(logEntries);
            });
        });
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
        }
    }, []);

    return <div className="log-entry-list">
        {configuration && days.map(d =>
            <SymptomSharkLogEntry noDataMessage={getDayKey(d) == getDayKey(new Date()) ? language("tap-to-log-today") : undefined} key={getDayKey(d)} date={d} configuration={configuration} logEntry={logEntries[getDayKey(d)]} onClick={() => props.onDaySelected(d)} />
        )}
        <OnVisibleTrigger enabled={!!configuration} onTrigger={() => addDays()} />
        <LoadingIndicator />
    </div>

}