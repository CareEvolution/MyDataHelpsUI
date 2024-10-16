import React, { CSSProperties, useContext, useState } from 'react';
import './Achievement.css'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faStar } from '@fortawesome/free-solid-svg-icons';
import { ColorDefinition, resolveColor, SingleValueProvider, useInitializeView } from '../../../helpers';
import { LayoutContext } from '../Layout';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { AchievementPreviewState, previewData } from "./Achievement.previewData";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";

export interface AchievementProps {
    previewState?: 'loading' | AchievementPreviewState;
    label: string;
    targetValue: number;
    maxValue: number;
    valueProvider: SingleValueProvider<number>;
    icon?: IconDefinition;
    notStartedColor?: ColorDefinition;
    inProgressColor?: ColorDefinition;
    completedColor?: ColorDefinition;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AchievementProps) {
    const layoutContext = useContext(LayoutContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState<number>();

    const notStartedColor = resolveColor(layoutContext?.colorScheme, props.notStartedColor) ?? 'var(--mdhui-text-color-3)';
    const inProgressColor = resolveColor(layoutContext?.colorScheme, props.inProgressColor) ?? 'var(--mdhui-color-primary)';
    const completedColor = resolveColor(layoutContext?.colorScheme, props.completedColor) ?? 'var(--mdhui-color-success)';

    useInitializeView(() => {
        setLoading(true);
        setValue(undefined);

        if (props.previewState === 'loading') {
            return;
        }

        const valueProvider = props.previewState
            ? previewData(props.previewState, props.targetValue, props.maxValue).valueProvider
            : props.valueProvider;

        valueProvider().then(value => {
            setValue(Math.max(0, Math.min(value ?? 0, props.maxValue)));
            setLoading(false);
        })
    }, [], [props.previewState, props.targetValue, props.maxValue]);

    const getSegmentColor = (index: number) => {
        let segmentColor = notStartedColor;
        if (value !== undefined && index <= value) {
            segmentColor = value >= props.targetValue ? completedColor : inProgressColor;
        }
        return segmentColor;
    };

    let statusColor = notStartedColor;
    if (value !== undefined && value > 0) {
        statusColor = value >= props.targetValue ? completedColor : inProgressColor;
    }

    const data: { value: number, style: CSSProperties }[] = [];
    for (let i = 1; i <= props.maxValue; i++) {
        let segmentColor = getSegmentColor(i);
        data.push({ value: 1, style: { color: segmentColor, fill: segmentColor } });
    }

    return <div className="mdhui-achievement" ref={props.innerRef}>
        <div className="mdhui-achievement-chart">
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
                        {data.map((entry, index) => <Cell key={index} style={entry.style} />)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="mdhui-achievement-chart-icon-wrapper">
                {<FontAwesomeIcon icon={props.icon ?? faStar} className="mdhui-achievement-chart-icon-default" style={{ color: statusColor, fill: statusColor }} />}
            </div>
        </div>
        <div className="mdhui-achievement-info">
            {loading &&
                <div className="mdhui-achievement-ratio-loading" style={{ color: statusColor, fill: statusColor }}>
                    <FontAwesomeSvgIcon icon={faArrowsRotate} spin />
                </div>
            }
            {!loading &&
                <div className="mdhui-achievement-ratio" style={{ color: statusColor, fill: statusColor }}>{value + '/' + props.maxValue}</div>
            }
            <div className="mdhui-achievement-name">{props.label}</div>
        </div>
    </div>;
}