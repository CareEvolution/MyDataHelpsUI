import React, { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react';
import { LayoutContext, LoadingIndicator, Title, UnstyledButton } from '../index';
import { ColorDefinition, formatDateForLocale, resolveColor, SurveyAnswerLog } from '../../../helpers';
import './SurveyAnswerLogSummary.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { faEdit, faRing } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SurveyAnswerRenderingConfiguration {
    resultIdentifier: string;
    icon?: IconDefinition;
    iconColor?: ColorDefinition;
    label?: string;
    shouldHighlight?: (answer: SurveyAnswer) => boolean;
    customHighlightStyling?: CSSProperties;
    formatDisplayValue?: (answer: SurveyAnswer) => ReactNode;
}

export interface SurveyAnswerLogSummaryProps {
    title?: string;
    surveyAnswerLog: SurveyAnswerLog;
    onEdit: () => void;
    answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[];
    alwaysShowAnswerDetails?: boolean;
    showAnswerDetailsOnLoad?: boolean;
    loading?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogSummary(props: SurveyAnswerLogSummaryProps) {
    const layoutContext = useContext(LayoutContext);

    const [selectedResultIdentifier, setSelectedResultIdentifier] = useState<string>();

    const answerRenderingConfigurationLookup = props.answerRenderingConfigurations.reduce((lookup, configuration) => {
        lookup[configuration.resultIdentifier] = configuration;
        return lookup;
    }, {} as Record<string, SurveyAnswerRenderingConfiguration>);

    const surveyAnswerLookup = props.surveyAnswerLog.surveyAnswers.reduce((lookup, surveyAnswer) => {
        lookup[surveyAnswer.resultIdentifier.toLowerCase()] = surveyAnswer;
        return lookup;
    }, {} as Partial<Record<string, SurveyAnswer>>);

    useEffect(() => {
        if (!selectedResultIdentifier || !answerRenderingConfigurationLookup[selectedResultIdentifier]) {
            if (props.answerRenderingConfigurations.length && (props.alwaysShowAnswerDetails || props.showAnswerDetailsOnLoad)) {
                setSelectedResultIdentifier(props.answerRenderingConfigurations[0].resultIdentifier);
            } else {
                setSelectedResultIdentifier(undefined);
            }
        }
    }, [props.answerRenderingConfigurations, props.alwaysShowAnswerDetails, props.showAnswerDetailsOnLoad]);

    const onBadgeClicked = (resultIdentifier: string): void => {
        if (selectedResultIdentifier !== resultIdentifier) {
            setSelectedResultIdentifier(resultIdentifier);
        } else if (!props.alwaysShowAnswerDetails) {
            setSelectedResultIdentifier(undefined);
        }
    };

    const getDisplayLabel = (resultIdentifier: string): string => {
        const configuration = answerRenderingConfigurationLookup[resultIdentifier];
        return configuration.label ?? configuration.resultIdentifier;
    };

    const getDisplayValue = (resultIdentifier: string): ReactNode => {
        const surveyAnswer = surveyAnswerLookup[resultIdentifier.toLowerCase()];
        if (surveyAnswer) {
            const configuration = answerRenderingConfigurationLookup[resultIdentifier];
            return configuration.formatDisplayValue?.(surveyAnswer) ?? surveyAnswer.answers.join(', ');
        }
        return `No value was recorded for ${getDisplayLabel(resultIdentifier)} on this day.`;
    };

    return <div className="mdhui-sa-log-summary" ref={props.innerRef}>
        <Title
            order={4}
            accessory={props.loading
                ? <LoadingIndicator variant="inline" />
                : <UnstyledButton onClick={props.onEdit}><FontAwesomeSvgIcon icon={faEdit} /></UnstyledButton>
            }
        >
            {props.title ?? formatDateForLocale(props.surveyAnswerLog.date, 'PPP')}
        </Title>
        <div className="mdhui-sa-log-summary-badges">
            {props.answerRenderingConfigurations.map((configuration, index) => {
                const surveyAnswer = surveyAnswerLookup[configuration.resultIdentifier];
                const shouldHighlight = surveyAnswer && (configuration.shouldHighlight?.(surveyAnswer) === true ?? surveyAnswer.answers.length);
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
        {selectedResultIdentifier && answerRenderingConfigurationLookup[selectedResultIdentifier] &&
            <div className="mdhui-sa-log-summary-badge-details">
                <div className="mdhui-sa-log-summary-badge-details-label">{getDisplayLabel(selectedResultIdentifier)}</div>
                <div className="mdhui-sa-log-summary-badge-details-value">{getDisplayValue(selectedResultIdentifier)}</div>
            </div>
        }
    </div>;
}
