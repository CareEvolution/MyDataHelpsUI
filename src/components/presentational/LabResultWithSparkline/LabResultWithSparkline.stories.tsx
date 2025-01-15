import React from "react"
import LabResultWithSparkline, { LabResultWithSparklineProps } from "./LabResultWithSparkline"
import Card from "../Card"
import Layout from "../Layout"
import { TermInformationReference } from "../../container/TermInformation/TermInformation"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof LabResultWithSparkline> = {
	title: "Presentational/LabResultWithSparkline",
	component: LabResultWithSparkline,
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;
type Story = StoryObj<typeof LabResultWithSparkline>;

const render = (args: LabResultWithSparklineProps) => <Layout>
    <Card>
        <LabResultWithSparkline {...args} />
    </Card>
</Layout>;

export const Default: Story = {
    args: {
        onViewTermInfo(termInfo : TermInformationReference) {
            console.log(termInfo);
        },
        labResultValue: {
            "Type": "Cholesterol",
            "MostRecentValue": "135.0",
            "MostRecentDate": "2021-02-27T08:25:00-05:00",
            "AcuityHighlight": "High",
            "SparklinePoints": [
                {
                    "X": 0.26607461339442717,
                    "Y": 0.39583333333333337
                },
                {
                    "X": 0.39133128690572083,
                    "Y": 0.39583333333333337
                },
                {
                    "X": 0.45430185500975911,
                    "Y": 0.35416666666666663
                }
            ],
            "NormalRangeTopY": 0.08333333333333337,
            "NormalRangeBottomY": 0.91666666666666663,
            "TermInformation": {
                "TermNamespace": "LOINC",
                "TermCode": "2093-3",
                "TermFamily": "Reference"
            }
        }
    },
	render: render
};