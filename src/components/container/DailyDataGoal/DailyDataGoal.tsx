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
    defaultMargin?: boolean;
}

export interface DailyDataGoalMessage {
    message: string;
    threshold: number;
}

export default function (props: DailyDataGoalProps) {
    const [dailyValue, setDailyValue] = useState<number | null>(null);
    const layoutContext = useContext<LayoutContext>(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);
    const date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    useInitializeView(() => {
        const startDate = add(date, { days: -1 });
        const endDate = add(date, { days: 2 });

        queryDailyData(props.dailyDataType, startDate, endDate, props.previewState === "Default").then((results) => {
            setDailyValue(results[getDayKey(date)] || 0);
        });
    }, ["externalAccountSyncComplete"], []);

    const goalCompleteColor = props.goalCompleteColor || "var(--mdhui-color-success)";
    const goalIncompleteColor = props.goalIncompleteColor || "var(--mdhui-color-primary)";

    let goalProgress: number | null = dailyValue == null ? null : dailyValue / props.goal;
    if (goalProgress != null && goalProgress > 1) goalProgress = 1;

    const formattedProgress = goalProgress == null ? "0%" : Math.round(goalProgress * 100) + "%";
    const color = goalProgress === 1 ? goalCompleteColor : goalIncompleteColor;

    let message: string | undefined = undefined;
    if (props.messages && dailyValue != null) {
        const messages = [...props.messages]?.sort((a, b) => b.threshold - a.threshold);
        message = messages?.find(m => dailyValue! >= m.threshold)?.message;
    }

    const classes = ["mdhui-daily-data-goal"];
    if (props.defaultMargin) {
        classes.push("mdhui-daily-data-goal-default-margin");
    }

    return <div className={classes.join(" ")} ref={props.innerRef}>
        <div className="mdhui-daily-data-goal-circle">
            <div className="mdhui-daily-data-goal-circle-fill" style={{ height: formattedProgress, backgroundColor: resolveColor(layoutContext.colorScheme, color) }}>
            </div>
            {goalProgress === 1 &&
                <FontAwesomeSvgIcon icon={faCheck} />
            }
            {goalProgress !== 1 && goalProgress !== 0 && goalProgress != null &&
                <div className="mdhui-daily-data-goal-progress">{formattedProgress}</div>
            }
            {goalProgress === 0 &&
                <FontAwesomeSvgIcon icon={faClose} />
            }
            {goalProgress === null &&
                <LoadingIndicator />
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
            <div className="mdhui-daily-data-goal-message" style={{ color: resolveColor(layoutContext.colorScheme, color) }}>
                {message}
                {goalProgress == null && props.messages && <>&nbsp;</>}
            </div>
        </div>
    </div>

}