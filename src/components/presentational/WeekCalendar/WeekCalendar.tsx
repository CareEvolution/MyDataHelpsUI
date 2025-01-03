import React, { useRef } from "react";
import { useEffect } from "react";
import "./WeekCalendar.css"
import { add, formatISO } from 'date-fns';
import { LoadingIndicator, UnstyledButton } from "..";
import debounce from 'lodash/debounce';
import { formatDateForLocale } from '../../../helpers/locale';
import { getDayOfWeekLetter } from "../../../helpers/date-helpers";

export interface WeekCalendarProps {
	selectedDate?: Date;
	hideDateLabel?: boolean;
	startDate: Date;
	onDateSelected?(date: Date): void;
	loading: boolean;
	onStartDateChange?(startDate: Date): void;
	dayRenderer(year: number, month: number, day: number, selectedWeek: boolean): JSX.Element | null;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: WeekCalendarProps) {
	const element = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (props.onStartDateChange) {
			var scrollListener = debounce(function (ev: Event) {
				if (element.current?.scrollLeft == 0) {
					props.onStartDateChange!(add(props.startDate, { weeks: -1 }));
					element.current?.removeEventListener("scroll", scrollListener);
				} else if (element.current?.clientWidth && element.current?.scrollLeft == element.current.clientWidth * 2) {
					props.onStartDateChange!(add(props.startDate, { weeks: 1 }));
					element.current?.removeEventListener("scroll", scrollListener);
				}
			}, 500);
			element.current?.addEventListener("scroll", scrollListener);
			return () => {
				element.current?.removeEventListener("scroll", scrollListener);
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
		if (element.current) {
			element.current.scrollLeft = window.innerWidth;
		}
	});

	if (element.current) {
		element.current.scrollLeft = window.innerWidth;
	}

	function getLabel(date: Date) {
		return <div className="mdhui-week-calendar-date-label">
			<div className="mdhui-week-calendar-day-of-week"> {getDayOfWeekLetter(date)}</div>
			<div className="mdhui-week-calendar-day-of-month">{formatDateForLocale(date, "d")}</div>
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

	function selectDate(date: Date) {
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