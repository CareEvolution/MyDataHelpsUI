import React, { CSSProperties, useContext } from 'react';
import './CalendarDay.css';
import { LayoutContext } from '../Layout';
import { ColorDefinition, resolveColor } from '../../../helpers';
import { add, isAfter, isSameDay } from 'date-fns';
import UnstyledButton from '../UnstyledButton';

export interface CalendarDayState {
    label?: string;
    backgroundColor?: ColorDefinition;
    borderColor?: ColorDefinition;
    textColor?: ColorDefinition;
    /**
     * @deprecated - This property has been deprecated and will be removed in a future release.
     *
     * Please specify a streakIdentifier to enable streaking.  The identifier is used to determine
     * when a matching state has been computed for the prior and/or following days which causes a
     * streak to be rendered.
     */
    streak?: boolean;
    streakIdentifier?: string;
    streakColor?: ColorDefinition;
    combineWhenSolo?: boolean;
    style?: CSSProperties;
}

export type CalendarDayStateConfiguration = Partial<Record<string, CalendarDayState>>;

export interface CalendarDayProps {
    year: number;
    month: number;
    day?: number;
    /**
     * @deprecated - This property has been deprecated and will be removed in a future release.
     *
     * Please use computeStatesForDay instead.
     */
    stateConfiguration?: CalendarDayStateConfiguration;
    /**
     * @deprecated - This property has been deprecated and will be removed in a future release.
     *
     * Please use computeStatesForDay instead.
     */
    computeStateForDay?: (date: Date) => string | undefined;
    computeStatesForDay?: (date: Date) => CalendarDayState[];
    onClick?: (date: Date) => void;
    multiStateStartAngle?: number;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function CalendarDay(props: CalendarDayProps) {
    const layoutContext = useContext(LayoutContext);

    if (!props.day) {
        return <div ref={props.innerRef} />;
    }

    const getLastDayOfMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const canStreakLeft = (date: Date): boolean => {
        let isFirstDayOfMonth = date.getDate() === 1;
        let isFirstDayOfWeek = date.getDay() === 0;
        return !isFirstDayOfMonth && !isFirstDayOfWeek;
    };

    const canStreakRight = (date: Date): boolean => {
        let isLastDayOfMonth = date.getDate() === getLastDayOfMonth(date);
        let isLastDayOfWeek = date.getDay() === 6;
        return !isLastDayOfMonth && !isLastDayOfWeek;
    };

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        if (props.stateConfiguration && props.computeStateForDay) {
            const stateKey = props.computeStateForDay(date);
            if (stateKey === undefined) return [];

            const state = props.stateConfiguration[stateKey];
            return state ? [{
                ...(state.streak ? { streakIdentifier: stateKey } as Partial<CalendarDayState> : undefined),
                ...state
            }] : [];
        }
        return props.computeStatesForDay?.(date) ?? [];
    };

    const date = new Date(props.year, props.month, props.day);

    const previousDayStates = computeStatesForDay(add(date, { days: -1 }));
    const currentDayStates = computeStatesForDay(date);
    const nextDayStates = computeStatesForDay(add(date, { days: 1 }));

    const dayClasses: string[] = ['mdhui-calendar-day'];
    const dayStyle: CSSProperties = {};

    if (isSameDay(date, new Date())) {
        dayClasses.push('mdhui-calendar-day-today');
    } else if (isAfter(date, new Date())) {
        dayClasses.push('mdhui-calendar-day-future');
    }

    const currentDayStreakIdentifiers = currentDayStates.map(state => state.streakIdentifier).filter(si => si !== undefined) as string[];
    const previousDayStreakIdentifiers = previousDayStates.map(state => state.streakIdentifier).filter(si => si !== undefined) as string[];
    const nextDayStreakIdentifiers = nextDayStates.map(state => state.streakIdentifier).filter(si => si !== undefined) as string[];

    const leftStreakColors = currentDayStates.reduce((colors, state) => {
        if (state.streakIdentifier && previousDayStreakIdentifiers.includes(state.streakIdentifier)) {
            colors.push(state.streakColor);
        }
        return colors;
    }, [] as (ColorDefinition | undefined)[]);

    const rightStreakColors = currentDayStates.reduce((colors, state) => {
        if (state.streakIdentifier && nextDayStreakIdentifiers.includes(state.streakIdentifier)) {
            colors.push(state.streakColor);
        }
        return colors;
    }, [] as (ColorDefinition | undefined)[]);

