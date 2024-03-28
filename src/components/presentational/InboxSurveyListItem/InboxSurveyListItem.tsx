import React from 'react'
import './InboxSurveyListItem.css'
import { InboxSurvey, SurveyTask, SurveyTaskStatus } from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import InboxCompletedListItem from '../InboxCompletedListItem';
import SingleSurveyTask from '../SingleSurveyTask';
import language from '../../../helpers/language';

export type InboxSurveyVariant = 'default' | 'expanded';

export interface InboxSurveyListItemProps {
    survey: InboxSurvey;
    onClick: () => void;
    variant?: InboxSurveyVariant;
    surveyActive?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: InboxSurveyListItemProps) {

    if (props.survey.status === 'incomplete') {
        return <div className="mdhui-inbox-survey-list-item" ref={props.innerRef}>
            <SingleSurveyTask
                task={{
                    surveyName: props.survey.name,
                    surveyDisplayName: props.survey.name,
                    surveyDescription: props.survey.description,
                    endDate: props.survey.endDate,
                    status: props.survey.status as SurveyTaskStatus,
                    hasSavedProgress: props.survey.hasRestorationData,
                    dueDate: props.survey.dueDate
                } as SurveyTask}
                variant={props.variant}
                surveyActive={props.surveyActive}
                onClick={() => props.onClick()}
            />
        </div>;
    }

    if (props.survey.status === 'complete') {
        return <InboxCompletedListItem name={props.survey.name} status={language('inbox-survey-completed-status')} innerRef={props.innerRef}/>;
    }

    return null;
}