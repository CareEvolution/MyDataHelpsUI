import React, { useContext, useState } from 'react';
import { Button, LayoutContext, Title } from '../index';
import { resolveColor, SurveyAnswerLog, SurveyAnswerLogRenderingConfiguration } from '../../../helpers';
import './SurveyAnswerLogSummary.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';

export interface SurveyAnswerLogSummaryProps {
    log: SurveyAnswerLog;
    onEdit: () => void;
    answerRenderingConfigurations?: SurveyAnswerLogRenderingConfiguration[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogSummary(props: SurveyAnswerLogSummaryProps) {
    const layoutContext = useContext(LayoutContext);

    const [selectedBadge, setSelectedBadge] = useState<SurveyAnswerLogRenderingConfiguration>();

    const surveyAnswersByResultIdentifier = props.log.surveyAnswers.reduce((surveyAnswersByResultIdentifier, surveyAnswer) => {
        surveyAnswersByResultIdentifier[surveyAnswer.resultIdentifier] = surveyAnswer;
        return surveyAnswersByResultIdentifier;
    }, {} as Partial<Record<string, SurveyAnswer>>);

    const getDisplayValue = (renderingConfiguration: SurveyAnswerLogRenderingConfiguration) => {
        const surveyAnswer = surveyAnswersByResultIdentifier[renderingConfiguration.resultIdentifier];
        if (surveyAnswer) {
            return renderingConfiguration.formatDisplayValue ? renderingConfiguration.formatDisplayValue(surveyAnswer) : surveyAnswer.answers.join(', ');
        }
        return `No value was recorded for ${renderingConfiguration.label} on this day.`;
    };

    return <div className="mdhui-sa-log-summary" ref={props.innerRef}>
        <Title order={3} accessory={<Button fullWidth={false} onClick={props.onEdit}>Edit</Button>}>Log Entry</Title>
        {!props.answerRenderingConfigurations &&
            <div className="mdhui-sa-log-summary-entered">A log has been submitted.</div>
        }
        {props.answerRenderingConfigurations?.length &&
            <>
                <div className="mdhui-sa-log-summary-badges">
                    {props.answerRenderingConfigurations.map((renderingConfiguration, index) => {
                        const surveyAnswer = surveyAnswersByResultIdentifier[renderingConfiguration.resultIdentifier];
                        const hasMetCriteria = surveyAnswer && renderingConfiguration.hasMetCriteria(surveyAnswer);
                        const defaultIconColor = { lightMode: 'var(--mdhui-background-color-2)', darkMode: 'var(--mdhui-background-color-1)' };
                        const iconColor = resolveColor(layoutContext.colorScheme, hasMetCriteria ? renderingConfiguration.iconColor : defaultIconColor);
                        return <div
                            key={index}
                            className="mdhui-sa-log-summary-badge"
                            style={{ background: iconColor, borderColor: iconColor, ...(hasMetCriteria && renderingConfiguration.hasMetCriteriaStyling) }}
                            onClick={() => setSelectedBadge(selectedBadge !== renderingConfiguration ? renderingConfiguration : undefined)}
                        >
                            <FontAwesomeSvgIcon icon={renderingConfiguration.icon} style={{ color: 'var(--mdhui-background-color-0)' }} />
                        </div>;
                    })}
                </div>
                {selectedBadge &&
                    <div className="mdhui-sa-log-summary-badge-details">
                        <div className="mdhui-sa-log-summary-badge-details-label">{selectedBadge.label}</div>
                        <div className="mdhui-sa-log-summary-badge-details-value">{getDisplayValue(selectedBadge)}</div>
                    </div>
                }
            </>
        }
    </div>;
}
