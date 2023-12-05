import React from 'react';
import './AsthmaTools.css';
import { AsthmaToolLink } from '../../presentational';

export interface AsthmaToolsProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaToolsProps) {
    const onActionPlanClicked = (): void => {
        // TODO: Implement this.
        console.log('action plan clicked');
    };

    const onProviderReportClicked = (): void => {
        // TODO: Implement this.
        console.log('provider report clicked');
    };

    return <div className="mdhui-asthma-tools" ref={props.innerRef}>
        <AsthmaToolLink text="Add an action plan" onClick={() => onActionPlanClicked()}/>
        <AsthmaToolLink text="View a 90-day report" onClick={() => onProviderReportClicked()}/>
    </div>;
}