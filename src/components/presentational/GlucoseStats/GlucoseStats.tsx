import React from 'react';
import './GlucoseStats.css';
import { formatMinutesForLocale, formatNumberForLocale, language, Reading } from '../../../helpers';
import LoadingIndicator from '../LoadingIndicator';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faBed, faDroplet, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface GlucoseStatsProps {
    variant?: 'default' | 'minimal';
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
        sleepMinutes = Math.floor(props.sleepMinutes % 60);
    }
    let totalSleepMinutes = ((sleepHours || 0) * 60) + (sleepMinutes || 0);

    return <div className="mdhui-glucose-stats" ref={props.innerRef}>
        <SingleGlucoseStat
            loading={props.loading}
            label={language(props.variant === 'minimal' ? 'glucose-stats-range-label-minimal' : 'glucose-stats-range-label')}
            icon={props.variant === 'minimal' ? undefined : faDroplet}
            iconColor="#d36540"
            value={(minGlucose && maxGlucose) ? `${formatNumberForLocale(minGlucose)} - ${formatNumberForLocale(maxGlucose)} mg/dL` : undefined}
            invert={props.variant === 'minimal'}
        />
        <SingleGlucoseStat
            loading={props.loading}
            label={language(props.variant === 'minimal' ? 'glucose-stats-avg-label-minimal' : 'glucose-stats-avg-label')}
            icon={props.variant === 'minimal' ? undefined : faDroplet}
            iconColor="#d36540"
            value={avgGlucose ? `${formatNumberForLocale(avgGlucose)} mg/dL` : undefined}
            invert={props.variant === 'minimal'}
        />
        {props.variant !== 'minimal' &&
            <>
                <SingleGlucoseStat
                    loading={props.loading}
                    label={language('glucose-stats-steps-label')}
                    icon={faShoePrints}
                    iconColor="#f5b722"
                    value={steps ? `${formatNumberForLocale(steps)}` : undefined}
                />
                <SingleGlucoseStat
                    loading={props.loading}
                    label={language('glucose-stats-sleep-label')}
                    icon={faBed}
                    iconColor="#8287bb"
                    value={(sleepHours || sleepMinutes) ? formatMinutesForLocale(totalSleepMinutes) : undefined}
                />
            </>
        }
    </div>;
}

interface SingleGlucoseStatProps {
    loading: boolean;
    label: string;
    icon?: IconDefinition;
    iconColor?: string;
    value?: string;
    invert?: boolean;
}

function SingleGlucoseStat(props: SingleGlucoseStatProps) {
    return <div className="mdhui-glucose-stat">
        {!props.invert &&
            <div className="mdhui-glucose-stat-label">{props.label}</div>
        }
        {props.loading &&
            <LoadingIndicator />
        }
        {!props.loading && props.value &&
            <div className="mdhui-glucose-stat-value">
                {props.icon && <FontAwesomeSvgIcon icon={props.icon} color={props.iconColor} />} {props.value}
            </div>
        }
        {!props.loading && !props.value &&
            <div className="mdhui-glucose-stat-value-not-available">--</div>
        }
        {props.invert &&
            <div className="mdhui-glucose-stat-label">{props.label}</div>
        }
    </div>;
}