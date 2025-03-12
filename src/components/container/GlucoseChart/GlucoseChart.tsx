import React, { useContext, useState } from 'react';
import './GlucoseChart.css';
import { ColorDefinition, computeBestFitGlucoseValue, getColorFromAssortment, getGlucoseReadings, getSleepMinutes, getSteps, language, Reading, resolveColor, useInitializeView } from '../../../helpers';
import { GlucoseChartPreviewState, previewData } from './GlucoseChart.previewData';
import { Action, DateRangeContext, GlucoseStats, LayoutContext, LoadingIndicator, TimeSeriesChart } from '../../presentational';
import { add, compareAsc, isSameDay, startOfToday } from 'date-fns';
import { Bar, ReferenceLine } from 'recharts';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { GlucoseContext, MealContext } from '../../container';
import { getShortTimeOfDayString, getTimeOfDayString } from '../../../helpers/date-helpers';
import { formatNumberForLocale } from "../../../helpers/locale";

export interface GlucoseChartProps {
    previewState?: 'loading' | GlucoseChartPreviewState;
    showStats?: boolean;
    averageGlucoseLineColor?: ColorDefinition;
    innerRef?: React.Ref<HTMLDivElement>;
    variant?: "default" | "minimal";
    onClick?: () => void;
    hideIfNoData?: boolean;
}

