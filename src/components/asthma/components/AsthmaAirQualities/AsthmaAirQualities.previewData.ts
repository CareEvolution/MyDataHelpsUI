import { AsthmaAirQuality } from '../../model';

export type AsthmaAirQualitiesPreviewState = 'no-data' | 'some-data' | 'all-data';

export interface AsthmaAirQualitiesPreviewData {
    homeAirQuality: AsthmaAirQuality;
    workAirQuality: AsthmaAirQuality;
}

export const previewData: Record<AsthmaAirQualitiesPreviewState, AsthmaAirQualitiesPreviewData> = {
    'no-data': {
        homeAirQuality: {
            type: 'home',
            status: 'establishing'
        },
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'some-data': {
        homeAirQuality: {
            type: 'home',
            status: 'in-range',
            value: 32
        },
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'all-data': {
        homeAirQuality: {
            type: 'home',
            status: 'in-range',
            value: 32
        },
        workAirQuality: {
            type: 'work',
            status: 'out-of-range',
            value: 130,
            description: 'Unhealthy'
        }
    }
};
