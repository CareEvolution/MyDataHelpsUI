import React, { useContext } from 'react';
import CalendarDay, { CalendarDayState, CalendarDayStates } from './CalendarDay';
import { Calendar, Card, DateRangeContext, DateRangeCoordinator, Layout } from '../../presentational';
import { add, formatISO, isBefore, isSameDay, parseISO, startOfToday } from 'date-fns';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';
import { fnvPredictableRandomNumber, getDayKey } from '../../../helpers';

export default {
    title: 'Presentational/CalendarDay',
    component: CalendarDay,
    parameters: { layout: 'fullscreen' }
};

type CalendarDayStoryArgs = React.ComponentProps<typeof CalendarDay> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: 'no-data' | 'today' | 'future' | 'single-state' | 'multi-state';
    streakLeft: boolean;
    streakRight: boolean;
    customStreakColor: boolean;
    alwaysRenderAsMultiState: boolean;
    withNote: boolean;
    customNoteColor: boolean;
    customDisplayValue: boolean;
};

export const Default: StoryObj<CalendarDayStoryArgs> = {
    args: {
        colorScheme: 'auto',
        state: 'no-data',
        alwaysRenderAsMultiState: false,
        multiStateStartAngle: 240,
        streakLeft: false,
        streakRight: false,
        customStreakColor: false,
        withNote: false,
        customNoteColor: false,
        customDisplayValue: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        state: {
            name: 'state',
            control: 'radio',
            options: ['no-data', 'today', 'future', 'single-state', 'multi-state']
        },
        alwaysRenderAsMultiState: {
            name: 'always render as multi-state',
            control: 'boolean'
        },
        multiStateStartAngle: {
            name: 'multi-state start angle',
            control: {
                type: 'range',
                min: 0,
                max: 360,
                step: 1
            }
        },
        streakLeft: {
            name: 'streak left',
            control: 'boolean'
        },
        streakRight: {
            name: 'streak right',
            control: 'boolean'
        },
        customStreakColor: {
            name: 'custom streak color',
            control: 'boolean'
        },
        withNote: {
            name: 'with note',
            control: 'boolean'
        },
        customNoteColor: {
            name: 'custom note color',
            control: 'boolean'
        },
        customDisplayValue: {
            name: 'custom display value',
            control: 'boolean'
        },
        ...argTypesToHide(['year', 'month', 'day', 'stateConfiguration', 'computeStateForDay', 'computeStatesForDay', 'onClick', 'innerRef'])
    },
    render: (args: CalendarDayStoryArgs) => {
        const testDate = parseISO('2023-11-29T21:41:43.678Z');

        let year = testDate.getFullYear();
        let month = testDate.getMonth();
        let day = testDate.getDate();

        if (args.state === 'today') {
            const today = startOfToday();
            year = today.getFullYear();
            month = today.getMonth();
            day = today.getDate();
        } else if (args.state === 'future') {
            const tomorrow = add(startOfToday(), { days: 1 });
            year = tomorrow.getFullYear();
            month = tomorrow.getMonth();
            day = tomorrow.getDate();
        }

        return <Layout colorScheme={args.colorScheme}>
            <div style={{ width: '60px', margin: '20px auto 0' }}>
                <CalendarDay
                    {...args}
                    year={year}
                    month={month}
                    day={day}
                    computeStatesForDay={(date: Date) => {
                        let states: CalendarDayStates = [];
                        if (args.state === 'single-state') {
                            states.push({ backgroundColor: '#3c973c', streakColor: args.customStreakColor ? '#3c973c66' : undefined, combineWhenSolo: args.alwaysRenderAsMultiState });
                        } else if (args.state === 'multi-state') {
                            states.push({ backgroundColor: '#3c973c', streakColor: args.customStreakColor ? '#3c973c' : undefined });
                            states.push({ backgroundColor: '#664cda', streakColor: args.customStreakColor ? '#664cda' : undefined });
                            states.push({ backgroundColor: '#0877b8', streakColor: args.customStreakColor ? '#0877b8' : undefined });
                        }
                        states.forEach(state => state.combineWhenSolo = args.alwaysRenderAsMultiState);

                        const streakLeft = args.streakLeft && (isSameDay(testDate, date) || isSameDay(add(testDate, { days: -1 }), date));
                        const streakRight = args.streakRight && (isSameDay(testDate, date) || isSameDay(add(testDate, { days: 1 }), date));
                        if (streakLeft || streakRight) {
                            states.forEach(state => state.streakIdentifier = 'streakId');
                        }

                        if (args.withNote) {
                            states.note = 'note';
                            if (args.customNoteColor) {
                                states.noteBackgroundColor = { lightMode: '#fff', darkMode: '#000' };
                                states.noteBorderColor = '#888';
                                states.noteTextColor = { lightMode: '#000', darkMode: '#fff' };
                            }
                        }

                        if (args.customDisplayValue) {
                            states.displayValue = '🙂';
                        }

                        return states;
                    }}
                    onClick={() => console.log('day clicked.')} />
            </div>
        </Layout>;
    }
};

