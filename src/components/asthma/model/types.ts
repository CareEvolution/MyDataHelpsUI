export type AsthmaControlStatus = 'no-data' | 'not-controlled' | 'controlled' | 'not-determined';

export interface AsthmaControlState {
    status: AsthmaControlStatus;
    symptomDaysPast7?: number;
    nighttimeAwakeningDaysPast7?: number;
    limitedActivityDaysPast7?: number;
    inhalerUseDaysPast7?: number;
}

export type AsthmaSymptomLevel = 'none' | 'mild' | 'moderate' | 'severe';

export interface AsthmaLogEntry {
    identifier: string;
    symptomLevel: AsthmaSymptomLevel;
    symptoms: string[];
    impacts: string[];
    triggers: string[];
}