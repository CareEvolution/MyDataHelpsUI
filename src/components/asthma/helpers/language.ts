import { language } from '../../../helpers';
import { AsthmaParticipant } from '../model';

export function caregiverVariableLanguage(participant: AsthmaParticipant, key: string) {
    if (participant.getParticipantMode() === 'Caregiver') {
        let careRecipientName = participant.getCareRecipientName();
        if (careRecipientName) {
            return language(key + '-caregiver', undefined, { name: careRecipientName });
        }
    }
    return language(key);
}