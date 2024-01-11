import React from "react";
import { Action, Button, Card, DateRangeCoordinator, Layout, Title } from "../../../presentational";
import { BloodPressureVisualization, SeverityCalendar } from "../../../container";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { faPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import language from "../../../../helpers/language";
import { SurveyBloodPressureDataParameters } from "../../../../helpers/blood-pressure-data-providers";

export type KidneyHealthDataPreviewState = "Default" | "NoData";

export interface KidneyHealthDataViewProps {
    colorScheme?: "light" | "dark" | "auto",
    bloodPressureSurveyName: string,
    bloodPressureDateResultIdentifier: string,
    bloodPressureSystolicResultIdentifier: string,
    bloodPressureDiastolicResultIdentifier: string,
    bloodPressureInfoSurveyName?: string,
    swellingSurveyName: string,
    swellingDateRecordedResultIdentifier?: string,
    swellingSeverityResultIdentifier: string,
    swellingInfoSurveyName?: string,
    previewState?: KidneyHealthDataPreviewState
}

export default function (props: KidneyHealthDataViewProps) {
    const bpVisualizationProps: SurveyBloodPressureDataParameters = {
        surveyName: props.bloodPressureSurveyName,
        dateResultIdentifier: props.bloodPressureDateResultIdentifier,
        systolicResultIdentifier: props.bloodPressureSystolicResultIdentifier,
        diastolicResultIdentifier: props.bloodPressureDiastolicResultIdentifier
    }

    const severityValueMapper = (severityValue: string) => {
        switch (severityValue) {
            case 'mild':
            case 'severity1':
                return 'mild';
                break;
            case 'moderate':
            case 'severity2':
                return 'moderate';
                break;
            case 'severe':
            case 'severity3':
                return 'severe';
            default:
                return '';
        }
    };

    return (
        <Layout colorScheme={props.colorScheme || "light"} >
            <div>
                <Title>{language("health-data")}</Title>
                <Card>
                    {props.bloodPressureInfoSurveyName &&
                        <Action title={language("blood-pressure")} indicatorIcon={faCircleInfo}
                            indicatorPosition={"topRight"} onClick={() => MyDataHelps.startSurvey(props.bloodPressureInfoSurveyName ?? "")}></Action>
                    }
                    {!props.bloodPressureInfoSurveyName &&
                        <Title order={4} defaultMargin>{language("blood-pressure")}</Title>
                    }
                    <BloodPressureVisualization surveyDataSource={bpVisualizationProps} previewState={props.previewState}></BloodPressureVisualization>
                    <Button defaultMargin onClick={() => MyDataHelps.startSurvey(props.bloodPressureSurveyName)}>{"Log Blood Pressure"} <FontAwesomeSvgIcon icon={faPlus} /></Button>
                </Card>
                <Card>
                    {!props.swellingInfoSurveyName &&
                        <Title order={4} defaultMargin>{language("swelling")}</Title>
                    }
                    {props.swellingInfoSurveyName &&
                        <Action title={language("swelling")} indicatorIcon={faCircleInfo}
                        indicatorPosition={"topRight"} onClick={() => MyDataHelps.startSurvey(props.swellingInfoSurveyName ?? "")}></Action>
                    }
                    <DateRangeCoordinator intervalType={'Month'}>
                        <SeverityCalendar surveyName={props.swellingSurveyName} dateRecordedResultIdentifier={props.swellingDateRecordedResultIdentifier}
                            severityResultIdentifier={props.swellingSeverityResultIdentifier} severityValueMapper={severityValueMapper}
                            previewState={props.previewState}></SeverityCalendar>
                    </DateRangeCoordinator>
                    <Button defaultMargin onClick={() => MyDataHelps.startSurvey(props.swellingSurveyName)}>{language("log-swelling")} <FontAwesomeSvgIcon icon={faPlus} /></Button>
                </Card>
            </div>
        </Layout>

    );
}