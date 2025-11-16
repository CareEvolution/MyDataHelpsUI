import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Action, Button, LayoutContext, LoadingIndicator, SurveyLogBadgeConfiguration, SurveyLogBadgeContext, Title, UnstyledButton } from '../index';
import { formatDateForLocale, resolveColor, SurveyLog } from '../../../helpers';
import './SurveyLogSummary.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export interface DailyLogSummaryProps {
    title?: string;
    surveyLog: SurveyLog;
    onEdit: () => void;
    loading?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogSummary(props: DailyLogSummaryProps) {
    const surveyLogBadgeContext = useContext(SurveyLogBadgeContext);

    const [selectedBadgeIdentifier, setSelectedBadgeIdentifier] = useState<string>();

    const badgeConfigurationLookup = surveyLogBadgeContext?.badgeConfigurations.reduce((lookup, configuration) => {
        lookup[configuration.identifier] = configuration;
        return lookup;
    }, {} as Partial<Record<string, SurveyLogBadgeConfiguration>>) ?? {};

    useEffect(() => {
        if (surveyLogBadgeContext?.showFirstBadgeDetailsOnLoad || surveyLogBadgeContext?.alwaysShowBadgeDetails) {
            setSelectedBadgeIdentifier(surveyLogBadgeContext?.badgeConfigurations.find(configuration => configuration.getBadgeDetails)?.identifier);
        } else {
            setSelectedBadgeIdentifier(undefined);
        }
    }, [surveyLogBadgeContext?.badgeConfigurations, surveyLogBadgeContext?.showFirstBadgeDetailsOnLoad, surveyLogBadgeContext?.alwaysShowBadgeDetails]);

    const onBadgeClicked = (configuration: SurveyLogBadgeConfiguration): void => {
        if (selectedBadgeIdentifier !== configuration.identifier) {
            setSelectedBadgeIdentifier(configuration.identifier);
        } else if (!surveyLogBadgeContext?.alwaysShowBadgeDetails) {
            setSelectedBadgeIdentifier(undefined);
        }
    };

    const title = props.title ?? formatDateForLocale(props.surveyLog.date, 'PPP');

    const titleAccessory = props.loading
        ? <LoadingIndicator variant="inline" />
        : <UnstyledButton onClick={props.onEdit}><FontAwesomeSvgIcon icon={faEdit} /></UnstyledButton>;

    return <div className="mdhui-survey-log-summary" ref={props.innerRef}>
        {!surveyLogBadgeContext &&
            <div className="mdhui-survey-log-summary-without-badges">
                <Action
                    title={title}
                    subtitle="A log has been entered."
                    renderAs="div"
                    indicator={props.loading
                        ? <LoadingIndicator className="mdhui-survey-log-summary-without-badges-loading-indicator" />
                        : <Button className="mdhui-survey-log-summary-without-badges-edit-button" onClick={props.onEdit}>Edit Log</Button>}
                />
            </div>
        }
        {surveyLogBadgeContext &&
            <div className="mdhui-survey-log-summary-with-badges">
                <Title order={4} accessory={titleAccessory}>{title}</Title>
                <div className="mdhui-survey-log-summary-badges">
                    {surveyLogBadgeContext.badgeConfigurations.map((configuration, index) => {
                        const badge = <Badge surveyLog={props.surveyLog} configuration={configuration} selected={selectedBadgeIdentifier === configuration.identifier} />;
                        if (configuration.getBadgeDetails) {
                            return <UnstyledButton key={index} onClick={() => onBadgeClicked(configuration)}>{badge}</UnstyledButton>;
                        }
                        return <div key={index}>{badge}</div>;
                    })}
                </div>
                {selectedBadgeIdentifier && badgeConfigurationLookup[selectedBadgeIdentifier]?.getBadgeDetails &&
                    <div className="mdhui-survey-log-summary-badge-details">
                        {badgeConfigurationLookup[selectedBadgeIdentifier]!.getBadgeDetails!(props.surveyLog)}
                    </div>
                }
            </div>
        }
    </div>;
}

interface BadgeProps {
    surveyLog: SurveyLog,
    configuration: SurveyLogBadgeConfiguration,
    selected: boolean;
}

function Badge(props: BadgeProps) {
    const layoutContext = useContext(LayoutContext);

    const shouldHighlight = props.configuration.shouldHighlight(props.surveyLog);
    const iconColor = shouldHighlight ? props.configuration.iconColor ?? 'var(--mdhui-color-primary' : { lightMode: '#ddd', darkMode: '#1c1c1d' };
    const resolvedIconColor = resolveColor(layoutContext.colorScheme, iconColor);

    const classNames: string[] = ['mdhui-survey-log-summary-badge'];
    if (shouldHighlight) {
        classNames.push('mdhui-survey-log-summary-badge-highlighted');
    }
    if (props.selected) {
        classNames.push('mdhui-survey-log-summary-badge-selected');
    }

    const style: CSSProperties = {
        background: resolvedIconColor,
        borderColor: resolvedIconColor,
        ...(shouldHighlight && props.configuration.customHighlightStyling)
    };

    return <div className={classNames.join(' ')} style={style}>
        {props.configuration.icon &&
            <FontAwesomeSvgIcon icon={props.configuration.icon} className="mdhui-survey-log-summary-badge-icon" />
        }
        {!props.configuration.icon &&
            <div className="mdhui-survey-log-summary-badge-label">{props.configuration.identifier.substring(0, 1).toUpperCase()}</div>
        }
    </div>;
}
