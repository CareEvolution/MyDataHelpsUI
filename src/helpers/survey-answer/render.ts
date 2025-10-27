import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ColorDefinition } from '../colors';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { CSSProperties, ReactNode } from 'react';

export interface SurveyAnswerRenderingConfiguration {
    resultIdentifier: string;
    icon?: IconDefinition;
    iconColor?: ColorDefinition;
    label?: string;
    shouldHighlight?: (answer: SurveyAnswer) => boolean;
    customHighlightStyling?: CSSProperties;
    formatDisplayValue?: (answer: SurveyAnswer) => ReactNode;
}