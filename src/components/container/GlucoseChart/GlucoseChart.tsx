import React, { useContext, useState } from 'react';
import './GlucoseChart.css';
import { computeBestFitGlucoseValue, getColorFromAssortment, getGlucoseReadings, getMeals, GlucoseReading, Meal, MultiSeriesLineChartOptions, useInitializeView } from '../../../helpers';
import { GlucoseChartPreviewState, previewData } from './GlucoseChart.previewData';
import { DateRangeContext, LoadingIndicator, TimeSeriesChart } from '../../presentational';
import { add, compareAsc, format, startOfDay, startOfToday } from 'date-fns';
import { Bar } from 'recharts';
import SingleMeal from '../../presentational/SingleMeal';
import GlucoseStats from '../../presentational/GlucoseStats';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';

export interface GlucoseChartProps {
    previewState?: 'loading' | GlucoseChartPreviewState;
    minDate?: Date;
    maxDate?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
    showStats?: boolean;
    showMeals?: boolean;
}

export default function (props: GlucoseChartProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [meals, setMeals] = useState<Meal[]>();
    const [glucoseReadings, setGlucoseReadings] = useState<GlucoseReading[]>();
    const [selectedMeal, setSelectedMeal] = useState<Meal>();

    let selectedDate = dateRangeContext?.intervalStart ?? startOfToday();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            setMeals(previewData(props.previewState, selectedDate).meals);
            setGlucoseReadings(previewData(props.previewState, selectedDate).glucoseReadings)
            setSelectedMeal(undefined);
            setLoading(false);
            return;
        }

        Promise.all([getMeals(selectedDate), getGlucoseReadings(selectedDate)]).then(results => {
            setMeals(results[0]);
            setGlucoseReadings(results[1]);
            setSelectedMeal(undefined);
            setLoading(false);
        });

    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    let filteredGlucoseReadings = glucoseReadings?.filter(reading => {
        if (!selectedMeal) return true;

        let minDate = selectedMeal.observationDate;
        let maxDate = add(selectedMeal.observationDate, { hours: 2 });

        return reading.observationDate >= minDate && reading.observationDate <= maxDate;
    }) ?? [];

    let minGlucose: number | undefined;
    let maxGlucose: number | undefined;

    if (filteredGlucoseReadings.length > 0) {
        let glucoseValues = filteredGlucoseReadings.map(reading => reading.value);
        minGlucose = Math.min(...glucoseValues);
        maxGlucose = Math.max(...glucoseValues);
    }

    let filteredMeals = meals?.filter(meal => {
        if (filteredGlucoseReadings.length === 0) return false;
        if (!selectedMeal) return true;

        let minDate = selectedMeal.observationDate;
        let maxDate = add(selectedMeal.observationDate, { hours: 2 });

        return meal.observationDate >= minDate && meal.observationDate <= maxDate;
    }) ?? [];

    filteredMeals.forEach(meal => {
        meal.minGlucose = Math.floor(computeBestFitGlucoseValue(meal.observationDate, filteredGlucoseReadings));
        meal.maxGlucose = Math.floor(computeBestFitGlucoseValue(add(meal.observationDate, { minutes: 60 }), filteredGlucoseReadings));
    });

    let chartData: { timestamp: Date, value: number, meal?: boolean }[] = [];

    filteredGlucoseReadings.forEach(reading => {
        chartData.push({ timestamp: reading.observationDate, value: reading.value });
    });

    filteredMeals.forEach(meal => {
        let entry = chartData.find(entry => entry.timestamp === meal.observationDate);
        if (!entry) {
            entry = { timestamp: meal.observationDate, value: computeBestFitGlucoseValue(meal.observationDate, filteredGlucoseReadings) }
            chartData.push(entry);
        }
        entry.meal = true;
    });

    chartData.sort((a, b) => compareAsc(a.timestamp, b.timestamp));

    let chartDomain = [selectedDate.valueOf(), add(selectedDate, { hours: 24 }).valueOf()];
    let chartTicks = [
        selectedDate.valueOf(),
        add(selectedDate, { hours: 3 }).valueOf(),
        add(selectedDate, { hours: 6 }).valueOf(),
        add(selectedDate, { hours: 9 }).valueOf(),
        add(selectedDate, { hours: 12 }).valueOf(),
        add(selectedDate, { hours: 15 }).valueOf(),
        add(selectedDate, { hours: 18 }).valueOf(),
        add(selectedDate, { hours: 21 }).valueOf(),
        add(selectedDate, { hours: 24 }).valueOf()
    ];
    let chartTickFormatter = (value: number) => {
        if (value === chartDomain[0] || value === chartDomain[1]) {
            return "";
        }
        return format(new Date(value), 'h aaa');
    }

    if (selectedMeal) {
        chartDomain = [selectedMeal.observationDate.valueOf(), add(selectedMeal.observationDate, { hours: 2 }).valueOf()];
        chartTicks = [
            selectedMeal.observationDate.valueOf(),
            add(selectedMeal.observationDate, { minutes: 30 }).valueOf(),
            add(selectedMeal.observationDate, { minutes: 60 }).valueOf(),
            add(selectedMeal.observationDate, { minutes: 90 }).valueOf(),
            add(selectedMeal.observationDate, { minutes: 120 }).valueOf()
        ];
        chartTickFormatter = (value: number) => {
            if (value === chartDomain[0] || value === chartDomain[1]) {
                return "";
            }
            return format(new Date(value), 'h:mmaaa');
        }
    }

    const customDot = (props: { cx: number, cy?: number, payload: { timestamp: Date, meal?: boolean } }) => {
        const { cx, cy, payload } = props;
        if (!cy || !payload.meal) return <></>;

        let mealIndex = meals!.findIndex(meal => meal.observationDate === payload.timestamp);
        if (mealIndex < 0) return <></>;

        return <svg>
            <circle cx={cx} cy={cy} r={6} fill={getColorFromAssortment(mealIndex)} />
        </svg>;
    };

    const customDotLabel = (props: any) => {
        const { x, y, index } = props;

        let entry = chartData[index];
        if (!entry.meal) return <></>;

        let mealIndex = meals!.findIndex(meal => meal.observationDate === entry.timestamp);
        if (mealIndex < 0) return <></>;

        return <text x={x} y={y} dy={3} fill="#fff" fontSize={8} textAnchor="middle">{mealIndex + 1}</text>;
    };

    let steps: { timestamp: Date, value: number }[] = [];
    let currentStepData = startOfDay(selectedDate);
    while (currentStepData < add(startOfDay(selectedDate), { days: 1 })) {
        let value = Math.round(Math.random() * (200) + 20);
        if (currentStepData.getHours() < 7 || currentStepData.getHours() > 22) {
            value = 20;
        }

        steps.push({ timestamp: currentStepData, value: value });
        currentStepData = add(currentStepData, { minutes: 30 });
    }
    steps = steps.filter(stepEntry => {
        if (filteredGlucoseReadings.length === 0) return false;
        if (!selectedMeal) return true;

        let minDate = selectedMeal.observationDate;
        let maxDate = add(selectedMeal.observationDate, { hours: 2 });

        return stepEntry.timestamp >= minDate && stepEntry.timestamp <= maxDate;
    }) ?? [];

    let range = (maxGlucose || 0) - (minGlucose || 0);

    return <div className="mdhui-glucose-chart">
        <div className="mdhui-glucose-chart-chart" style={{ display: !loading && glucoseReadings && glucoseReadings.length > 0 ? 'block' : 'none' }}>
            <TimeSeriesChart
                height={166}
                intervalType="Day"
                intervalStart={selectedDate}
                data={chartData}
                series={[{ dataKey: 'value', color: '#999' }]}
                chartHasData={!!glucoseReadings && glucoseReadings.length > 0}
                chartType="Line"
                options={
                    {
                        yAxisDomain: [20, 220],
                        yAxisTicks: [60, 100, 140, 180, 220],
                        yAxisWidth: 24,
                        xAxisDomain: chartDomain,
                        xAxisTicks: chartTicks,
                        xAxisTickFormatter: chartTickFormatter,
                        dot: customDot,
                        label: customDotLabel,
                        strokeWidth: 1.5,
                        animationDuration: 500,
                        thresholds: [
                            {
                                value: Number((maxGlucose || 0) - (range / 2)),
                                referenceLineColor: 'var(--mdhui-color-primary)',
                                label: {
                                    value: Number((maxGlucose || 0) - (range / 2)).toFixed(0),
                                    fill: 'var(--mdhui-color-primary)',
                                    fontSize: 9,
                                    position: 'insideTopRight',
                                    fontWeight: 'bold'
                                }
                            }
                        ]
                    } as MultiSeriesLineChartOptions
                }
            >
                <Bar
                    data={steps}
                    type="monotone"
                    dataKey="value"
                    fill="rgb(245, 183, 34)"
                    opacity={0.3}
                    radius={[2, 2, 0, 0]}
                />
            </TimeSeriesChart>
            <FontAwesomeSvgIcon className="steps-icon" color="#f5b722" icon={faShoePrints} />
        </div>
        <div className="mdhui-glucose-chart-chart-empty" style={{ display: !loading && !glucoseReadings?.length ? 'block' : 'none' }}>No blood glucose readings</div>
        <div className="mdhui-glucose-chart-chart-placeholder" style={{ display: loading ? 'block' : 'none' }}>
            <LoadingIndicator />
        </div>
        {props.showStats &&
            <GlucoseStats loading={loading} glucoseReadings={filteredGlucoseReadings} />
        }
        {props.showMeals && meals &&
            <div className="meals-list">
                {meals.map((meal, index) => {
                    return <SingleMeal
                        key={index}
                        meal={meal}
                        number={index + 1}
                        color={getColorFromAssortment(index)}
                        onClick={() => setSelectedMeal(selectedMeal === meal ? undefined : meal)}
                        selected={selectedMeal === meal}
                    />;
                })}
            </div>
        }
    </div>;
}