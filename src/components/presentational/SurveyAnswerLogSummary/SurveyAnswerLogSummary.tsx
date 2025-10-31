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

    const [selectedResultIdentifier, setSelectedResultIdentifier] = useState<string>();

    useEffect(() => {
        if (selectedResultIdentifier && !props.answerRenderingConfigurations?.some(configuration => configuration.resultIdentifier === selectedResultIdentifier)) {
            setSelectedResultIdentifier(undefined);
        }
    }, [props.answerRenderingConfigurations]);

    useEffect(() => {
        if (selectedResultIdentifier) return;
        if (!props.answerRenderingConfigurations?.length) return;
        if (!props.alwaysShowAnswerDetails && !props.showAnswerDetailsOnLoad) return;
        setSelectedResultIdentifier(props.answerRenderingConfigurations[0].resultIdentifier);
    }, [props.alwaysShowAnswerDetails, props.showAnswerDetailsOnLoad, props.answerRenderingConfigurations?.length]);

    const answerRenderingConfigurationLookup = props.answerRenderingConfigurations?.reduce((lookup, configuration) => {
        lookup[configuration.resultIdentifier] = configuration;
        return lookup;
    }, {} as Record<string, SurveyAnswerRenderingConfiguration>) ?? {};

    const surveyAnswerLookup = props.surveyAnswerLog.surveyAnswers.reduce((lookup, surveyAnswer) => {
        lookup[surveyAnswer.resultIdentifier] = surveyAnswer;
        return lookup;
    }, {} as Partial<Record<string, SurveyAnswer>>);

    const onBadgeClicked = (resultIdentifier: string): void => {
        if (selectedResultIdentifier !== resultIdentifier) {
            setSelectedResultIdentifier(resultIdentifier);
        } else if (!props.alwaysShowAnswerDetails) {
            setSelectedResultIdentifier(undefined);
        }
    };

    const getDisplayLabel = (resultIdentifier: string): string => {
        return answerRenderingConfigurationLookup[resultIdentifier].label ?? resultIdentifier;
    };

    const getDisplayValue = (resultIdentifier: string): ReactNode => {
        const answerRenderingConfiguration = answerRenderingConfigurationLookup[resultIdentifier];

        const surveyAnswer = surveyAnswerLookup[resultIdentifier];
        if (surveyAnswer) {
            return answerRenderingConfiguration.formatDisplayValue
                ? answerRenderingConfiguration.formatDisplayValue(surveyAnswer)
                : surveyAnswer.answers.join(', ');
        }

        return `No value was recorded for ${answerRenderingConfiguration.label} on this day.`;
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
                            className={['mdhui-sa-log-summary-badge', ...(selectedResultIdentifier === configuration.resultIdentifier ? ['mdhui-sa-log-summary-badge-selected'] : [])].join(' ')}
                            style={{ background: iconColor, borderColor: iconColor, ...(shouldHighlight && configuration.customHighlightStyling) }}
                            onClick={() => onBadgeClicked(configuration.resultIdentifier)}
                        >
                            {configuration.icon &&
                                <FontAwesomeSvgIcon icon={configuration.icon ?? faRing} style={{ color: 'var(--mdhui-background-color-0)' }} />
                            }
                            {!configuration.icon &&
                                <div className="mdhui-sa-log-summary-badge-label" style={{ color: shouldHighlight ? 'var(--mdhui-text-color-1)' : 'var(--mdhui-text-color-3)' }}>
                                    {getDisplayLabel(configuration.resultIdentifier).substring(0, 1).toUpperCase()}
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
