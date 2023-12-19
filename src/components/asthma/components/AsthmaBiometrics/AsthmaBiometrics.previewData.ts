import { AsthmaBiometric } from '../../model';

export type AsthmaBiometricsPreviewState = 'no-data' | 'some-data' | 'all-data';

export interface AsthmaBiometricsPreviewData {
    daytimeRestingHeartRate: AsthmaBiometric;
    nighttimeRestingHeartRate: AsthmaBiometric;
    respiratoryRate: AsthmaBiometric;
    activity: AsthmaBiometric;
    sleep: AsthmaBiometric;
    daytimeBloodOxygenLevel: AsthmaBiometric;
    nighttimeBloodOxygenLevel: AsthmaBiometric;
}

export const previewData: Record<AsthmaBiometricsPreviewState, AsthmaBiometricsPreviewData> = {
    'no-data': {
        daytimeRestingHeartRate: {
            type: 'daytime-resting-heart-rate',
            status: 'establishing'
        },
        nighttimeRestingHeartRate: {
            type: 'nighttime-resting-heart-rate',
            status: 'establishing'
        },
        respiratoryRate: {
            type: 'respiratory-rate',
            status: 'establishing'
        },
        activity: {
            type: 'activity',
            status: 'establishing'
        },
        sleep: {
            type: 'sleep',
            status: 'establishing'
        },
        daytimeBloodOxygenLevel: {
            type: 'daytime-blood-oxygen-level',
            status: 'establishing'
        },
        nighttimeBloodOxygenLevel: {
            type: 'nighttime-blood-oxygen-level',
            status: 'establishing'
        }
    },
    'some-data': {
        daytimeRestingHeartRate: {
            type: 'daytime-resting-heart-rate',
            status: 'in-range',
            value: 64
        },
        nighttimeRestingHeartRate: {
            type: 'nighttime-resting-heart-rate',
            status: 'offline',
            value: 60
        },
        respiratoryRate: {
            type: 'respiratory-rate',
            status: 'establishing'
        },
        activity: {
            type: 'activity',
            status: 'out-of-range',
            value: 12909
        },
        sleep: {
            type: 'sleep',
            status: 'establishing'
        },
        daytimeBloodOxygenLevel: {
            type: 'daytime-blood-oxygen-level',
            status: 'establishing'
        },
        nighttimeBloodOxygenLevel: {
            type: 'nighttime-blood-oxygen-level',
            status: 'in-range',
            value: 96
        }
    },
    'all-data': {
        daytimeRestingHeartRate: {
            type: 'daytime-resting-heart-rate',
            status: 'in-range',
            value: 64
        },
        nighttimeRestingHeartRate: {
            type: 'nighttime-resting-heart-rate',
            status: 'offline',
            value: 60
        },
        respiratoryRate: {
            type: 'respiratory-rate',
            status: 'in-range',
            value: 20
        },
        activity: {
            type: 'activity',
            status: 'out-of-range',
            value: 12909
        },
        sleep: {
            type: 'sleep',
            status: 'establishing',
            value: 4
        },
        daytimeBloodOxygenLevel: {
            type: 'daytime-blood-oxygen-level',
            status: 'in-range',
            value: 95
        },
        nighttimeBloodOxygenLevel: {
            type: 'nighttime-blood-oxygen-level',
            status: 'in-range',
            value: 96
        }
    }
};
