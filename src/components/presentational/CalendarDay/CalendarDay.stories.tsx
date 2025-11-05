import React, { useContext } from 'react';
import CalendarDay, { CalendarDayProps, CalendarDayState } from './CalendarDay';
import { Calendar, Card, DateRangeContext, DateRangeCoordinator, Layout } from '../../presentational';
import { add, formatISO, isBefore, isSameDay, parseISO, startOfDay } from 'date-fns';
import { StoryObj } from '@storybook/react';

export default {
    title: 'Presentational/CalendarDay',
    component: CalendarDay,
    parameters: { layout: 'fullscreen' }
};

const render = (args: CalendarDayProps) => <Layout colorScheme="auto">
    <div style={{ width: '60px', margin: '20px auto 0' }}>
        <CalendarDay {...args} />
    </div>
</Layout>;

const testDate = parseISO('2023-11-29T21:41:43.678Z');
const now = new Date();
const tomorrow = startOfDay(add(new Date(now), { days: 1 }));

const commonProps = {
    year: testDate.getFullYear(),
    month: testDate.getMonth(),
    day: testDate.getDate(),
    onClick: () => {
        console.log('day clicked.');
    }
};

type Story = StoryObj<CalendarDayProps>;

export const NoDay: Story = {
    args: {
        ...commonProps,
        day: undefined
    },
    render: render
};

export const Default: Story = {
    args: {
        ...commonProps,
        computeStateForDay: () => undefined
    },
    render: render
};

export const Today: Story = {
    args: {
        ...commonProps,
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        computeStateForDay: () => undefined
    },
    render: render
};

export const Future: Story = {
    args: {
        ...commonProps,
        year: tomorrow.getFullYear(),
        month: tomorrow.getMonth(),
        day: tomorrow.getDate(),
        computeStateForDay: () => undefined
    },
    render: render
};

export const StreakLeftNotSupported: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (date: Date): CalendarDayState[] => {
            if (isSameDay(new Date(testDate), date) || isSameDay(add(new Date(testDate), { days: -1 }), date)) {
                return [{
                    backgroundColor: '#35A6A0'
                }];
            }
            return [];
        }
    },
    render: render
};

export const StreakLeftDefaultColor: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (date: Date): CalendarDayState[] => {
            if (isSameDay(new Date(testDate), date) || isSameDay(add(new Date(testDate), { days: -1 }), date)) {
                return [{
                    backgroundColor: '#35A6A0',
                    streakIdentifier: 'state1'
                }];
            }
            return [];
        }
    },
    render: render
};

export const StreakLeftCustomColor: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (date: Date): CalendarDayState[] => {
            if (isSameDay(new Date(testDate), date) || isSameDay(add(new Date(testDate), { days: -1 }), date)) {
                return [{
                    backgroundColor: '#35A6A0',
                    streakIdentifier: 'state1',
                    streakColor: '#35A6A066'
                }];
            }
            return [];
        }
    },
    render: render
};

export const StreakRightNotSupported: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (date: Date): CalendarDayState[] => {
            if (isSameDay(new Date(testDate), date) || isSameDay(add(new Date(testDate), { days: 1 }), date)) {
                return [{
                    backgroundColor: '#35A6A0'
                }];
            }
            return [];
        }
    },
    render: render
};

export const StreakRightDefaultColor: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (date: Date): CalendarDayState[] => {
            if (isSameDay(new Date(testDate), date) || isSameDay(add(new Date(testDate), { days: 1 }), date)) {
                return [{
                    backgroundColor: '#35A6A0',
                    streakIdentifier: 'state1'
                }];
            }
            return [];
        }
    },
    render: render
};

export const StreakRightCustomColor: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (date: Date): CalendarDayState[] => {
            if (isSameDay(new Date(testDate), date) || isSameDay(add(new Date(testDate), { days: 1 }), date)) {
                return [{
                    backgroundColor: '#35A6A0',
                    streakIdentifier: 'state1',
                    streakColor: '#35A6A066'
                }];
            }
            return [];
        }
    },
    render: render
};

export const StreakBothNotSupported: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (): CalendarDayState[] => {
            return [{
                backgroundColor: '#35A6A0'
            }];
        }
    },
    render: render
};

export const StreakBothDefaultColor: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (): CalendarDayState[] => {
            return [{
                backgroundColor: '#35A6A0',
                streakIdentifier: 'state1'
            }];
        }
    },
    render: render
};

export const StreakBothCustomColor: Story = {
    args: {
        ...commonProps,
        computeStatesForDay: (): CalendarDayState[] => {
            return [{
                backgroundColor: '#35A6A0',
                streakIdentifier: 'state1',
                streakColor: '#35A6A066'
            }];
        }
    },
    render: render
};

export const InCalendarNoData: Story = {
    render: () => {
        return <Layout colorScheme="auto">
            <Card>
                <DateRangeCoordinator intervalType="Month">
                    <CalendarDayInCalendar />
                </DateRangeCoordinator>
            </Card>
        </Layout>;
    }
};

export const InCalendarNoDataWithClickHandler: Story = {
    render: () => {
        return <Layout colorScheme="auto">
            <Card>
                <DateRangeCoordinator intervalType="Month">
                    <CalendarDayInCalendar withClickHandler={true} />
                </DateRangeCoordinator>
            </Card>
        </Layout>;
    }
};

export const InCalendarWithData: Story = {
    render: () => {
        return <Layout colorScheme="auto">
            <Card>
                <DateRangeCoordinator intervalType="Month">
                    <CalendarDayInCalendar withData={true} />
                </DateRangeCoordinator>
            </Card>
        </Layout>;
    }
};

export const InCalendarWithDataWithClickHandler: Story = {
    render: () => {
        return <Layout colorScheme="auto">
            <Card>
                <DateRangeCoordinator intervalType="Month">
                    <CalendarDayInCalendar withData={true} withClickHandler={true} />
                </DateRangeCoordinator>
            </Card>
        </Layout>;
    }
};

function CalendarDayInCalendar(props: { withData?: boolean, withClickHandler?: boolean }) {
    const dateRangeContext = useContext(DateRangeContext);

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

    let intervalStart = dateRangeContext!.intervalStart;

    return <Calendar className="mdhui-simple-calendar" year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />;
}