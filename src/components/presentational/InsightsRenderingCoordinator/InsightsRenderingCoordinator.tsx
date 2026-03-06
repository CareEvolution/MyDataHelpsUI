import React, { createContext, ReactNode, Ref } from 'react';
import { InsightsBadgeConfiguration } from '../index';
import { InsightsData } from '../../../helpers';

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