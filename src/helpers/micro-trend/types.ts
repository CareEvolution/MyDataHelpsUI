import { ReactElement } from 'react';
import { ColorDefinition, SurveyDataType } from '..';

export type MicroTrendPreviewState = 'default' | 'noTrend' | 'noData';
export type MicroTrendChartPosition = 'bottom' | 'right';

export interface MicroTrendDataType {
    icon?: ReactElement;
    rawDataType: string | SurveyDataType;
    label?: string;
    color?: ColorDefinition;
    threshold?: number | '30DayAverage';
    overThresholdColor?: ColorDefinition;
    formatter?: (number: number) => string;
}

export interface MicroTrendResult {
    value: number;
    threshold?: number;
    fillPercent?: number;
}

export type MicroTrendResults = Partial<Record<string, MicroTrendResult>>;
