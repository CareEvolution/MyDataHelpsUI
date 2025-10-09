import { DeviceDataPoint } from '@careevolution/mydatahelps-js';

export function isSilverCloudCbtDataPoint(dataPoint: DeviceDataPoint): boolean {
    return dataPoint.source?.properties?.['SourceIdentifier'] === 'com.silvercloudhealth.SilverCloud'
        && dataPoint.properties?.['Metadata_sub-type'] === 'CBT';
}