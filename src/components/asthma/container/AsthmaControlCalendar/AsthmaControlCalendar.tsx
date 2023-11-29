import React, { useState } from 'react';
import './AsthmaControlCalendar.css';
import { isAfter, isSameDay } from "date-fns";
import { AsthmaLogEntry } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, computeAsthmaControlState } from '../../helpers';
import { AsthmaControlCalendarPreviewState, previewData } from './AsthmaControlCalendar.previewData';
import { BasicCalendar, BasicCalendarDayState } from '../../../presentational';

export interface AsthmaControlCalendarProps {
    previewState?: AsthmaControlCalendarPreviewState;
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaControlCalendarProps) {
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

    const loadData = (): Promise<AsthmaLogEntry[]> => {
        return asthmaDataService.loadLogEntries();
    };

    const computeDayState = (date: Date): BasicCalendarDayState => {
        let status = computeAsthmaControlState(logEntries, date).status;
        if (status === 'not-determined') {
            return {
                identifier: 'not-determined',
                style: {
                    background: 'repeating-linear-gradient(-45deg, #dadae0, #dadae0 2px, #f0f0f6 2px, #f0f0f6 4px)',
                    color: '#000'
                },
                streakColor: '#f8f8fb'
            }
        } else if (status === 'not-controlled') {
            return {
                identifier: 'not-controlled',
                style: {
                    background: '#f86a5c',
                    fontWeight: 600,
                },
                streakColor: 'rgba(248,106,92,0.4)'
            }
        } else if (status === 'controlled') {
            return {
                identifier: 'controlled',
                style: {
                    background: '#35a6a0'
                },
                streakColor: 'rgba(53,166,160,0.4)'
            }
        } else if (isSameDay(date, new Date())) {
            return {
                identifier: 'today',
                style: {
                    boxShadow: 'inset 0 0 0 2px #000',
                    boxSizing: 'border-box'
                }
            }
        } else if (isAfter(date, new Date())) {
            return {
                identifier: 'future',
                style: {
                    color: '#999'
                }
            }
        } else {
            return {
                identifier: 'no-data',
                style: {
                    background: '#fff'
                }
            }
        }
    };

    const onDayClicked = (date: Date): void => {
        if (isAfter(date, new Date())) return;

        console.log('date clicked: ' + date.toString());
    };

    return <BasicCalendar innerRef={props.innerRef} computeDayState={computeDayState} onDayClicked={onDayClicked}/>;
}