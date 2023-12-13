import React, { useContext, useState } from 'react';
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
                background: '#F86A5C',
                color: '#fff'
            },
            streak: true,
            streakColor: '#FCCCC7'
        },
        'controlled': {
            style: {
                background: '#35A6A0',
                color: '#fff'
            },
            streak: true,
            streakColor: '#CCE9E7'
        },
        'today': {
            style: {
                background: '#369CFF',
                color: '#fff',
                border: '2px solid #fff',
                marginTop: '-7px'
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