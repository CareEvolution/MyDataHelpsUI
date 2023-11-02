import { AsthmaBiometricsPreviewState } from '../../container/AsthmaBiometrics';
import { AsthmaAirQualitiesPreviewState } from '../../container/AsthmaAirQualities';

export type AsthmaDataViewPreviewState = 'default';

export interface AsthmaDataViewPreviewData {
    biometricsPreviewState: AsthmaBiometricsPreviewState;
    airQualitiesPreviewState: AsthmaAirQualitiesPreviewState;
}

export const previewData: Record<AsthmaDataViewPreviewState, AsthmaDataViewPreviewData> = {
    'default': {
        biometricsPreviewState: 'default',
        airQualitiesPreviewState: 'default'
    }
};