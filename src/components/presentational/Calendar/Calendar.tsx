import React from 'react';
import { getLocale } from '../../../helpers/locale';
import MyDataHelps from '@careevolution/mydatahelps-js';
import "./Calendar.css";

export interface CalendarProps {
	month: number,
	year: number,
	dayRenderer(year: number, month: number, day?: number): JSX.Element | null,
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
	className?: string
	innerRef?: React.Ref<HTMLDivElement>
}

interface CalendarWeek {
	days: CalendarDay[]
}

interface CalendarDay {
	day?: number
}

export default function (props: CalendarProps) {
	var weeks: CalendarWeek[] = []
	var locale = getLocale();

	var daysOfTheWeekIndices = Array.from(Array(7).keys());
	var weekStartsOn = props.weekStartsOn && props.weekStartsOn < 7 ? props.weekStartsOn : 0;
	if (weekStartsOn) {
		while (daysOfTheWeekIndices[0] !== weekStartsOn) {
			daysOfTheWeekIndices.push(daysOfTheWeekIndices.shift()!);
		}
	}

	const weekdays = daysOfTheWeekIndices.map((i) =>
		locale.localize?.day(i, { width: "narrow" })
	);

	var daysInMonth = function (m: number, y: number) {
		return 32 - new Date(y, m, 32).getDate();
	}

	var generateWeeks = function () {
		var firstDay = (new Date(props.year, props.month)).getDay() - weekStartsOn;
		if (firstDay < 0) {
			firstDay = 7 + firstDay;
		}
		var newWeeks: CalendarWeek[] = [];
		var date = 1;
		for (let i = 0; i < 6; i++) {
			var week: CalendarWeek = {
				days: []
			};
			for (let j = 0; j < 7; j++) {
				if (i === 0 && j < firstDay) {
					week.days[j] = { day: undefined };
				}
				else if (date > daysInMonth(props.month, props.year)) {
					break;
				}
				else {
					week.days[j] = { day: date };
					date++;
				}
			}
			newWeeks.push(week);
		}
		weeks = newWeeks;
	}

	generateWeeks();

	return (
		<div ref={props.innerRef} className={"mdhui-calendar" + (props.className ? ` ${props.className}` : "")}>
			<table cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						{weekdays.map((weekday, index) => <th key={index}>{weekday}</th>)}
					</tr>
				</thead>
				<tbody>
					{weeks.map((week, index) => {
						return <tr key={index}>
							{week.days.map((day, index) => {
								return <td key={index}>
									{props.dayRenderer(props.year, props.month, day.day)}
								</td>
							})}
						</tr>
					})}
				</tbody>
			</table>
		</div>
	)
}