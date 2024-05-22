import React, { useContext, useState } from 'react'
import './DailyDataGoals.css'
import { useInitializeView } from '../../../helpers/Initialization';
import { ColorDefinition, getDayKey, queryDailyData, resolveColor } from '../../../helpers';
import { DateRangeContext, LayoutContext, LoadingIndicator, ShinyOverlay } from '../../presentational';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { add, startOfDay } from 'date-fns';

export interface DailyDataGoalsProps {
    previewState?: "Default";
    goals: DailyDataGoal[];
    title?: string;
    innerRef?: React.Ref<HTMLDivElement>;
    goalIncompleteColor?: ColorDefinition;
    goalCompleteColor?: ColorDefinition;
    date?: Date;
}

export interface DailyDataGoal {
    type: "allOrNothing" | "percentProgress";
    goal: number;
    dailyDataType: string;
    title: string;
    subtitle?: string;
    messages?: DailyDataGoalMessage[];
}

export interface DailyDataGoalMessage {
    message: string;
    threshold: number;
}

export default function (props: DailyDataGoalsProps) {
    let [dailyData, setDailyData] = useState<{ [key: string]: number } | null>(null);
    let layoutContext = useContext<LayoutContext>(LayoutContext);
    let dateRangeContext = useContext(DateRangeContext);
    let date = props.date ?? dateRangeContext?.intervalStart ?? startOfDay(new Date());

    useInitializeView(() => {
        let startDate = add(date, { days: -1 });
        let endDate = add(date, { days: 2 });

        let promises = props.goals.map(goal => queryDailyData(goal.dailyDataType, startDate, endDate, props.previewState === "Default"));
        Promise.all(promises).then((results) => {
            let data: { [key: string]: number } = {};
            props.goals.forEach((goal, index) => {
                data[goal.dailyDataType] = results[index][getDayKey(date)];
            });
            setDailyData(data);
        });
    }, [], []);

    let goalCompleteColor = props.goalCompleteColor || "var(--mdhui-color-success)";
    let goalIncompleteColor = props.goalIncompleteColor || "var(--mdhui-color-primary)";

    function getGoal(goal: DailyDataGoal, index: number) {
        if (!dailyData) return null;
        let value = dailyData[goal.dailyDataType] == undefined ? 0 : dailyData[goal.dailyDataType];

        let goalProgress = 0;
        if (goal.type === "allOrNothing") {
            goalProgress = value >= goal.goal ? 1 : 0;
        } else {
            goalProgress = value / goal.goal;
            if (goalProgress > 1) goalProgress = 1;
        }

        let formattedProgress = Math.round(goalProgress * 100) + "%";
        let color = goalProgress === 1 ? goalCompleteColor : goalIncompleteColor;


        //sort messages by threshold
        let message: string | undefined = undefined;
        if (goal.messages) {
            let messages = [...goal.messages]?.sort((a, b) => a.threshold - b.threshold);
        }
        let messaage = goal.messages?.find(m => value >= m.threshold);


        return <div key={index} className="mdhui-daily-data-goal">
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
                    {goal.title}
                </div>
                {goal.subtitle &&
                    <div className="mdhui-daily-data-goal-subtitle">
                        {goal.subtitle}
                    </div>
                }
                {/* {goal.message &&
                    <div className="mdhui-daily-data-goal-message" style={{ color: resolveColor(layoutContext.colorScheme, color) }}>
                        {goal.message}
                    </div>
                } */}
            </div>
        </div>
    }

    return (
        <div className="mdhui-daily-data-goals" ref={props.innerRef}>
            {!dailyData && <LoadingIndicator />}
            {props.goals.map((goal, index) => getGoal(goal, index))}
        </div>
    );
}