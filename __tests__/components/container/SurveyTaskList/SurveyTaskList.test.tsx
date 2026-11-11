/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, render } from '@testing-library/react';
import MyDataHelps, { SurveyTask } from '@careevolution/mydatahelps-js';
import SurveyTaskList, { SurveyTaskListSortBehavior } from '../../../../src/components/container/SurveyTaskList/SurveyTaskList';

// The helpers barrel pulls in langchain, which needs TextEncoder (absent from jsdom).
jest.mock('../../../../src/helpers/AIAssistant', () => ({}));
jest.mock('../../../../src/assets/greenCheck.svg', () => 'greenCheck.svg');

// Preview data imports ESM-only uuid, and these tests never use preview mode.
jest.mock('../../../../src/components/container/SurveyTaskList/SurveyTaskList.previewdata', () => ({
    previewIncompleteTasks: [],
    previewCompleteTasks: []
}));

// The full presentational barrel imports SVGs Jest can't parse; re-export only what SurveyTaskList renders.
jest.mock('../../../../src/components/presentational', () => {
    const presentational = '../../../../src/components/presentational';
    return {
        Card: jest.requireActual(`${presentational}/Card`).default,
        CardTitle: jest.requireActual(`${presentational}/CardTitle`).default,
        LayoutContext: jest.requireActual(`${presentational}/Layout`).LayoutContext,
        LoadingIndicator: jest.requireActual(`${presentational}/LoadingIndicator`).default,
        SingleSurveyTask: jest.requireActual(`${presentational}/SingleSurveyTask`).default
    };
});

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: {
        getCurrentLanguage: jest.fn(() => 'en'),
        querySurveyTasks: jest.fn(),
        startSurvey: jest.fn(),
        on: jest.fn(),
        off: jest.fn()
    }
}));

const querySurveyTasksMock = MyDataHelps.querySurveyTasks as jest.Mock;

const endOfDay = '2026-11-14T23:59:59.999-05:00';

function task(surveyName: string, dueDate: string | undefined, insertedDate: string | undefined): SurveyTask {
    return {
        id: surveyName,
        surveyName,
        surveyDisplayName: surveyName,
        status: 'incomplete',
        dueDate,
        insertedDate
    } as SurveyTask;
}

async function renderedOrder(apiTasks: SurveyTask[], sortBehavior?: SurveyTaskListSortBehavior): Promise<string[]> {
    querySurveyTasksMock.mockResolvedValue({ surveyTasks: apiTasks, nextPageID: null });
    const { container } = render(<SurveyTaskList status="incomplete" sortBehavior={sortBehavior} />);
    await act(async () => {
        await jest.advanceTimersByTimeAsync(600);
    });
    return Array.from(container.querySelectorAll('.survey-name')).map(e => e.textContent ?? '');
}

describe('SurveyTaskList incomplete sort', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-11-11T12:00:00Z'));
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    // The API returns tasks newest-inserted first.
    it('orders tasks with the same due date oldest-inserted first', async () => {
        const order = await renderedOrder([
            task('Second', endOfDay, '2026-11-11T07:26:28.07Z'),
            task('First', endOfDay, '2026-11-11T07:26:23.597Z')
        ]);
        expect(order).toEqual(['First', 'Second']);
    });

    it('keeps the same-due-date tie-break oldest-inserted first when sorting due dates descending', async () => {
        const order = await renderedOrder([
            task('Second', endOfDay, '2026-11-11T07:26:28.07Z'),
            task('First', endOfDay, '2026-11-11T07:26:23.597Z'),
            task('Later', '2026-11-20T23:59:59.999-05:00', '2026-11-11T07:20:00Z')
        ], { type: 'dueDate', direction: 'descending' });
        expect(order).toEqual(['Later', 'First', 'Second']);
    });

    it('still orders by due date before inserted date', async () => {
        const order = await renderedOrder([
            task('Due later, inserted first', '2026-11-15T23:59:59.999-05:00', '2026-11-11T07:00:00Z'),
            task('Due sooner, inserted last', endOfDay, '2026-11-11T08:00:00Z')
        ]);
        expect(order).toEqual(['Due sooner, inserted last', 'Due later, inserted first']);
    });

    it('orders tasks with no due date oldest-inserted first, after dated tasks', async () => {
        const order = await renderedOrder([
            task('Undated second', undefined, '2026-11-11T07:30:00Z'),
            task('Undated first', undefined, '2026-11-11T07:10:00Z'),
            task('Dated', endOfDay, '2026-11-11T07:20:00Z')
        ]);
        expect(order).toEqual(['Dated', 'Undated first', 'Undated second']);
    });

    it('treats due dates written with different offsets for the same instant as a tie', async () => {
        const order = await renderedOrder([
            task('Second', '2026-11-15T04:59:59.999Z', '2026-11-11T07:26:28.07Z'),
            task('First', endOfDay, '2026-11-11T07:26:23.597Z')
        ]);
        expect(order).toEqual(['First', 'Second']);
    });

    it.each([
        ['ascending', ['Inserted first', 'Inserted second', 'No inserted date']],
        ['descending', ['Inserted second', 'Inserted first', 'No inserted date']]
    ] as const)('sorts by inserted date %s, with missing inserted dates last', async (direction, expected) => {
        const order = await renderedOrder([
            task('No inserted date', endOfDay, undefined),
            task('Inserted first', '2026-11-20T23:59:59.999-05:00', '2026-11-11T07:10:00Z'),
            task('Inserted second', endOfDay, '2026-11-11T07:30:00Z')
        ], { type: 'insertedDate', direction });
        expect(order).toEqual(expected);
    });
});
