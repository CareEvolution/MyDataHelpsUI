import React, { useContext, useState } from 'react';
import './AsthmaControlCalendar.css';
import { formatISO, isAfter, isSameDay, startOfMonth } from 'date-fns';
import { AsthmaLogEntry } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, computeAsthmaControlState } from '../../helpers';
import { AsthmaControlCalendarPreviewState, previewData } from './AsthmaControlCalendar.previewData';
import { Calendar, CalendarDay, CalendarDayStateConfiguration, DateRangeContext } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaControlCalendarProps {
    previewState?: AsthmaControlCalendarPreviewState;
    dayViewUrl: string;
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaControlCalendarProps) {
    let dateRangeContext = useContext(DateRangeContext);

    const [logEntries, setLogEntries] = useState<AsthmaLogEntry[]>([]);

    useInitializeView(() => {
        if (props.previewState) {
            setLogEntries(previewData[props.previewState].logEntries);
            return;
        }
        asthmaDataService.loadLogEntries().then(logEntries => {
            setLogEntries(logEntries);
        });
    });

    const stateConfiguration: CalendarDayStateConfiguration = {
        'not-determined': {
            style: {
                background: 'repeating-linear-gradient(-45deg, #dadae0, #dadae0 2px, #f0f0f6 2px, #f0f0f6 4px)'
            },
            streak: true,
            streakColor: '#f8f8fb'
        },
        'not-controlled': {
            style: {
                background: '#f86a5c'
            },
            streak: true,
            streakColor: 'rgba(248,106,92,0.4)'
        },
        'controlled': {
            style: {
                background: '#35a6a0'
            },
            streak: true,
            streakColor: 'rgba(53,166,160,0.4)'
        },
        'today': {
            style: {
                boxShadow: 'inset 0 0 0 2px #000',
                boxSizing: 'border-box'
            }
        },
        'future': {
            style: {
                color: '#999'
            }
        }
    };

    const computeStateForDay = (date: Date): string => {
        let status = computeAsthmaControlState(logEntries, date).status;
        if (status === 'not-determined') {
            return 'not-determined';
        } else if (status === 'not-controlled') {
            return 'not-controlled';
        } else if (status === 'controlled') {
            return 'controlled';
        } else if (isSameDay(date, new Date())) {
            return 'today';
        } else if (isAfter(date, new Date())) {
            return 'future';
        } else {
            return 'no-data';
        }
    };

    const onDayClicked = (date: Date): void => {
        if (props.previewState || isAfter(date, new Date())) return;
        MyDataHelps.openApplication(props.dayViewUrl + '?date=' + formatISO(date, {representation: 'date'}), {modal: true});
    };

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        return <CalendarDay
            year={year}
            month={month}
            day={day}
            stateConfiguration={stateConfiguration}
            computeStateForDay={computeStateForDay}
            onClick={onDayClicked}
        />;
    };

    let intervalStart = dateRangeContext?.intervalStart ?? props.intervalStart ?? startOfMonth(new Date());

    return <Calendar innerRef={props.innerRef} className="mdhui-asthma-control-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay}/>;
};