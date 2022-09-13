import React, { useRef } from "react";
import { useEffect } from "react";
import "./WeekCalendar.css"
import { add, format, formatISO } from 'date-fns';
import { LoadingIndicator } from "..";

export interface WeekCalendarProps {
	selectedDate?: Date;
	hideDateLabel?: boolean;
	startDate: Date;
	onDateSelected?(date: Date): void;
	loading: boolean;
	onStartDateChange?(startDate: Date): void;
	dayRenderer(year: number, month: number, day: number, selectedWeek: boolean): JSX.Element | null;
}

export default function (props: WeekCalendarProps) {
	const weekNavigator = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (props.onStartDateChange) {
			var scrollListener = function (ev: Event) {
				if (weekNavigator.current?.scrollLeft == 0) {
					props.onStartDateChange!(add(props.startDate, { weeks: -1 }));
					weekNavigator.current?.removeEventListener("scroll", scrollListener);
				} else if (weekNavigator.current?.scrollLeft == window.innerWidth * 2) {
					props.onStartDateChange!(add(props.startDate, { weeks: 1 }));
					weekNavigator.current?.removeEventListener("scroll", scrollListener);
				}
			};
			weekNavigator.current?.addEventListener("scroll", scrollListener);
			return () => {
				weekNavigator.current?.removeEventListener("scroll", scrollListener);
			}
		}
	}, [props.startDate])

	var previousWeek: Date[] = [];
	var currentWeek: Date[] = [];
	var followingWeek: Date[] = [];
	var currentDate: Date = add(props.startDate, { days: -7 });
	for (var i = 0; i < 21; i++) {
		if (i < 7) {
			previousWeek.push(currentDate);
		} else if (i < 14) {
			currentWeek.push(currentDate);
		} else {
			followingWeek.push(currentDate);
		}
		currentDate = add(currentDate, { days: 1 });
	}

	useEffect(() => {
		if (weekNavigator.current) {
			weekNavigator.current.scrollLeft = window.innerWidth;
		}
	});

	if (weekNavigator.current) {
		weekNavigator.current.scrollLeft = window.innerWidth;
	}

	function getLabel(date: Date) {
		return <div className="mdhui-week-calendar-date-label">
			<div className="mdhui-week-calendar-day-of-week"> {format(date, "E").substr(0, 1)}</div>
			<div className="mdhui-week-calendar-day-of-month">{format(date, "d")}</div>
		</div>
	}

	function getDayClasses(date: Date) {
		var classes = ["mdhui-week-calendar-day"];
		if (date > new Date()) {
			classes.push("mdhui-week-calendar-day-future");
		}
		else if (props.onDateSelected) {
			classes.push("mdhui-week-calendar-day-selectable");
		}
		if (props.selectedDate && formatISO(date).substr(0, 10) == formatISO(props.selectedDate).substr(0, 10)) {
			classes.push("mdhui-week-calendar-day-selected");
		}
		return classes;
	}

	return <div className="mdhui-week-calendar" ref={weekNavigator}>
		{props.loading &&
			<div className="mdhui-week-calendar-loading">
				<LoadingIndicator />
			</div>
		}
		<div className="mdhui-week-calendar-week">
			{previousWeek.map((d) =>
				<div key={d.getTime()} className="mdhui-week-calendar-day">
					{props.dayRenderer(d.getFullYear(), d.getMonth(), d.getDate(), false)}
					{!props.hideDateLabel && getLabel(d)}
				</div>
			)}
		</div>
		<div className="mdhui-week-calendar-week">
			{currentWeek.map((d) =>
				<div key={d.getTime()}
					className={getDayClasses(d).join(" ")}
					onClick={() => props.onDateSelected ? props.onDateSelected(d) : undefined}>
					{props.dayRenderer(d.getFullYear(), d.getMonth(), d.getDate(), true)}
					{!props.hideDateLabel && getLabel(d)}
				</div>
			)}
		</div>
		{add(props.startDate, { days: 7 }) < new Date() &&
			<div className="mdhui-week-calendar-week">
				{followingWeek.map((d) =>
					<div key={d.getTime()} className={getDayClasses(d).join(" ")}>
						{props.dayRenderer(d.getFullYear(), d.getMonth(), d.getDate(), false)}
						{!props.hideDateLabel && getLabel(d)}
					</div>
				)}
			</div>
		}
	</div>;
}