import React, { ReactNode, useContext, useState } from 'react';
import { Button, LayoutContext, Title, UnstyledButton } from '../index';
import { resolveColor, SurveyAnswerLog, SurveyAnswerRenderingConfiguration } from '../../../helpers';
import './SurveyAnswerLogSummary.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { faRing } from '@fortawesome/free-solid-svg-icons';

export interface SurveyAnswerLogSummaryProps {
    log: SurveyAnswerLog;
    onEdit: () => void;
    answerRenderingConfigurations?: SurveyAnswerRenderingConfiguration[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogSummary(props: SurveyAnswerLogSummaryProps) {
    const layoutContext = useContext(LayoutContext);

    const [selectedResultIdentifier, setSelectedResultIdentifier] = useState<string>();

    const answerRenderingConfigurationsByResultIdentifier = props.answerRenderingConfigurations?.reduce((answerRenderingConfigurationsByResultIdentifier, answerRenderingConfiguration) => {
        answerRenderingConfigurationsByResultIdentifier[answerRenderingConfiguration.resultIdentifier] = answerRenderingConfiguration;
        return answerRenderingConfigurationsByResultIdentifier;
    }, {} as Record<string, SurveyAnswerRenderingConfiguration>) ?? {};

    const surveyAnswersByResultIdentifier = props.log.surveyAnswers.reduce((surveyAnswersByResultIdentifier, surveyAnswer) => {
        surveyAnswersByResultIdentifier[surveyAnswer.resultIdentifier] = surveyAnswer;
        return surveyAnswersByResultIdentifier;
    }, {} as Partial<Record<string, SurveyAnswer>>);

    const getDisplayLabel = (resultIdentifier: string): string => {
        return answerRenderingConfigurationsByResultIdentifier[resultIdentifier].label ?? resultIdentifier;
    };

    const getDisplayValue = (resultIdentifier: string): ReactNode => {
        const answerRenderingConfiguration = answerRenderingConfigurationsByResultIdentifier[resultIdentifier];

        const surveyAnswer = surveyAnswersByResultIdentifier[resultIdentifier];
        if (surveyAnswer) {
            return answerRenderingConfiguration.formatDisplayValue ? answerRenderingConfiguration.formatDisplayValue(surveyAnswer) : surveyAnswer.answers.join(', ');
        }

        return `No value was recorded for ${answerRenderingConfiguration.label} on this day.`;
    };

    return <div className="mdhui-sa-log-summary" ref={props.innerRef}>
        <Title order={3} accessory={<Button fullWidth={false} onClick={props.onEdit}>Edit</Button>}>Log Entry</Title>
        {!props.answerRenderingConfigurations &&
            <div className="mdhui-sa-log-summary-entered">A log has been submitted.</div>
        }
        {props.answerRenderingConfigurations?.length &&
            <>
                <div className="mdhui-sa-log-summary-badges">
                    {props.answerRenderingConfigurations.map((answerRenderingConfiguration, index) => {
                        const surveyAnswer = surveyAnswersByResultIdentifier[answerRenderingConfiguration.resultIdentifier];
                        const shouldHighlight = surveyAnswer && (answerRenderingConfiguration.shouldHighlight?.(surveyAnswer) ?? surveyAnswer.answers.length);
                        const defaultIconColor = { lightMode: 'var(--mdhui-background-color-2)', darkMode: 'var(--mdhui-background-color-1)' };
                        const iconColor = resolveColor(layoutContext.colorScheme, shouldHighlight ? (answerRenderingConfiguration.iconColor ?? 'var(--mdhui-color-primary') : defaultIconColor);
                        return <UnstyledButton
                            key={index}
                            className="mdhui-sa-log-summary-badge"
                            style={{ background: iconColor, borderColor: iconColor, ...(shouldHighlight && answerRenderingConfiguration.customHighlightStyling) }}
                            onClick={() => setSelectedResultIdentifier(selectedResultIdentifier !== answerRenderingConfiguration.resultIdentifier ? answerRenderingConfiguration.resultIdentifier : undefined)}
                        >
                            {answerRenderingConfiguration.icon &&
                                <FontAwesomeSvgIcon icon={answerRenderingConfiguration.icon ?? faRing} style={{ color: 'var(--mdhui-background-color-0)' }} />
                            }
                            {!answerRenderingConfiguration.icon &&
                                <div className="mdhui-sa-log-summary-badge-label" style={{ color: shouldHighlight ? 'var(--mdhui-text-color-1)' : 'var(--mdhui-text-color-3)' }}>
                                    {getDisplayLabel(answerRenderingConfiguration.resultIdentifier).substring(0, 1).toUpperCase()}
                                </div>
                            }
                        </UnstyledButton>;
                    })}
                </div>
                {selectedResultIdentifier &&
                    <div className="mdhui-sa-log-summary-badge-details">
                        <div className="mdhui-sa-log-summary-badge-details-label">{getDisplayLabel(selectedResultIdentifier)}</div>
                        <div className="mdhui-sa-log-summary-badge-details-value">{getDisplayValue(selectedResultIdentifier)}</div>
                    </div>
                }
            </>
        }
    </div>;
}
