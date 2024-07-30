import React from 'react';
import './GlucoseStats.css';
import { Reading } from '../../../helpers';
import LoadingIndicator from '../LoadingIndicator';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faDroplet, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface GlucoseStatsProps {
    loading: boolean;
    glucoseReadings: Reading[];
    steps: Reading[];
    sleepMinutes: number | undefined;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: GlucoseStatsProps) {
    let minGlucose: number | undefined;
    let maxGlucose: number | undefined;
    let avgGlucose: number | undefined;

    if (props.glucoseReadings && props.glucoseReadings.length > 0) {
        let glucoseValues = props.glucoseReadings.map(reading => reading.value);
        minGlucose = Math.min(...glucoseValues);
        maxGlucose = Math.max(...glucoseValues);
        avgGlucose = glucoseValues.reduce((s, a) => s + a, 0) / glucoseValues.length;
    }

    let steps: number | undefined;
    if (props.steps && props.steps.length > 0) {
        steps = props.steps.reduce((a, c) => a + c.value, 0);
    }

    let sleepHours: number | undefined;
    let sleepMinutes: number | undefined;
    if (props.sleepMinutes) {
        sleepHours = Math.floor(props.sleepMinutes / 60);
        sleepMinutes = props.sleepMinutes % 60;
    }

    return <div className="mdhui-glucose-stats" ref={props.innerRef}>
        <SingleGlucoseStat
            loading={props.loading}
            label="BLOOD GLUCOSE RANGE"
            icon={faDroplet}
            iconColor="#d36540"
            value={minGlucose ? `${minGlucose.toFixed(0)} - ${maxGlucose!.toFixed(0)} mg/dL` : undefined}
        />
        <SingleGlucoseStat
            loading={props.loading}
            label="AVG BLOOD GLUCOSE"
            icon={faDroplet}
            iconColor="#d36540"
            value={avgGlucose ? `${avgGlucose.toFixed(0)} mg/dL` : undefined}
        />
        <SingleGlucoseStat
            loading={props.loading}
            label="STEPS"
            icon={faShoePrints}
            iconColor="#f5b722"
            value={steps ? `${steps.toLocaleString()}` : undefined}
        />
        <SingleGlucoseStat
            loading={props.loading}
            label="SLEEP"
            icon={faBed}
            iconColor="#8287bb"
            value={(sleepHours || sleepMinutes) ? `${sleepHours}h ${sleepMinutes}m` : undefined}
        />
    </div>;
}

function SingleGlucoseStat(props: { loading: boolean, label: string, icon: IconDefinition, iconColor?: string, value?: string }) {
    return <div className="mdhui-glucose-stat">
        <div className="mdhui-glucose-stat-label">{props.label}</div>
        {props.loading &&
            <LoadingIndicator />
        }
        {!props.loading && props.value &&
            <div className="mdhui-glucose-stat-value">
                <FontAwesomeSvgIcon icon={props.icon} color={props.iconColor} /> {props.value}
            </div>
        }
        {!props.loading && !props.value &&
            <div className="mdhui-glucose-stat-value-not-available">--</div>
        }
    </div>;
}