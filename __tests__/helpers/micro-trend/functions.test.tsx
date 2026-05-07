import { describe, expect, it, test } from '@jest/globals';
import { convertToMicroTrendDataType, getDataTypeKey, getFormatter, getIcon, getLabel, isMicroTrendDataType, loadMicroTrendResults, MicroTrendDataType, MicroTrendResult } from '../../../src/helpers/micro-trend';
import { DailyDataType, getDayKey, language, queryRelativeActivity, registerDailyDataTypeDefinition, RelativeActivityDataType } from '../../../src/helpers';
import queryLatestSurveyAnswersByDate from '../../../src/helpers/query-latest-survey-answers-by-date';
import { faBed, faList, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import React from 'react';
import { add, startOfToday } from 'date-fns';
import combinedTypeDefinitions from '../../../src/helpers/daily-data-types/combined';

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            getCurrentLanguage: jest.fn(() => {
                return 'en-US';
            })
        }
    };
});
jest.mock('../../../src/helpers', () => {
    const actual = jest.requireActual('../../../src/helpers');
    return {
        __esModule: true,
        ...actual,
        queryRelativeActivity: jest.fn(),
        language: jest.fn()
    };
});

jest.mock('../../../src/helpers/query-latest-survey-answers-by-date', () => {
    return {
        __esModule: true,
        default: jest.fn()
    };
});

