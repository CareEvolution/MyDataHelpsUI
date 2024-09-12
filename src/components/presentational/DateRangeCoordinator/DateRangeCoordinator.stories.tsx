import React, { useContext } from "react";
import { Card, DateRangeTitle, Layout } from "../../presentational";
import DateRangeCoordinator, { DateRangeContext, DateRangeCoordinatorProps } from "./DateRangeCoordinator";
import DailyDataChart from "../../container/DailyDataChart/DailyDataChart";
import { add, parseISO, startOfDay } from "date-fns";
import { DailyDataType } from "../../../helpers";
import { SurveyAnswerChart, WeeklyDayNavigator } from "../../container";
import { SurveyAnswer } from "@careevolution/mydatahelps-js";
import { noop } from "../../../helpers/functions";

export default { title: "Presentational/DateRangeCoordinator", component: DateRangeCoordinator, parameters: { layout: 'fullscreen' } };
let render = (args: DateRangeCoordinatorProps) => <Layout><DateRangeCoordinator {...args} /></Layout>

let children = <Card>
	<DailyDataChart title="Steps"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		dailyDataType={DailyDataType.Steps}
		chartType="Line"
		previewState="default" />
	<SurveyAnswerChart title="Pain Score"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		chartType="Line"
		series={[{ dataKey: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }]}
		previewDataProvider={(start: Date, end: Date) => {
			function generateSurveyResponse(date: Date, resultIdentifier: string, surveyName: string): SurveyAnswer {
				return {
					"id": "00000000-0000-0000-0000-000000000000",
					"surveyID": "00000000-0000-0000-0000-000000000000",
					"surveyResultID": "00000000-0000-0000-0000-000000000000",
					"surveyVersion": 0,
					"surveyName": surveyName,
					"surveyDisplayName": surveyName,
					"date": date.toISOString(),
					"stepIdentifier": resultIdentifier,
					"resultIdentifier": resultIdentifier,
					"answers": [
						(Math.random() * 90 + 10).toString()
					],
					"insertedDate": date.toISOString()
				};
			}
			let data = [];
			let currentDate = new Date(start);
			while (currentDate < end) {
				data.push(generateSurveyResponse(currentDate, "PainToday", 'Pain Survey'));
				currentDate = add(currentDate, { days: 7 });
			}
			let standardData: SurveyAnswer[][] = [data];
			return Promise.resolve(standardData);
		}} />
	<DailyDataChart title="Steps"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		dailyDataType={DailyDataType.Steps}
		chartType="Line"
		previewState="default"
	/><DailyDataChart title="Steps"
		intervalType="Week"
		weekStartsOn="6DaysAgo"
		dailyDataType={DailyDataType.Steps}
		chartType="Line"
		previewState="default" />
</Card>;

export const day = {
	args: {
		variant: "rounded",
		initialIntervalStart: new Date(),
		intervalType: "Day",
		children: <DateRangeTitle defaultMargin />
	},
	render: render
};

export const month = {
	args: {
		variant: "rounded",
		intervalType: "Month",
		children: children
	},
	render: render
};

export const monthNotFirstDay = {
	args: {
		variant: "rounded",
		intervalType: "Month",
		children: children,
		initialIntervalStart: startOfDay(new Date(2024, 3, 10))
	},
	render: render
};

export const weekStartsSunday = {
	args: {
		variant: "rounded",
		intervalType: "Week",
		weekStartsOn: "Sunday",
		children: children
	},
	render: render
};

export const weekStarts6DaysAgo = {
	args: {
		variant: "default",
		intervalType: "Week",
		weekStartsOn: "6DaysAgo",
		children: children
	},
	render: render
};


export const sixMonth = {
	args: {
		variant: "rounded",
		intervalType: "6Month",
		children: children
	},
	render: render
};

export const sixMonthNotFirstDayFirstHalf = {
	args: {
		variant: "rounded",
		intervalType: "6Month",
		children: children,
		initialIntervalStart: startOfDay(new Date(2024, 3, 10))
	},
	render: render
};

export const sixMonthNotFirstDaySecondHalf = {
	args: {
		variant: "rounded",
		intervalType: "6Month",
		children: children,
		initialIntervalStart: startOfDay(new Date(2024, 3, 20))
	},
	render: render
};

function CustomNavigator() {
    const dateRangeContext = useContext(DateRangeContext);
    const emojis = [<>&#128512;</>, <>&#128513;</>, <>&#128514;</>, <>&#128515;</>, <>&#128516;</>, <>&#128517;</>];

    return <WeeklyDayNavigator
        selectedDate={dateRangeContext!.intervalStart}
        loadData={() => Promise.resolve()}
        dayRenderer={(dayKey: string) => <div style={{ paddingTop: '4px', textAlign: 'center' }}>{emojis[parseISO(dayKey).getDate() % emojis.length]}</div>}
    />
}

export const customNavigator = {
    args: {
        variant: "rounded",
        initialIntervalStart: new Date(),
        intervalType: "Day",
        useCustomNavigator: true,
        children: <>
            <CustomNavigator />
			<DateRangeTitle defaultMargin />
        </>
    },
    render: render
};
