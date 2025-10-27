import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ColorDefinition } from '../colors';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { CSSProperties, ReactNode } from 'react';

export interface SurveyAnswerRenderingConfiguration {
    resultIdentifier: string;
    icon: IconDefinition;
    iconColor: ColorDefinition;
    label: string;
    hasMetCriteria: (answer: SurveyAnswer) => boolean;
    hasMetCriteriaStyling?: CSSProperties;
    formatDisplayValue?: (answer: SurveyAnswer) => ReactNode;
}