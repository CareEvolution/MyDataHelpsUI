import React from "react"
import MicroTrend, { MicroTrendProps } from "./MicroTrend";
import { Card, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default {
    title: "Container/MicroTrend",
    component: MicroTrend,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: MicroTrendProps) => <Layout colorScheme="auto">
    <Card><MicroTrend {...args} /></Card>
</Layout>;

export const StepsNoThreshold = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        },
        previewState: "default"
    },
    render: render
};

export const StepsWithThresholds = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)",
            threshold: 7000,
            overThresholdColor: "rgba(255, 0, 0, 1)"
        },
        previewState: "default"
    },
    render: render
};

export const StepsLoading = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        },
        previewState: "loading"
    },
    render: render
};


export const StepsNoTrend = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        },
        previewState: "noTrend"
    },
    render: render
};

export const ChartRight = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        },
        previewState: "default",
        chartPosition: "right"
    },
    render: render
};

export const ChartResponsive = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        },
        previewState: "default",
        chartPosition: "responsive"
    },
    render: render
};

export const WithIndicator = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        },
        previewState: "default",
        chartPosition: "right",
        indicator: <FontAwesomeSvgIcon icon={faChevronRight} />
    },
    render: render
};

export const WithClickHandler = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)",
            threshold: 7000,
            overThresholdColor: "rgba(255, 0, 0, 1)",
        },
        previewState: "default",
        onClick: () => {
            alert("Clicked!");
        }
    },
    render: render
};


export const LiveAirQuality = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.AirQuality,
            color: "rgba(255, 166, 102, 1)"
        },
        hideIfNoRecentData: true,
        onClick: () => {
            alert("Clicked!");
        }
    },
    render: render
};


export const LiveSteps = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        }
    },
    render: render
};