import React, { ReactElement, useState } from 'react';
import { BloodPressureDataPoint, useInitializeView } from '../../../helpers';
import { BloodPressureClassification, BloodPressureReading } from '../../presentational';
import combinedBloodPressureDataProvider from '../../../helpers/blood-pressure-data-providers/combined-blood-pressure-data-provider';
import { compareDesc } from 'date-fns';
import { createPreviewDataProvider } from './LastBloodPressureReading.previewData';

export interface LatestBloodPressureReadingProps {
    previewState: BloodPressureClassification
    onClick?: () => void;
    indicator?: ReactElement;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function LatestBloodPressureReading(props: LatestBloodPressureReadingProps) {
    const [reading, setReading] = useState<BloodPressureDataPoint>();

    useInitializeView(() => {
        const dataProvider = props.previewState
            ? createPreviewDataProvider(props.previewState)
            : () => combinedBloodPressureDataProvider(undefined, ['AppleHealth', 'GoogleFit', 'Omron', 'HealthConnect']);

        dataProvider().then(readings => {
            if (readings.length > 0) {
                setReading(readings.sort((a, b) => compareDesc(a.date, b.date))[0]);
            }
        });
    }, [], [props.previewState]);

    if (!reading) {
        return null;
    }

    return <div className="mdhui-latest-blood-pressure-reading" ref={props.innerRef}>
        <BloodPressureReading
            {...reading}
            onClick={props.onClick}
            indicator={props.indicator}
        />
    </div>;
}