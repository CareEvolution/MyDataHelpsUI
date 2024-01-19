import { AsthmaAirQuality } from '../../model';

export type AsthmaAirQualitiesPreviewState = 'not configured' | 'some configured' | 'no data' | 'some data' | 'all data';

export interface AsthmaAirQualitiesPreviewData {
    homeAirQualityZipCode?: string;
    homeAirQuality: AsthmaAirQuality;
    workAirQualityZipCode?: string;
    workAirQuality: AsthmaAirQuality;
}

export const previewData: Record<AsthmaAirQualitiesPreviewState, AsthmaAirQualitiesPreviewData> = {
    'not configured': {
        homeAirQuality: {
            type: 'home',
            status: 'establishing'
        },
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'some configured': {
        homeAirQuality: {
            type: 'home',
            status: 'establishing'
        },
        workAirQualityZipCode: '12345',
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'no data': {
        homeAirQualityZipCode: '12345',
        homeAirQuality: {
            type: 'home',
            status: 'establishing'
        },
        workAirQualityZipCode: '12345',
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'some data': {
        homeAirQualityZipCode: '12345',
        homeAirQuality: {
            type: 'home',
            status: 'in-range',
            value: 32
        },
        workAirQualityZipCode: '12345',
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'all data': {
        homeAirQualityZipCode: '12345',
        homeAirQuality: {
            type: 'home',
            status: 'in-range',
            value: 32
        },
        workAirQualityZipCode: '12345',
        workAirQuality: {
            type: 'work',
            status: 'out-of-range',
            value: 130,
            description: 'Unhealthy'
        }
    }
};
