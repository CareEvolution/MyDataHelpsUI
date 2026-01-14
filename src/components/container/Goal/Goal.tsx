import React, { CSSProperties, useContext, useState } from 'react';
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

function isGoalColorConfiguration(obj: ColorDefinition | GoalColorConfiguration | undefined): obj is GoalColorConfiguration {
    return obj !== undefined && typeof obj === 'object' && !('lightMode' in obj || 'darkMode' in obj);
}

export interface GoalTarget {
    targetValue: number;
    color?: ColorDefinition;
    inProgressColors?: GoalColorConfiguration;
}

export interface GoalProps {
    previewState?: 'loading' | GoalPreviewState;
    variant?: 'verbose' | 'compact';
    label: string;
    description?: string;
    targetValue: number | GoalTarget[];
    maxValue: number;
    valueProvider: SingleValueProvider<number>;
    maxSegments?: number;
    icon?: IconDefinition;
    notStartedColor?: ColorDefinition | GoalColorConfiguration;
    inProgressColor?: ColorDefinition | GoalColorConfiguration;
    completedColor?: ColorDefinition | GoalColorConfiguration;
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

    useInitializeView(() => {
        setLoading(true);
        setValue(0);

        if (props.previewState === 'loading') {
            return;
        }

        const valueProvider = props.previewState
            ? createPreviewValueProvider(props.previewState, props.targetValue, props.maxValue)
            : props.valueProvider;

        valueProvider.getValue().then(value => {
            setValue(Math.max(0, Math.min(value ?? 0, props.maxValue)));
            setLoading(false);
        });
    }, [], [props.previewState, props.targetValue, props.maxValue, props.valueProvider]);

    const defaultColor = 'var(--mdhui-text-color-3)';
    const notStartedColors: GoalColorConfiguration = isGoalColorConfiguration(props.notStartedColor) ? props.notStartedColor : {
        statusColor: props.notStartedColor,
        onSegmentColor: props.notStartedColor,
        offSegmentColor: props.notStartedColor,
        iconColor: props.notStartedColor
    };

    const defaultInProgressColor = 'var(--mdhui-color-primary)';
    const inProgressColors: GoalColorConfiguration = isGoalColorConfiguration(props.inProgressColor) ? props.inProgressColor : {
        statusColor: props.inProgressColor,
        onSegmentColor: props.inProgressColor,
        iconColor: props.inProgressColor
    };

    const defaultCompletedColor = 'var(--mdhui-color-success)';
    const completedColors: GoalColorConfiguration = isGoalColorConfiguration(props.completedColor) ? props.completedColor : {
        statusColor: props.completedColor,
        onSegmentColor: props.completedColor,
        iconColor: props.completedColor
    };

    const targetsMinToMax: GoalTarget[] = typeof props.targetValue === 'number'
        ? [{ targetValue: props.targetValue, color: completedColors.statusColor }]
        : [...props.targetValue].sort((a, b) => a.targetValue - b.targetValue);

    const maxTargetMet = findLast(targetsMinToMax, target => target.targetValue <= value);
    const nextTarget = targetsMinToMax.find(target => target.targetValue > value);

    const denominator = targetsMinToMax.length <= 1 ? props.maxValue : nextTarget?.targetValue ?? props.maxValue;

    let scaledNumerator = value;
    let scaledDenominator = denominator;
    if (props.maxSegments && scaledDenominator > props.maxSegments) {
        let scale = scaledDenominator / props.maxSegments;
        scaledDenominator /= scale;
        scaledNumerator = scaledNumerator === 0 ? 0 : Math.max(Math.floor(scaledNumerator / scale), 1);
    }

    const loadingIndicatorColor = resolveColor(layoutContext.colorScheme, props.loadingIndicatorColor) ?? defaultColor;

    const resolveGoalColors = (colors: GoalColorConfiguration | undefined): { [key in keyof GoalColorConfiguration]: string | undefined } => {
        if (colors === undefined) return {};
        return Object.fromEntries(Object.entries(colors).map(([key, value]) => {
            return [key, resolveColor(layoutContext.colorScheme, value)];
        }));
    };

    const resolvedNotStartedColors = resolveGoalColors(notStartedColors);
    let statusColor = resolvedNotStartedColors.statusColor ?? defaultColor;
    let onSegmentColor = resolvedNotStartedColors.onSegmentColor ?? defaultColor;
    let offSegmentColor = resolvedNotStartedColors.offSegmentColor ?? defaultColor;
    let iconColor = resolvedNotStartedColors.iconColor ?? defaultColor;
    let iconBackgroundColor = resolvedNotStartedColors.iconBackgroundColor;

    if (value > 0) {
        if (nextTarget) {
            const resolvedInProgressColors = resolveGoalColors(inProgressColors);
            const resolvedNextTargetInProgressColors = resolveGoalColors(nextTarget.inProgressColors);
            statusColor = resolvedNextTargetInProgressColors.statusColor ?? resolvedInProgressColors.statusColor ?? defaultInProgressColor;
            onSegmentColor = resolvedNextTargetInProgressColors.onSegmentColor ?? resolvedInProgressColors.onSegmentColor ?? defaultInProgressColor;
            offSegmentColor = resolvedNextTargetInProgressColors.offSegmentColor ?? resolvedInProgressColors.offSegmentColor ?? offSegmentColor;
            iconColor = resolvedNextTargetInProgressColors.iconColor ?? resolvedInProgressColors.iconColor ?? defaultInProgressColor;
            iconBackgroundColor = resolvedNextTargetInProgressColors.iconBackgroundColor ?? resolvedInProgressColors.iconBackgroundColor;
        } else if (maxTargetMet && !nextTarget) {
            const resolvedCompletedColors = resolveGoalColors(completedColors);
            statusColor = resolvedCompletedColors.statusColor ?? defaultCompletedColor;
            onSegmentColor = resolvedCompletedColors.onSegmentColor ?? defaultCompletedColor;
            offSegmentColor = resolvedCompletedColors.offSegmentColor ?? offSegmentColor;
            iconColor = resolvedCompletedColors.iconColor ?? defaultCompletedColor;
            iconBackgroundColor = resolvedCompletedColors.iconBackgroundColor;
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
        return loading
            ? <div className={`mdhui-goal-ratio-loading ${variant}`}>
                <FontAwesomeSvgIcon icon={faArrowsRotate} spin style={{ color: loadingIndicatorColor }} />
            </div>
            : <div className={`mdhui-goal-ratio ${variant}`} style={{ color: statusColor }}>
                {value}<span className={`mdhui-goal-ratio-divider ${variant}`}>/</span>{denominator}
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
                        <div className="mdhui-goal-progress-bar" style={{ width: (value * 100 / props.maxValue) + '%', background: progressBarColor }} />
                    </div>
                    <div className="mdhui-goal-progress-badges">
                        {targetsMinToMax.map((target, index) => {
                            const style = {
                                left: `${(target.targetValue * 100 / props.maxValue)}%`,
                                background: resolveColor(layoutContext.colorScheme, target.color) ?? '#ccc'
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