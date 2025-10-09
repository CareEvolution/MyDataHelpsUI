import React, { useRef } from "react";
import { useEffect } from "react";
import "./WeekCalendar.css";
import { add, formatISO } from 'date-fns';
import { LoadingIndicator, UnstyledButton } from "..";
import debounce from 'lodash/debounce';
import { getDayOfWeekLetter, getDayOfMonth } from "../../../helpers/date-helpers";

export interface WeekCalendarProps {
	minimumDate?: Date;
	selectedDate?: Date;
	hideDateLabel?: boolean;
	startDate: Date;
	onDateSelected?(date: Date): void;
	loading: boolean;
	onStartDateChange?(startDate: Date): void;
	dayRenderer(year: number, month: number, day: number, selectedWeek: boolean): JSX.Element | null;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function WeekCalendar(props: WeekCalendarProps) {
	const element = useRef<HTMLDivElement>(null);

	const canScrollBackward = !props.minimumDate || props.startDate > props.minimumDate;

	useEffect(() => {
		if (props.onStartDateChange) {
			var scrollListener = debounce(function (ev: Event) {
				if (canScrollBackward && element.current?.scrollLeft == 0) {
					props.onStartDateChange!(add(props.startDate, { weeks: -1 }));
					element.current?.removeEventListener("scroll", scrollListener);
				} else if (element.current?.clientWidth && element.current?.scrollLeft == element.current.clientWidth * (canScrollBackward ? 2 : 1)) {
					props.onStartDateChange!(add(props.startDate, { weeks: 1 }));
					element.current?.removeEventListener("scroll", scrollListener);
				}
			}, 500);
			element.current?.addEventListener("scroll", scrollListener);
			return () => {
				element.current?.removeEventListener("scroll", scrollListener);
			}
		}
	}, [props.onStartDateChange, canScrollBackward, props.startDate]);

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
		if (element.current) {
			element.current.scrollLeft = canScrollBackward ? window.innerWidth : 0;
		}
	});

	if (element.current) {
		element.current.scrollLeft = canScrollBackward ? window.innerWidth : 0;
	}

	function getLabel(date: Date) {
		return <div className="mdhui-week-calendar-date-label">
			<div className="mdhui-week-calendar-day-of-week"> {getDayOfWeekLetter(date)}</div>
			<div className="mdhui-week-calendar-day-of-month">{getDayOfMonth(date)}</div>
		</div>
	}

	function getDayClasses(date: Date) {
		var classes = ["mdhui-week-calendar-day"];
		if (props.minimumDate && date < props.minimumDate) {
			classes.push("mdhui-week-calendar-day-disabled");
		} else if (date > new Date()) {
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

	function selectDate(date: Date) {
		if (props.minimumDate && date < props.minimumDate) {
			return;
		}
		if (date > new Date()) {
			return;
		}
		if (!props.onDateSelected) {
			return;
		}
		props.onDateSelected(date);
	}

	return <div ref={props.innerRef}>
		<div className="mdhui-week-calendar" ref={element}>
			{props.loading &&
				<div className="mdhui-week-calendar-loading">
					<LoadingIndicator />
				</div>
			}
			{canScrollBackward &&
				<div className="mdhui-week-calendar-week">
					{previousWeek.map((d) =>
						<div key={d.getTime()} className="mdhui-week-calendar-day">
							{props.dayRenderer(d.getFullYear(), d.getMonth(), d.getDate(), false)}
							{!props.hideDateLabel && getLabel(d)}
						</div>
					)}
				</div>
			}
			<div className="mdhui-week-calendar-week">
				{currentWeek.map((d) =>
					<UnstyledButton key={d.getTime()}
						className={getDayClasses(d).join(" ")}
						onClick={() => selectDate(d)}>
						{props.dayRenderer(d.getFullYear(), d.getMonth(), d.getDate(), true)}
						{!props.hideDateLabel && getLabel(d)}
					</UnstyledButton>
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
		</div>
	</div>;
}