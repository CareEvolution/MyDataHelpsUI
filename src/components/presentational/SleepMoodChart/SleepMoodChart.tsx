import React, { useContext, useMemo } from 'react'
import { format, subDays } from 'date-fns'
import { CardTitle, LayoutContext } from '..'
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Text } from 'recharts'
import './SleepMoodChart.css'
import { resolveColor } from '../../../helpers/colors'
import language from "../../../helpers/language"

export interface SleepMoodDataPoint {
    date: Date;
    sleepHours: number;
    mood: number; // 1-5 scale
}

export interface SleepMoodChartProps {
    title?: string;
    data: SleepMoodDataPoint[];
    isLoading?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SleepMoodChart(props: SleepMoodChartProps) {
    const layoutContext = useContext(LayoutContext);
    const { title, data, isLoading } = props;

    // Transform data for the chart
    const chartData = data.map(point => ({
        date: point.date,
        sleepHours: point.sleepHours,
        mood: point.mood,
        // Format date for display in tooltip
        formattedDate: point.date.toLocaleDateString()
    }));

    // Calculate summary statistics
    const summaryStats = useMemo(() => {
        if (!data.length) return { goodSleepMood: 0, poorSleepMood: 0 };
        
        const goodSleepEntries = data.filter(d => d.sleepHours >= 7.5);
        const poorSleepEntries = data.filter(d => d.sleepHours < 6);
        
        const goodSleepMood = goodSleepEntries.length 
            ? goodSleepEntries.reduce((sum, entry) => sum + entry.mood, 0) / goodSleepEntries.length 
            : 0;
            
        const poorSleepMood = poorSleepEntries.length 
            ? poorSleepEntries.reduce((sum, entry) => sum + entry.mood, 0) / poorSleepEntries.length 
            : 0;
            
        return {
            goodSleepMood: Number(goodSleepMood.toFixed(1)),
            poorSleepMood: Number(poorSleepMood.toFixed(1))
        };
    }, [data]);

    // Custom tooltip to show date, sleep hours, and mood
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="mdhui-sleep-mood-tooltip">
                    <p className="mdhui-sleep-mood-tooltip-date">
                        {data.formattedDate}
                    </p>
                    <p className="mdhui-sleep-mood-tooltip-sleep">
                        {language('sleep')}: {data.sleepHours} {language('hours')}
                    </p>
                    <p className="mdhui-sleep-mood-tooltip-mood">
                        {language('mood')}: {data.mood}/5
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom axis labels for "Today" and "15 days ago"
    const CustomXAxisTick = (props: any) => {
        const { x, y, payload, index, visibleTicksCount } = props;
        const isFirst = index === 0;
        const isLast = index === visibleTicksCount - 1;
        
        if (!isFirst && !isLast) return null;
        
        const text = isFirst 
            ? format(subDays(new Date(), 14), 'MMM d') 
            : 'Today';
        
        const xPos = isFirst ? x : x + 5;
        const textAnchor = isFirst ? 'start' : 'end';
        
        return (
            <Text 
                x={xPos} 
                y={y + 10} 
                textAnchor={textAnchor} 
                verticalAnchor="start" 
                fill="var(--mdhui-text-color-2)"
                fontSize={12}
            >
                {text}
            </Text>
        );
    };

    // Get color for the mood line
    const getMoodLineColor = () => {
        return resolveColor(layoutContext.colorScheme, "#429bdf"); // Blue color for mood line
    };

    // Get color for the sleep bars
    const getSleepBarColor = () => {
        return resolveColor(layoutContext.colorScheme, "#5db37e"); // Green color for sleep bars
    };

    return (
        <div className="mdhui-sleep-mood-chart" ref={props.innerRef}>
            {title && <CardTitle title={title} />}
            
            {/* Summary badges */}
            {!isLoading && data.length > 0 && (
                <div className="summary-badges">
                    <div className="summary-badge">
                        <div className="badge-icon good-sleep-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M8 14C8.5 15.5 10 17 12 17C14 17 15.5 15.5 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                                <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="badge-content">
                            <div className="badge-label">Mood with 7.5+ hrs sleep</div>
                            <div className="badge-value">{summaryStats.goodSleepMood}/5</div>
                        </div>
                    </div>
                    <div className="summary-badge">
                        <div className="badge-icon poor-sleep-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M8 16C8.5 14.5 10 13 12 13C14 13 15.5 14.5 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                                <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="badge-content">
                            <div className="badge-label">Mood with &lt;6 hrs sleep</div>
                            <div className="badge-value">{summaryStats.poorSleepMood}/5</div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="chart-container">
                {isLoading && <div className="loading-indicator">{language('loading')}</div>}
                {!isLoading && data.length === 0 && <div className="no-data-label">{language('no-data')}</div>}
                {!isLoading && data.length > 0 && (
                    <ResponsiveContainer width="100%" height={200}>
                        <ComposedChart data={chartData} margin={{ top: 10, right: 5, bottom: 20, left: 5 }}>
                            <XAxis 
                                dataKey="date" 
                                tick={<CustomXAxisTick />}
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                            />
                            <YAxis 
                                yAxisId="sleep"
                                orientation="left"
                                domain={[0, 12]} // Sleep hours typically 0-12
                                tick={false}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis 
                                yAxisId="mood"
                                orientation="right"
                                domain={[0.5, 5.5]} // Mood scale 1-5
                                tick={false}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            
                            {/* Translucent bars for sleep hours */}
                            <Bar 
                                yAxisId="sleep"
                                dataKey="sleepHours" 
                                fill={getSleepBarColor()} 
                                fillOpacity={0.4}
                                radius={[2, 2, 0, 0]}
                                name="Sleep"
                                barSize={15}
                            />
                            
                            {/* Line for mood */}
                            <Line 
                                yAxisId="mood"
                                type="monotone" 
                                dataKey="mood" 
                                stroke={getMoodLineColor()} 
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                name="Mood"
                                connectNulls
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
