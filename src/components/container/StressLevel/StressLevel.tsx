import React, { useContext, useState } from 'react';
import './StressLevel.css';
import { deleteStressLevel, getStressLevel, language, saveStressLevel, useInitializeView } from '../../../helpers';
import { DateRangeContext, DiscreteScale, LoadingIndicator } from '../../presentational';
import { startOfToday } from 'date-fns';

export type StressLevelPreviewState = 'loading' | 'no data' | 'with data';

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
            setStressLevel(props.previewState === 'with data' ? Math.floor(Math.random() * 7) : undefined);
            setLoading(false);
            return;
        }

        getStressLevel(selectedDate).then(stressLevel => {
            setStressLevel(stressLevel);
            setLoading(false);
        });

    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    const onStressLevelChange = (stressLevel: number | undefined) => {
        setStressLevel(stressLevel);
        if (props.previewState) return;

        if (stressLevel) {
            saveStressLevel(selectedDate, stressLevel);
        } else {
            deleteStressLevel(selectedDate);
        }
    };

    return <div className="mdhui-stress-level" ref={props.innerRef}>
        <div className="mdhui-stress-level-title">{language('stress-level-title')}</div>
        {loading && <LoadingIndicator />}
        {!loading && <DiscreteScale
            tickCount={7}
            minLabel={language('stress-level-min-label')}
            maxLabel={language('stress-level-max-label')}
            value={stressLevel}
            onChange={stressLevel => onStressLevelChange(stressLevel)}
            sliderColor="#d36540"
        />}
    </div>;
}