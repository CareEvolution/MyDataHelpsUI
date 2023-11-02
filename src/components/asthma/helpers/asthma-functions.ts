import { add, formatISO } from 'date-fns';
import { AsthmaControlState, AsthmaControlStatus, AsthmaDataStatus, AsthmaLogEntry, AsthmaSymptomLevel } from '../model';

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
    if (status === 'offline') return 'Offline';
    if (status === 'in-range') return 'In range';
    if (status === 'out-of-range') return 'Out of range';
    return 'Establishing';
};

export const getAsthmaSymptomLevelValue = (symptomLevel: AsthmaSymptomLevel): string => {
    if (symptomLevel === 'mild') return 'Mild symptoms';
    if (symptomLevel === 'moderate') return 'Moderate symptoms';
    if (symptomLevel === 'severe') return 'Severe symptoms';
    return 'No symptoms';
};

export const getAsthmaSymptomLevel = (symptomLevelValue: string | undefined): AsthmaSymptomLevel => {
    if (symptomLevelValue === 'Mild symptoms') return 'mild';
    if (symptomLevelValue === 'Moderate symptoms') return 'moderate';
    if (symptomLevelValue === 'Severe symptoms') return 'severe';
    return 'none';
};