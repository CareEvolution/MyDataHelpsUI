import { add } from "date-fns";
import subMonths from "date-fns/subMonths";

let dayOfWeekLookup = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
}

export type WeekStartsOn = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "6DaysAgo" | "7DaysAgo";

export function getWeekStart(weekStartsOn?: WeekStartsOn) {
    if (!weekStartsOn) {
        weekStartsOn = "Sunday";
    }
    let today = new Date();
    if (weekStartsOn === "6DaysAgo" || weekStartsOn === "7DaysAgo") {
        let startDate = add(today, { days: weekStartsOn === "6DaysAgo" ? -6 : -7 });
        return startDate;
    } else {
        let dayOfWeek = dayOfWeekLookup[weekStartsOn];
        let dayOfWeekToday = today.getDay();
        let daysToSubtract = dayOfWeekToday - dayOfWeek;
        if (daysToSubtract < 0) {
            daysToSubtract = 7 + daysToSubtract;
        }
        let startDate = add(today, { days: -daysToSubtract });
        return startDate;
    }
}

export function getMonthStart() {
    let today = new Date();
    let monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return monthStart;
}

export function get6MonthStart() {
   return subMonths(getMonthStart(), 5);
}