describe('Micro Trend - Helper Function Tests', () => {
    describe('isMicroTrendDataType', () => {
        it('Should return true when the data type is a MicroTrendDataType.', () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps };
            const result = isMicroTrendDataType(dataType);
            expect(result).toBe(true);
        });

        it('Should return false when the dataType is a RelativeActivityDataType.', () => {
            const dataType: RelativeActivityDataType = { dailyDataType: "Steps" };
            const result = isMicroTrendDataType(dataType);
            expect(result).toBe(false);
        });
    });

    describe('convertToMicroTrendDataType', () => {
        it('Should map RelativeActivityDataType properties to MicroTrendDataType.', () => {
            const dataType: RelativeActivityDataType = {
                icon: <FontAwesomeSvgIcon icon={faList} />,
                dailyDataType: "Steps",
                label: 'Relative Label',
                color: '#ff0000',
                threshold: 5,
                overThresholdColor: '#00ff00',
                formatter: (v: number) => `fmt:${v}`
            };

            const result = convertToMicroTrendDataType(dataType);

            expect(result.icon).toBe(dataType.icon);
            expect(result.rawDataType).toBe(dataType.dailyDataType);
            expect(result.label).toBe(dataType.label);
            expect(result.color).toBe(dataType.color);
            expect(result.threshold).toBe(dataType.threshold);
            expect(result.overThresholdColor).toBe(dataType.overThresholdColor);
            expect(result.formatter).toBe(dataType.formatter);
        });
    });

    describe('loadMicroTrendResults', () => {
        it('Should return an empty object when the preview state is noData (daily data).', async () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps };

            const queryRelativeActivityMock = queryRelativeActivity as jest.Mock;
            queryRelativeActivityMock.mockReset();

            const result = await loadMicroTrendResults(dataType, new Date(), 7, 'noData');

            expect(result).toEqual({});

            expect(queryRelativeActivityMock).not.toHaveBeenCalled();
        });

        it('Should return an empty object when the preview state is noData (survey data).', async () => {
            const dataType: MicroTrendDataType = { rawDataType: { surveyName: 'survey' } };

            const queryLatestSurveyAnswersByDateMock = queryLatestSurveyAnswersByDate as jest.Mock;
            queryLatestSurveyAnswersByDateMock.mockReset();

            const result = await loadMicroTrendResults(dataType, new Date(), 7, 'noData');

            expect(result).toEqual({});

            expect(queryLatestSurveyAnswersByDateMock).not.toHaveBeenCalled();
        });

        test.each([
            { threshold: undefined },
            { threshold: '30DayAverage' as const },
            { threshold: 7 }
        ])('Should return only the end date value when the preview state is noTrend (daily data, threshold: $threshold).', async ({ threshold }) => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps, threshold };

            const endDate = startOfToday();
            const endDayKey = getDayKey(endDate);

            const otherDate = add(endDate, { days: -1 });
            const otherDayKey = getDayKey(otherDate);

            const lookbackDays = 14;

            const queryRelativeActivityMock = queryRelativeActivity as jest.Mock;
            queryRelativeActivityMock.mockReset();
            queryRelativeActivityMock.mockResolvedValue({
                [DailyDataType.Steps]: {
                    [otherDayKey]: { value: 3, threshold: 10, relativePercent: 0.3 },
                    [endDayKey]: { value: 7, threshold: 10, relativePercent: 0.7 }
                }
            });

            const result = await loadMicroTrendResults(dataType, endDate, lookbackDays, 'noTrend');

            expect(result).toEqual({ [endDayKey]: { value: 7 } });

            const expectedQueryStartDate = add(endDate, { days: -1 * lookbackDays });
            const expectedQueryEndDate = endDate;

            expect(queryRelativeActivityMock).toHaveBeenCalledTimes(1);
            expect(queryRelativeActivityMock).toHaveBeenCalledWith(
                expectedQueryStartDate, expectedQueryEndDate,
                [{ dailyDataType: DailyDataType.Steps, threshold }],
                true
            );
        });

        test.each([
            { threshold: undefined },
            { threshold: '30DayAverage' as const },
            { threshold: 7 }
        ])('Should return only the end date value when the preview state is noTrend (survey data, threshold: $threshold).', async ({ threshold }) => {
            const dataType: MicroTrendDataType = {
                rawDataType: {
                    surveyName: 'survey',
                    stepIdentifier: 'step',
                    resultIdentifier: 'result',
                    useEventAsDate: true
                },
                threshold
            };
            const endDate = startOfToday();
            const endDayKey = getDayKey(endDate);

            const otherDate = add(endDate, { days: -1 });
            const otherDayKey = getDayKey(otherDate);

            const lookbackDays = 14;

            const queryLatestSurveyAnswersByDateMock = queryLatestSurveyAnswersByDate as jest.Mock;
            queryLatestSurveyAnswersByDateMock.mockReset();
            queryLatestSurveyAnswersByDateMock.mockResolvedValue({
                [otherDayKey]: [{ answers: ['3'] }],
                [endDayKey]: [{ answers: ['7'] }]
            });

            const result = await loadMicroTrendResults(dataType, endDate, lookbackDays, 'noTrend');

            expect(result).toEqual({ [endDayKey]: { value: 7 } });

            const expectedQueryStartDate = threshold === '30DayAverage' || threshold === undefined
                ? add(endDate, { days: -1 * (31 + lookbackDays) })
                : add(endDate, { days: -1 * lookbackDays });
            const expectedQueryEndDate = add(endDate, { days: 1 });

            expect(queryLatestSurveyAnswersByDateMock).toHaveBeenCalledTimes(1);
            expect(queryLatestSurveyAnswersByDateMock).toHaveBeenCalledWith(
                expectedQueryStartDate, expectedQueryEndDate,
                'survey', 'step', 'result', true,
                true
            );
        });

        test.each([
            { threshold: undefined },
            { threshold: '30DayAverage' as const },
            { threshold: 7 }
        ])('Should return values for all dates with the appropriate threshold (daily data, threshold: $threshold).', async ({ threshold }) => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps, threshold };

            const today = startOfToday();
            const dayKeys = [
                getDayKey(today),
                getDayKey(add(today, { days: -1 })),
                getDayKey(add(today, { days: -2 })),
                getDayKey(add(today, { days: -3 })),
                getDayKey(add(today, { days: -4 })),
                getDayKey(add(today, { days: -5 }))
            ];
            const lookbackDays = 14;

            const queryRelativeActivityMock = queryRelativeActivity as jest.Mock;
            queryRelativeActivityMock.mockReset();
            queryRelativeActivityMock.mockResolvedValue({
                [DailyDataType.Steps]: {
                    [dayKeys[0]]: { value: 2, threshold: 5, relativePercent: 2 / 10 },
                    [dayKeys[1]]: { value: 4, threshold: 6, relativePercent: 4 / 12 },
                    [dayKeys[2]]: { value: 6, threshold: 7, relativePercent: 6 / 14 },
                    [dayKeys[3]]: { value: 8, threshold: 8, relativePercent: 8 / 16 },
                    [dayKeys[4]]: { value: 10, threshold: 9, relativePercent: 10 / 18 },
                    [dayKeys[5]]: { value: 12, threshold: 10, relativePercent: 12 / 20 }
                }
            });

            const results = (await loadMicroTrendResults(dataType, today, lookbackDays)) as Record<string, MicroTrendResult>;

            expect(Object.keys(results)).toHaveLength(6);

            const day1 = results[dayKeys[0]];
            const day2 = results[dayKeys[1]];
            const day3 = results[dayKeys[2]];
            const day4 = results[dayKeys[3]];
            const day5 = results[dayKeys[4]];
            const day6 = results[dayKeys[5]];

            expect(day1.value).toBe(2);
            expect(day1.threshold).toBe(5);
            expect(day1.fillPercent).toBeCloseTo(2 / 10);

            expect(day2.value).toBe(4);
            expect(day2.threshold).toBe(6);
            expect(day2.fillPercent).toBeCloseTo(4 / 12);

            expect(day3.value).toBe(6);
            expect(day3.threshold).toBe(7);
            expect(day3.fillPercent).toBeCloseTo(6 / 14);

            expect(day4.value).toBe(8);
            expect(day4.threshold).toBe(8);
            expect(day4.fillPercent).toBeCloseTo(8 / 16);

            expect(day5.value).toBe(10);
            expect(day5.threshold).toBe(9);
            expect(day5.fillPercent).toBeCloseTo(10 / 18);

            expect(day6.value).toBe(12);
            expect(day6.threshold).toBe(10);
            expect(day6.fillPercent).toBeCloseTo(12 / 20);

            const expectedQueryStartDate = add(today, { days: -1 * lookbackDays });
            const expectedQueryEndDate = today;

            expect(queryRelativeActivityMock).toHaveBeenCalledTimes(1);
            expect(queryRelativeActivityMock).toHaveBeenCalledWith(
                expectedQueryStartDate, expectedQueryEndDate,
                [{ dailyDataType: DailyDataType.Steps, threshold }],
                false
            );
        });

        test.each([
            { threshold: undefined, expectedThreshold: 8 },
            { threshold: '30DayAverage' as const, expectedThreshold: 8 },
            { threshold: 7, expectedThreshold: 7 },
            { threshold: 0, expectedThreshold: undefined },
            { threshold: -1, expectedThreshold: undefined }
        ])('Should return values for all dates with the appropriate threshold (survey data, threshold: $threshold).', async ({ threshold, expectedThreshold }) => {
            const dataType: MicroTrendDataType = {
                rawDataType: {
                    surveyName: 'survey',
                    stepIdentifier: 'step',
                    resultIdentifier: 'result',
                    useEventAsDate: true
                },
                threshold
            };
            const today = startOfToday();
            const lookbackDays = 14;

            const dayKeys = [
                getDayKey(today),
                getDayKey(add(today, { days: -1 })),
                getDayKey(add(today, { days: -2 })),
                getDayKey(add(today, { days: -3 })),
                getDayKey(add(today, { days: -4 })),
                getDayKey(add(today, { days: -5 }))
            ];

            const invalidDayKeys = [
                getDayKey(add(today, { days: -6 })),
                getDayKey(add(today, { days: -7 }))
            ];

            const queryLatestSurveyAnswersByDateMock = queryLatestSurveyAnswersByDate as jest.Mock;
            queryLatestSurveyAnswersByDateMock.mockReset();
            queryLatestSurveyAnswersByDateMock.mockResolvedValue({
                [dayKeys[0]]: [{ answers: ['2'] }],
                [dayKeys[1]]: [{ answers: ['4'] }],
                [dayKeys[2]]: [{ answers: ['6'] }],
                [dayKeys[3]]: [{ answers: ['8'] }],
                [dayKeys[4]]: [{ answers: ['10'] }],
                [dayKeys[5]]: [{ answers: ['12'] }],
                [invalidDayKeys[0]]: [{ answers: ['not-a-number'] }],
                [invalidDayKeys[1]]: [{ answers: [''] }]
            });

            const results = (await loadMicroTrendResults(dataType, today, lookbackDays)) as Record<string, MicroTrendResult>;

            expect(Object.keys(results)).toHaveLength(6);

            const day1 = results[dayKeys[0]];
            const day2 = results[dayKeys[1]];
            const day3 = results[dayKeys[2]];
            const day4 = results[dayKeys[3]];
            const day5 = results[dayKeys[4]];
            const day6 = results[dayKeys[5]];

            expect(day1.value).toBe(2);
            expect(day1.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day1.fillPercent).toBeCloseTo(2 / (expectedThreshold * 2));
            }

            expect(day2.value).toBe(4);
            expect(day2.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day2.fillPercent).toBeCloseTo(4 / (expectedThreshold * 2));
            }

            expect(day3.value).toBe(6);
            expect(day3.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day3.fillPercent).toBeCloseTo(6 / (expectedThreshold * 2));
            }

            expect(day4.value).toBe(8);
            expect(day4.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day4.fillPercent).toBeCloseTo(8 / (expectedThreshold * 2));
            }

            expect(day5.value).toBe(10);
            expect(day5.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day5.fillPercent).toBeCloseTo(10 / (expectedThreshold * 2));
            }

            expect(day6.value).toBe(12);
            expect(day6.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day6.fillPercent).toBeCloseTo(12 / (expectedThreshold * 2));
            }

            const expectedQueryStartDate = threshold === '30DayAverage' || threshold === undefined
                ? add(today, { days: -1 * (31 + lookbackDays) })
                : add(today, { days: -1 * lookbackDays });
            const expectedQueryEndDate = add(today, { days: 1 });

            expect(queryLatestSurveyAnswersByDateMock).toHaveBeenCalledTimes(1);
            expect(queryLatestSurveyAnswersByDateMock).toHaveBeenCalledWith(
                expectedQueryStartDate, expectedQueryEndDate,
                'survey', 'step', 'result', true,
                false
            );
        });

        test.each([
            { threshold: undefined, expectedThreshold: undefined },
            { threshold: '30DayAverage' as const, expectedThreshold: undefined },
            { threshold: 7, expectedThreshold: 7 },
            { threshold: 0, expectedThreshold: undefined },
            { threshold: -1, expectedThreshold: undefined }
        ])('Should return values for all dates with the appropriate threshold when there are less than 5 historic values (survey data, threshold: $threshold).', async ({ threshold, expectedThreshold }) => {
            const dataType: MicroTrendDataType = {
                rawDataType: {
                    surveyName: 'survey',
                    stepIdentifier: 'step',
                    resultIdentifier: 'result',
                    useEventAsDate: true
                },
                threshold
            };
            const today = startOfToday();
            const lookbackDays = 14;

            const dayKeys = [
                getDayKey(today),
                getDayKey(add(today, { days: -1 })),
                getDayKey(add(today, { days: -2 })),
                getDayKey(add(today, { days: -3 })),
                getDayKey(add(today, { days: -4 }))
            ];

            const invalidDayKeys = [
                getDayKey(add(today, { days: -6 })),
                getDayKey(add(today, { days: -7 }))
            ];

            const queryLatestSurveyAnswersByDateMock = queryLatestSurveyAnswersByDate as jest.Mock;
            queryLatestSurveyAnswersByDateMock.mockReset();
            queryLatestSurveyAnswersByDateMock.mockResolvedValue({
                [dayKeys[0]]: [{ answers: ['2'] }],
                [dayKeys[1]]: [{ answers: ['4'] }],
                [dayKeys[2]]: [{ answers: ['6'] }],
                [dayKeys[3]]: [{ answers: ['8'] }],
                [dayKeys[4]]: [{ answers: ['10'] }],
                [invalidDayKeys[0]]: [{ answers: ['not-a-number'] }],
                [invalidDayKeys[1]]: [{ answers: [''] }]
            });

            const results = (await loadMicroTrendResults(dataType, today, lookbackDays)) as Record<string, MicroTrendResult>;

            expect(Object.keys(results)).toHaveLength(5);

            const day1 = results[dayKeys[0]];
            const day2 = results[dayKeys[1]];
            const day3 = results[dayKeys[2]];
            const day4 = results[dayKeys[3]];
            const day5 = results[dayKeys[4]];

            expect(day1.value).toBe(2);
            expect(day1.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day1.fillPercent).toBeCloseTo(2 / (expectedThreshold * 2));
            }

            expect(day2.value).toBe(4);
            expect(day2.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day2.fillPercent).toBeCloseTo(4 / (expectedThreshold * 2));
            }

            expect(day3.value).toBe(6);
            expect(day3.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day3.fillPercent).toBeCloseTo(6 / (expectedThreshold * 2));
            }

            expect(day4.value).toBe(8);
            expect(day4.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day4.fillPercent).toBeCloseTo(8 / (expectedThreshold * 2));
            }

            expect(day5.value).toBe(10);
            expect(day5.threshold).toBe(expectedThreshold);
            if (expectedThreshold === undefined) {
                expect(day1.fillPercent).toBeUndefined();
            } else {
                expect(day5.fillPercent).toBeCloseTo(10 / (expectedThreshold * 2));
            }

            const expectedQueryStartDate = threshold === '30DayAverage' || threshold === undefined
                ? add(today, { days: -1 * (31 + lookbackDays) })
                : add(today, { days: -1 * lookbackDays });
            const expectedQueryEndDate = add(today, { days: 1 });

            expect(queryLatestSurveyAnswersByDateMock).toHaveBeenCalledTimes(1);
            expect(queryLatestSurveyAnswersByDateMock).toHaveBeenCalledWith(
                expectedQueryStartDate, expectedQueryEndDate,
                'survey', 'step', 'result', true,
                false
            );
        });
    });

    describe('getIcon', () => {
        it('Should return the icon when provided.', () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps, icon: <FontAwesomeSvgIcon icon={faBed} /> };
            const icon = getIcon(dataType);
            expect(icon).toBe(dataType.icon);
        });

        it('Should return the faList icon for survey data types.', () => {
            const dataType: MicroTrendDataType = { rawDataType: { surveyName: 'survey' } };
            const icon = getIcon(dataType);
            expect(icon.type).toBe(FontAwesomeSvgIcon);
            expect(icon.props.icon).toBe(faList);
        });

        it('Should return the icon from the DailyDataTypeDefinition for daily data types.', () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps };
            const icon = getIcon(dataType);
            expect(icon.type).toBe(FontAwesomeSvgIcon);
            expect(icon.props.icon).toBe(faShoePrints);
        });
    });

    describe('getLabel', () => {
        it('Should return the label when provided.', () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps, label: 'Custom Label' };
            const label = getLabel(dataType);
            expect(label).toBe('Custom Label');
        });

        it('Should return the resultIdentifier for survey data types, when present.', () => {
            const dataType: MicroTrendDataType = { rawDataType: { surveyName: 'survey', stepIdentifier: 'step', resultIdentifier: 'result' } };
            const label = getLabel(dataType);
            expect(label).toBe('result');
        });

        it('Should return the stepIdentifier for survey data types, when present.', () => {
            const dataType: MicroTrendDataType = { rawDataType: { surveyName: 'survey', stepIdentifier: 'step' } };
            const label = getLabel(dataType);
            expect(label).toBe('step');
        });

        it('Should return the surveyName for survey data types, when present.', () => {
            const dataType: MicroTrendDataType = { rawDataType: { surveyName: 'survey' } };
            const label = getLabel(dataType);
            expect(label).toBe('survey');
        });

        it('Should return the label from the DailyDataTypeDefinition for daily data types.', () => {
            const languageMock = language as jest.Mock;
            languageMock.mockReset();
            languageMock.mockReturnValue('Localized Steps Label');

            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps };
            const label = getLabel(dataType);

            expect(label).toBe('Localized Steps Label');

            expect(languageMock).toHaveBeenCalledTimes(1);
            expect(languageMock).toHaveBeenCalledWith('steps');
        });

        it('Should return the rawDataType if the DailyDataTypeDefinition does not have a labelKey for daily data types..', () => {
            const stepsDefinition = combinedTypeDefinitions.find(def => def.type === DailyDataType.Steps)!;
            registerDailyDataTypeDefinition({ ...stepsDefinition, labelKey: undefined });

            const languageMock = language as jest.Mock;
            languageMock.mockReset();

            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps };
            const label = getLabel(dataType);

            expect(label).toBe(DailyDataType.Steps);

            expect(languageMock).not.toHaveBeenCalled();
        });
    });

    describe('getFormatter', () => {
        it('Should return the formatter when provided.', () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps, formatter: (v: number) => `fmt:${v}` };
            const formatter = getFormatter(dataType);
            expect(formatter).toBe(dataType.formatter);
        });

        it('Should return a rounding number-for-locale formatter for survey data types.', () => {
            const dataType: MicroTrendDataType = { rawDataType: { surveyName: 'survey' } };
            const formatter = getFormatter(dataType);
            expect(formatter(123.4)).toBe('123');
            expect(formatter(123.5)).toBe('124');
        });

        it('Should return the formatter from the DailyDataTypeDefinition for daily data types.', () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.SleepMinutes };
            const formatter = getFormatter(dataType);
            const testFormat = formatter(130.5);
            expect(testFormat).toBe('2h 11m');
        });
    });

    describe('getDataTypeKey', () => {
        it('Should return a composite key for survey data types.', () => {
            const dataType: MicroTrendDataType = {
                rawDataType: {
                    surveyName: 'survey',
                    stepIdentifier: 'step',
                    resultIdentifier: 'result',
                    useEventAsDate: true
                }
            };
            const dataTypeKey = getDataTypeKey(dataType);
            expect(dataTypeKey).toBe('survey-step-result-true');
        });

        it('Should return a composite key for survey data types that are missing optional fields.', () => {
            const dataType: MicroTrendDataType = { rawDataType: { surveyName: 'survey' } };
            const dataTypeKey = getDataTypeKey(dataType);
            expect(dataTypeKey).toBe('survey-undefined-undefined-undefined');
        });

        it('Should return the daily data type for daily data types.', () => {
            const dataType: MicroTrendDataType = { rawDataType: DailyDataType.Steps };
            const datTypeKey = getDataTypeKey(dataType);
            expect(datTypeKey).toBe(DailyDataType.Steps);
        });
    });
});
