import React, { useContext } from 'react';
import CalendarDay, { CalendarDayState } from './CalendarDay';
import { Calendar, Card, DateRangeContext, DateRangeCoordinator, Layout } from '../../presentational';
import { add, formatISO, isBefore, isSameDay, parseISO, startOfToday } from 'date-fns';
import { StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type CalendarDayStoryArgs = React.ComponentProps<typeof CalendarDay> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: 'no-data' | 'today' | 'future' |
        'multi-state' | 'multi-state w/ streak' | 'multi-state (combine when solo)' |
        'streak-left (not supported)' | 'streak-left (default color)' | 'streak-left (custom color)' |
        'streak-right (not supported)' | 'streak-right (default color)' | 'streak-right (custom color)' |
        'streak-both (not supported)' | 'streak-both (default color)' | 'streak-both (custom color)';
};

type InCalendarCalendarDayStoryArgs = React.ComponentProps<typeof CalendarDay> & {
    colorScheme: 'auto' | 'light' | 'dark';
    withData: boolean;
    withClickHandler: boolean;
};

export default {
    title: 'Presentational/CalendarDay',
    component: CalendarDay,
    parameters: { layout: 'fullscreen' },
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
                        if (args.state.startsWith('multi-state')) {
                            if (args.state.endsWith('streak')) {
                                return [
                                    { backgroundColor: '#3c973c', streakIdentifier: 'streakId', streakColor: '#3c973c' },
                                    { backgroundColor: '#664cda', streakIdentifier: 'streakId', streakColor: '#664cda' },
                                    { backgroundColor: '#0877b8' }
                                ];
                            }
                            if (args.state.endsWith('(combine when solo)')) {
                                return [{ backgroundColor: '#3c973c', combineWhenSolo: true }];
                            }
                            return [{ backgroundColor: '#3c973c' }, { backgroundColor: '#664cda' }, { backgroundColor: '#0877b8' }];
                        } else if (args.state.startsWith('streak-left')) {
                            if (isSameDay(testDate, date) || isSameDay(add(testDate, { days: -1 }), date)) {
                                if (args.state.endsWith('(not supported)')) {
                                    return [{ backgroundColor: '#35A6A0' }];
                                } else if (args.state.endsWith('(custom color)')) {
                                    return [{ backgroundColor: '#35A6A0', streakIdentifier: 'streakId', streakColor: '#35A6A066' }];
                                }
                                return [{ backgroundColor: '#35A6A0', streakIdentifier: 'streakId' }];
                            }
                        } else if (args.state.startsWith('streak-right')) {
                            if (isSameDay(testDate, date) || isSameDay(add(testDate, { days: 1 }), date)) {
                                if (args.state.endsWith('(not supported)')) {
                                    return [{ backgroundColor: '#35A6A0' }];
                                } else if (args.state.endsWith('(custom color)')) {
                                    return [{ backgroundColor: '#35A6A0', streakIdentifier: 'streakId', streakColor: '#35A6A066' }];
                                }
                                return [{ backgroundColor: '#35A6A0', streakIdentifier: 'streakId' }];
                            }
                        } else if (args.state.startsWith('streak-both')) {
                            if (args.state.endsWith('(not supported)')) {
                                return [{ backgroundColor: '#35A6A0' }];
                            } else if (args.state.endsWith('(custom color)')) {
                                return [{ backgroundColor: '#35A6A0', streakIdentifier: 'streakId', streakColor: '#35A6A066' }];
                            }
                            return [{ backgroundColor: '#35A6A0', streakIdentifier: 'streakId' }];
                        }
                        return [];
                    }}
                    onClick={() => console.log('day clicked.')} />
            </div>
        </Layout>;
    }
};

export const Default: StoryObj<CalendarDayStoryArgs> = {
    args: {
        colorScheme: 'auto',
        state: 'no-data',
        multiStateStartAngle: 270
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
            options: [
                'no-data', 'today', 'future', 'multi-state', 'multi-state w/ streak', 'multi-state (combine when solo)',
                'streak-left (not supported)', 'streak-left (default color)', 'streak-left (custom color)',
                'streak-right (not supported)', 'streak-right (default color)', 'streak-right (custom color)',
                'streak-both (not supported)', 'streak-both (default color)', 'streak-both (custom color)'
            ]
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
        ...argTypesToHide(['year', 'month', 'day', 'stateConfiguration', 'computeStateForDay', 'computeStatesForDay', 'onClick', 'innerRef'])
    }
};

export const InCalendar: StoryObj<InCalendarCalendarDayStoryArgs> = {
    args: {
        colorScheme: 'auto',
        withData: false,
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

function CalendarDayInCalendar(props: { withData?: boolean, withClickHandler?: boolean }) {
    const dateRangeContext = useContext(DateRangeContext)!;

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        if (props.withData && isBefore(date, new Date())) {
            if ((date.getDate() >= 5 && date.getDate() <= 13) || date.getDate() === 17) {
                return [{
                    backgroundColor: '#F86A5C',
                    textColor: '#000',
                    streakIdentifier: 'state1',
                    streakColor: '#F86A5C66'
                }];
            }
            if ((date.getDate() >= 2 && date.getDate() <= 4) || (date.getDate() >= 19 && date.getDate() <= 22) || date.getDate() === 16) {
                return [{
                    backgroundColor: '#35A6A0',
                    streakIdentifier: 'state2',
                    streakColor: '#35A6A066'
                }];
            }
            if (date.getDate() >= 24 && date.getDate() <= 25) {
                return [{
                    backgroundColor: '#6f35a6',
                    textColor: '#fff',
                    streakIdentifier: 'state3'
                }];
            }
            if (date.getDate() >= 26 && date.getDate() <= 27) {
                return [{
                    backgroundColor: '#f3fa3a',
                    textColor: '#000'
                }];
            }
        }
        return [];
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

    return <Calendar
        className="mdhui-simple-calendar"
        year={intervalStart.getFullYear()}
        month={intervalStart.getMonth()}
        dayRenderer={renderDay}
    />;
}