    const createStreakGradient = (colorsToCombine: (ColorDefinition | undefined)[], position: 'left' | 'right'): string => {
        const resolvedColorsToCombine = colorsToCombine.map(colorDefinition => {
            return resolveColor(layoutContext.colorScheme, colorDefinition) ?? '#ddd';
        });

        const chunkPercent = 100 / resolvedColorsToCombine.length;
        let background = 'linear-gradient(to bottom, ';
        let currentPercent = 0;
        for (let i = 0; i < resolvedColorsToCombine.length; i++) {
            background = background + resolvedColorsToCombine[i] + ' ' + currentPercent + '%, ';
            currentPercent += chunkPercent;
            background = background + resolvedColorsToCombine[i] + ' ' + currentPercent + '%';
            if (i != resolvedColorsToCombine.length - 1) {
                background += ', ';
            }
        }
        background += `) ${position === 'left' ? 'calc(0% - 1px)' : 'calc(100% + 1px)'} / 50% 100% no-repeat`;

        return background;
    };

    if (currentDayStreakIdentifiers.length > 0) {
        if (leftStreakColors.length > 0 && rightStreakColors.length > 0 && canStreakLeft(date) && canStreakRight(date)) {
            dayStyle.background = createStreakGradient(leftStreakColors, 'left') + ', ' + createStreakGradient(rightStreakColors, 'right');
        } else if (leftStreakColors.length > 0 && canStreakLeft(date)) {
            dayStyle.background = createStreakGradient(leftStreakColors, 'left');
        } else if (rightStreakColors.length > 0 && canStreakRight(date)) {
            dayStyle.background = createStreakGradient(rightStreakColors, 'right');
        }
    }

    const createConicGradient = (colorsToCombine: (ColorDefinition | undefined)[]): string => {
        const resolvedColorsToCombine = colorsToCombine.map(colorDefinition => {
            return resolveColor(layoutContext.colorScheme, colorDefinition) ?? 'transparent';
        });

        const chunkPercent = 100 / resolvedColorsToCombine.length;
        let background = `conic-gradient(from ${props.multiStateStartAngle ?? 270}deg at 50% 50%,`;
        let currentPercent = 0;
        for (let i = 0; i < resolvedColorsToCombine.length; i++) {
            background = background + resolvedColorsToCombine[i] + ' ' + currentPercent + '%, ';
            currentPercent += chunkPercent;
            background = background + resolvedColorsToCombine[i] + ' ' + currentPercent + '%';
            if (i != resolvedColorsToCombine.length - 1) {
                background += ', ';
            }
        }
        background += ')';

        return background;
    };

    const createCombinedStateIfNecessary = (states: CalendarDayState[]): CalendarDayState | undefined => {
        if (states.length === 0) return undefined;
        if (states.length === 1 && !states[0].combineWhenSolo) return states[0];

        const backgroundColors = states.map(state => state.backgroundColor ?? 'var(--mdhui-border-color-2)');

        const backgroundColor = createConicGradient(backgroundColors);
        const borderColor = createConicGradient(states.map((state, index) => state.borderColor ?? backgroundColors[index]));
        const textBackgroundColor = resolveColor(layoutContext.colorScheme, { lightMode: '#eee', darkMode: '#444' })?.replace('#', '%23');
        const textBorderColor = resolveColor(layoutContext.colorScheme, { lightMode: '#888', darkMode: '#333' })?.replace('#', '%23');

        return {
            ...states[0],
            borderColor: 'transparent',
            textColor: 'var(--mdhui-text-color-1)',
            style: {
                ...states[0].style,
                background:
                    `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="32" fill="${textBackgroundColor}"/></svg>') center / 100% 100% no-repeat content-box content-box, ` +
                    `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="34" fill="${textBorderColor}"/></svg>') center / 100% 100% no-repeat content-box content-box, ` +
                    backgroundColor + ' center / 100% 100% no-repeat padding-box padding-box, ' +
                    borderColor + ' center / 100% 100% no-repeat border-box border-box'
            }
        };
    };

    const currentDayState = createCombinedStateIfNecessary(currentDayStates);

    const dayValueStyle: CSSProperties | undefined = currentDayState ? {
        ...(currentDayState.backgroundColor && {
            background: resolveColor(layoutContext.colorScheme, currentDayState.backgroundColor)
        }),
        ...(currentDayState.borderColor && {
            border: `2px solid ${resolveColor(layoutContext.colorScheme, currentDayState.borderColor)}`,
            marginTop: '-12px'
        }),
        ...(currentDayState.textColor && {
            color: resolveColor(layoutContext.colorScheme, currentDayState.textColor)
        }),
        ...currentDayState.style
    } : undefined;

    return <div ref={props.innerRef} className={dayClasses.join(' ')} style={dayStyle}>
        {props.onClick &&
            <UnstyledButton onClick={() => props.onClick!(date)}>
                <div className="mdhui-calendar-day-value" style={dayValueStyle}>{date.getDate()}</div>
            </UnstyledButton>
        }
        {!props.onClick &&
            <div className="mdhui-calendar-day-value" style={dayValueStyle}>{date.getDate()}</div>
        }
    </div>;
}