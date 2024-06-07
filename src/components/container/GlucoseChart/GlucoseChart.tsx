import React, { useContext, useState } from 'react';
import './GlucoseChart.css';
import { computeBestFitGlucoseValue, getGlucoseReadings, getMeals, GlucoseReading, Meal, useInitializeView } from '../../../helpers';
import { GlucoseChartPreviewState, previewData } from './GlucoseChart.previewData';
import { DateRangeContext, LoadingIndicator } from '../../presentational';
import { add, compareAsc, format, startOfToday } from 'date-fns';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import SingleMeal from '../../presentational/SingleMeal';
import GlucoseStats from '../../presentational/GlucoseStats';

export interface GlucoseChartProps {
    previewState?: 'loading' | GlucoseChartPreviewState;
    minDate?: Date;
    maxDate?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: GlucoseChartProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const mealColors = ['#800000', '#9a6324', '#808000', '#469990', '#dcbeff', '#e6194b', '#f58231', '#ffe119', '#3cb44b', '#42d4f4', '#4363d8', '#911eb4', '#a9a9a9', '#fabed4', '#ffd8b1', '#fffac8'];

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
        let maxDate = add(selectedMeal.observationDate, {hours: 2});

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
        let maxDate = add(selectedMeal.observationDate, {hours: 2});

        return meal.observationDate >= minDate && meal.observationDate <= maxDate;
    }) ?? [];

    filteredMeals.forEach(meal => {
        meal.minGlucose = Math.floor(computeBestFitGlucoseValue(meal.observationDate, filteredGlucoseReadings));
        meal.maxGlucose = Math.floor(computeBestFitGlucoseValue(add(meal.observationDate, {minutes: 60}), filteredGlucoseReadings));
    });

    let chartData: { date: Date, value: number, meal?: boolean }[] = [];

    filteredGlucoseReadings.forEach(reading => {
        chartData.push({date: reading.observationDate, value: reading.value});
    });

    filteredMeals.forEach(meal => {
        let entry = chartData.find(entry => entry.date === meal.observationDate);
        if (!entry) {
            entry = {date: meal.observationDate, value: computeBestFitGlucoseValue(meal.observationDate, filteredGlucoseReadings)}
            chartData.push(entry);
        }
        entry.meal = true;
    });

    chartData.sort((a, b) => compareAsc(a.date, b.date));

    let chartDomain = [selectedDate.valueOf(), add(selectedDate, {hours: 24}).valueOf()];
    let chartTicks = [
        selectedDate.valueOf(),
        add(selectedDate, {hours: 4}).valueOf(),
        add(selectedDate, {hours: 8}).valueOf(),
        add(selectedDate, {hours: 12}).valueOf(),
        add(selectedDate, {hours: 16}).valueOf(),
        add(selectedDate, {hours: 20}).valueOf(),
        add(selectedDate, {hours: 24}).valueOf()
    ];
    let chartTickFormatter = (value: number) => format(new Date(value), 'haaa');

    if (selectedMeal) {
        chartDomain = [selectedMeal.observationDate.valueOf(), add(selectedMeal.observationDate, {hours: 2}).valueOf()];
        chartTicks = [
            selectedMeal.observationDate.valueOf(),
            add(selectedMeal.observationDate, {minutes: 30}).valueOf(),
            add(selectedMeal.observationDate, {minutes: 60}).valueOf(),
            add(selectedMeal.observationDate, {minutes: 90}).valueOf(),
            add(selectedMeal.observationDate, {minutes: 120}).valueOf()
        ];
        chartTickFormatter = (value: number) => format(new Date(value), 'h:mmaaa');
    }

    const customDot = (props: { cx: number, cy?: number, payload: { date: Date, meal?: boolean } }) => {
        const {cx, cy, payload} = props;
        if (!cy || !payload.meal) return <></>;

        let mealIndex = meals!.findIndex(meal => meal.observationDate === payload.date);
        if (mealIndex < 0) return <></>;

        return <svg>
            <circle cx={cx} cy={cy} r={6} fill={mealColors[mealIndex % mealColors.length]}/>
        </svg>;
    };

    const customDotLabel = (props: any) => {
        const {x, y, index} = props;

        let entry = chartData[index];
        if (!entry.meal) return <></>;

        let mealIndex = meals!.findIndex(meal => meal.observationDate === entry.date);
        if (mealIndex < 0) return <></>;

        return <text x={x} y={y} dy={3} fill="#fff" fontSize={8} textAnchor="middle">{mealIndex + 1}</text>;
    };

    return <div className="mdhui-glucose-chart">
        <div className="mdhui-glucose-chart-chart" style={{display: !loading && glucoseReadings && glucoseReadings.length > 0 ? 'block' : 'none'}}>
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{top: 10, right: 50, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="4 4"/>
                    <XAxis
                        type="number"
                        dataKey="date"
                        domain={chartDomain}
                        ticks={chartTicks}
                        tickFormatter={chartTickFormatter}
                        interval={0}
                        style={{fontSize: 10, fill: '#aaa'}}
                    />
                    <YAxis
                        domain={[50, 220]}
                        ticks={[60, 80, 100, 120, 140, 160, 180, 200, 220]}
                        interval={0}
                        style={{fontSize: 10, fill: '#aaa'}}
                    />
                    <ReferenceLine
                        y={maxGlucose}
                        stroke="var(--mdhui-color-primary)"
                        strokeWidth={1}
                        label={{
                            value: Number(maxGlucose).toFixed(0),
                            fill: 'var(--mdhui-color-primary)',
                            fontSize: 9,
                            position: 'right'
                        }}
                    />
                    <ReferenceLine
                        y={minGlucose}
                        stroke="var(--mdhui-color-primary)"
                        strokeWidth={1}
                        label={{
                            value: Number(minGlucose).toFixed(0),
                            fill: 'var(--mdhui-color-primary)',
                            fontSize: 9,
                            position: 'right'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#aaa"
                        dot={customDot}
                        label={customDotLabel}
                        animationDuration={500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className="mdhui-glucose-chart-chart-empty" style={{display: !loading && !glucoseReadings?.length ? 'block' : 'none'}}>No blood glucose readings</div>
        <div className="mdhui-glucose-chart-chart-placeholder" style={{display: loading ? 'block' : 'none'}}>
            <LoadingIndicator/>
        </div>
        <GlucoseStats loading={loading} glucoseReadings={filteredGlucoseReadings}/>
        {meals &&
            <div className="meals-list">
                {meals.map((meal, index) => {
                    return <SingleMeal
                        key={index}
                        meal={meal}
                        number={index + 1}
                        color={mealColors[index % mealColors.length]}
                        onClick={() => setSelectedMeal(selectedMeal === meal ? undefined : meal)}
                        selected={selectedMeal === meal}
                    />;
                })}
            </div>
        }
    </div>;
}