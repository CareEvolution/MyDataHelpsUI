import React, { createContext, CSSProperties, ReactNode, Ref } from 'react';
import { ColorDefinition, SurveyLog } from '../../../helpers';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SurveyLogBadgeConfiguration {
    identifier: string;
    shouldHighlight: (surveyLog: SurveyLog) => boolean;
    customHighlightStyling?: CSSProperties;
    icon?: IconDefinition;
    iconColor?: ColorDefinition;
}

export interface SurveyLogBadgeContext {
    badgeConfigurations: SurveyLogBadgeConfiguration[];
    getDetails?: (surveyLog: SurveyLog) => NonNullable<ReactNode>;
}

export const SurveyLogBadgeContext = createContext<SurveyLogBadgeContext | null>(null);

export interface SurveyLogBadgeCoordinatorProps {
    badgeConfigurations: SurveyLogBadgeConfiguration[];
    getDetails?: (surveyLog: SurveyLog) => NonNullable<ReactNode>;
    children: ReactNode;
    innerRef?: Ref<HTMLDivElement>;
}

export default function SurveyLogBadgeCoordinator(props: SurveyLogBadgeCoordinatorProps) {
    return <div ref={props.innerRef}>
        <SurveyLogBadgeContext.Provider
            value={{
                badgeConfigurations: props.badgeConfigurations,
                getDetails: props.getDetails
            }}
            children={props.children}
        />
    </div>;
}