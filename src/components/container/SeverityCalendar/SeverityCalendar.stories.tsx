import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import SeverityCalendar, { SeverityCalendarProps } from "./SeverityCalendar";
import { DateRangeCoordinator } from "../../presentational";

export default {
    title: 'Container/SeverityCalendar',
    component: SeverityCalendar,
    parameters: { layout: 'fullscreen' },
    argTypes: {
        severityResultIdentifier: { 
            control: 'text', 
            description: 'Result values must be one of mild, moderate, severe. Use a severityValueMapper if other values are expected.' 
        }
    }
};

const render = (args: SeverityCalendarProps) => <Layout colorScheme='auto'>
    <Card>
        <DateRangeCoordinator intervalType={'Month'}>
            <SeverityCalendar {...args} />
        </DateRangeCoordinator>
    </Card>
</Layout>;

export const Default = {
    args: {
        surveyName: 'Survey 1',
        severityResultIdentifier: 'severityValue',
        dateRecordedResultIdentifier: 'severityDate',
        previewState: 'Default'
    },
    render: render
};

export const CustomValueMapper = {
    args: {
        surveyName: 'Survey 1',
        severityResultIdentifier: 'severityValue',
        dateRecordedResultIdentifier: 'severityDate',
        severityValueMapper : (severityValue : string) => {
            switch (severityValue){
                case 'severity1':
                    return 'mild';
                    break;
                case 'severity2':
                    return 'moderate';
                    break;
                case 'severity3':
                    return 'severe';
                default:
                    return '';
            }
        },
        previewState: 'Default'
    },
    render: render
};

export const NoData = {
    args: {
        surveyName: 'Survey 1',
        severityResultIdentifier: '',
        dateRecordedResultIdentifier: '',
        previewState: 'NoData'
    },
    render: render
};

export const Live = {
    args: {
        surveyName: 'Swelling and Urine Protein Measurements',
        severityResultIdentifier: 'Swelling Severity',
        dateRecordedResultIdentifier: 'Recent Swelling Date'
    },
    render: render
};