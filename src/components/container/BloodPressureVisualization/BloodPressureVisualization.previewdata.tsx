import { add, startOfDay } from "date-fns";
import { BloodPressureDataPoint } from "../../../helpers/blood-pressure-data-providers/survey-blood-pressure-data-provider";

export var previewBloodPressureDataPoint: BloodPressureDataPoint[] =
	[
        {
            date: startOfDay(add(new Date(), { days: -18 })),
            systolic: 200,
            diastolic: 50
        },
        {
            date: startOfDay(add(new Date(), { days: -18 })),
            systolic: 350,
            diastolic: -0
        },
        {
            date: startOfDay(add(new Date(), { days: -17 })),
            systolic: 350,
            diastolic: -20
        },
        {
            date: startOfDay(add(new Date(), { days: -16 })),
            systolic: 250,
            diastolic: 0
        },
        {
            date: startOfDay(add(new Date(), { days: -15 })),
            systolic: 350,
            diastolic: 25
        },
        {
            date: startOfDay(add(new Date(), { days: -15 })),
            systolic: 200,
            diastolic: -50
        },
        {
            date: startOfDay(add(new Date(), { days: -14 })),
            systolic: 200,
            diastolic: 50
        },
        {
            date: startOfDay(add(new Date(), { days: -14 })),
            systolic: 180,
            diastolic: 50
        },
        {
            date: startOfDay(add(new Date(), { days: -13 })),
            systolic: 250,
            diastolic: 0
        },
        {
            date: startOfDay(add(new Date(), { days: -12 })),
            systolic: 180,
            diastolic: 100
        },
        {
            date: startOfDay(add(new Date(), { days: -12 })),
            systolic: 185,
            diastolic: 115
        },
        {
            date: startOfDay(add(new Date(), { days: -12 })),
            systolic: 200,
            diastolic: 115
        },
        {
            date: startOfDay(add(new Date(), { days: -11 })),
            systolic: 385,
            diastolic: -115
        },
        {
            date: startOfDay(add(new Date(), { days: -10 })),
            systolic: 125,
            diastolic: 80
        },
        {
            date: startOfDay(add(new Date(), { days: -10 })),
            systolic: 145,
            diastolic: 80
        },
        {
            date: startOfDay(add(new Date(), { days: -9 })),
            systolic: 105,
            diastolic: 75
        },
        {
            date: startOfDay(add(new Date(), { days: -8 })),
            systolic: 195,
            diastolic: 110
        },
        {
            date: startOfDay(add(new Date(), { days: -7 })),
            systolic: 200,
            diastolic: 100
        },
        {
            date: startOfDay(add(new Date(), { days: -6 })),
            systolic: 112,
            diastolic: 72
        },
        {
            date: startOfDay(add(new Date(), { days: -5 })),
            systolic: 125,
            diastolic: 64
        },
        {
            date: startOfDay(add(new Date(), { days: -4 })),
            systolic: 142,
            diastolic: 82
        },
        {
            date: startOfDay(add(new Date(), { days: -3 })),
            systolic: 150,
            diastolic: 82
        },
        {
            date: startOfDay(add(new Date(), { days: -2 })),
            systolic: 140,
            diastolic: 88
        },
        {
            date: startOfDay(add(new Date(), { days: -1 })),
            systolic: 110,
            diastolic: 65
        },
        {
            date: startOfDay(new Date()),
            systolic: 115,
            diastolic: 72
        },
];
