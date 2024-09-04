import { Reading } from './types';
import { add, isSameDay, startOfDay } from 'date-fns';

export function generateGlucose(date: Date): Reading[] {
    let readings: Reading[] = [];

    let timestamp = date;
    let previousValue = 60;
    while (isSameDay(timestamp, date)) {
        let newValue = previousValue + (Math.random() * 50) - 25;
        while (newValue < 60 || newValue > 180) {
            newValue = previousValue + (Math.random() * 50) - 25;
        }

        readings.push({
            timestamp: timestamp,
            value: newValue
        });

        previousValue = newValue;

        timestamp = add(timestamp, { minutes: 15 });
    }

    return readings;
}

export function generateSteps(date: Date) {
    let steps: Reading[] = [];

    let timestamp = add(startOfDay(date), { minutes: 15 });
    while (isSameDay(timestamp, date)) {
        let newValue = Math.round((Math.random() * 200) + 20);
        if (timestamp.getHours() < 7 || timestamp.getHours() > 22) {
            newValue = 0;
        }

        steps.push({
            timestamp: timestamp,
            value: newValue
        });

        timestamp = add(timestamp, { minutes: 30 });
    }

    return steps;
}

export function generateSleep(date: Date) {
    let sleep: Reading[] = [];

    let timestamp = startOfDay(date);
    while (isSameDay(timestamp, date)) {
        let newValue = Math.round((Math.random() * 10) + 20);
        if (timestamp.getHours() >= 7 && timestamp.getHours() <= 22) {
            newValue = 0;
        }

        sleep.push({
            timestamp: timestamp,
            value: newValue
        });

        timestamp = add(timestamp, { minutes: 30 });
    }

    return sleep;
}