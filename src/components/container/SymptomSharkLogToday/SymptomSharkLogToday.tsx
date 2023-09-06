import React, { useEffect, useState } from 'react';
import symptomSharkData, { DailyLogEntry, SymptomSharkConfiguration } from '../../../helpers/symptom-shark-data';
import getDayKey from '../../../helpers/get-day-key';
import { add } from 'date-fns';
import { SymptomSharkLogEntry } from '../../presentational';
import { previewConfiguration, previewLogEntry } from './SymptomSharkLogToday.previewData';
import language from '../../../helpers/language';

export interface SymptomSharkLogTodayProps {
    previewState?: "withLog" | "noLog";
}

export default function (props: SymptomSharkLogTodayProps) {
    const [configuration, setConfiguration] = useState<SymptomSharkConfiguration | null>(null);
    const [symptomLogEntry, setSymptomLogEntry] = useState<DailyLogEntry | undefined>(undefined);

    var currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);

    useEffect(() => {
        if (props.previewState == "withLog") {
            setConfiguration(previewConfiguration);
            setSymptomLogEntry(previewLogEntry);
            return;
        } else if (props.previewState == "noLog") {
            setConfiguration(previewConfiguration);
            return;
        }

        Promise.all([symptomSharkData.getDailyLogEntries(getDayKey(add(currentDate, { days: -1 }))), symptomSharkData.getConfiguration()])
            .then(function ([logEntries, configuration]) {
                setConfiguration(configuration);
                if (logEntries[getDayKey(currentDate)]) {
                    setSymptomLogEntry(logEntries[getDayKey(currentDate)]);
                } else {
                    setSymptomLogEntry(undefined);
                }
            });
    });

    if (!configuration || !configuration.symptoms.length) {
        return null;
    }

    return <SymptomSharkLogEntry title={!symptomLogEntry ? language("log-todays-symptoms") : language("todays-log")} date={currentDate} logEntry={symptomLogEntry} configuration={configuration!} />;
}