export default function (props: GlucoseChartProps) {
    const layoutContext = useContext(LayoutContext);
    const glucoseContext = useContext(GlucoseContext);
    const dateRangeContext = useContext(DateRangeContext);
    const mealContext = useContext(MealContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [glucose, setGlucose] = useState<Reading[]>();
    const [steps, setSteps] = useState<Reading[]>();
    const [sleepMinutes, setSleepMinutes] = useState<number | undefined>();

    let selectedDate = dateRangeContext?.intervalStart ?? startOfToday();
    let meals = mealContext?.meals ?? [];
    let selectedMeal = mealContext?.selectedMeal;

    const getGlucoseReadingsFromContext = () => {
        return Promise.resolve(glucoseContext?.readings?.filter(reading => isSameDay(selectedDate, reading.timestamp)) ?? []);
    };

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            previewData(props.previewState, selectedDate).then(({ glucose, steps, sleepMinutes }) => {
                setGlucose(glucose)
                setSteps(steps);
                setSleepMinutes(sleepMinutes);
                setLoading(false);
            });
            return;
        }

        let glucoseReadingLoader = glucoseContext?.readings ? getGlucoseReadingsFromContext() : getGlucoseReadings(selectedDate);
        let stepsLoader = getSteps(selectedDate);
        let sleepMinutesLoader = getSleepMinutes(selectedDate);
        Promise.all([glucoseReadingLoader, stepsLoader, sleepMinutesLoader]).then(results => {
            setGlucose(results[0]);
            setSteps(results[1]);
            setSleepMinutes(results[2]);
            setLoading(false);
        });

    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    let filteredGlucose = glucose?.filter(reading => {
        if (!selectedMeal) return true;

        let minDate = selectedMeal.timestamp;
        let maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return reading.timestamp >= minDate && reading.timestamp <= maxDate;
    }) ?? [];

    if (props.hideIfNoData && filteredGlucose.length === 0) {
        return null;
    }

    let filteredMeals = meals.filter(meal => {
        if (filteredGlucose.length === 0) return false;
        if (!selectedMeal) return true;

        let minDate = selectedMeal.timestamp;
        let maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return meal.timestamp >= minDate && meal.timestamp <= maxDate;
    });

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

    let chartDomain: [number, number] = [selectedDate.valueOf(), add(selectedDate, { hours: 24 }).valueOf()];
    let chartTicks = [
        add(selectedDate, { hours: 3 }).valueOf(),
        add(selectedDate, { hours: 6 }).valueOf(),
        add(selectedDate, { hours: 9 }).valueOf(),
        add(selectedDate, { hours: 12 }).valueOf(),
        add(selectedDate, { hours: 15 }).valueOf(),
        add(selectedDate, { hours: 18 }).valueOf(),
        add(selectedDate, { hours: 21 }).valueOf()
    ];
    let chartTickFormatter = (value: number) => getShortTimeOfDayString(new Date(value));

    if (selectedMeal) {
        chartDomain = [add(selectedMeal.timestamp, { minutes: -3 }).valueOf(), add(selectedMeal.timestamp, { hours: 2 }).valueOf()];
        chartTicks = [
            add(selectedMeal.timestamp, { minutes: 30 }).valueOf(),
            add(selectedMeal.timestamp, { minutes: 60 }).valueOf(),
            add(selectedMeal.timestamp, { minutes: 90 }).valueOf()
        ];
        chartTickFormatter = (value: number) => getTimeOfDayString(new Date(value));
    }

    const customDot = (props: { cx: number, cy?: number, payload: { timestamp: Date, meal?: boolean } }) => {
        const { cx, cy, payload } = props;
        if (!cy || !payload.meal) return <></>;

        let mealIndex = meals.findIndex(meal => meal.timestamp === payload.timestamp);
        if (mealIndex < 0) return <></>;

        return <svg>
            <circle cx={cx} cy={cy} r={6} fill={getColorFromAssortment(mealIndex)} />
        </svg>;
    };

    const customDotLabel = (props: any) => {
        const { x, y, index } = props;

        let entry = chartData[index];
        if (!entry.meal) return <></>;

        let mealIndex = meals.findIndex(meal => meal.timestamp === entry.timestamp);
        if (mealIndex < 0) return <></>;

        return <text x={x} y={y} dy={3} fill="#fff" fontSize={8} textAnchor="middle">{mealIndex + 1}</text>;
    };

    let minGlucose = glucose?.length && props.variant == "minimal" ? Math.min(...glucose.map(r => r.value)) : 0;
    let maxGlucose = glucose?.length && props.variant == "minimal" ? Math.max(...glucose.map(r => r.value)) : 240;

    let filteredSteps = steps?.filter(reading => reading.value > 0) ?? [];
    let maxSteps = filteredSteps.length > 0 ? Math.max(...filteredSteps.map(r => r.value)) : 0;
    let stepsScale = maxSteps > 0 ? (maxGlucose - minGlucose) / maxSteps : 1;
    let overlaySteps = filteredSteps.map(r => ({ ...r, value: r.value * stepsScale + minGlucose }));

    function getInnerComponents() {
        return <><div className="mdhui-glucose-chart-chart" style={{ display: !loading && glucose && glucose.length > 0 ? 'block' : 'none' }}>
            {props.showStats && props.variant === "minimal" &&
                <GlucoseStats
                    loading={loading}
                    glucoseReadings={filteredGlucose}
                    steps={!selectedMeal ? filteredSteps : []}
                    sleepMinutes={!selectedMeal ? sleepMinutes : undefined}
                    variant={props.variant}
                />
            }
            <TimeSeriesChart
                variant={props.variant == "minimal" ? 'minimal' : 'default'}
                intervalType="Day"
                intervalStart={selectedDate}
                data={chartData as any}
                series={[{ dataKey: 'value', color: '#999' }]}
                chartHasData={!!glucose && glucose.length > 0}
                chartType="Line"
                options={{
                    lineOptions: {
                        dot: customDot,
                        label: customDotLabel,
                        strokeWidth: 1.5,
                        animationDuration: 500
                    },
                    containerOptions: {
                        height: props.variant == "minimal" ? 80 : 166
                    },
                    xAxisOptions: {
                        domain: chartDomain,
                        ticks: chartTicks,
                        tickFormatter: chartTickFormatter
                    },
                    yAxisOptions: {
                        domain: props.variant !== "minimal" ? [0, 240] : [minGlucose - 10, maxGlucose + 10],
                        ticks: props.variant !== "minimal" ? [40, 80, 120, 160, 200, 240] : undefined
                    }
                }}
            >
                {glucoseContext?.recentAverage !== undefined &&
                    <ReferenceLine
                        y={glucoseContext.recentAverage}
                        stroke={resolveColor(layoutContext.colorScheme, props.averageGlucoseLineColor) ?? 'var(--mdhui-color-primary)'}
                        strokeWidth={1.5}
                        label={{
                            value: formatNumberForLocale(glucoseContext.recentAverage),
                            fill: resolveColor(layoutContext.colorScheme, props.averageGlucoseLineColor) ?? 'var(--mdhui-color-primary)',
                            fontSize: 9,
                            position: 'insideTopRight',
                            fontWeight: 'bold'
                        }}
                    />
                }
                {!selectedMeal && overlaySteps.length > 0 &&
                    <Bar
                        data={overlaySteps}
                        type="monotone"
                        dataKey="value"
                        fill="#f5b722"
                        opacity={0.3}
                        radius={[2, 2, 0, 0]}
                        barSize={selectedMeal ? 20 : 8}
                    />
                }
            </TimeSeriesChart>
            {props.variant !== "minimal" &&
                <FontAwesomeSvgIcon className="steps-icon" color="#f5b722" icon={faShoePrints} />
            }
        </div>
            <div className="mdhui-glucose-chart-chart-empty" style={{ display: !loading && !glucose?.length ? 'block' : 'none' }}>{language('glucose-chart-no-data')}</div>
            <div className="mdhui-glucose-chart-chart-placeholder" style={{ display: loading ? 'block' : 'none' }}>
                <LoadingIndicator />
            </div>
            {props.showStats && props.variant !== "minimal" &&
                <GlucoseStats
                    loading={loading}
                    glucoseReadings={filteredGlucose}
                    steps={!selectedMeal ? filteredSteps : []}
                    sleepMinutes={!selectedMeal ? sleepMinutes : undefined}
                    variant={props.variant}
                />
            }</>;
    }

    let classes = ['mdhui-glucose-chart'];
    if (props.variant == "minimal") {
        classes.push('mdhui-glucose-chart-minimal');
    }

    return <div className={classes.join(" ")} ref={props.innerRef}>
        {props.onClick &&
            <Action className='mdhui-glucose-chart-action' onClick={props.onClick}>
                {getInnerComponents()}
            </Action>
        }
        {!props.onClick &&
            getInnerComponents()
        }
    </div>;
}