import React from 'react';
import { Button, Title } from '../index';
import { alwaysTrueSurveyAnswerFilter, asIsSurveyAnswerFormatter, FormattedSurveyAnswer, SurveyAnswerFilter, SurveyAnswerFormatter, SurveyAnswerLog } from '../../../helpers/survey-answer';
import './SurveyAnswerLogSummary.css';

export interface SurveyAnswerLogSummaryProps {
    surveyAnswerLog: SurveyAnswerLog;
    onEnterLog: () => void;
    filter?: SurveyAnswerFilter;
    formatter?: SurveyAnswerFormatter;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogSummary(props: SurveyAnswerLogSummaryProps) {
    const filteredSurveyAnswers = props.surveyAnswerLog.surveyAnswers.filter(props.filter ?? alwaysTrueSurveyAnswerFilter);
    const formattedSurveyAnswers = filteredSurveyAnswers.map(props.formatter ?? asIsSurveyAnswerFormatter);
    const sortedFormattedSurveyAnswers = formattedSurveyAnswers.sort((a, b) => a.sortIndex - b.sortIndex);

    return <div className="mdhui-sa-log-summary" ref={props.innerRef}>
        <Title order={3} accessory={<Button fullWidth={false} onClick={props.onEnterLog}>Edit</Button>}>Log Entry</Title>
        <div className="mdhui-sa-log-summary-results">
            {sortedFormattedSurveyAnswers.map((formattedSurveyAnswer, index) => {
                return <LogSummaryResult key={index} {...formattedSurveyAnswer} />;
            })}
        </div>
    </div>;
}

function LogSummaryResult(formattedSurveyAnswer: FormattedSurveyAnswer) {
    return <div className="mdhui-sa-log-summary-result">
        <div className="mdhui-sa-log-summary-result-label">{formattedSurveyAnswer.displayName}:</div>
        <div className="mdhui-sa-log-summary-result-value">{formattedSurveyAnswer.displayValue}</div>
    </div>;

}


