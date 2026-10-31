import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import './Goal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faStar } from '@fortawesome/free-solid-svg-icons';
import { ColorDefinition, resolveColor, SingleValueProvider, useInitializeView } from '../../../helpers';
import { LayoutContext } from '../../presentational';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { createPreviewValueProvider, GoalPreviewState } from './Goal.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { findLast } from 'lodash';
import GoalRing, { getRingAnimationDuration, prefersReducedMotion } from './GoalRing';
import GoalCelebration, { chooseCelebrationStyle, GoalCelebrationStyle } from './GoalCelebration';

export interface GoalColorConfiguration {
    statusColor?: ColorDefinition;
    onSegmentColor?: ColorDefinition;
    offSegmentColor?: ColorDefinition;
    iconColor?: ColorDefinition;
    iconBackgroundColor?: ColorDefinition;
}

/**
 * This function lets us distinguish between ColorDefinition values and newer GoalColorConfiguration values, since some properties can be set to either.
 *
 * A key differentiator is whether the lightMode or darkMode properties are present. An empty object ({}) could technically be either one, but we assume
 * it is a GoalColorConfiguration and return true since it functions just fine as a GoalColorConfiguration.
 */
export function isGoalColorConfiguration(obj: ColorDefinition | GoalColorConfiguration | undefined): obj is GoalColorConfiguration {
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
    animateNewSegments?: boolean;
    celebration?: GoalCelebrationStyle | 'random';
    icon?: IconDefinition;
    iconUrl?: string;
    notStartedColor?: ColorDefinition | GoalColorConfiguration;
    inProgressColor?: ColorDefinition | GoalColorConfiguration;
    completedColor?: ColorDefinition | GoalColorConfiguration;
    loadingIndicatorColor?: ColorDefinition;
    progressBarColor?: ColorDefinition;
    progressBarBackgroundColor?: ColorDefinition;
    style?: CSSProperties;
    innerRef?: React.Ref<HTMLDivElement>;
}

function getIconMaskUrl(icon: IconDefinition): string {
    const [width, height, , , pathData] = icon.icon;
    const paths = (Array.isArray(pathData) ? pathData : [pathData]).map(path => `<path d="${path}"/>`).join('');
    return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${paths}</svg>`)}")`;
}

interface Celebration {
    style: GoalCelebrationStyle;
    reducedMotion: boolean;
    playing: boolean;
}