type InCalendarCalendarDayStoryArgs = React.ComponentProps<typeof CalendarDay> & {
    colorScheme: 'auto' | 'light' | 'dark';
    withData: boolean;
    multiState: boolean;
    withNote: boolean;
    withClickHandler: boolean;
};

export const InCalendar: StoryObj<InCalendarCalendarDayStoryArgs> = {
    args: {
        colorScheme: 'auto',
        withData: false,
        multiState: false,
        withNote: false,
        withClickHandler: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        withData: {
            name: 'with data',
            control: 'boolean'
        },
        multiState: {
            name: 'multi-state',
            control: 'boolean'
        },
        withNote: {
            name: 'with note',
            control: 'boolean'
        },
        withClickHandler: {
            name: 'with click handler',
            control: 'boolean'
        },
        ...argTypesToHide(['year', 'month', 'day', 'stateConfiguration', 'computeStateForDay', 'computeStatesForDay', 'onClick', 'multiStateStartAngle', 'innerRef'])
    },
    render: (args: InCalendarCalendarDayStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <DateRangeCoordinator intervalType="Month">
                    <CalendarDayInCalendar {...args} />
                </DateRangeCoordinator>
            </Card>
        </Layout>;
    }
};

function CalendarDayInCalendar(props: InCalendarCalendarDayStoryArgs) {
    const dateRangeContext = useContext(DateRangeContext)!;

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        const states: CalendarDayStates = [];

        if (props.withData && isBefore(date, new Date())) {
            const state1: CalendarDayState = {
                backgroundColor: '#F86A5C',
                textColor: '#000',
                streakIdentifier: 'state1',
                streakColor: '#F86A5C66',
                combineWhenSolo: props.multiState
            };
            const state2: CalendarDayState = {
                backgroundColor: '#35A6A0',
                streakIdentifier: 'state2',
                streakColor: '#35A6A066',
                combineWhenSolo: props.multiState
            };
            const state3: CalendarDayState = {
                backgroundColor: '#6f35a6',
                textColor: '#fff',
                streakColor: '#9466c1',
                streakIdentifier: 'state3',
                combineWhenSolo: props.multiState
            };
            const state4: CalendarDayState = {
                backgroundColor: '#f3fa3a',
                textColor: '#000',
                combineWhenSolo: props.multiState
            };

            if ((date.getDate() >= 5 && date.getDate() <= 13) || date.getDate() === 17) {
                states.push(state1);
                if (props.multiState && fnvPredictableRandomNumber(getDayKey(date)) % 3 === 0) {
                    states.push(state2);
                }
            }
            if ((date.getDate() >= 2 && date.getDate() <= 4) || (date.getDate() >= 19 && date.getDate() <= 22) || date.getDate() === 16) {
                states.push(state2);
                if (props.multiState && fnvPredictableRandomNumber(getDayKey(date)) % 3 === 0) {
                    states.push(state1);
                }
            }
            if (date.getDate() >= 24 && date.getDate() <= 25) {
                states.push(state3);
                if (props.multiState && fnvPredictableRandomNumber(getDayKey(date)) % 3 === 0) {
                    states.push(state4);
                }
            }
            if (date.getDate() >= 26 && date.getDate() <= 27) {
                states.push(state4);
                if (props.multiState && fnvPredictableRandomNumber(getDayKey(date)) % 3 === 0) {
                    states.push(state3);
                }
            }

            if (props.withNote && fnvPredictableRandomNumber(getDayKey(date)) % 3 === 0) {
                states.note = 'note';
            }
        }

        return states;
    };

    const onDayClicked = (date: Date): void => {
        console.log('day clicked: ' + formatISO(date, { representation: 'date' }));
    };

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        return <CalendarDay
            year={year}
            month={month}
            day={day}
            computeStatesForDay={computeStatesForDay}
            onClick={props.withClickHandler ? onDayClicked : undefined}
        />;
    };

    const intervalStart = dateRangeContext.intervalStart;

    return <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />;
}