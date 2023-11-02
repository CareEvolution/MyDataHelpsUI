import { add, formatISO } from 'date-fns';
import { AsthmaControlState, AsthmaControlStatus, AsthmaDataStatus, AsthmaImpact, AsthmaLogEntry, AsthmaSymptom, AsthmaSymptomLevel, AsthmaTrigger } from '../model';
import language from '../../../helpers/language';
import { ColorDefinition } from '../../../helpers/colors';

export const dateToAsthmaLogEntryIdentifier = (date: Date): string => {
    return formatISO(date, {representation: 'date'});
};

const computePast7Dates = (date: Date): Date[] => {
    let dates: Date[] = [];
    for (let x = 0; x < 7; x++) {
        dates.push(add(new Date(date), {days: -x}))
    }
    return dates;
};

const filterLogEntries = (logEntries: AsthmaLogEntry[], dates: Date[]) => {
    let identifiers = dates.map(dateToAsthmaLogEntryIdentifier);
    return logEntries.filter(e => identifiers.includes(e.identifier));
};

export const computeAsthmaControlState = (logEntries: AsthmaLogEntry[], date: Date): AsthmaControlState => {
    let logEntry = logEntries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(date));

    if (logEntry) {
        let past7Dates = computePast7Dates(date);
        let past7LogEntries = filterLogEntries(logEntries, past7Dates);

        let symptomDaysPast7 = past7LogEntries.reduce((sum, entry) => {
            return sum + (entry.symptomLevel !== 'none' ? 1 : 0);
        }, 0);

        let nighttimeAwakeningDaysPast7 = past7LogEntries.reduce((sum, entry) => {
            return sum + (entry.impacts.includes('Wake up at night') ? 1 : 0);
        }, 0);

        let limitedActivityDaysPast7 = past7LogEntries.reduce((sum, entry) => {
            return sum + (entry.impacts.includes('Limit your daily activity') ? 1 : 0);
        }, 0);

        let inhalerUseDaysPast7 = past7LogEntries.reduce((sum, entry) => {
            return sum + (entry.impacts.includes('Use your rescue inhaler') ? 1 : 0);
        }, 0);

        let loggedDaysPast7 = past7LogEntries.length;

        let status: AsthmaControlStatus;
        if (nighttimeAwakeningDaysPast7 > 0 ||
            limitedActivityDaysPast7 > 0 ||
            inhalerUseDaysPast7 >= 3 ||
            symptomDaysPast7 >= 3) {
            status = 'not-controlled';
        } else if (loggedDaysPast7 >= 1 &&
            nighttimeAwakeningDaysPast7 == 0 &&
            limitedActivityDaysPast7 == 0 &&
            inhalerUseDaysPast7 == 0 &&
            symptomDaysPast7 == 0) {
            status = 'controlled';
        } else if (loggedDaysPast7 >= 3 && loggedDaysPast7 - symptomDaysPast7 >= 2) {
            status = 'controlled';
        } else {
            status = 'not-determined';
        }

        return {
            status: status,
            symptomDaysPast7: symptomDaysPast7,
            nighttimeAwakeningDaysPast7: nighttimeAwakeningDaysPast7,
            limitedActivityDaysPast7: limitedActivityDaysPast7,
            inhalerUseDaysPast7: inhalerUseDaysPast7
        };
    }

    return {status: 'no-data'};
};

export const getAsthmaDataStatusText = (status: AsthmaDataStatus): string => {
    if (status === 'out-of-range') return language('asthma-data-status-out-of-range');
    if (status === 'in-range') return language('asthma-data-status-in-range');
    if (status === 'offline') return language('asthma-data-status-offline');
    if (status === 'establishing') return language('asthma-data-status-establishing');
    if (status === 'not-determined') return language('asthma-data-status-not-determined');
    if (status === 'not-found') return language('asthma-data-status-not-found');
    if (status === 'not-configured') return language('asthma-data-status-not-configured');
    return '';
};

export const getAsthmaDataStatusColor = (status: AsthmaDataStatus): ColorDefinition => {
    if (status === 'out-of-range') return '#9D5BED';
    if (status === 'in-range') return '#188A83';
    if (status === 'offline') return 'var(--mdhui-color-warning)';
    return 'var(--mdhui-text-color-3)';
};

