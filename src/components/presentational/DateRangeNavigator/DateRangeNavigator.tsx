import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Duration, sub, add } from 'date-fns';
import React from 'react';
import UnstyledButton from '../UnstyledButton';
import "./DateRangeNavigator.css"
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { titleForDateRange } from '../../../helpers/date-helpers';

export interface DateRangeNavigatorProps {
	intervalType: "Day" | "Week" | "Month" | "6Month";
	intervalStart: Date;
	variant?: "default" | "rounded";
	onIntervalChange(newIntervalStart: Date, newIntervalEnd: Date): void;
	className?: string;
	innerRef?: React.Ref<HTMLDivElement>;
	sticky?: boolean;
}

export default function DateRangeNavigator(props: DateRangeNavigatorProps) {
	const duration: Duration = props.intervalType === "Month" ? { months: 1 }
		: props.intervalType === "Day" ? { days: 1 }
			: props.intervalType === "6Month" ? { months: 6 }
				: { weeks: 1 };

	const nextInterval = () => {
		var newIntervalStart = add(props.intervalStart, duration);
		props.onIntervalChange(newIntervalStart, add(newIntervalStart, duration));
	}

	var previousInterval = () => {
		var newIntervalStart = sub(props.intervalStart, duration);
		props.onIntervalChange(newIntervalStart, add(newIntervalStart, duration));
	}

	var intervalEnd = add(props.intervalStart, duration);
	var isCurrentInterval = false;
	var currentDate = new Date();
	if (props.intervalStart <= currentDate && currentDate < intervalEnd) {
		isCurrentInterval = true;
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
				{titleForDateRange(props.intervalType, props.intervalStart)}
				{!isCurrentInterval &&
					<UnstyledButton title="Next" className="navigator-button navigate-next" onClick={() => nextInterval()}>
						<FontAwesomeSvgIcon icon={faChevronRight} />
					</UnstyledButton>
				}
			</div>
		</div>
	);
}