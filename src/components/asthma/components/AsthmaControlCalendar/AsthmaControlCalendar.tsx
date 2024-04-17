import React, { useContext, useState } from 'react';
import './AsthmaControlCalendar.css';
import { add, differenceInDays, format, formatISO, isAfter, isBefore, isSameDay, parseISO, startOfMonth, startOfToday } from 'date-fns';
import { AsthmaLogEntry } from '../../model';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, computeAsthmaControlState, dateToAsthmaLogEntryIdentifier, getAsthmaSymptomLevelText } from '../../helpers';
import { AsthmaControlCalendarPreviewState, previewData } from './AsthmaControlCalendar.previewData';
import { Action, Calendar, CalendarDay, CalendarDayStateConfiguration, Card, DateRangeContext, Section } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import language from '../../../../helpers/language';
import { getLocale } from '../../../../helpers/locale';

export type AsthmaControlCalendarVariant = 'compact' | 'verbose';

export interface AsthmaControlCalendarProps {
    previewState?: AsthmaControlCalendarPreviewState;
    dayViewUrl: string;
    intervalStart?: Date;
    variant?: AsthmaControlCalendarVariant;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaControlCalendarProps) {
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
    }, [], [props.previewState]);

    const stateConfiguration: CalendarDayStateConfiguration = {
        'not-determined': {
            style: {
                background: 'var(--mdhui-background-color-0)',
                border: '3px dashed var(--mdhui-text-color-0)',
                color: 'var(--mdhui-text-color-0)',
                fontWeight: 600,
                marginTop: '-12px'
            }
        },
        'not-controlled': {
            style: {
                background: '#F86A5C',
                border: '3px solid #F86A5C',
                color: '#fff',
                fontWeight: 600,
                marginTop: '-12px'
            }
        },
        'controlled': {
            style: {
                background: 'var(--mdhui-background-color-0)',
                border: '3px solid #35A6A0',
                color: '#35A6A0',
                fontWeight: 600,
                marginTop: '-12px'
            }
        },
        'today': {
            style: {
                border: '3px solid #369CFF'
            }
        },
        'future': {
            style: {
                background: 'var(--mdhui-background-color-0)',
                border: '3px solid var(--mdhui-background-color-0)',
                color: 'var(--mdhui-text-color-3)',
                fontWeight: 600,
                marginTop: '-12px'
            }
        },
        'no-data': {
            style: {
                background: 'var(--mdhui-background-color-0)',
                border: '3px solid var(--mdhui-background-color-0)',
                color: 'var(--mdhui-text-color-0)',
                fontWeight: 600,
                marginTop: '-12px'
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

    const getLogEntriesDisplay = () => {
        if (logEntries.length === 0) {
            return null;
        }

        let today = startOfToday();
        let logEntryLookup: Record<string, AsthmaLogEntry | undefined> = {};

        let earliestLogEntry = [...logEntries].sort((e1, e2) => e1.identifier.localeCompare(e2.identifier))[0];
        let earliestDate = parseISO(earliestLogEntry.identifier);
        for (let i = 0; i <= differenceInDays(today, earliestDate); i++) {
            let targetDate = add(earliestDate, {days: i});
            if (!isBefore(targetDate, intervalStart) && isBefore(targetDate, add(intervalStart, {months: 1}))) {
                let targetDateLogEntryIdentifier = dateToAsthmaLogEntryIdentifier(targetDate);
                logEntryLookup[targetDateLogEntryIdentifier] = logEntries.find(e => e.identifier === targetDateLogEntryIdentifier);
            }
        }

        return <div className="mdhui-asthma-control-calendar-log-entries">
            {Object.keys(logEntryLookup).sort().reverse().map((identifier, index) => {
                let targetDate = parseISO(identifier);
                let logEntry = logEntryLookup[identifier];
                return <Card key={index}>
                    <Action
                        title={format(targetDate, 'PPP', {locale: getLocale()})}
                        subtitle={logEntry ? getAsthmaSymptomLevelText(logEntry.symptomLevel) : differenceInDays(today, targetDate) >= 2 ? language('asthma-control-calendar-daily-entry-missed') : language('asthma-control-calendar-not-logged-yet')}
                        onClick={() => onDayClicked(targetDate)}
                    />
                    {logEntry && ((logEntry.symptoms && logEntry.symptoms.length > 0) || (logEntry.impacts && logEntry.impacts.length > 0) || (logEntry.triggers && logEntry.triggers.length > 0)) &&
                        <div className="mdhui-asthma-control-calendar-log-entry-components">
                            {logEntry.symptoms && logEntry.symptoms.length > 0 &&
                                <LogEntryComponent className="mdhui-asthma-control-calendar-log-entry-component-symptoms" label={language('asthma-control-calendar-log-entries-symptoms-label')}/>
                            }
                            {logEntry.impacts && logEntry.impacts.length > 0 &&
                                <LogEntryComponent className="mdhui-asthma-control-calendar-log-entry-component-impacts" label={language('asthma-control-calendar-log-entries-impacts-label')}/>
                            }
                            {logEntry.triggers && logEntry.triggers.length > 0 &&
                                <LogEntryComponent className="mdhui-asthma-control-calendar-log-entry-component-triggers" label={language('asthma-control-calendar-log-entries-triggers-label')}/>
                            }
                        </div>
                    }
                </Card>;
            })}
        </div>;
    };

    return <div>
        <Section noTopMargin={true} style={{boxShadow: 'none', marginBottom: '0'}}>
            <Calendar innerRef={props.innerRef} className="mdhui-asthma-control-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay}/>
        </Section>
        {props.variant === 'verbose' && getLogEntriesDisplay()}
    </div>;
};

function LogEntryComponent(props: { className: string, label: string }) {
    return <div className={['mdhui-asthma-control-calendar-log-entry-component', props.className].join(' ')}>
        <div className="mdhui-asthma-control-calendar-log-entry-component-icon"/>
        <div className="mdhui-asthma-control-calendar-log-entry-component-label">{props.label}</div>
    </div>;
}