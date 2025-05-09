import { formatISO } from "date-fns";

export default function getDayKey(date: string | Date) {
    if (typeof date === "string") {
        // A substring from 0 to 10 is used here to strip the time and offset from the ISO date string.
        // 2025-05-09T18:13:16-04:00 becomes 2025-05-09
        return date.substring(0, 10);
    }
    return formatISO(date, { representation: 'date' });
}