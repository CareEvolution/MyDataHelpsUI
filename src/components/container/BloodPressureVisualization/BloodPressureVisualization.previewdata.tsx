import { BloodPressureDataPoint } from "../../../helpers/blood-pressure-data-providers/query-blood-pressure";
import { add, format, startOfDay } from "date-fns";

export var previewBloodPressureDataPoint: BloodPressureDataPoint[] =
	[
        {
            dateLabel: format(add(new Date(), { days: -12 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -12 })),
            systolic: 180,
            diastolic: 100
        },
        {
            dateLabel: format(add(new Date(), { days: -12 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -12 })),
            systolic: 185,
            diastolic: 115
        },
        {
            dateLabel: format(add(new Date(), { days: -12 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -12 })),
            systolic: 200,
            diastolic: 115
        },
        {
            dateLabel: format(add(new Date(), { days: -11 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -11 })),
            systolic: 385,
            diastolic: -115
        },
        {
            dateLabel: format(add(new Date(), { days: -10 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -10 })),
            systolic: 125,
            diastolic: 80
        },
        {
            dateLabel: format(add(new Date(), { days: -10 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -10 })),
            systolic: 145,
            diastolic: 80
        },
        {
            dateLabel: format(add(new Date(), { days: -9 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -9 })),
            systolic: 105,
            diastolic: 75
        },
        {
            dateLabel: format(add(new Date(), { days: -8 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -8 })),
            systolic: 195,
            diastolic: 110
        },
        {
            dateLabel: format(add(new Date(), { days: -7 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -7 })),
            systolic: 200,
            diastolic: 100
        },
        {
            dateLabel: format(add(new Date(), { days: -6 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -6 })),
            systolic: 205,
            diastolic: 100
        },
        {
            dateLabel: format(add(new Date(), { days: -6 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -6 })),
            systolic: 206,
            diastolic: 83
        },
        {
            dateLabel: format(add(new Date(), { days: -5 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -5 })),
            systolic: 100,
            diastolic: 90
        },
        {
            dateLabel: format(add(new Date(), { days: -4 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -4 })),
            systolic: 200,
            diastolic: 80
        },
        {
            dateLabel: format(add(new Date(), { days: -3 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -3 })),
            systolic: 150,
            diastolic: 60
        },
        {
            dateLabel: format(add(new Date(), { days: -2 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -2 })),
            systolic: 100,
            diastolic: 55
        },
        {
            dateLabel: format(add(new Date(), { days: -1 }), "MM/dd"),
            date: startOfDay(add(new Date(), { days: -1 })),
            systolic: 110,
            diastolic: 65
        },
        {
            dateLabel: format(new Date(), "MM/dd"),
            date: startOfDay(new Date()),
            systolic: 200.59,
            diastolic: 55
        },
];
