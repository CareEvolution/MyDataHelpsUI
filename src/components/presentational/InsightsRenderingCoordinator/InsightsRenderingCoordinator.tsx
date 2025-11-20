import React, { createContext, CSSProperties, ReactNode, Ref } from 'react';
import { ColorDefinition, InsightsData } from '../../../helpers';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface InsightsBadgeConfiguration {
    identifier: string;
    shouldHighlight: (insightsData: InsightsData) => boolean;
    customHighlightStyling?: CSSProperties;
    icon?: IconDefinition;
    iconColor?: ColorDefinition;
}

export interface InsightsRenderingContext {
    badgeConfigurations?: InsightsBadgeConfiguration[];
    getDetails?: (insightsData: InsightsData) => NonNullable<ReactNode>;
}

export const InsightsRenderingContext = createContext<InsightsRenderingContext | null>(null);

export interface InsightsRenderingCoordinatorProps {
    badgeConfigurations?: InsightsBadgeConfiguration[];
    getDetails?: (insightsData: InsightsData) => NonNullable<ReactNode>;
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