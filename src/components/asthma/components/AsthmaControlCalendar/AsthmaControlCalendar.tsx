import React, { useContext, useState } from 'react';
import './AsthmaControlCalendar.css';
import { add, differenceInDays, format, formatISO, isAfter, isBefore, isSameDay, parseISO, startOfMonth } from 'date-fns';
import { AsthmaLogEntry } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier, getAsthmaSymptomLevelValue } from '../../helpers';
import { AsthmaControlCalendarPreviewState, previewData } from './AsthmaControlCalendar.previewData';
import { Action, Calendar, CalendarDay, CalendarDayStateConfiguration, Card, DateRangeContext, LayoutContext, Section } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export type AsthmaControlCalendarVariant = 'compact' | 'verbose';

export interface AsthmaControlCalendarProps {
    previewState?: AsthmaControlCalendarPreviewState;
    dayViewUrl: string;
    intervalStart?: Date;
    variant?: AsthmaControlCalendarVariant;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaControlCalendarProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);

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
                background: '#000',
                color: '#fff'
            },
            streak: true,
            streakColor: '#DBDBDB'
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

    const getLogEntries = () => {
        if (logEntries.length === 0) {
            return null;
        }

        let logEntryLookup: Record<string, AsthmaLogEntry | undefined> = {};

        let earliestLogEntry = [...logEntries].sort((e1, e2) => e1.identifier.localeCompare(e2.identifier))[0];
        let earliestDate = parseISO(earliestLogEntry.identifier);
        for (let i = 0; i <= differenceInDays(new Date(), earliestDate); i++) {
            let targetDate = add(new Date(earliestDate), {days: i});
            if (!isBefore(targetDate, intervalStart) && isBefore(targetDate, add(new Date(intervalStart), {months: 1}))) {
                logEntryLookup[dateToAsthmaLogEntryIdentifier(targetDate)] = logEntries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(targetDate));
            }
        }

        return <div className="mdhui-asthma-control-calendar-log-entries">
            {Object.keys(logEntryLookup).sort().reverse().map((identifier, index) => {
                let targetDate = parseISO(identifier);
                let logEntry = logEntryLookup[identifier];
                return <Card key={index}>
                    <Action
                        title={format(targetDate, 'LLLL do')}
                        subtitle={logEntry ? getAsthmaSymptomLevelValue(logEntry.symptomLevel) : 'Daily entry missed'}
                        onClick={() => onDayClicked(targetDate)}
                    />
                    {logEntry && ((logEntry.symptoms && logEntry.symptoms.length > 0) || (logEntry.impacts && logEntry.impacts.length > 0) || (logEntry.triggers && logEntry.triggers.length > 0)) &&
                        <div className="mdhui-asthma-control-calendar-log-entry-components">
                            {logEntry.symptoms && logEntry.symptoms.length > 0 &&
                                <LogEntryComponent className="mdhui-asthma-control-calendar-log-entry-component-symptoms" label="Symptoms"/>
                            }
                            {logEntry.impacts && logEntry.impacts.length > 0 &&
                                <LogEntryComponent className="mdhui-asthma-control-calendar-log-entry-component-impacts" label="Impacts"/>
                            }
                            {logEntry.triggers && logEntry.triggers.length > 0 &&
                                <LogEntryComponent className="mdhui-asthma-control-calendar-log-entry-component-triggers" label="Triggers"/>
                            }
                        </div>
                    }
                </Card>;
            })}
        </div>;
    };

    return <div>
        <Section noTopMargin={true}>
            <Calendar innerRef={props.innerRef} className="mdhui-asthma-control-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay}/>
        </Section>
        {props.variant === 'verbose' && getLogEntries()}
    </div>;
};

function LogEntryComponent(props: { className: string, label: string }) {
    return <div className={['mdhui-asthma-control-calendar-log-entry-component', props.className].join(' ')}>
        <div className="mdhui-asthma-control-calendar-log-entry-component-icon"/>
        <div className="mdhui-asthma-control-calendar-log-entry-component-label">{props.label}</div>
    </div>;
}