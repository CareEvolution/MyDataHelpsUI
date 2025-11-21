import { Calendar, CalendarDay, CalendarDayState, Card, DateRangeContext, InsightsBadge, InsightsRenderingContext, InsightsStateContext, LayoutContext, LoadingIndicator, TextBlock, WeekCalendar } from '../index';
import React, { Ref, useContext, useMemo } from 'react';
import { isAfter, startOfMonth } from 'date-fns';
import { getDayKey, resolveColor } from '../../../helpers';
import './InsightsCalendar.css';
import { InsightsDataContext } from '../../container';
import { getDayOfWeekLetter } from '../../../helpers/date-helpers';

export interface InsightsCalendarProps {
    showLegend?: boolean;
    highlightedBadgesOnly?: boolean;
    innerRef?: Ref<HTMLDivElement>;
}

export default function InsightsCalendar(props: InsightsCalendarProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);
    const insightsDataContext = useContext(InsightsDataContext);
    const insightsStateContext = useContext(InsightsStateContext);
    const insightsRenderingContext = useContext(InsightsRenderingContext);

    if (!insightsDataContext) {
        return <TextBlock innerRef={props.innerRef}>Error: InsightsCalendar must be used within an InsightsDataCoordinator.</TextBlock>;
    }

    const intervalStart = useMemo<Date>(
        () => dateRangeContext?.intervalStart ?? startOfMonth(new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        const insightsData = insightsDataContext.insightsData[getDayKey(date)];
        const calendarDayStates = insightsStateContext?.computeStatesForDay(date, insightsData) ?? [];
        if (calendarDayStates.length === 0 && isAfter(date, new Date())) {
            calendarDayStates.push({ style: { cursor: 'default' } });
        }
        return calendarDayStates;
    };

    const onDayClicked = (date: Date): void => {
        if (isAfter(date, new Date())) return;
        insightsDataContext.enterSurveyLog(date);
    };

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        return <CalendarDay
            year={year}
            month={month}
            day={day}
            computeStatesForDay={computeStatesForDay}
            onClick={onDayClicked}
            multiStateStartAngle={insightsStateContext?.multiStateStartAngle}
        />;
    };

    return <div className="mdhui-insights-calendar" ref={props.innerRef}>
        <Card>
            {dateRangeContext?.intervalType === 'Week'
                ? <WeekCalendar
                    minimumDate={intervalStart}
                    startDate={intervalStart}
                    onDateSelected={onDayClicked}
                    dayRenderer={(year: number, month: number, day?: number): React.JSX.Element => {
                        const date = new Date(year, month, day);
                        const insightsData = insightsDataContext.insightsData[getDayKey(date)];

                        const badges = insightsData
                            ? insightsRenderingContext?.badgeConfigurations
                                ?.filter(configuration => !props.highlightedBadgesOnly || configuration.shouldHighlight(insightsData))
                                .map((configuration, index) => {
                                    return <InsightsBadge key={index} variant="xsmall" configuration={configuration} data={insightsData} />;
                                })
                            : undefined;

                        return <div className="mdhui-insights-week-calendar-day">
                            <div className="mdhui-insights-week-calendar-day-label">{getDayOfWeekLetter(date)}</div>
                            {renderDay(year, month, day)}
                            <div className="mdhui-insights-week-calendar-day-footer">
                                {badges && <div className="mdhui-insights-week-calendar-day-badges">{badges}</div>}
                            </div>
                        </div>;
                    }}
                    hideDateLabel
                    loading={insightsDataContext.loading}
                />
                : <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
            }
            {(insightsDataContext.loading || (props.showLegend && !!insightsStateContext?.legend?.length)) &&
                <div className="mdhui-insights-calendar-footer">
                    {(props.showLegend && !!insightsStateContext?.legend?.length) &&
                        <div className="mdhui-insights-calendar-legend">
                            {insightsStateContext.legend.map(state => {
                                const backgroundColor = resolveColor(layoutContext.colorScheme, state.backgroundColor) ?? 'var(--mdhui-border-color-2)';
                                const borderColor = resolveColor(layoutContext.colorScheme, state.borderColor) ?? backgroundColor;
                                return <div key={state.label} className="mdhui-insights-calendar-legend-entry">
                                    <div className="mdhui-insights-calendar-legend-entry-color" style={{
                                        background: backgroundColor,
                                        border: `2px solid ${borderColor}`,
                                        ...state.style
                                    }}>&nbsp;</div>
                                    <div className="mdhui-insights-calendar-legend-entry-label">{state.label}</div>
                                </div>;
                            })}
                        </div>
                    }
                    {insightsDataContext.loading && <LoadingIndicator className="mdhui-insights-calendar-loading-indicator" />}
                </div>
            }
        </Card>
    </div>;
}