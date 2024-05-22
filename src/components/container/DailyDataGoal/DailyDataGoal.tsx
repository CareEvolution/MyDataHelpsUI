import React, { useContext, useState } from 'react'
import './DailyDataGoal.css'
import { useInitializeView } from '../../../helpers/Initialization';
import { ColorDefinition, getDayKey, queryDailyData, resolveColor } from '../../../helpers';
import { DateRangeContext, LayoutContext, LoadingIndicator, ShinyOverlay } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { add, startOfDay } from 'date-fns';

export interface DailyDataGoalProps {
    previewState?: "Default";
    goal: number;
    dailyDataType: string;
    title: string;
    subtitle?: string;
    date?: Date;
    goalIncompleteColor?: ColorDefinition;
    goalCompleteColor?: ColorDefinition;
    messages?: DailyDataGoalMessage[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface DailyDataGoalMessage {
    message: string;
    threshold: number;
}

export default function (props: DailyDataGoalProps) {
    let [dailyValue, setDailyValue] = useState<number | null>(null);
    let layoutContext = useContext<LayoutContext>(LayoutContext);
    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    useInitializeView(() => {
        let startDate = add(date, { days: -1 });
        let endDate = add(date, { days: 2 });

        queryDailyData(props.dailyDataType, startDate, endDate, props.previewState === "Default").then((results) => {
            setDailyValue(results[getDayKey(date)]);
        });
    }, [], []);

    let goalCompleteColor = props.goalCompleteColor || "var(--mdhui-color-success)";
    let goalIncompleteColor = props.goalIncompleteColor || "var(--mdhui-color-primary)";

    if (dailyValue == null) return null;

    let goalProgress = dailyValue / props.goal;
    if (goalProgress > 1) goalProgress = 1;

    let formattedProgress = Math.round(goalProgress * 100) + "%";
    let color = goalProgress === 1 ? goalCompleteColor : goalIncompleteColor;

    let message: string | undefined = undefined;
    if (props.messages) {
        let messages = [...props.messages]?.sort((a, b) => b.threshold - a.threshold);
        message = messages?.find(m => dailyValue! >= m.threshold)?.message;
    }

    return <div className="mdhui-daily-data-goal" ref={props.innerRef}>
        <div className="mdhui-daily-data-goal-circle">
            <div className="mdhui-daily-data-goal-circle-fill" style={{ height: formattedProgress, backgroundColor: resolveColor(layoutContext.colorScheme, color) }}>
            </div>
            {goalProgress === 1 &&
                <FontAwesomeSvgIcon icon={faCheck} />
            }
            {goalProgress !== 1 && goalProgress !== 0 &&
                <div className="mdhui-daily-data-goal-progress">{formattedProgress}</div>
            }
            {goalProgress === 0 &&
                <FontAwesomeSvgIcon icon={faClose} />
            }
            <ShinyOverlay />
        </div>
        <div className="mdhui-daily-data-goal-info">
            <div className="mdhui-daily-data-goal-title">
                {props.title}
            </div>
            {props.subtitle &&
                <div className="mdhui-daily-data-goal-subtitle">
                    {props.subtitle}
                </div>
            }
            {message &&
                <div className="mdhui-daily-data-goal-message" style={{ color: resolveColor(layoutContext.colorScheme, color) }}>
                    {message}
                </div>
            }
        </div>
    </div>

}