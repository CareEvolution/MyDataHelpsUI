/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { SurveyTask } from '@careevolution/mydatahelps-js';
import SingleSurveyTask from '../../../../src/components/presentational/SingleSurveyTask/SingleSurveyTask';

// The helpers barrel pulls in langchain, which needs TextEncoder (absent from jsdom).
jest.mock('../../../../src/helpers/AIAssistant', () => ({}));
jest.mock('../../../../src/assets/greenCheck.svg', () => 'greenCheck.svg');

describe('SingleSurveyTask Component Tests', () => {
    const now = new Date(2026, 9, 1, 16, 0);

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(now);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const renderDueDate = (dueDate: Date, preciseDueDate?: boolean): string => {
        const task = {
            surveyDisplayName: 'Survey Name',
            status: 'incomplete',
            dueDate: dueDate.toISOString(),
            preciseDueDate
        } as SurveyTask;
        const { container } = render(<SingleSurveyTask task={task} onClick={() => { }} />);
        return container.querySelector('.due-date')?.textContent ?? '';
    };

    describe('Day-granular due dates', () => {
        it('Should show Due Today for a legacy task due earlier today.', () => {
            expect(renderDueDate(new Date(2026, 9, 1, 14, 37))).toBe('Due Today');
        });

        it('Should show Due Tomorrow without a time for a legacy task due tomorrow.', () => {
            expect(renderDueDate(new Date(2026, 9, 2, 10, 15))).toBe('Due Tomorrow');
        });

        it('Should show Due Today when preciseDueDate is false.', () => {
            expect(renderDueDate(new Date(2026, 9, 1, 14, 37), false)).toBe('Due Today');
        });
    });

    describe('Precise due dates', () => {
        it('Should show Overdue for a task due earlier today.', () => {
            expect(renderDueDate(new Date(2026, 9, 1, 14, 0), true)).toBe('Overdue');
        });

        it('Should show Due Today with the time for a task due later today.', () => {
            expect(renderDueDate(new Date(2026, 9, 1, 18, 30), true)).toBe('Due Today at 6:30 PM');
        });

        it('Should show Due Tomorrow with the time for a task due tomorrow.', () => {
            expect(renderDueDate(new Date(2026, 9, 2, 9, 0), true)).toBe('Due Tomorrow at 9:00 AM');
        });
    });
});
