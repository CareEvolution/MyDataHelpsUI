import React from 'react';
import BasicCalendar, { BasicCalendarDayState, BasicCalendarProps } from './BasicCalendar';
import { DateRangeCoordinator, Layout } from '../../presentational';
import { formatISO } from 'date-fns';

export default {
    title: 'Presentational/BasicCalendar',
    component: BasicCalendar,
    parameters: {layout: 'fullscreen'}
};

const render = (args: BasicCalendarProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType="Month">
        <BasicCalendar {...args} />
    </DateRangeCoordinator>
</Layout>;

export const Default = {
    args: {
        computeDayState: (date: Date): BasicCalendarDayState => {
            if ((date.getDate() >= 5 && date.getDate() <= 13) || date.getDate() === 17) {
                return {
                    identifier: '5-13,17',
                    style: {
                        background: '#F86A5C',
                        color: 'black',
                        fontWeight: 'bold'
                    },
                    streakColor: 'rgba(248,106,92,0.4)'
                }
            }
            if ((date.getDate() >= 2 && date.getDate() <= 4) || (date.getDate() >= 19 && date.getDate() <= 22) || date.getDate() === 16) {
                return {
                    identifier: '2-4,16,19-22',
                    style: {
                        background: '#35A6A0'
                    },
                    streakColor: 'rgba(53,166,160,0.4)'
                }
            }
            return {
                identifier: 'no-data'
            }
        },
        onDayClicked: (date: Date): void => {
            console.log('day clicked: ' + formatISO(date, {representation: 'date'}));
        }
    },
    render: render
};