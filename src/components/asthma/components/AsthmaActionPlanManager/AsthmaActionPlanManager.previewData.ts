import { AsthmaParticipant } from '../../model';
import { AsthmaDataService } from '../../helpers/asthma-data';
import { DeviceInfo } from '@careevolution/mydatahelps-js';
import { noop } from '../../../../helpers/functions';

export type AsthmaActionPlanManagerPreviewState = 'loading' | 'loading (caregiver mode)' | 'loaded without action plan' | 'loaded without action plan (caregiver mode)' | 'loaded with action plan' | 'loaded with action plan (caregiver mode)';

export const previewData = {
    createDataService: (previewState: AsthmaActionPlanManagerPreviewState): AsthmaDataService => {
        return {
            loadDeviceInfo: () => Promise.resolve({} as DeviceInfo),
            loadParticipant: () => Promise.resolve({
                getActionPlanTaskRunUUID: () => previewState.includes('loading') || previewState.includes('loaded with action plan') ? 'SomeTaskRunUUID' : undefined,
                getParticipantMode: () => previewState.includes('(caregiver mode)') ? 'Caregiver' : 'Self',
                getCareRecipientName: () => previewState.includes('(caregiver mode)') ? 'Leroy' : undefined
            } as AsthmaParticipant),
            loadAsthmaActionPlan: () => previewState.includes('loading') ? new Promise(() => noop) : Promise.resolve({
                url: 'https://asthma.careevolutionapps.dev/images/sample_aap.png'
            })
        } as AsthmaDataService;
    }
};
