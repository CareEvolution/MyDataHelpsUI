import { endOfDay, Interval, isWithinInterval, parseISO, startOfDay } from 'date-fns';

export function parseISOWithoutOffset(dateStr: string): Date {
    return parseISO(dateStr.substring(0, 19));
}
