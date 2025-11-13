import React, { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react';
import { LayoutContext, LoadingIndicator, Title, UnstyledButton } from '../index';
import { ColorDefinition, formatDateForLocale, resolveColor, SurveyAnswerLog } from '../../../helpers';
import './SurveyAnswerLogSummary.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SurveyAnswerLogBadgeConfiguration {
    identifier: string;
    shouldHighlight: (surveyAnswers: SurveyAnswer[]) => boolean;
    customHighlightStyling?: CSSProperties;
    getBadgeDetails?: (surveyAnswers: SurveyAnswer[]) => NonNullable<ReactNode>;
    icon?: IconDefinition;
    iconColor?: ColorDefinition;
}

export interface SurveyAnswerLogSummaryProps {
    title?: string;
    surveyAnswerLog: SurveyAnswerLog;
    onEdit: () => void;
    badgeConfigurations: SurveyAnswerLogBadgeConfiguration[];
    showFirstBadgeDetailsOnLoad?: boolean;
    alwaysShowBadgeDetails?: boolean;
    loading?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogSummary(props: SurveyAnswerLogSummaryProps) {

    const [selectedBadgeIdentifier, setSelectedBadgeIdentifier] = useState<string>();

    const badgeConfigurationLookup = props.badgeConfigurations.reduce((lookup, configuration) => {
        lookup[configuration.identifier] = configuration;
        return lookup;
    }, {} as Partial<Record<string, SurveyAnswerLogBadgeConfiguration>>);

    useEffect(() => {
        if (props.badgeConfigurations.length > 0 && (props.showFirstBadgeDetailsOnLoad || props.alwaysShowBadgeDetails)) {
            setSelectedBadgeIdentifier(props.badgeConfigurations.find(configuration => configuration.getBadgeDetails)?.identifier);
        } else {
            setSelectedBadgeIdentifier(undefined);
        }
    }, [props.badgeConfigurations, props.showFirstBadgeDetailsOnLoad, props.alwaysShowBadgeDetails]);

    const onBadgeClicked = (configuration: SurveyAnswerLogBadgeConfiguration): void => {
        if (selectedBadgeIdentifier !== configuration.identifier) {
            setSelectedBadgeIdentifier(configuration.identifier);
        } else if (!props.alwaysShowBadgeDetails) {
            setSelectedBadgeIdentifier(undefined);
        }
    };

    const getSelectedBadgeDetails = (): ReactNode => {
        if (!selectedBadgeIdentifier) return undefined;

        const configuration = badgeConfigurationLookup[selectedBadgeIdentifier];
        if (!configuration?.getBadgeDetails) return undefined;

        const badgeDetails = configuration.getBadgeDetails(props.surveyAnswerLog.surveyAnswers);
        return badgeDetails ? <div className="mdhui-sa-log-summary-badge-details">{badgeDetails}</div> : undefined;
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
            {props.badgeConfigurations.map((configuration, index) => {
                const badge = <Badge
                    surveyAnswerLog={props.surveyAnswerLog}
                    configuration={configuration}
                    selected={selectedBadgeIdentifier === configuration.identifier}
                />;
                if (configuration.getBadgeDetails) {
                    return <UnstyledButton key={index} onClick={() => onBadgeClicked(configuration)}>{badge}</UnstyledButton>;
                }
                return <div key={index}>{badge}</div>;
            })}
        </div>
        {getSelectedBadgeDetails()}
    </div>;
}

interface BadgeProps {
    surveyAnswerLog: SurveyAnswerLog,
    configuration: SurveyAnswerLogBadgeConfiguration,
    selected: boolean;
}

function Badge(props: BadgeProps) {
    const layoutContext = useContext(LayoutContext);

    const shouldHighlight = props.configuration.shouldHighlight(props.surveyAnswerLog.surveyAnswers);
    const iconColor = shouldHighlight ? props.configuration.iconColor ?? 'var(--mdhui-color-primary' : { lightMode: '#ddd', darkMode: '#1c1c1d' };
    const resolvedIconColor = resolveColor(layoutContext.colorScheme, iconColor);

    const classNames: string[] = ['mdhui-sa-log-summary-badge'];
    if (shouldHighlight) {
        classNames.push('mdhui-sa-log-summary-badge-highlighted');
    }
    if (props.selected) {
        classNames.push('mdhui-sa-log-summary-badge-selected');
    }

    const style: CSSProperties = {
        background: resolvedIconColor,
        borderColor: resolvedIconColor,
        ...(shouldHighlight && props.configuration.customHighlightStyling)
    };

    return <div className={classNames.join(' ')} style={style}>
        {props.configuration.icon &&
            <FontAwesomeSvgIcon icon={props.configuration.icon} className="mdhui-sa-log-summary-badge-icon" />
        }
        {!props.configuration.icon &&
            <div className="mdhui-sa-log-summary-badge-label">{props.configuration.identifier.substring(0, 1).toUpperCase()}</div>
        }
    </div>;
}
