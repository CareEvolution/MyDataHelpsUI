import { ParticipantInfo } from '@careevolution/mydatahelps-js';

export class AsthmaParticipant {
    participantInfo: ParticipantInfo;

    constructor(participantInfo: ParticipantInfo) {
        this.participantInfo = participantInfo;
    }

    getFirstName(): string {
        return this.participantInfo.demographics.firstName;
    }

    hasPairedDevice(): boolean {
        return this.getCustomFieldValue('WatchPaired') === 'Yes' || this.getCustomFieldValue('BedditPaired') === 'Yes';
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

    hasRequestedWithdrawal(): boolean {
        return this.getCustomFieldValue('WithdrawalRequested') === 'Yes';
    }

    private hasEstablishedBaselineByType(baselineType: string): boolean {
        return this.getCustomFieldValue(baselineType).trim().length > 0;
    }

    private getCustomFieldValue(name: string): string {
        let customFields = this.participantInfo.customFields;
        return customFields.hasOwnProperty(name) ? customFields[name] ?? '' : '';
    }
}

export interface AsthmaControlMetrics {
    date: string;
    nighttimeAwakeningDaysPast7: number;
    limitedActivityDaysPast7: number;
    inhalerUseDaysPast7: number;
    symptomDaysPast7: number;
    loggedDaysPast7: number;
}

export type AsthmaControlStatus = 'no-data' | 'not-controlled' | 'controlled' | 'not-determined';

export interface AsthmaControlState {
    status: AsthmaControlStatus;
    symptomDaysPast7?: number;
    nighttimeAwakeningDaysPast7?: number;
    limitedActivityDaysPast7?: number;
    inhalerUseDaysPast7?: number;
}

export type AsthmaDataStatus = 'not-configured' | 'not-found' | 'establishing' | 'offline' | 'in-range' | 'out-of-range';

export type AsthmaBiometricType = 'daytime-resting-heart-rate' | 'nighttime-resting-heart-rate' | 'respiratory-rate' | 'steps' | 'sleep-disturbances' | 'daytime-blood-oxygen-level' | 'nighttime-blood-oxygen-level';

export interface AsthmaBiometric {
    type: AsthmaBiometricType;
    status: AsthmaDataStatus;
    value?: number;
}

export type AsthmaAirQualityType = 'work' | 'home';

export interface AsthmaAirQuality {
    type: AsthmaAirQualityType;
    status: AsthmaDataStatus;
    value?: number;
    description?: string;
}

export type AsthmaSymptomLevel = 'none' | 'mild' | 'moderate' | 'severe';

export interface AsthmaLogEntry {
    identifier: string;
    symptomLevel: AsthmaSymptomLevel;
    symptoms: string[];
    impacts: string[];
    triggers: string[];
}