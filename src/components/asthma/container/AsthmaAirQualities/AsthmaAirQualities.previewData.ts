import { AsthmaAirQuality } from '../../model';

export type AsthmaAirQualitiesPreviewState = 'default';

export interface AsthmaAirQualitiesPreviewData {
    airQualities: AsthmaAirQuality[];
}

export const previewData: Record<AsthmaAirQualitiesPreviewState, AsthmaAirQualitiesPreviewData> = {
    'default': {
        airQualities: [
            {
                type: 'home',
                status: 'in-range',
                value: 32
            },
            {
                type: 'work',
                status: 'out-of-range',
                value: 130,
                description: 'Unhealthy'
            }
        ]
    }
};
