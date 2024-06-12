import { add, isSameDay, startOfDay } from 'date-fns';
import { GlucoseReading, Meal } from '../../../helpers';

export type GlucoseChartPreviewState = 'no data' | 'with data' | 'with data and meals';

export interface GlucoseChartPreviewData {
    glucoseReadings: GlucoseReading[];
    meals: Meal[];
}

export const previewData = (previewState: GlucoseChartPreviewState, date: Date): GlucoseChartPreviewData => {
    if (previewState === 'no data') {
        return {
            glucoseReadings: [],
            meals: []
        };
    } else if (previewState === 'with data') {
        return {
            glucoseReadings: generateGlucoseReadings(date),
            meals: []
        };
    } else if (previewState === 'with data and meals') {
        return {
            glucoseReadings: generateGlucoseReadings(date),
            meals: [{
                'nutrients': {
                    'dietaryFatTotal': { 'values': [6.0004, 3.7439999999999998, 4.9979999999999993, 0.22120000000000004, 5.92825, 6.3539999999999992], 'total': 27.245849999999997, 'units': 'g' },
                    'dietaryCarbohydrates': { 'values': [0.99959999999999982, 9.4545000000000012, 31.997, 22.112099999999998, 0, 0], 'total': 64.5632, 'units': 'g' },
                    'dietaryProtein': { 'values': [7, 3.6045000000000003, 9.0019999999999989, 2.1092999999999997, 15.605500000000001, 15], 'total': 52.3213, 'units': 'g' },
                    'dietaryEnergyConsumed': { 'values': [89.88, 84.15, 210, 101.91, 115.57499999999999, 121.2], 'total': 722.71499999999992, 'units': 'kcal' }
                },
                'observationDate': createObservationDate(date, 9, 15)
            }, {
                'nutrients': {
                    'dietaryFatTotal': { 'values': [0.52799999999999991, 0.35000000000000003, 15.484770000000001, 3.8699999999999997], 'total': 20.232770000000002, 'units': 'g' },
                    'dietaryCarbohydrates': { 'values': [7.084, 9.775, 2.42109, 45.18], 'total': 64.460090000000008, 'units': 'g' },
                    'dietaryProtein': { 'values': [3.344, 2.3499999999999996, 10.841040000000001, 7.7399999999999993], 'total': 24.27504, 'units': 'g' },
                    'dietaryEnergyConsumed': { 'values': [37.400000000000006, 43.75, 195.048, 249.3], 'total': 525.498, 'units': 'kcal' }
                },
                'observationDate': createObservationDate(date, 16, 25)
            }, {
                'nutrients': {
                    'dietaryFatTotal': { 'values': [6.0004, 3.7439999999999998, 4.9979999999999993, 0.22120000000000004, 5.92825, 6.3539999999999992], 'total': 27.245849999999997, 'units': 'g' },
                    'dietaryCarbohydrates': { 'values': [0.99959999999999982, 9.4545000000000012, 31.997, 22.112099999999998, 0, 0], 'total': 64.5632, 'units': 'g' },
                    'dietaryProtein': { 'values': [7, 3.6045000000000003, 9.0019999999999989, 2.1092999999999997, 15.605500000000001, 15], 'total': 52.3213, 'units': 'g' },
                    'dietaryEnergyConsumed': { 'values': [89.88, 84.15, 210, 101.91, 115.57499999999999, 121.2], 'total': 722.71499999999992, 'units': 'kcal' }
                },
                'observationDate': createObservationDate(date, 18, 10)
            }, {
                'nutrients': {
                    'dietaryFatTotal': { 'values': [0.52799999999999991, 0.35000000000000003, 15.484770000000001, 3.8699999999999997], 'total': 20.232770000000002, 'units': 'g' },
                    'dietaryCarbohydrates': { 'values': [7.084, 9.775, 2.42109, 45.18], 'total': 64.460090000000008, 'units': 'g' },
                    'dietaryProtein': { 'values': [3.344, 2.3499999999999996, 10.841040000000001, 7.7399999999999993], 'total': 24.27504, 'units': 'g' },
                    'dietaryEnergyConsumed': { 'values': [37.400000000000006, 43.75, 195.048, 249.3], 'total': 525.498, 'units': 'kcal' }
                },
                'observationDate': createObservationDate(date, 21, 43)
            }]
        };
    }
    return {} as GlucoseChartPreviewData;
};

function generateGlucoseReadings(date: Date, source?: string): GlucoseReading[] {
    let readings: GlucoseReading[] = [];

    let observationDate = date;
    let previousValue = 60;
    while (isSameDay(observationDate, date)) {
        let newValue = previousValue + (Math.random() * 50) - 25;
        while (newValue < 60 || newValue > 180) {
            newValue = previousValue + (Math.random() * 50) - 25;
        }
        readings.push({
            observationDate: observationDate,
            value: newValue,
            source: source
        });
        previousValue = newValue;

        observationDate = add(observationDate, { minutes: 15 });
    }

    return readings;
}

function createObservationDate(baseDate: Date, hours: number, minutes: number): Date {
    let date = startOfDay(baseDate);
    date = add(date, { hours: hours });
    date = add(date, { minutes: minutes });
    return date;
}