import React from "react";
import MicroTrend, { MicroTrendProps } from "./MicroTrend";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { argTypesToHide } from "../../../../.storybook/helpers";

export default {
    title: "Container/MicroTrend",
    component: MicroTrend,
    parameters: {
        layout: "fullscreen"
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

type SurveyResultMicroTrendStoryArgs = MicroTrendProps & {
    colorScheme: "auto" | "light" | "dark";
    label: string;
    surveyName: string;
    stepIdentifier: string;
    resultIdentifier: string;
    useEventAsDate: boolean;
    color: string;
    threshold: number;
    overThresholdColor: string;
    withIndicator: boolean;
};

export const SurveyResults = {
    args: {
        colorScheme: "auto",
        previewState: "default",
        chartPosition: "bottom",
        label: "Mood Rating",
        surveyName: "Daily Mood Assessment",
        stepIdentifier: "Mood Assessment Form",
        resultIdentifier: "Mood Assessment",
        useEventAsDate: false,
        color: "#2BA39F",
        threshold: undefined,
        overThresholdColor: undefined,
        withIndicator: false
    },
    argTypes: {
        colorScheme: {
            name: "color scheme",
            control: "radio",
            options: ["auto", "light", "dark"]
        },
        previewState: {
            name: "state",
            control: "radio",
            options: ["default", "no trend", "no data", "loading", "live"],
            mapping: {
                "no trend": "noTrend",
                "no data": "noData",
                "live": undefined
            }
        },
        chartPosition: {
            name: "chart position",
            control: "radio",
            options: ["bottom", "right", "responsive"]
        },
        label: {
            name: "label",
            control: "text"
        },
        surveyName: {
            name: "survey name",
            control: "text"
        },
        stepIdentifier: {
            name: "step identifier",
            control: "text"
        },
        resultIdentifier: {
            name: "result identifier",
            control: "text"
        },
        useEventAsDate: {
            name: "use event as date",
            control: "boolean"
        },
        color: {
            name: "color",
            control: "color"
        },
        threshold: {
            name: "threshold",
            control: "number"
        },
        overThresholdColor: {
            name: "over threshold color",
            control: "color"
        },
        withIndicator: {
            name: "with indicator",
            control: "boolean"
        },
        ...argTypesToHide(["date", "dataType", "hideIfNoRecentData", "indicator", "onClick", "innerRef"])
    },
    render: (args: SurveyResultMicroTrendStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <DateRangeCoordinator intervalType="Day">
                <Card>
                    <MicroTrend
                        {...args}
                        dataType={{
                            label: args.label,
                            rawDataType: {
                                surveyName: args.surveyName,
                                stepIdentifier: args.stepIdentifier,
                                resultIdentifier: args.resultIdentifier,
                                useEventAsDate: args.useEventAsDate
                            },
                            color: args.color,
                            threshold: args.threshold,
                            overThresholdColor: args.overThresholdColor
                        }}
                        indicator={args.withIndicator ? <FontAwesomeSvgIcon icon={faChevronRight} /> : undefined}
                    />
                </Card>
            </DateRangeCoordinator>
        </Layout>;
    }
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
            overThresholdColor: "rgba(255, 0, 0, 1)"
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