import React, { useContext, useEffect, useState } from 'react';
import { add, startOfDay } from 'date-fns';
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
    const [loading, setLoading] = useState<boolean>(false);

    var currentDate = new Date();
    currentDate = dateRangeContext?.intervalStart ? dateRangeContext?.intervalStart : startOfDay(new Date());
    const isToday = currentDate.getTime() == startOfDay(new Date()).getTime();
    let title = "";
    if (!symptomLogEntry) {
        if (!isToday) {
            // string does not actually include "today"
            title = language("tap-to-log-today");
        } else {
            title = language("log-todays-symptoms");
        }
    } else if (isToday) {
        title = language("todays-log");
    }

    function initialize() {
        setLoading(true);
        if (props.previewState == "withLog") {
            setConfiguration(previewConfiguration);
            setSymptomLogEntry(previewLogEntry);
            return;
        } else if (props.previewState == "noLog") {
            setConfiguration(previewConfiguration);
            return;
        }

        Promise.all([symptomSharkData.getDailyLogEntries(getDayKey(add(currentDate, { days: -1 }))), !configuration ? symptomSharkData.getConfiguration() : Promise.resolve(configuration)])
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

    useInitializeView(() => {
        initialize();
    }, [], [dateRangeContext?.intervalStart]);

    if (loading || !configuration || !configuration.symptoms.length) {
        return null;
    }

    return <SymptomSharkLogEntry onClick={(d) => props.onClick(d)} innerRef={props.innerRef} title={title} subtitle='' date={currentDate} logEntry={symptomLogEntry} configuration={configuration!} />;
}