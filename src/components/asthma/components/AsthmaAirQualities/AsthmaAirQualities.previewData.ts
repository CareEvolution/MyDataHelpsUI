import { AsthmaAirQuality } from '../../model';

export type AsthmaAirQualitiesPreviewState = 'neither configured' | 'one configured' | 'no data (control)' | 'no data (date)' | 'some data (control)' | 'some data (date)' | 'all data';

export interface AsthmaAirQualitiesPreviewData {
    homeAirQuality: AsthmaAirQuality;
    workAirQuality: AsthmaAirQuality;
}

export const previewData: Record<AsthmaAirQualitiesPreviewState, AsthmaAirQualitiesPreviewData> = {
    'neither configured': {
        homeAirQuality: {
            type: 'home',
            status: 'not-configured'
        },
        workAirQuality: {
            type: 'work',
            status: 'not-configured'
        }
    },
    'one configured': {
        homeAirQuality: {
            type: 'home',
            status: 'not-configured'
        },
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'no data (control)': {
        homeAirQuality: {
            type: 'home',
            status: 'establishing'
        },
        workAirQuality: {
            type: 'work',
            status: 'establishing'
        }
    },
    'no data (date)': {
        homeAirQuality: {
            type: 'home',
            status: 'not-found'
        },
        workAirQuality: {
            type: 'work',
            status: 'not-found'
        }
    },
    'some data (control)': {
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
    'some data (date)': {
        homeAirQuality: {
            type: 'home',
            status: 'in-range',
            value: 32
        },
        workAirQuality: {
            type: 'work',
            status: 'not-found'
        }
    },
    'all data': {
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
