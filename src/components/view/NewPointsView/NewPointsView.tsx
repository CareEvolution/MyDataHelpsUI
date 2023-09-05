import React from 'react'
import { Layout } from '../../..'
import AnimatedRing from '../../presentational/AnimatedRing/AnimatedRing';
import Button from '../../presentational/Button/Button';
import MyDataHelps, { PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import './NewPointsView.css';
import language from "../../../helpers/language"

export interface NewPointsEntry {
    name: string;
    points: number;
    bonusPoints?: number;
    message?: { title: string, text: string };
}

export interface NewPointsViewProps {
    entries: NewPointsEntry[];
    pointsToNextReward?: number;
    colorScheme?: 'auto' | 'light' | 'dark';
    primaryColor?: string;
    doneButtonText?: string;
}

export default function (props: NewPointsViewProps) {

    let totalBonusPoints = props.entries.reduce((sum, entry) => {
        return sum + (entry.bonusPoints || 0);
    }, 0);

    let totalPoints = props.entries.reduce((sum, entry) => {
        return sum + entry.points;
    }, totalBonusPoints);

    return (
        <Layout bodyBackgroundColor={props.colorScheme === 'dark' ? '' : '#fff'} colorScheme={props.colorScheme ?? 'auto'} primaryColor={props.primaryColor}>
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
                        <div className="mdhui-new-points-title">{language('new-points-title')}</div>
                        <div className="mdhui-new-points-text">{language('new-points-text')}</div>
                        <div className="mdhui-new-points-entries">
                            {props.entries.map((entry, index) =>
                                <div key={index} className="mdhui-new-points-entry">
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
                    <div className="mdhui-new-points-next-reward">{language('new-points-next-reward-prefix')}<span className="mdhui-new-points-next-reward-points">{props.pointsToNextReward}</span>{language('new-points-next-reward-suffix')}</div>
                    }
                </div>
                <div className="mdhui-new-points-button-panel">
                    <Button onClick={() => MyDataHelps.dismiss()}>{props.doneButtonText ?? language('new-points-done-button-text')}</Button>
                </div>
            </div>
        </Layout>
    )
}

export function showNewPoints(props: NewPointsViewProps, url?: string): void {
    let newPointsDataPoint: PersistableDeviceDataPoint = {
        type: 'MDHUI-NewPoints',
        value: JSON.stringify(props)
    };
    MyDataHelps.persistDeviceData([newPointsDataPoint]).then(() => {
        MyDataHelps.openApplication(url || 'https://viewlibrary.careevolutionapps.com/newpoints', {modal: true});
    });
}