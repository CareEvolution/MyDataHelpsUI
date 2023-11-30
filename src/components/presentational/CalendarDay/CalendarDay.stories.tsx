import React, { useContext } from 'react';
import CalendarDay, { CalendarDayProps, CalendarDayStateConfiguration } from './CalendarDay';
import { Calendar, Card, DateRangeContext, DateRangeCoordinator, Layout } from '../../presentational';
import { add, formatISO, isSameDay, parseISO } from 'date-fns';

export default {
    title: 'Presentational/CalendarDay',
    component: CalendarDay,
    parameters: {layout: 'fullscreen'}
};

const render = (args: CalendarDayProps) => <Layout colorScheme="auto">
    <div style={{width: '60px', margin: '0 auto'}}>
        <CalendarDay {...args} />
    </div>
</Layout>;

const now = parseISO('2023-11-29T21:41:43.678Z');

const commonProps = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    stateConfiguration: {
        'state1': {
            style: {
                background: '#35A6A0'
            }
        },
        'state2': {
            style: {
                background: '#35A6A0'
            },
            streak: true
        },
        'state3': {
            style: {
                background: '#35A6A0'
            },
            streak: true,
            streakColor: 'rgba(53,166,160,0.4)'
        }
    },
    onClick: () => {
        console.log("day clicked.");
    }
};

export const NoDay = {
    args: {
        ...commonProps,
        day: undefined
    },
    render: render
};

export const Default = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            return 'state0';
        }
    },
    render: render
};

export const StreakLeftNotSupported = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            if (isSameDay(new Date(now), date) || isSameDay(add(new Date(now), {days: -1}), date)) {
                return "state1";
            }
            return 'state0';
        }
    },
    render: render
};

export const StreakLeftDefaultColor = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            if (isSameDay(new Date(now), date) || isSameDay(add(new Date(now), {days: -1}), date)) {
                return "state2";
            }
            return 'state0';
        }
    },
    render: render
};

export const StreakLeftCustomColor = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            if (isSameDay(new Date(now), date) || isSameDay(add(new Date(now), {days: -1}), date)) {
                return "state3";
            }
            return 'state0';
        }
    },
    render: render
};

export const StreakRightNotSupported = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            if (isSameDay(new Date(now), date) || isSameDay(add(new Date(now), {days: 1}), date)) {
                return "state1";
            }
            return 'state0';
        }
    },
    render: render
};

export const StreakRightDefaultColor = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            if (isSameDay(new Date(now), date) || isSameDay(add(new Date(now), {days: 1}), date)) {
                return "state2";
            }
            return 'state0';
        }
    },
    render: render
};

export const StreakRightCustomColor = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            if (isSameDay(new Date(now), date) || isSameDay(add(new Date(now), {days: 1}), date)) {
                return "state3";
            }
            return 'state0';
        }
    },
    render: render
};

export const StreakBothNotSupported = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            return 'state1';
        }
    },
    render: render
};

export const StreakBothDefaultColor = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            return 'state2';
        }
    },
    render: render
};

export const StreakBothCustomColor = {
    args: {
        ...commonProps,
        computeStateForDay: (date: Date): string => {
            return 'state3';
        }
    },
    render: render
};

export const InCalendar = {
    render: () => {
        return <Layout colorScheme="auto">
            <Card>
                <DateRangeCoordinator intervalType="Month">
                    <CalendarDayInCalendar/>
                </DateRangeCoordinator>
            </Card>
        </Layout>
    }
};

function CalendarDayInCalendar() {
    let dateRangeContext = useContext(DateRangeContext);

    const stateConfiguration: CalendarDayStateConfiguration = {
        'state1': {
            style: {
                background: '#F86A5C',
                color: '#000'
            },
            streak: true,
            streakColor: 'rgba(248,106,92,0.4)'
        },
        'state2': {
            style: {
                background: '#35A6A0'
            },
            streak: true,
            streakColor: 'rgba(53,166,160,0.4)'
        },
        'state3': {
            style: {
                background: '#6f35a6',
                color: '#fff'
            },
            streak: true
        },
        'state4': {
            style: {
                background: '#f3fa3a'
            }
        }
    };

    const computeStateForDay = (date: Date): string => {
        if ((date.getDate() >= 5 && date.getDate() <= 13) || date.getDate() === 17) {
            return 'state1';
        }
        if ((date.getDate() >= 2 && date.getDate() <= 4) || (date.getDate() >= 19 && date.getDate() <= 22) || date.getDate() === 16) {
            return 'state2';
        }
        if (date.getDate() >= 24 && date.getDate() <= 25) {
            return 'state3';
        }
        if (date.getDate() >= 26 && date.getDate() <= 27) {
            return 'state4';
        }
        return 'state5';
    };

    const onDayClicked = (date: Date): void => {
        console.log('day clicked: ' + formatISO(date, {representation: 'date'}));
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

    let intervalStart = dateRangeContext!.intervalStart;

    return <Calendar className="mdhui-simple-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay}/>;
}