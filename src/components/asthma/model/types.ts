import { Guid, ParticipantInfo } from '@careevolution/mydatahelps-js';

export class AsthmaParticipant {
    participantInfo: ParticipantInfo;

    constructor(participantInfo: ParticipantInfo) {
        this.participantInfo = participantInfo;
    }

    getId(): Guid {
        return this.participantInfo.participantID;
    }

    getFirstName(): string {
        return this.participantInfo.demographics.firstName;
    }

    hasPairedDevice(): boolean {
        return this.getCustomFieldValue('DevicePaired') === 'Yes';
    }

    hasEstablishedBaseline(): boolean {
        return this.hasEstablishedBaselineByType("DaytimeRestingHeartRateBaseline") ||
            this.hasEstablishedBaselineByType("NighttimeRestingHeartRateBaseline") ||
            this.hasEstablishedBaselineByType("RespiratoryRateBaseline") ||
            this.hasEstablishedBaselineByType("StepsBaseline") ||
            this.hasEstablishedBaselineByType("SleepDisturbancesBaseline") ||
            this.hasEstablishedBaselineByType("DaytimeBloodOxygenLevelBaseline") ||
            this.hasEstablishedBaselineByType("NighttimeBloodOxygenLevelBaseline");
    }

    getHomeAirQualityZipCode(): string {
        return this.getCustomFieldValue('HomePostalCode');
    }

    getWorkAirQualityZipCode(): string {
        return this.getCustomFieldValue('WorkPostalCode');
    }

    getActionPlanTaskRunUUID(): string {
        return this.getCustomFieldValue('AAPTaskRunUUID');
    }

    getAlertTakeover(): string | undefined {
        return this.getCustomFieldValue('AlertTakeover');
    }

    getDaytimeRestingHeartRateBaseline(): number | undefined {
        return this.getBaseline('DaytimeRestingHeartRateBaseline');
    }

    getNighttimeRestingHeartRateBaseline(): number | undefined {
        return this.getBaseline('NighttimeRestingHeartRateBaseline');
    }

    getRespiratoryRateBaseline(): number | undefined {
        return this.getBaseline('RespiratoryRateBaseline');
    }

    getStepsBaseline(): number | undefined {
        return this.getBaseline('StepsBaseline');
    }

    getSleepDisturbancesBaseline(): number | undefined {
        return this.getBaseline('SleepDisturbancesBaseline');
    }

    getDaytimeBloodOxygenLevelBaseline(): number | undefined {
        return this.getBaseline('DaytimeBloodOxygenLevelBaseline');
    }

    getNighttimeBloodOxygenLevelBaseline(): number | undefined {
        return this.getBaseline('NighttimeBloodOxygenLevelBaseline');
    }

    private hasEstablishedBaselineByType(baselineType: string): boolean {
        return this.getCustomFieldValue(baselineType).trim().length > 0;
    }

    private getBaseline(baselineType: string): number | undefined {
        let baselineString = this.getCustomFieldValue(baselineType);
        if (baselineString && baselineString.trim().length > 0) {
            return Number(baselineString.trim());
        }
        return undefined;
    }

    private getCustomFieldValue(name: string): string {
        let customFields = this.participantInfo.customFields;
        return customFields.hasOwnProperty(name) ? customFields[name] ?? '' : '';
    }
}

export type AsthmaControlStatus = 'no-data' | 'not-controlled' | 'controlled' | 'not-determined';

export interface AsthmaControlState {
    status: AsthmaControlStatus;
    symptomDaysPast7?: number;
    nighttimeAwakeningDaysPast7?: number;
    limitedActivityDaysPast7?: number;
    inhalerUseDaysPast7?: number;
}

export type AsthmaDataStatus = 'not-configured' | 'not-found' | 'not-determined' | 'establishing' | 'offline' | 'in-range' | 'out-of-range';

export type AsthmaBiometricType = 'daytime-resting-heart-rate' | 'nighttime-resting-heart-rate' | 'respiratory-rate' | 'steps' | 'sleep-disturbances' | 'daytime-blood-oxygen-level' | 'nighttime-blood-oxygen-level';

export interface AsthmaBiometric {
    type: AsthmaBiometricType;
    status: AsthmaDataStatus;
    value?: number;
}

export type AsthmaAirQualityType = 'work' | 'home';

export type AsthmaAirQualityDescription = 'unhealthy' | 'very unhealthy' | 'hazardous';

export interface AsthmaAirQuality {
    type: AsthmaAirQualityType;
    status: AsthmaDataStatus;
    value?: number;
    description?: AsthmaAirQualityDescription;
}

export type AsthmaSymptomLevel = 'none' | 'mild' | 'moderate' | 'severe';
export type AsthmaSymptom = 'Difficulty breathing' | 'Wheezing' | 'Coughing' | 'Chest tightness or pressure';
export type AsthmaImpact = 'Wake up at night' | 'Limit your daily activity' | 'Use your rescue inhaler';
export type AsthmaTrigger = 'Cold/viral illness' | 'Animal exposure' | 'Seasonal allergens/pollen' | 'Smoke (tobacco or wood burning)' |
    'Extreme weather changes' | 'Air pollution' | 'Strong smells' | 'Chemicals/cleaning supplies' | 'Dust' | 'Mold' | 'Dust mites' | 'Rodents' |
    'Cockroaches' | 'Taken a NSAID (non-steroidal anti-inflammatory drugs including aspirin and ibuprofen)' | 'Taken a beta blocker' | 'Had heartburn' |
    'Drank red wine' | 'Tried any new foods' | 'Cooked without a fan or open window' | 'Had a pet sleep in your bed' | 'Burned incense or a candle';

export interface AsthmaLogEntry {
    identifier: string;
    symptomLevel: AsthmaSymptomLevel;
    symptoms: AsthmaSymptom[];
    impacts: AsthmaImpact[];
    triggers: AsthmaTrigger[];
}

export interface AsthmaActionPlan {
    id: string;
    url: string;
}