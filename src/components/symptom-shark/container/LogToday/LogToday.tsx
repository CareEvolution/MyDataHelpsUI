import React, { useContext, useEffect, useState } from 'react';
import { add, isToday, startOfDay, startOfToday } from 'date-fns';
import { SymptomSharkLogEntry } from '../../presentational';
import { previewConfiguration, previewLogEntry } from './LogToday.previewData';
import symptomSharkData, { DailyLogEntry, SymptomSharkConfiguration } from '../../helpers/symptom-shark-data';
import getDayKey from '../../../../helpers/get-day-key';
import language from '../../../../helpers/language';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { DateRangeContext } from '../../../presentational';
import { useInitializeView } from '../../../../helpers';

export interface SymptomSharkLogTodayProps {
    previewState?: "withLog" | "noLog";
    innerRef?: React.Ref<HTMLDivElement>;
    onClick(d: Date): void;
}

export default function (props: SymptomSharkLogTodayProps) {
    let dateRangeContext = useContext(DateRangeContext);
    const [configuration, setConfiguration] = useState<SymptomSharkConfiguration | null>(null);
    const [symptomLogEntry, setSymptomLogEntry] = useState<DailyLogEntry | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const currentDate = dateRangeContext?.intervalStart ? dateRangeContext.intervalStart : startOfToday();
    let title = "";
    if (!symptomLogEntry) {
        if (!isToday(currentDate)) {
            title = language("tap-to-log-today");
        } else {
            title = language("log-todays-symptoms");
        }
    } else if (isToday(currentDate)) {
        title = language("todays-log");
    }

    function initialize(reloadConfiguration: boolean = false) {
        setLoading(true);
        if (props.previewState == "withLog") {
            setConfiguration(previewConfiguration);
            setSymptomLogEntry(previewLogEntry);
            setLoading(false);
            return;
        } else if (props.previewState == "noLog") {
            setLoading(false);
            setConfiguration(previewConfiguration);
            return;
        }

        Promise.all([symptomSharkData.getDailyLogEntries(getDayKey(add(currentDate, { days: -1 }))), (reloadConfiguration || !configuration) ? symptomSharkData.getConfiguration() : Promise.resolve(configuration)])
            .then(function ([logEntries, configuration]) {
                setConfiguration(configuration);
                if (logEntries[getDayKey(currentDate)]) {
                    setSymptomLogEntry(logEntries[getDayKey(currentDate)]);
                } else {
                    setSymptomLogEntry(undefined);
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", function () { initialize(true); });
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", function () { initialize(true); });
        }
    }, [dateRangeContext?.intervalStart]);

    if (loading || !configuration || !configuration.symptoms.length) {
        return null;
    }

    return <SymptomSharkLogEntry onClick={(d) => props.onClick(d)} innerRef={props.innerRef} title={title} subtitle='' date={currentDate} logEntry={symptomLogEntry} configuration={configuration!} />;
}