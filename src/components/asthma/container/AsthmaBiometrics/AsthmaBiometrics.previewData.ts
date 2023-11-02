import { AsthmaBiometric } from '../../model';

export type AsthmaBiometricsPreviewState = 'default';

export interface AsthmaBiometricsPreviewData {
    biometrics: AsthmaBiometric[];
}

export const previewData: Record<AsthmaBiometricsPreviewState, AsthmaBiometricsPreviewData> = {
    'default': {
        biometrics: [
            {
                type: 'daytime-resting-heart-rate',
                status: 'in-range',
                value: 64
            },
            {
                type: 'nighttime-resting-heart-rate',
                status: 'offline',
                value: 60
            },
            {
                type: 'respiratory-rate',
                status: 'in-range',
                value: 20
            },
            {
                type: 'activity',
                status: 'out-of-range',
                value: 12909
            },
            {
                type: 'sleep',
                status: 'establishing',
                value: 4
            }
        ]
    }
};