export default function Goal(props: GoalProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState<number>(0);
    const hasLoaded = useRef(false);
    const [celebration, setCelebration] = useState<Celebration>();
    const lastLoaded = useRef<{ completed: boolean, filledSegmentCount: number }>();
    const celebrationTimer = useRef<number>();

    useInitializeView(() => {
        // Keeping the shown value through a refresh lets the ring animate only the segments that changed.
        const keepShownValue = props.animateNewSegments && hasLoaded.current && props.previewState !== 'loading';
        if (!keepShownValue) {
            setLoading(true);
            setValue(0);
        }

        if (props.previewState === 'loading') {
            return;
        }

        const valueProvider = props.previewState
            ? createPreviewValueProvider(props.previewState, props.targetValue, props.maxValue)
            : props.valueProvider;

        valueProvider.getValue().then(value => {
            setValue(Math.max(0, Math.min(value ?? 0, props.maxValue)));
            setLoading(false);
            hasLoaded.current = true;
        });
    }, [], [props.previewState, props.targetValue, props.maxValue, props.valueProvider]);

    const defaultColor = 'var(--mdhui-text-color-3)';
    const defaultInProgressColor = 'var(--mdhui-color-primary-text)';
    const defaultCompletedColor = 'var(--mdhui-color-success-text)';
    // The ring segments are data ink; the status text and icon beside them are foreground.
    const defaultInProgressSegmentColor = 'var(--mdhui-color-primary-mark)';
    const defaultCompletedSegmentColor = 'var(--mdhui-color-success-mark)';

    // These next few blocks of code are for backward compatibility.  When necessary, they map individual ColorDefinitions onto
    // the new GoalColorConfiguration model in a way that retains backward compatible coloring behavior.
    const notStartedColors: GoalColorConfiguration = isGoalColorConfiguration(props.notStartedColor) ? props.notStartedColor : {
        statusColor: props.notStartedColor,
        onSegmentColor: props.notStartedColor,
        offSegmentColor: props.notStartedColor,
        iconColor: props.notStartedColor
    };

    const inProgressColors: GoalColorConfiguration = isGoalColorConfiguration(props.inProgressColor) ? props.inProgressColor : {
        statusColor: props.inProgressColor,
        onSegmentColor: props.inProgressColor,
        iconColor: props.inProgressColor
    };

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
    const completed = value > 0 && !!maxTargetMet && !nextTarget;

    const denominator = targetsMinToMax.length <= 1 ? props.maxValue : nextTarget?.targetValue ?? props.maxValue;

    let scaledNumerator = value;
    let scaledDenominator = denominator;
    if (props.maxSegments && scaledDenominator > props.maxSegments) {
        let scale = scaledDenominator / props.maxSegments;
        scaledDenominator /= scale;
        scaledNumerator = scaledNumerator === 0 ? 0 : Math.max(Math.floor(scaledNumerator / scale), 1);
    }

    const loadingIndicatorColor = resolveColor(layoutContext.colorScheme, props.loadingIndicatorColor) ?? defaultColor;

    // GoalColorConfiguration objects consist of zero or more potentially unresolved ColorDefinition properties. In order
    // to use those colors, they each need to be resolved using the current color scheme.  This helper function takes a
    // GoalColorConfiguration object, loops through all of its properties, resolves each color, and creates a return object
    // that has the same keys as the input, but with the respective resolved colors set for each.
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
            onSegmentColor = resolvedNextTargetInProgressColors.onSegmentColor ?? resolvedInProgressColors.onSegmentColor ?? defaultInProgressSegmentColor;
            offSegmentColor = resolvedNextTargetInProgressColors.offSegmentColor ?? resolvedInProgressColors.offSegmentColor ?? offSegmentColor;
            iconColor = resolvedNextTargetInProgressColors.iconColor ?? resolvedInProgressColors.iconColor ?? defaultInProgressColor;
            iconBackgroundColor = resolvedNextTargetInProgressColors.iconBackgroundColor ?? resolvedInProgressColors.iconBackgroundColor;
        } else if (completed) {
            const resolvedCompletedColors = resolveGoalColors(completedColors);
            statusColor = resolvedCompletedColors.statusColor ?? defaultCompletedColor;
            onSegmentColor = resolvedCompletedColors.onSegmentColor ?? defaultCompletedSegmentColor;
            offSegmentColor = resolvedCompletedColors.offSegmentColor ?? offSegmentColor;
            iconColor = resolvedCompletedColors.iconColor ?? defaultCompletedColor;
            iconBackgroundColor = resolvedCompletedColors.iconBackgroundColor;
        }
    }

    const segmentCount = Math.max(0, Math.floor(scaledDenominator));
    const filledSegmentCount = Math.min(segmentCount, Math.max(0, Math.floor(scaledNumerator)));

    useEffect(() => () => clearTimeout(celebrationTimer.current), []);

    useEffect(() => {
        if (loading) return;
        const previous = lastLoaded.current;
        lastLoaded.current = { completed, filledSegmentCount };
        if (!props.celebration || !previous || previous.completed || !completed) return;

        const reducedMotion = prefersReducedMotion();
        const ringDuration = reducedMotion && props.animateNewSegments
            ? 0
            : getRingAnimationDuration(filledSegmentCount - previous.filledSegmentCount, props.animateNewSegments);
        setCelebration({ style: chooseCelebrationStyle(props.celebration), reducedMotion, playing: false });
        clearTimeout(celebrationTimer.current);
        celebrationTimer.current = window.setTimeout(() => {
            setCelebration(current => current && { ...current, playing: true });
            if (reducedMotion) {
                celebrationTimer.current = window.setTimeout(() => setCelebration(undefined), 500);
            }
        }, ringDuration);
    }, [loading, completed, filledSegmentCount]);

    const waitingToCelebrate = !!celebration && !celebration.playing;
    const showsEarned = completed && !waitingToCelebrate;
    const playsMotion = !!celebration?.playing && !celebration.reducedMotion;

    const createShine = (variant?: 'compact') => {
        const maskImage = props.iconUrl ? `url(${JSON.stringify(props.iconUrl)})` : getIconMaskUrl(props.icon ?? faStar);
        const className = props.iconUrl ? 'mdhui-goal-chart-icon-shine' : `mdhui-goal-chart-icon-shine icon ${variant}`;
        return <div className={className} style={{ WebkitMaskImage: maskImage, maskImage }} />;
    };

    const createChart = (variant?: 'compact') => {
        return <div className={`mdhui-goal-chart ${variant}`}>
            {playsMotion && <GoalCelebration style={celebration!.style} colors={[onSegmentColor]} onDone={() => setCelebration(undefined)} />}
            <GoalRing
                segmentCount={segmentCount} filledCount={filledSegmentCount}
                filledColor={onSegmentColor} unfilledColor={offSegmentColor}
                innerRadius={variant === 'compact' ? 22 : 30} outerRadius={variant === 'compact' ? 28 : 40}
                animate={!loading && (scaledNumerator > 0 || !!props.animateNewSegments)}
                animateNewSegments={props.animateNewSegments}
            />
            <div className={`mdhui-goal-chart-icon-wrapper${playsMotion ? ' stamp' : ''}`} style={{ background: iconBackgroundColor }}>
                {props.iconUrl
                    ? <img src={props.iconUrl} alt="" className={`mdhui-goal-chart-icon-image${showsEarned ? '' : ' unearned'}${celebration?.playing && celebration.reducedMotion ? ' reveal' : ''}`} />
                    : <FontAwesomeIcon icon={props.icon ?? faStar} className={`mdhui-goal-chart-icon ${variant}`} style={{ color: iconColor }} />
                }
                {playsMotion && createShine(variant)}
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

        return <div className="mdhui-goal verbose" style={props.style} ref={props.innerRef}>
            <div>
                {createChart('compact')}
                {createRatioDisplay('compact')}
            </div>
            <div className="mdhui-goal-info verbose">
                <div className="mdhui-goal-name verbose">{props.label}</div>
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
        return <div className="mdhui-goal compact" style={props.style} ref={props.innerRef}>
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