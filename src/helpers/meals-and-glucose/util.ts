import { Reading } from './types';
import { compareAsc } from 'date-fns';

export function readingTimestampSort(a: Reading, b: Reading) {
    return compareAsc(a.timestamp, b.timestamp);
}