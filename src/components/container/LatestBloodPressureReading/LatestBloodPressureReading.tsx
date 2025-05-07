import React, { ReactElement, useState } from 'react';
import { BloodPressureDataPoint, BloodPressureDeviceDataSource, useInitializeView } from '../../../helpers';
import { BloodPressureClassification, BloodPressureReading } from '../../presentational';
import combinedBloodPressureDataProvider from '../../../helpers/blood-pressure-data-providers/combined-blood-pressure-data-provider';
import { getCombinedDataCollectionSettings } from '../../../helpers/daily-data-providers/combined-data-collection-settings';
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
        const dataProvider = props.previewState ? createPreviewDataProvider(props.previewState) : async (): Promise<BloodPressureDataPoint[]> => {
            const dataSources: BloodPressureDeviceDataSource[] = [];

            const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);
            if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(dt => dt.namespace === 'AppleHealth' && dt.type === 'BloodPressureSystolic')) {
                dataSources.push('AppleHealth');
            }
            if (settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(dt => dt.namespace === 'GoogleFit' && dt.type === 'blood_pressure_systolic')) {
                dataSources.push('GoogleFit');
            }
            if (settings.healthConnectEnabled && deviceDataV2Types.some(dt => dt.namespace === 'HealthConnect' && dt.type === 'blood-pressure-systolic')) {
                dataSources.push('HealthConnect');
            }
            if (settings.omronEnabled) {
                dataSources.push('Omron');
            }

            return combinedBloodPressureDataProvider(undefined, dataSources);
        };

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