import React, { useContext, useState } from 'react';
import './StressLevel.css';
import { getStressLevel, useInitializeView } from '../../../helpers';
import { DateRangeContext, DiscreteScale, LoadingIndicator } from '../../presentational';
import { startOfToday } from 'date-fns';

export type StressLevelPreviewState = 'loading' | 'loaded';

export interface StressLevelProps {
    previewState?: StressLevelPreviewState;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: StressLevelProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const selectedDate = dateRangeContext?.intervalStart ?? startOfToday();

    const [loading, setLoading] = useState<boolean>(true);
    const [stressLevel, setStressLevel] = useState<number>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            setStressLevel(Math.floor(Math.random() * 7));
            setLoading(false);
            return;
        }

        getStressLevel(selectedDate).then(stressLevel => {
            setStressLevel(stressLevel);
            setLoading(false);
        });

    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    return <div className="mdhui-stress-level" ref={props.innerRef}>
        <div className="mdhui-stress-level-title">OVERALL STRESS</div>
        {loading && <LoadingIndicator />}
        {!loading && <DiscreteScale
            tickCount={7}
            minLabel="No Stress"
            maxLabel="Extremely Stressed"
            value={stressLevel}
            onChange={setStressLevel}
            sliderColor="#d36540"
        />}
    </div>;
}