export const getAsthmaSymptomLevelText = (symptomLevel: AsthmaSymptomLevel): string => {
    if (symptomLevel === 'mild') return language('asthma-symptom-level-mild');
    if (symptomLevel === 'moderate') return language('asthma-symptom-level-moderate');
    if (symptomLevel === 'severe') return language('asthma-symptom-level-severe');
    return language('asthma-symptom-level-none');
};

export const getAsthmaSymptomLevel = (symptomLevelText: string): AsthmaSymptomLevel => {
    if (symptomLevelText === language('asthma-symptom-level-mild')) return 'mild';
    if (symptomLevelText === language('asthma-symptom-level-moderate')) return 'moderate';
    if (symptomLevelText === language('asthma-symptom-level-severe')) return 'severe';
    return 'none';
};

export const getAsthmaSymptomTexts = (symptoms: AsthmaSymptom[] | undefined): string[] => {
    return symptoms ? symptoms.map((symptom) => {
        if (symptom === 'Difficulty breathing') return language('asthma-symptom-difficulty-breathing');
        if (symptom === 'Wheezing') return language('asthma-symptom-wheezing');
        if (symptom === 'Coughing') return language('asthma-symptom-coughing');
        if (symptom === 'Chest tightness or pressure') return language('asthma-symptom-chest-tightness');
        return symptom;
    }) : [];
}

export const getAsthmaSymptoms = (symptomTexts: string[]): AsthmaSymptom[] => {
    return symptomTexts.map((symptomText) => {
        if (symptomText === language('asthma-symptom-difficulty-breathing')) return 'Difficulty breathing';
        if (symptomText === language('asthma-symptom-wheezing')) return 'Wheezing';
        if (symptomText === language('asthma-symptom-coughing')) return 'Coughing';
        if (symptomText === language('asthma-symptom-chest-tightness')) return 'Chest tightness or pressure';
        return symptomText as AsthmaSymptom;
    });
};

export const getAsthmaImpactTexts = (impacts: AsthmaImpact[] | undefined): string[] => {
    return impacts ? impacts.map((impact) => {
        if (impact === 'Wake up at night') return language('asthma-impact-waking-at-night');
        if (impact === 'Limit your daily activity') return language('asthma-impact-limit-daily-activity');
        if (impact === 'Use your rescue inhaler') return language('asthma-impact-using-rescue-inhaler');
        return impact;
    }) : [];
}

export const getAsthmaImpacts = (impactTexts: string[]): AsthmaImpact[] => {
    return impactTexts.map((impactText) => {
        if (impactText === language('asthma-impact-waking-at-night')) return 'Wake up at night';
        if (impactText === language('asthma-impact-limit-daily-activity')) return 'Limit your daily activity';
        if (impactText === language('asthma-impact-using-rescue-inhaler')) return 'Use your rescue inhaler';
        return impactText as AsthmaImpact;
    });
};

export const getAsthmaTriggerTexts = (triggers: AsthmaTrigger[] | undefined): string[] => {
    return triggers ? triggers.map((trigger) => {
        if (trigger === 'Cold/viral illness') return language('asthma-trigger-cold-illness');
        if (trigger === 'Animal exposure') return language('asthma-trigger-animal-exposure');
        if (trigger === 'Seasonal allergens/pollen') return language('asthma-trigger-seasonal-allergens');
        if (trigger === 'Smoke (tobacco or wood burning)') return language('asthma-trigger-smoke');
        if (trigger === 'Extreme weather changes') return language('asthma-trigger-weather-changes');
        if (trigger === 'Air pollution') return language('asthma-trigger-air-pollution');
        if (trigger === 'Strong smells') return language('asthma-trigger-strong-smells');
        if (trigger === 'Chemicals/cleaning supplies') return language('asthma-trigger-chemicals');
        if (trigger === 'Dust') return language('asthma-trigger-dust');
        if (trigger === 'Mold') return language('asthma-trigger-mold');
        if (trigger === 'Dust mites') return language('asthma-trigger-dust-mites');
        if (trigger === 'Rodents') return language('asthma-trigger-rodents');
        if (trigger === 'Cockroaches') return language('asthma-trigger-cockroaches');
        if (trigger === 'Taken a NSAID (non-steroidal anti-inflammatory drugs including aspirin and ibuprofen)') return language('asthma-trigger-nsaid');
        if (trigger === 'Taken a beta blocker') return language('asthma-trigger-beta-blocker');
        if (trigger === 'Had heartburn') return language('asthma-trigger-heartburn');
        if (trigger === 'Drank red wine') return language('asthma-trigger-red-wine');
        if (trigger === 'Tried any new foods') return language('asthma-trigger-new-foods');
        if (trigger === 'Cooked without a fan or open window') return language('asthma-trigger-cooked-without-ventilation');
        if (trigger === 'Had a pet sleep in your bed') return language('asthma-trigger-pet-in-bed');
        if (trigger === 'Burned incense or a candle') return language('asthma-trigger-incense-or-candle');
        return trigger;
    }) : [];
}

