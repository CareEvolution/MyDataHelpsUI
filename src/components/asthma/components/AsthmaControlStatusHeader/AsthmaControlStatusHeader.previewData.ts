import { AsthmaAirQuality, AsthmaBiometric, AsthmaControlState } from '../../model';

export type AsthmaControlStatusHeaderPreviewState = 'no-data' | 'abnormal-dhr' | 'abnormal-nhr' | 'abnormal-rr' | 'abnormal-activity' | 'abnormal-sleep' |
    'abnormal-home-aqi' | 'abnormal-work-aqi' | 'abnormal-multiple' | 'not-determined' | 'not-controlled' | 'controlled';

export interface AsthmaControlStatusHeaderPreviewData {
    controlState: AsthmaControlState;
    biometrics: AsthmaBiometric[];
    airQualities: AsthmaAirQuality[];
}

export const previewData: Record<AsthmaControlStatusHeaderPreviewState, AsthmaControlStatusHeaderPreviewData> = {
    'no-data': {
        controlState: {status: 'no-data'},
        biometrics: [],
        airQualities: []
    },
    'abnormal-dhr': {
        controlState: {status: 'no-data'},
        biometrics: [{type: 'daytime-resting-heart-rate', status: 'out-of-range'}],
        airQualities: []
    },
    'abnormal-nhr': {
        controlState: {status: 'no-data'},
        biometrics: [{type: 'nighttime-resting-heart-rate', status: 'out-of-range'}],
        airQualities: []
    },
    'abnormal-rr': {
        controlState: {status: 'no-data'},
        biometrics: [{type: 'respiratory-rate', status: 'out-of-range'}],
        airQualities: []
    },
    'abnormal-activity': {
        controlState: {status: 'no-data'},
        biometrics: [{type: 'activity', status: 'out-of-range'}],
        airQualities: []
    },
    'abnormal-sleep': {
        controlState: {status: 'no-data'},
        biometrics: [{type: 'sleep', status: 'out-of-range'}],
        airQualities: []
    },
    'abnormal-home-aqi': {
        controlState: {status: 'no-data'},
        biometrics: [],
        airQualities: [{type: 'home', status: 'out-of-range', description: 'Unhealthy'}]
    },
    'abnormal-work-aqi': {
        controlState: {status: 'no-data'},
        biometrics: [],
        airQualities: [{type: 'work', status: 'out-of-range', description: 'Unhealthy'}]
    },
    'abnormal-multiple': {
        controlState: {status: 'no-data'},
        biometrics: [{type: 'activity', status: 'out-of-range'}],
        airQualities: [{type: 'work', status: 'out-of-range', description: 'Unhealthy'}]
    },
    'not-determined': {
        controlState: {status: 'not-determined'},
        biometrics: [],
        airQualities: []
    },
    'not-controlled': {
        controlState: {
            status: 'not-controlled',
            symptomDaysPast7: 1,
            nighttimeAwakeningDaysPast7: 1,
            limitedActivityDaysPast7: 1,
            inhalerUseDaysPast7: 1
        },
        biometrics: [],
        airQualities: []
    },
    'controlled': {
        controlState: {status: 'controlled'},
        biometrics: [],
        airQualities: []
    }
};