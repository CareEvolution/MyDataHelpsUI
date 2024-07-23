import { compareAsc } from 'date-fns';

export function timestampSortAsc(a: { timestamp: Date }, b: { timestamp: Date }) {
    return compareAsc(a.timestamp, b.timestamp);
}