export const getAsthmaTriggers = (triggerTexts: string[]): AsthmaTrigger[] => {
    return triggerTexts.map((triggerText) => {
        if (triggerText === language('asthma-trigger-cold-illness')) return 'Cold/viral illness';
        if (triggerText === language('asthma-trigger-animal-exposure')) return 'Animal exposure';
        if (triggerText === language('asthma-trigger-seasonal-allergens')) return 'Seasonal allergens/pollen';
        if (triggerText === language('asthma-trigger-smoke')) return 'Smoke (tobacco or wood burning)';
        if (triggerText === language('asthma-trigger-weather-changes')) return 'Extreme weather changes';
        if (triggerText === language('asthma-trigger-air-pollution')) return 'Air pollution';
        if (triggerText === language('asthma-trigger-strong-smells')) return 'Strong smells';
        if (triggerText === language('asthma-trigger-chemicals')) return 'Chemicals/cleaning supplies';
        if (triggerText === language('asthma-trigger-dust')) return 'Dust';
        if (triggerText === language('asthma-trigger-mold')) return 'Mold';
        if (triggerText === language('asthma-trigger-dust-mites')) return 'Dust mites';
        if (triggerText === language('asthma-trigger-rodents')) return 'Rodents';
        if (triggerText === language('asthma-trigger-cockroaches')) return 'Cockroaches';
        if (triggerText === language('asthma-trigger-nsaid')) return 'Taken a NSAID (non-steroidal anti-inflammatory drugs including aspirin and ibuprofen)';
        if (triggerText === language('asthma-trigger-beta-blocker')) return 'Taken a beta blocker';
        if (triggerText === language('asthma-trigger-heartburn')) return 'Had heartburn';
        if (triggerText === language('asthma-trigger-red-wine')) return 'Drank red wine';
        if (triggerText === language('asthma-trigger-new-foods')) return 'Tried any new foods';
        if (triggerText === language('asthma-trigger-cooked-without-ventilation')) return 'Cooked without a fan or open window';
        if (triggerText === language('asthma-trigger-pet-in-bed')) return 'Had a pet sleep in your bed';
        if (triggerText === language('asthma-trigger-incense-or-candle')) return 'Burned incense or a candle';
        return triggerText as AsthmaTrigger;
    });
};

export const isDaytimeRestingHeartRateWithinRange = (baseline: number, rawValue: number) => rawValue <= (baseline * 1.2);

export const isNighttimeRestingHeartRateWithinRange = (baseline: number, rawValue: number) => rawValue <= (baseline * 1.15);

export const isRespiratoryRateWithinRange = (baseline: number, rawValue: number) => rawValue <= (baseline * 1.15);

export const isStepsWithinRange = (baseline: number, rawValue: number) => rawValue >= (baseline / 2.0);

export const isSleepDisturbancesWithinRange = (baseline: number, rawValue: number) => rawValue <= (baseline + 3.5);

export const isBloodOxygenLevelWithinRange = (baseline: number, rawValue: number) => {
    let percentage = rawValue * 100.0;
    let threshold = (baseline * 100.0) - 4.0;
    return percentage >= 95 || percentage >= threshold;
};
