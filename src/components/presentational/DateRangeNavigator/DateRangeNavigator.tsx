import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, sub } from 'date-fns';
import React from 'react';
import "./DateRangeNavigator.css"
import MyDataHelps from "@careevolution/mydatahelps-js"
import add from 'date-fns/add'
import { enUS, es } from 'date-fns/locale';

export interface DateRangeNavigatorProps {
	intervalType: "Week" | "Month";
	intervalStart: Date;
	onIntervalChange(newIntervalStart: Date, newIntervalEnd: Date): void;
}

export default function (props: DateRangeNavigatorProps) {
	var duration: Duration = props.intervalType == "Month" ? { months: 1 } : { weeks: 1 };

	var nextInterval = function () {
		var newIntervalStart = add(props.intervalStart, duration);
		props.onIntervalChange(newIntervalStart, add(newIntervalStart, duration));
	}

	var previousInterval = function () {
		var newIntervalStart = sub(props.intervalStart, duration);
		props.onIntervalChange(newIntervalStart, add(newIntervalStart, duration));
	}

	var intervalEnd = add(props.intervalStart, duration);
	var isCurrentInterval = false;
	var currentDate = new Date();
	if (props.intervalStart <= currentDate && currentDate < intervalEnd) {
		isCurrentInterval = true;
	}

	function getMonthName() {
		var locale = MyDataHelps.getCurrentLanguage() == "es" ? es : enUS;
		function capitalizeFirstLetter(string: string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		return capitalizeFirstLetter(format(new Date(props.intervalStart.getFullYear(), props.intervalStart.getMonth(), 1, 0, 0, 0, 0), "MMMM", { locale: locale }));
	}

	return (
		<div className="mdhui-date-range-navigator">
			<div className="navigator-button navigate-previous" onClick={() => previousInterval()}>
				<FontAwesomeIcon icon={faChevronLeft} />
			</div>
			{props.intervalType == "Month" && props.intervalStart.getDate() == 1 &&
				<div>
					{getMonthName()} {props.intervalStart.getFullYear()}
				</div>
			}
			{(props.intervalType == "Week" || props.intervalStart.getDate() != 1) &&
				<div>
					{format(props.intervalStart, "MM/dd/yyyy")}&nbsp;-&nbsp;
					{format(sub(intervalEnd, { days: 1 }), "MM/dd/yyyy")}
				</div>
			}
			{!isCurrentInterval &&
				<div className="navigator-button navigate-next" onClick={() => nextInterval()}>
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
			}
		</div>
	);
}