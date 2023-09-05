import React from 'react';
import './NewPoints.css';
import AnimatedRing from '../../presentational/AnimatedRing';
import Button from "../../presentational/Button";
import MyDataHelps from "@careevolution/mydatahelps-js";

export interface NewPointsEntry {
    name: string;
    points: number;
    bonusPoints?: number;
    message?: { title: string, text: string };
}

export interface NewPointsProps {
    entries: NewPointsEntry[];
    pointsToNextReward?: number;
    doneButtonText?: string;
}

export default function (props: NewPointsProps) {

    let totalBonusPoints = props.entries.reduce((sum, entry) => {
        return sum + (entry.bonusPoints || 0);
    }, 0);

    let totalPoints = props.entries.reduce((sum, entry) => {
        return sum + entry.points;
    }, totalBonusPoints);

    return (
        <div className="mdhui-new-points">
            <AnimatedRing>
                <div className="mdhui-new-points-total">
                    <div className="mdhui-new-points-total-points">+{totalPoints}</div>
                    <div className="mdhui-new-points-total-points-label">points</div>
                </div>
            </AnimatedRing>
            <div className="mdhui-new-points-content">
                {props.entries.length == 1 && props.entries[0].message && totalBonusPoints === 0 &&
                <div>
                    <div className="mdhui-new-points-title">{props.entries[0].message.title}</div>
                    <div className="mdhui-new-points-text">{props.entries[0].message.text}</div>
                </div>
                }
                {(props.entries.length > 1 || !props.entries[0].message || totalBonusPoints > 0) &&
                <div>
                    <div className="mdhui-new-points-title">Well Done!</div>
                    <div className="mdhui-new-points-text">You've been awarded points for the following:</div>
                    <div className="mdhui-new-points-entries">
                        {props.entries.map((entry) =>
                            <div className="mdhui-new-points-entry">
                                <div className="mdhui-new-points-entry-name">{entry.name}</div>
                                <div className="mdhui-new-points-entry-points">+{entry.points}</div>
                            </div>
                        )}
                        {totalBonusPoints > 0 &&
                        <div className="mdhui-new-points-entry">
                            <div className="mdhui-new-points-entry-name bonus">Bonus</div>
                            <div className="mdhui-new-points-entry-points bonus">+{totalBonusPoints}</div>
                        </div>
                        }
                    </div>
                </div>
                }
                {props.pointsToNextReward &&
                <div className="mdhui-new-points-next-reward">You now need <span className="mdhui-new-points-next-reward-points">{props.pointsToNextReward}</span> points to unlock your next reward.</div>
                }
            </div>
            <div className="mdhui-new-points-button-panel">
                <Button className="" onClick={() => MyDataHelps.dismiss()}>{props.doneButtonText || 'DONE'}</Button>
            </div>
        </div>
    );
}