import React from "react";
import language from "../../../helpers/language";
import { DailyDataType } from "../../../helpers";
import MonthCharts, {
  MonthChartsPreviewState,
} from "../MonthCharts/MonthCharts";

export interface HealthConnectMonthChartsProps {
  previewState?: MonthChartsPreviewState;
}

export default function (props: HealthConnectMonthChartsProps) {
  return (
    <MonthCharts
      previewState={props.previewState}
      charts={[
        {
          lines: [
            {
              showAverage: true,
              dailyDataType: DailyDataType.HealthConnectTotalExerciseMinutes,
              label: language("steps"),
            },
          ],
          title: language("steps"),
          syncId: "health-connect",
        },
        {
          lines: [
            {
              showAverage: true,
              dailyDataType: DailyDataType.HealthConnectAverageRestingHeartRate,
              label: language("resting-heart-rate"),
            },
          ],
          title: language("resting-heart-rate"),
          syncId: "health-connect",
        },
      ]}
    />
  );
}
