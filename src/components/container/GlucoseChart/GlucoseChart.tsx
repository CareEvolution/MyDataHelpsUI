import React, { useContext, useState } from 'react';
import './GlucoseChart.css';
import { computeBestFitGlucoseValue, getColorFromAssortment, getGlucoseReadings, getMeals, Meal, Reading, useInitializeView } from '../../../helpers';
import { GlucoseChartPreviewState, previewData } from './GlucoseChart.previewData';
import { Card, DateRangeContext, DiscreteScale, LoadingIndicator, TimeSeriesChart, Title } from '../../presentational';
import { add, compareAsc, format, startOfToday } from 'date-fns';
import { Bar, ReferenceLine, ResponsiveContainerProps } from 'recharts';
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
    const [glucose, setGlucose] = useState<Reading[]>();
    const [steps, setSteps] = useState<Reading[]>();
    const [sleep, setSleep] = useState<Reading[]>();
    const [meals, setMeals] = useState<Meal[]>();
    const [selectedMeal, setSelectedMeal] = useState<Meal>();
    const [stressLevel, setStressLevel] = useState<number>();

    let selectedDate = dateRangeContext?.intervalStart ?? startOfToday();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            setMeals(previewData(props.previewState, selectedDate).meals);
            setGlucose(previewData(props.previewState, selectedDate).glucose)
            setSteps(previewData(props.previewState, selectedDate).steps);
            setSleep(previewData(props.previewState, selectedDate).sleep);
            setSelectedMeal(undefined);
            setStressLevel(2);
            setLoading(false);
            return;
        }

        Promise.all([getGlucoseReadings(selectedDate), getMeals(selectedDate)]).then(results => {
            setGlucose(results[0]);
            setMeals(results[1]);
            setSteps([]); // TODO: Load steps.
            setSleep([]); // TODO: Load sleep minutes.
            setSelectedMeal(undefined);
            setLoading(false);
        });

    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    let filteredGlucose = glucose?.filter(reading => {
        if (!selectedMeal) return true;

        let minDate = selectedMeal.timestamp;
        let maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return reading.timestamp >= minDate && reading.timestamp <= maxDate;
    }) ?? [];

    let minGlucose: number | undefined;
    let maxGlucose: number | undefined;

    if (filteredGlucose.length > 0) {
        let glucoseValues = filteredGlucose.map(reading => reading.value);
        minGlucose = Math.min(...glucoseValues);
        maxGlucose = Math.max(...glucoseValues);
    }

    let filteredMeals = meals?.filter(meal => {
        if (filteredGlucose.length === 0) return false;
        if (!selectedMeal) return true;

        let minDate = selectedMeal.timestamp;
        let maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return meal.timestamp >= minDate && meal.timestamp <= maxDate;
    }) ?? [];

    let chartData: { timestamp: Date, value: number, meal?: boolean }[] = [];

    filteredGlucose.forEach(reading => {
        chartData.push({ timestamp: reading.timestamp, value: reading.value });
    });

    filteredMeals.forEach(meal => {
        let entry = chartData.find(entry => entry.timestamp === meal.timestamp);
        if (!entry) {
            entry = { timestamp: meal.timestamp, value: computeBestFitGlucoseValue(meal.timestamp, filteredGlucose) }
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
        chartDomain = [selectedMeal.timestamp.valueOf(), add(selectedMeal.timestamp, { hours: 2 }).valueOf()];
        chartTicks = [
            selectedMeal.timestamp.valueOf(),
            add(selectedMeal.timestamp, { minutes: 30 }).valueOf(),
            add(selectedMeal.timestamp, { minutes: 60 }).valueOf(),
            add(selectedMeal.timestamp, { minutes: 90 }).valueOf(),
            add(selectedMeal.timestamp, { minutes: 120 }).valueOf()
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

        let mealIndex = meals!.findIndex(meal => meal.timestamp === payload.timestamp);
        if (mealIndex < 0) return <></>;

        return <svg>
            <circle cx={cx} cy={cy} r={6} fill={getColorFromAssortment(mealIndex)} />
        </svg>;
    };

    const customDotLabel = (props: any) => {
        const { x, y, index } = props;

        let entry = chartData[index];
        if (!entry.meal) return <></>;

        let mealIndex = meals!.findIndex(meal => meal.timestamp === entry.timestamp);
        if (mealIndex < 0) return <></>;

        return <text x={x} y={y} dy={3} fill="#fff" fontSize={8} textAnchor="middle">{mealIndex + 1}</text>;
    };

    let filteredSteps = steps?.filter(reading => {
        if (filteredGlucose.length === 0) return false;
        if (!selectedMeal) return true;

        let minDate = selectedMeal.timestamp;
        let maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return reading.timestamp >= minDate && reading.timestamp <= maxDate;
    }) ?? [];

    let filteredSleep = sleep?.filter(reading => {
        if (filteredGlucose.length === 0) return false;
        if (!selectedMeal) return true;

        let minDate = selectedMeal.timestamp;
        let maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return reading.timestamp >= minDate && reading.timestamp <= maxDate;
    }) ?? [];

    let glucoseRange = (maxGlucose || 0) - (minGlucose || 0);

    let maxSteps = Math.max(...filteredSteps.map(r => r.value));
    let stepsScale = 220 / (maxSteps * 0.8);
    let overlaySteps = filteredSteps
        .filter(r => r.value > 0)
        .map(r => {
            return { ...r, value: r.value * stepsScale }
        });

    return <div className="mdhui-glucose-chart">
        <Card>
            <div className="mdhui-glucose-chart-chart" style={{ display: !loading && glucose && glucose.length > 0 ? 'block' : 'none' }}>
                <TimeSeriesChart
                    intervalType="Day"
                    intervalStart={selectedDate}
                    data={chartData}
                    series={[{ dataKey: 'value', color: '#999' }]}
                    chartHasData={!!glucose && glucose.length > 0}
                    chartType="Line"
                    containerProps={{
                        height: 166
                    } as ResponsiveContainerProps}
                    xAxisProps={{
                        domain: chartDomain,
                        ticks: chartTicks,
                        tickFormatter: chartTickFormatter
                    }}
                    yAxisProps={{
                        width: 24,
                        domain: [20, 220],
                        ticks: [60, 100, 140, 180, 220]
                    }}
                    lineProps={{
                        dot: customDot,
                        label: customDotLabel,
                        strokeWidth: 1.5,
                        animationDuration: 500
                    }}
                >
                    <ReferenceLine
                        y={(maxGlucose || 0) - (glucoseRange / 2)}
                        stroke="var(--mdhui-color-primary)"
                        strokeWidth={1}
                        label={{
                            value: Number((maxGlucose || 0) - (glucoseRange / 2)).toFixed(0),
                            fill: 'var(--mdhui-color-primary)',
                            fontSize: 9,
                            position: 'insideTopRight',
                            fontWeight: 'bold'
                        }}
                    />
                    <Bar
                        data={overlaySteps}
                        type="monotone"
                        dataKey="value"
                        fill="#f5b722"
                        opacity={0.3}
                        radius={[2, 2, 0, 0]}
                    />
                </TimeSeriesChart>
                <FontAwesomeSvgIcon className="steps-icon" color="#f5b722" icon={faShoePrints} />
            </div>
            <div className="mdhui-glucose-chart-chart-empty" style={{ display: !loading && !glucose?.length ? 'block' : 'none' }}>No blood glucose readings</div>
            <div className="mdhui-glucose-chart-chart-placeholder" style={{ display: loading ? 'block' : 'none' }}>
                <LoadingIndicator />
            </div>
            {props.showStats &&
                <GlucoseStats
                    loading={loading}
                    glucoseReadings={filteredGlucose}
                    steps={filteredSteps}
                    sleep={filteredSleep}
                />
            }
            <div className="mdhui-glucose-chart-stress-label">OVERALL STRESS</div>
            <DiscreteScale
                tickCount={7}
                minLabel="No Stress"
                maxLabel="Extremely Stressed"
                value={stressLevel}
                onChange={setStressLevel}
                sliderColor="#d36540"
            />
        </Card>
        {props.showMeals && meals && meals.length > 0 &&
            <Card className="mdhui-glucose-chart-meal-log">
                <Title order={3}>Meal Log</Title>
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
            </Card>
        }
    </div>;
}