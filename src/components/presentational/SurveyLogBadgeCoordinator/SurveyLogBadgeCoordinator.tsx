import React, { createContext, CSSProperties, ReactNode } from 'react';
import { ColorDefinition, SurveyLog } from '../../../helpers';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SurveyLogBadgeConfiguration {
    identifier: string;
    shouldHighlight: (surveyLog: SurveyLog) => boolean;
    customHighlightStyling?: CSSProperties;
    getBadgeDetails?: (surveyLog: SurveyLog) => NonNullable<ReactNode>;
    icon?: IconDefinition;
    iconColor?: ColorDefinition;
}

export interface SurveyLogBadgeContext {
    badgeConfigurations: SurveyLogBadgeConfiguration[];
    showFirstBadgeDetailsOnLoad: boolean;
    alwaysShowBadgeDetails: boolean;
}

export const SurveyLogBadgeContext = createContext<SurveyLogBadgeContext | null>(null);

export interface SurveyLogBadgeCoordinatorProps {
    badgeConfigurations: SurveyLogBadgeConfiguration[];
    showFirstBadgeDetailsOnLoad?: boolean;
    alwaysShowBadgeDetails?: boolean;
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogBadgeCoordinator(props: SurveyLogBadgeCoordinatorProps) {
    return <div ref={props.innerRef}>
        <SurveyLogBadgeContext.Provider value={{
            badgeConfigurations: props.badgeConfigurations,
            showFirstBadgeDetailsOnLoad: props.showFirstBadgeDetailsOnLoad ?? false,
            alwaysShowBadgeDetails: props.alwaysShowBadgeDetails ?? false
        }}>
            {props.children}
        </SurveyLogBadgeContext.Provider>
    </div>;
}