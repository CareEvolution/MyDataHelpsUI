import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { format, isToday, sub } from 'date-fns';
import React from 'react';
import UnstyledButton from '../UnstyledButton';
import "./DateRangeNavigator.css"
import MyDataHelps from "@careevolution/mydatahelps-js"
import add from 'date-fns/add'
import { getLocale } from '../../../helpers/locale';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import language from '../../../helpers/language';

export interface DateRangeNavigatorProps {
	intervalType: "Day" | "Week" | "Month";
	intervalStart: Date;
	variant?: "default" | "rounded";
	onIntervalChange(newIntervalStart: Date, newIntervalEnd: Date): void;
	className?: string;
	innerRef?: React.Ref<HTMLDivElement>;
	sticky?: boolean;
}

export default function (props: DateRangeNavigatorProps) {
	var duration: Duration = props.intervalType == "Month" ? { months: 1 } : props.intervalType == "Day" ? { days: 1 } : { weeks: 1 };

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
		var locale = getLocale();
		function capitalizeFirstLetter(string: string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		return capitalizeFirstLetter(format(new Date(props.intervalStart.getFullYear(), props.intervalStart.getMonth(), 1, 0, 0, 0, 0), "MMMM", { locale: locale }));
	}

	let classes = ["mdhui-date-range-navigator"]
	if (props.variant == "rounded") {
		classes.push("mdhui-date-range-navigator-rounded");
	}
	if (props.sticky) {
		classes.push("mdhui-date-range-navigator-sticky");
	}
	if (props.className) {
		classes.push(props.className);
	}

	return (
		<div ref={props.innerRef} className={classes.join(" ")}>
			<div className="mdhui-date-range-navigator-inner">
				<UnstyledButton title="Previous" className="navigator-button navigate-previous" onClick={() => previousInterval()}>
					<FontAwesomeSvgIcon icon={faChevronLeft} />
				</UnstyledButton>
				{props.intervalType == "Month" && props.intervalStart.getDate() == 1 &&
					<div>
						{getMonthName()} {props.intervalStart.getFullYear()}
					</div>
				}
				{(props.intervalType == "Week" || (props.intervalType == "Month" && props.intervalStart.getDate() != 1)) &&
					<div>
						{format(props.intervalStart, "MM/dd/yyyy")}&nbsp;-&nbsp;
						{format(sub(intervalEnd, { days: 1 }), "MM/dd/yyyy")}
					</div>
				}
				{(props.intervalType == "Day") &&
					<div>
						{isToday(props.intervalStart) ? language("today") : format(props.intervalStart, "MM/dd/yyyy")}
					</div>
				}
				{!isCurrentInterval &&
					<UnstyledButton title="Next" className="navigator-button navigate-next" onClick={() => nextInterval()}>
						<FontAwesomeSvgIcon icon={faChevronRight} />
					</UnstyledButton>
				}
			</div>
		</div>
	);
}