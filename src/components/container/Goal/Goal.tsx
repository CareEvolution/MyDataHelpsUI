import React, { useContext, useState } from 'react';
import './Goal.css';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faStar } from '@fortawesome/free-solid-svg-icons';
import { ColorDefinition, resolveColor, SingleValueProvider, useInitializeView } from '../../../helpers';
import { LayoutContext } from '../../presentational';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { createPreviewValueProvider, GoalPreviewState } from './Goal.previewData';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface GoalProps {
    previewState?: 'loading' | GoalPreviewState;
    label: string;
    targetValue: number;
    maxValue: number;
    maxSegments?: number;
    valueProvider: SingleValueProvider<number>;
    icon?: IconDefinition;
    notStartedColor?: ColorDefinition;
    inProgressColor?: ColorDefinition;
    completedColor?: ColorDefinition;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function Goal(props: GoalProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState<number>();

    const notStartedColor = resolveColor(layoutContext.colorScheme, props.notStartedColor) ?? 'var(--mdhui-text-color-3)';
    const inProgressColor = resolveColor(layoutContext.colorScheme, props.inProgressColor) ?? 'var(--mdhui-color-primary)';
    const completedColor = resolveColor(layoutContext.colorScheme, props.completedColor) ?? 'var(--mdhui-color-success)';

    useInitializeView(() => {
        setLoading(true);
        setValue(undefined);

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

    let scaledNumerator = value ?? 0;
    let scaledDenominator = props.maxValue;
    if (props.maxSegments && scaledDenominator > props.maxSegments) {
        let scale = scaledDenominator / props.maxSegments;
        scaledDenominator /= scale;
        scaledNumerator = scaledNumerator === 0 ? 0 : Math.max(Math.floor(scaledNumerator / scale), 1);
    }

    const getSegmentColor = (index: number) => {
        let segmentColor = notStartedColor;
        if (index <= scaledNumerator) {
            segmentColor = scaledNumerator >= props.targetValue ? completedColor : inProgressColor;
        }
        return segmentColor;
    };

    let statusColor = notStartedColor;
    if (value !== undefined && value > 0) {
        statusColor = value >= props.targetValue ? completedColor : inProgressColor;
    }

    const data: { value: number, color: string }[] = [];
    for (let i = 1; i <= scaledDenominator; i++) {
        data.push({ value: 1, color: getSegmentColor(i) });
    }

    return <div className="mdhui-goal" ref={props.innerRef}>
        <div className="mdhui-goal-chart">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data} dataKey="value"
                        cx="50%" cy="50%"
                        innerRadius={28} outerRadius={40}
                        startAngle={90} endAngle={450} paddingAngle={5}
                        isAnimationActive={false}
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => <Cell key={index} style={{ fill: entry.color }} />)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="mdhui-goal-chart-icon-wrapper">
                {<FontAwesomeIcon icon={props.icon ?? faStar} className="mdhui-goal-chart-icon" style={{ color: statusColor }} />}
            </div>
        </div>
        <div className="mdhui-goal-info">
            {loading &&
                <div className="mdhui-goal-ratio-loading">
                    <FontAwesomeSvgIcon icon={faArrowsRotate} spin style={{ color: notStartedColor }} />
                </div>
            }
            {!loading &&
                <div className="mdhui-goal-ratio" style={{ color: statusColor }}>{value + '/' + props.maxValue}</div>
            }
            <div className="mdhui-goal-name">{props.label}</div>
        </div>
    </div>;
}