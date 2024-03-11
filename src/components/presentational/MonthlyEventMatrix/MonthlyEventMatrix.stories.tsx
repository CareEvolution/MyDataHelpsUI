import React from 'react';
import { Layout } from '../../presentational';
import MonthlyEventMatrix, { MonthlyEventMatrixProps, MonthlyEventMatrixRow } from './MonthlyEventMatrix';
import { startOfMonth } from 'date-fns';
import { getDatesForMonth } from '../../../helpers/date-helpers';

export default {
    title: 'Presentational/MonthlyEventMatrix',
    component: MonthlyEventMatrix,
    parameters: { layout: 'fullscreen' }
};

let currentMonth = startOfMonth(new Date());
var monthDays = getDatesForMonth(currentMonth.getFullYear(), currentMonth.getMonth());

function newRow(label: string, color: string) {
    return {
        label: label,
        color: color,
        data: monthDays.map(() => Math.random() > 0.8)
    } as MonthlyEventMatrixRow;
}


const render = (args: MonthlyEventMatrixProps) => {
    return <Layout colorScheme="auto">
        <MonthlyEventMatrix {...args} />
    </Layout>;
};

export const Default = {
    args: {
        title: "Test",
        intervalStart: currentMonth,
        rows: [newRow("Symptom 1", "red"), newRow("Symptom 2", "blue"), newRow("Symptom 3", "green")]
    },
    render: render
};