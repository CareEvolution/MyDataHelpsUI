import React, { createContext, CSSProperties, ReactNode, Ref } from 'react';
import { ColorDefinition, InsightsData } from '../../../helpers';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface InsightsBadgeConfiguration {
    identifier: string;
    shouldRender?: (insightsData: InsightsData) => boolean;
    getPercentComplete: (insightsData: InsightsData) => number;
    customHighlightStyling?: CSSProperties;
    icon?: IconDefinition;
    iconColor?: ColorDefinition;
}

export interface InsightsRenderingContext {
    badgeConfigurations?: InsightsBadgeConfiguration[];
    getDetails?: (insightsData: InsightsData) => ReactNode;
}

export const InsightsRenderingContext = createContext<InsightsRenderingContext | null>(null);

export interface InsightsRenderingCoordinatorProps {
    badgeConfigurations?: InsightsBadgeConfiguration[];
    getDetails?: (insightsData: InsightsData) => ReactNode;
    children: ReactNode;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsRenderingCoordinator(props: InsightsRenderingCoordinatorProps) {
    return <div ref={props.innerRef}>
        <InsightsRenderingContext.Provider
            value={{
                badgeConfigurations: props.badgeConfigurations,
                getDetails: props.getDetails
            }}
            children={props.children}
        />
    </div>;
}