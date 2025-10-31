import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { LayoutContext, Title, UnstyledButton } from '../index';
import { formatDateForLocale, resolveColor, SurveyAnswerLog, SurveyAnswerRenderingConfiguration } from '../../../helpers';
import './SurveyAnswerLogSummary.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { faEdit, faRing } from '@fortawesome/free-solid-svg-icons';

export interface SurveyAnswerLogSummaryProps {
    title?: string;
    surveyAnswerLog: SurveyAnswerLog;
    onEdit: () => void;
    answerRenderingConfigurations?: SurveyAnswerRenderingConfiguration[];
    alwaysShowAnswerDetails?: boolean;
    showAnswerDetailsOnLoad?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogSummary(props: SurveyAnswerLogSummaryProps) {
    const layoutContext = useContext(LayoutContext);

    const [selectedConfiguration, setSelectedConfiguration] = useState<SurveyAnswerRenderingConfiguration>();

    useEffect(() => {
        if (selectedConfiguration) {
            setSelectedConfiguration(props.answerRenderingConfigurations?.find(configuration => configuration.resultIdentifier === selectedConfiguration.resultIdentifier));
        }
    }, [props.answerRenderingConfigurations]);

    useEffect(() => {
        if (selectedConfiguration) return;
        if (!props.answerRenderingConfigurations?.length) return;
        if (!props.alwaysShowAnswerDetails && !props.showAnswerDetailsOnLoad) return;
        setSelectedConfiguration(props.answerRenderingConfigurations[0]);
    }, [props.answerRenderingConfigurations?.length, props.alwaysShowAnswerDetails, props.showAnswerDetailsOnLoad]);

    const surveyAnswerLookup = props.surveyAnswerLog.surveyAnswers.reduce((lookup, surveyAnswer) => {
        lookup[surveyAnswer.resultIdentifier] = surveyAnswer;
        return lookup;
    }, {} as Partial<Record<string, SurveyAnswer>>);

    const onBadgeClicked = (configuration: SurveyAnswerRenderingConfiguration): void => {
        if (selectedConfiguration !== configuration) {
            setSelectedConfiguration(configuration);
        } else if (!props.alwaysShowAnswerDetails) {
            setSelectedConfiguration(undefined);
        }
    };

    const getDisplayLabel = (configuration: SurveyAnswerRenderingConfiguration): string => {
        return configuration.label ?? configuration.resultIdentifier;
    };

    const getDisplayValue = (configuration: SurveyAnswerRenderingConfiguration): ReactNode => {
        const surveyAnswer = surveyAnswerLookup[configuration.resultIdentifier];
        if (surveyAnswer) {
            return configuration.formatDisplayValue?.(surveyAnswer) ?? surveyAnswer.answers.join(', ');
        }
        return `No value was recorded for ${getDisplayLabel(configuration)} on this day.`;
    };

    return <div className="mdhui-sa-log-summary" ref={props.innerRef}>
        <Title order={4} accessory={<UnstyledButton onClick={props.onEdit}><FontAwesomeSvgIcon icon={faEdit} /></UnstyledButton>}>
            {props.title ?? formatDateForLocale(props.surveyAnswerLog.date, 'PPP')}
        </Title>
        {(!props.answerRenderingConfigurations || props.answerRenderingConfigurations.length === 0) &&
            <div className="mdhui-sa-log-summary-entered">A log has been submitted.</div>
        }
        {props.answerRenderingConfigurations && props.answerRenderingConfigurations.length > 0 &&
            <>
                <div className="mdhui-sa-log-summary-badges">
                    {props.answerRenderingConfigurations.map((configuration, index) => {
                        const surveyAnswer = surveyAnswerLookup[configuration.resultIdentifier];
                        const shouldHighlight = surveyAnswer && (configuration.shouldHighlight?.(surveyAnswer) ?? surveyAnswer.answers.length);
                        const defaultIconColor = { lightMode: 'var(--mdhui-background-color-2)', darkMode: 'var(--mdhui-background-color-1)' };
                        const iconColor = resolveColor(layoutContext.colorScheme, shouldHighlight ? (configuration.iconColor ?? 'var(--mdhui-color-primary') : defaultIconColor);
                        return <UnstyledButton
                            key={index}
                            className={['mdhui-sa-log-summary-badge', ...(selectedConfiguration === configuration ? ['mdhui-sa-log-summary-badge-selected'] : [])].join(' ')}
                            style={{ background: iconColor, borderColor: iconColor, ...(shouldHighlight && configuration.customHighlightStyling) }}
                            onClick={() => onBadgeClicked(configuration)}
                        >
                            {configuration.icon &&
                                <FontAwesomeSvgIcon icon={configuration.icon ?? faRing} style={{ color: 'var(--mdhui-background-color-0)' }} />
                            }
                            {!configuration.icon &&
                                <div className="mdhui-sa-log-summary-badge-label" style={{ color: shouldHighlight ? 'var(--mdhui-text-color-1)' : 'var(--mdhui-text-color-3)' }}>
                                    {getDisplayLabel(configuration).substring(0, 1).toUpperCase()}
                                </div>
                            }
                        </UnstyledButton>;
                    })}
                </div>
                {selectedConfiguration &&
                    <div className="mdhui-sa-log-summary-badge-details">
                        <div className="mdhui-sa-log-summary-badge-details-label">{getDisplayLabel(selectedConfiguration)}</div>
                        <div className="mdhui-sa-log-summary-badge-details-value">{getDisplayValue(selectedConfiguration)}</div>
                    </div>
                }
            </>
        }
    </div>;
}
