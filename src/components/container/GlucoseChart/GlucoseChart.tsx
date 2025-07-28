import React, { useContext, useState } from 'react';
import './GlucoseChart.css';
import { ColorDefinition, computeBestFitGlucoseValue, formatNumberForLocale, getColorFromAssortment, getGlucoseReadings, getSleepMinutes, getSteps, language, Reading, resolveColor, TimeSeriesChartLineOptions, useInitializeView } from '../../../helpers';
import { GlucoseChartPreviewState, previewData } from './GlucoseChart.previewData';
import { Action, DateRangeContext, GlucoseStats, LayoutContext, LoadingIndicator, TimeSeriesChart } from '../../presentational';
import { add, compareAsc, isSameDay, startOfToday } from 'date-fns';
import { Bar, ReferenceLine } from 'recharts';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faDroplet, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { GlucoseContext, MealContext } from '../../container';
import { getShortTimeOfDayString, getTimeOfDayString } from '../../../helpers/date-helpers';
import { getCombinedDataCollectionSettings } from '../../../helpers/daily-data-providers/combined-data-collection-settings';
import { checkForGlucoseReadings } from '../../../helpers/glucose-and-meals/glucose';

export type GlucoseChartVariant = 'default' | 'minimal';

export interface GlucoseChartProps {
    previewState?: 'loading' | GlucoseChartPreviewState;
    variant?: GlucoseChartVariant;
    showStats?: boolean;
    glucoseLineColor?: ColorDefinition;
    averageGlucoseLineColor?: ColorDefinition;
    emptyText?: string;
    hideIfNoData?: boolean;
    onClick?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: GlucoseChartProps) {
    const layoutContext = useContext(LayoutContext);
    const glucoseContext = useContext(GlucoseContext);
    const dateRangeContext = useContext(DateRangeContext);
    const mealContext = useContext(MealContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [glucose, setGlucose] = useState<Reading[]>();
    const [hasAnyGlucoseReadings, setHasAnyGlucoseReadings] = useState<boolean>();
    const [steps, setSteps] = useState<Reading[]>();
    const [sleepMinutes, setSleepMinutes] = useState<number>();

    const selectedDate = dateRangeContext?.intervalStart ?? startOfToday();
    const meals = mealContext?.meals ?? [];
    const selectedMeal = mealContext?.selectedMeal;

    const getGlucoseReadingsFromContext = () => {
        return Promise.resolve(glucoseContext?.readings?.filter(reading => isSameDay(selectedDate, reading.timestamp)) ?? []);
    };

    useInitializeView(() => {
        if (props.previewState === 'loading') {
            setLoading(true);
            return;
        }

        if (props.previewState) {
            previewData(props.previewState, selectedDate).then(({ glucose, hasAnyGlucoseReadings, steps, sleepMinutes }) => {
                setGlucose(glucose);
                setHasAnyGlucoseReadings(hasAnyGlucoseReadings);
                setSteps(steps);
                setSleepMinutes(sleepMinutes);
                setLoading(false);
            });
            return;
        }

        getCombinedDataCollectionSettings(true).then(combinedDataCollectionSettings => {
            Promise.all([
                glucoseContext?.readings ? getGlucoseReadingsFromContext() : getGlucoseReadings(selectedDate, selectedDate, combinedDataCollectionSettings),
                checkForGlucoseReadings(combinedDataCollectionSettings),
                getSteps(selectedDate, combinedDataCollectionSettings),
                getSleepMinutes(selectedDate, combinedDataCollectionSettings)
            ]).then(([glucose, hasAnyGlucoseReadings, steps, sleepMinutes]) => {
                setGlucose(glucose);
                setHasAnyGlucoseReadings(hasAnyGlucoseReadings);
                setSteps(steps);
                setSleepMinutes(sleepMinutes);
                setLoading(false);
            });
        });
    }, [], [props.previewState, dateRangeContext?.intervalStart]);

    if (loading && props.hideIfNoData) {
        return null;
    }

    if (!loading && props.hideIfNoData && !hasAnyGlucoseReadings) {
        return null;
    }

    const filteredGlucose = glucose?.filter(reading => {
        if (!selectedMeal) return true;

        const minDate = selectedMeal.timestamp;
        const maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return reading.timestamp >= minDate && reading.timestamp <= maxDate;
    }) ?? [];

    const filteredMeals = meals.filter(meal => {
        if (!glucose?.length) return false;
        if (!selectedMeal) return true;

        const minDate = selectedMeal.timestamp;
        const maxDate = add(selectedMeal.timestamp, { hours: 2 });

        return meal.timestamp >= minDate && meal.timestamp <= maxDate;
    });

    const chartData: { timestamp: Date, value?: number, mealValue?: number }[] = [];

    filteredGlucose.forEach(reading => {
        chartData.push({ timestamp: reading.timestamp, value: reading.value });
    });

    filteredMeals.forEach(meal => {
        chartData.push({ timestamp: meal.timestamp, mealValue: computeBestFitGlucoseValue(meal.timestamp, glucose!) });
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

    const customDot = (props: { cx: number, cy?: number, payload: { timestamp: Date, mealValue?: number } }) => {
        const { cx, cy, payload } = props;
        if (!cy || !payload.mealValue) return <></>;

        const mealIndex = meals.findIndex(meal => meal.timestamp === payload.timestamp);
        if (mealIndex < 0) return <></>;

        return <svg>
            <circle cx={cx} cy={cy} r={6} fill={getColorFromAssortment(mealIndex)} />
        </svg>;
    };

    const customDotLabel = (props: { x: number, y: number, index: number }) => {
        const { x, y, index } = props;
        if (!y) return <></>;

        const entry = chartData[index];
        if (!entry.mealValue) return <></>;

        const mealIndex = meals.findIndex(meal => meal.timestamp === entry.timestamp);
        if (mealIndex < 0) return <></>;

        return <text x={x} y={y} dy={3} fill="#fff" fontSize={8} textAnchor="middle">{mealIndex + 1}</text>;
    };

    const minGlucose = glucose?.length && props.variant === 'minimal' ? Math.min(...glucose.map(r => r.value)) : 0;
    const maxGlucose = glucose?.length && props.variant === 'minimal' ? Math.max(...glucose.map(r => r.value)) : 240;

    const filteredSteps = steps?.filter(reading => reading.value > 0) ?? [];
    const maxSteps = filteredSteps.length > 0 ? Math.max(...filteredSteps.map(r => r.value)) : 0;
    const stepsScale = maxSteps > 0 ? (maxGlucose - minGlucose) / maxSteps : 1;
    const overlaySteps = filteredSteps.map(r => ({ ...r, value: r.value * stepsScale + minGlucose }));

    return <GlucoseChartWrapper variant={props.variant} onClick={props.onClick} innerRef={props.innerRef}>
        {(loading || glucose?.length || props.variant !== 'minimal') &&
            <div className="mdhui-glucose-chart-title"><FontAwesomeSvgIcon icon={faDroplet} /> {language('glucose-chart-title')}</div>
        }
        {!loading && !glucose?.length && props.variant === 'minimal' &&
            <div className="mdhui-glucose-chart-title-empty">{props.emptyText ?? language('glucose-chart-no-data')}</div>
        }
        <div className="mdhui-glucose-chart-chart" style={{ display: !loading && glucose && glucose.length > 0 ? 'block' : 'none' }}>
            {props.variant === 'minimal' && props.showStats &&
                <GlucoseStats
                    loading={loading}
                    glucoseReadings={filteredGlucose}
                    steps={!selectedMeal ? filteredSteps : []}
                    sleepMinutes={!selectedMeal ? sleepMinutes : undefined}
                    variant={props.variant}
                />
            }
            <TimeSeriesChart
                intervalType="Day"
                intervalStart={selectedDate}
                data={chartData as any}
                series={[{ dataKey: 'value', color: props.glucoseLineColor ?? '#999' }, { dataKey: 'mealValue', color: 'transparent' }]}
                chartHasData={!!glucose && glucose.length > 0}
                chartType="Line"
                options={{
                    lineOptions: {
                        dot: customDot,
                        label: customDotLabel,
                        strokeWidth: 2,
                        animationDuration: 500,
                        connectNulls: true,
                        type: 'linear'
                    } as TimeSeriesChartLineOptions,
                    containerOptions: {
                        height: props.variant === 'minimal' ? 64 : 166
                    },
                    gridOptions: {
                        hide: props.variant === 'minimal'
                    },
                    xAxisOptions: {
                        height: props.variant === 'minimal' ? 0 : undefined,
                        domain: chartDomain,
                        ticks: chartTicks,
                        tickFormatter: chartTickFormatter
                    },
                    yAxisOptions: {
                        width: props.variant === 'minimal' ? 0 : 24,
                        domain: props.variant === 'minimal' ? [minGlucose - 10, maxGlucose + 10] : [0, 240],
                        ticks: props.variant === 'minimal' ? undefined : [40, 80, 120, 160, 200, 240]
                    }
                }}
            >
                {props.variant !== 'minimal' && glucoseContext?.recentAverage !== undefined &&
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
                    />
                }
            </TimeSeriesChart>
            {props.variant !== 'minimal' &&
                <FontAwesomeSvgIcon className="steps-icon" color="#f5b722" icon={faShoePrints} />
            }
        </div>
        <div className="mdhui-glucose-chart-chart-empty" style={{ display: !loading && !glucose?.length && props.variant !== 'minimal' ? 'block' : 'none' }}>{props.emptyText ?? language('glucose-chart-no-data')}</div>
        <div className="mdhui-glucose-chart-chart-placeholder" style={{ display: loading ? 'block' : 'none' }}>
            <LoadingIndicator />
        </div>
        {props.variant !== 'minimal' && props.showStats &&
            <GlucoseStats
                loading={loading}
                glucoseReadings={filteredGlucose}
                steps={!selectedMeal ? filteredSteps : []}
                sleepMinutes={!selectedMeal ? sleepMinutes : undefined}
            />
        }
    </GlucoseChartWrapper>;
}

interface GlucoseChartWrapperProps {
    variant?: GlucoseChartVariant;
    children?: React.ReactNode;
    onClick?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

function GlucoseChartWrapper(props: GlucoseChartWrapperProps) {
    const classes = ['mdhui-glucose-chart'];
    if (props.variant === 'minimal') {
        classes.push('mdhui-glucose-chart-minimal');
    }
    return <div className={classes.join(' ')} ref={props.innerRef}>
        {props.onClick &&
            <Action className='mdhui-glucose-chart-action' onClick={props.onClick} indicatorPosition='topRight'>
                {props.children}
            </Action>
        }
        {!props.onClick && props.children}
    </div>;
}