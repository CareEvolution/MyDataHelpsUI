import { formatISO } from "date-fns";

export default function getDayKey(date: string | Date) {
    if (typeof date === "string") {
        return date.substring(0, 10);
    }
    return formatISO(date, { representation: 'date' });
}