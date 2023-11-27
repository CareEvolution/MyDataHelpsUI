import React from 'react';
import SimpleCalendar, { SimpleCalendarProps } from './SimpleCalendar';
import { Card, DateRangeCoordinator, Layout } from '../../presentational';
import { formatISO } from 'date-fns';

export default {
    title: 'Presentational/SimpleCalendar',
    component: SimpleCalendar,
    parameters: {layout: 'fullscreen'}
};

const render = (args: SimpleCalendarProps) => <Layout colorScheme="auto">
    <Card>
        <DateRangeCoordinator intervalType="Month">
            <SimpleCalendar {...args} />
        </DateRangeCoordinator>
    </Card>
</Layout>;

export const Default = {
    args: {
        stateConfiguration: {
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
        },
        computeStateForDay: (date: Date): string => {
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
        },
        onDayClicked: (date: Date): void => {
            console.log('day clicked: ' + formatISO(date, {representation: 'date'}));
        }
    },
    render: render
};