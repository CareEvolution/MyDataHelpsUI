import React, { CSSProperties, useContext, useMemo, useState } from 'react';
import './Goal.css';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faStar } from '@fortawesome/free-solid-svg-icons';
import { ColorDefinition, resolveColor, SingleValueProvider, useInitializeView } from '../../../helpers';
import { LayoutContext } from '../../presentational';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { createPreviewValueProvider, GoalPreviewState } from './Goal.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { findLast } from 'lodash';

export interface GoalColorConfiguration {
    statusColor?: ColorDefinition;
    onSegmentColor?: ColorDefinition;
    offSegmentColor?: ColorDefinition;
    iconColor?: ColorDefinition;
    iconBackgroundColor?: ColorDefinition;
}

export interface GoalTier {
    targetValue: number;
    maxValue: number;
    color: ColorDefinition;
    inProgressColors?: GoalColorConfiguration;
}

export interface GoalProps {
    previewState?: 'loading' | GoalPreviewState;
    variant?: 'default' | 'verbose' | 'compact';
    label: string;
    description?: string;
    /**
     * @deprecated
     */
    targetValue?: number;
    /**
     * @deprecated
     */
    maxValue?: number;
    tiers?: GoalTier[];
    valueProvider: SingleValueProvider<number>;
    maxSegments?: number;
    icon?: IconDefinition;
    /**
     * @deprecated
     */
    notStartedColor?: ColorDefinition;
    notStartedColors?: GoalColorConfiguration;
    /**
     * @deprecated
     */
    inProgressColor?: ColorDefinition;
    inProgressColors?: GoalColorConfiguration;
    /**
     * @deprecated
     */
    completedColor?: ColorDefinition;
    completedColors?: GoalColorConfiguration;
    loadingIndicatorColor?: ColorDefinition;
    progressBarColor?: ColorDefinition;
    progressBarBackgroundColor?: ColorDefinition;
    style?: CSSProperties;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function Goal(props: GoalProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState<number>(0);

    const defaultNotStartedColor = 'var(--mdhui-text-color-3)';
    const notStartedColors = {
        statusColor: resolveColor(layoutContext.colorScheme, props.notStartedColors?.statusColor || props.notStartedColor) ?? defaultNotStartedColor,
        onSegmentColor: resolveColor(layoutContext.colorScheme, props.notStartedColors?.onSegmentColor || props.notStartedColor) ?? defaultNotStartedColor,
        offSegmentColor: resolveColor(layoutContext.colorScheme, props.notStartedColors?.offSegmentColor || props.notStartedColor) ?? defaultNotStartedColor,
        iconColor: resolveColor(layoutContext.colorScheme, props.notStartedColors?.iconColor || props.notStartedColor) ?? defaultNotStartedColor,
        iconBackgroundColor: resolveColor(layoutContext.colorScheme, props.notStartedColors?.iconBackgroundColor)
    };

    const defaultInProgressColor = 'var(--mdhui-color-primary)';
    const inProgressColors = {
        statusColor: resolveColor(layoutContext.colorScheme, props.inProgressColors?.statusColor || props.inProgressColor) ?? defaultInProgressColor,
        onSegmentColor: resolveColor(layoutContext.colorScheme, props.inProgressColors?.onSegmentColor || props.inProgressColor) ?? defaultInProgressColor,
        offSegmentColor: resolveColor(layoutContext.colorScheme, props.inProgressColors?.offSegmentColor) ?? notStartedColors.offSegmentColor,
        iconColor: resolveColor(layoutContext.colorScheme, props.inProgressColors?.iconColor || props.inProgressColor) ?? defaultInProgressColor,
        iconBackgroundColor: resolveColor(layoutContext.colorScheme, props.inProgressColors?.iconBackgroundColor)
    };

    const defaultCompletedColor = 'var(--mdhui-color-success)';
    const completedColors = {
        statusColor: resolveColor(layoutContext.colorScheme, props.completedColors?.statusColor || props.completedColor) ?? defaultCompletedColor,
        onSegmentColor: resolveColor(layoutContext.colorScheme, props.completedColors?.onSegmentColor || props.completedColor) ?? defaultCompletedColor,
        offSegmentColor: resolveColor(layoutContext.colorScheme, props.completedColors?.offSegmentColor) ?? notStartedColors.offSegmentColor,
        iconColor: resolveColor(layoutContext.colorScheme, props.completedColors?.iconColor || props.completedColor) ?? defaultCompletedColor,
        iconBackgroundColor: resolveColor(layoutContext.colorScheme, props.completedColors?.iconBackgroundColor)
    };

    const tiersMinToMax = useMemo<GoalTier[]>(() => {
        const tiersMinToMax = (props.tiers ?? []).sort((a, b) => a.targetValue - b.targetValue);
        if (tiersMinToMax.length === 0 && props.targetValue !== undefined && props.maxValue !== undefined) {
            tiersMinToMax.push({
                targetValue: props.targetValue,
                maxValue: props.maxValue,
                color: props.completedColor || defaultCompletedColor
            });
        }
        return tiersMinToMax;
    }, [props.tiers, props.targetValue, props.maxValue, props.completedColor]);

    const maxValue = useMemo<number>(() => {
        return tiersMinToMax.length > 0 ? tiersMinToMax[tiersMinToMax.length - 1].maxValue : 0;
    }, [tiersMinToMax]);

    useInitializeView(() => {
        setLoading(true);
        setValue(0);

        if (props.previewState === 'loading') {
            return;
        }

        const valueProvider = props.previewState
            ? createPreviewValueProvider(props.previewState, tiersMinToMax)
            : props.valueProvider;

        valueProvider.getValue().then(value => {
            setValue(Math.max(0, Math.min(value ?? 0, maxValue)));
            setLoading(false);
        });
    }, [], [props.previewState, tiersMinToMax, maxValue, props.valueProvider]);

    const maxTierMet = findLast(tiersMinToMax, tier => tier.targetValue <= value);
    const nextTier = tiersMinToMax.find(tier => tier.targetValue > value);

    const denominator = nextTier?.maxValue ?? maxTierMet?.maxValue ?? 0;

    let scaledNumerator = value;
    let scaledDenominator = denominator;
    if (props.maxSegments && scaledDenominator > props.maxSegments) {
        let scale = scaledDenominator / props.maxSegments;
        scaledDenominator /= scale;
        scaledNumerator = scaledNumerator === 0 ? 0 : Math.max(Math.floor(scaledNumerator / scale), 1);
    }

    const loadingIndicatorColor = resolveColor(layoutContext.colorScheme, props.loadingIndicatorColor) ?? defaultNotStartedColor;

    let statusColor = notStartedColors.statusColor;
    let onSegmentColor = notStartedColors.onSegmentColor;
    let offSegmentColor = notStartedColors.offSegmentColor;
    let iconColor = notStartedColors.iconColor;
    let iconBackgroundColor = notStartedColors.iconBackgroundColor;

    if (value > 0) {
        if (nextTier) {
            statusColor = resolveColor(layoutContext.colorScheme, nextTier.inProgressColors?.statusColor) ?? inProgressColors.statusColor;
            onSegmentColor = resolveColor(layoutContext.colorScheme, nextTier.inProgressColors?.onSegmentColor) ?? inProgressColors.onSegmentColor;
            offSegmentColor = resolveColor(layoutContext.colorScheme, nextTier.inProgressColors?.offSegmentColor) ?? inProgressColors.offSegmentColor;
            iconColor = resolveColor(layoutContext.colorScheme, nextTier.inProgressColors?.iconColor) ?? inProgressColors.iconColor;
            iconBackgroundColor = resolveColor(layoutContext.colorScheme, nextTier.inProgressColors?.iconBackgroundColor) ?? inProgressColors.iconBackgroundColor;
        } else if (maxTierMet && !nextTier) {
            statusColor = completedColors.statusColor;
            onSegmentColor = completedColors.onSegmentColor;
            offSegmentColor = completedColors.offSegmentColor;
            iconColor = completedColors.iconColor;
            iconBackgroundColor = completedColors.iconBackgroundColor;
        }
    }

    const data: { value: number, color: string }[] = [];
    for (let i = 1; i <= scaledDenominator; i++) {
        data.push({ value: 1, color: i <= scaledNumerator ? onSegmentColor : offSegmentColor });
    }

    const createChart = (variant?: 'compact') => {
        return <div className={`mdhui-goal-chart ${variant}`}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data} dataKey="value"
                        cx="50%" cy="50%"
                        innerRadius={variant === 'compact' ? 22 : 30} outerRadius={variant === 'compact' ? 28 : 40}
                        startAngle={450} endAngle={90} paddingAngle={5}
                        isAnimationActive={false}
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => <Cell key={index} style={{ fill: entry.color }} />)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="mdhui-goal-chart-icon-wrapper" style={{ background: iconBackgroundColor }}>
                {<FontAwesomeIcon icon={props.icon ?? faStar} className={`mdhui-goal-chart-icon ${variant}`} style={{ color: iconColor }} />}
            </div>
        </div>;
    };

    const createRatioDisplay = (variant?: 'compact') => {
        return <div>
            {loading
                ? <div className={`mdhui-goal-ratio-loading ${variant}`}>
                    <FontAwesomeSvgIcon icon={faArrowsRotate} spin style={{ color: loadingIndicatorColor }} />
                </div>
                : <div className={`mdhui-goal-ratio ${variant}`} style={{ color: statusColor }}>
                    {value}<span className={`mdhui-goal-ratio-divider ${variant}`}>/</span>{denominator}
                </div>
            }
        </div>;
    };

    if (props.variant === 'verbose') {

        const progressBarColor = resolveColor(layoutContext.colorScheme, props.progressBarColor) ?? onSegmentColor;
        const progressBarBackgroundColor = resolveColor(layoutContext.colorScheme, props.progressBarBackgroundColor) ?? offSegmentColor;

        return <div className="mdhui-goal" style={props.style} ref={props.innerRef}>
            <div>
                {createChart('compact')}
                {createRatioDisplay('compact')}
            </div>
            <div className="mdhui-goal-info">
                <div className="mdhui-goal-name">{props.label}</div>
                <div className="mdhui-goal-description">{props.description}</div>
                <div className="mdhui-goal-progress-wrapper">
                    <div className="mdhui-goal-progress-bar-wrapper" style={{ background: progressBarBackgroundColor }}>
                        <div className="mdhui-goal-progress-bar" style={{ width: (value * 100 / maxValue) + '%', background: progressBarColor }} />
                    </div>
                    <div className="mdhui-goal-progress-badges">
                        {tiersMinToMax.map((tier, index) => {
                            const style = {
                                left: `${(tier.targetValue * 100 / maxValue)}%`,
                                background: resolveColor(layoutContext.colorScheme, tier.color) ?? '#ccc'
                            };
                            return <div key={index} className="mdhui-goal-progress-badge" style={style}></div>;
                        })}
                    </div>
                </div>
            </div>
        </div>;
    }

    if (props.variant === 'compact') {
        return <div className="mdhui-goal" style={props.style} ref={props.innerRef}>
            <div>
                {createChart('compact')}
                {createRatioDisplay('compact')}
            </div>
        </div>;
    }

    return <div className="mdhui-goal" style={props.style} ref={props.innerRef}>
        <div>
            {createChart()}
        </div>
        <div className="mdhui-goal-info">
            {createRatioDisplay()}
            <div className="mdhui-goal-name">{props.label}</div>
        </div>
    </div>;
}