import React, { CSSProperties, ReactNode, useContext } from 'react';
import { LayoutContext, LoadingIndicator, SurveyLogBadgeConfiguration, Title, UnstyledButton } from '../index';
import { formatDateForLocale, resolveColor, SurveyLog } from '../../../helpers';
import './SurveyLogSummary.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface SurveyLogSummaryProps {
    title?: string;
    logSurveyName?: string;
    onEnterLog?: () => void;
    badgeConfigurations?: SurveyLogBadgeConfiguration[];
    getDetails?: (surveyLog: SurveyLog) => NonNullable<ReactNode>;
    surveyLog: SurveyLog;
    loading?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogSummary(props: SurveyLogSummaryProps) {
    const canLog = !!props.logSurveyName && !!props.onEnterLog;
    const hasLogged = canLog && props.surveyLog.surveyAnswers.some(surveyAnswer => surveyAnswer.surveyName === props.logSurveyName);

    const title = props.title ?? formatDateForLocale(props.surveyLog.date, 'PPP');
    const titleAccessory = props.loading
        ? <LoadingIndicator variant="inline" />
        : canLog
            ? <UnstyledButton className="mdhui-survey-log-summary-log-button" onClick={props.onEnterLog!}>
                {hasLogged ? 'Edit Log' : 'Add Log'}
            </UnstyledButton>
            : undefined;

    return <div className="mdhui-survey-log-summary" ref={props.innerRef}>
        <Title order={4} accessory={titleAccessory}>{title}</Title>
        {!!props.badgeConfigurations?.length &&
            <div className="mdhui-survey-log-summary-badges">
                {props.badgeConfigurations.map((configuration, index) => {
                    return <div key={index}>
                        <Badge surveyLog={props.surveyLog} configuration={configuration} />
                    </div>;
                })}
            </div>
        }
        {!!props.getDetails &&
            <div className="mdhui-survey-log-summary-details">
                {props.getDetails(props.surveyLog)}
            </div>
        }
    </div>;
}

interface BadgeProps {
    surveyLog: SurveyLog;
    configuration: SurveyLogBadgeConfiguration;
}

function Badge(props: BadgeProps) {
    const layoutContext = useContext(LayoutContext);

    const shouldHighlight = props.configuration.shouldHighlight(props.surveyLog);
    const iconColor = shouldHighlight ? props.configuration.iconColor ?? 'var(--mdhui-color-primary)' : { lightMode: '#ccc', darkMode: '#555' };
    const resolvedIconColor = resolveColor(layoutContext.colorScheme, iconColor);

    const classNames: string[] = ['mdhui-survey-log-summary-badge'];
    if (shouldHighlight) {
        classNames.push('mdhui-survey-log-summary-badge-highlighted');
    }

    const style: CSSProperties = {
        background: resolvedIconColor,
        borderColor: resolvedIconColor,
        ...(shouldHighlight && props.configuration.customHighlightStyling)
    };

    return <div className={classNames.join(' ')} style={style}>
        {props.configuration.icon &&
            <FontAwesomeSvgIcon className="mdhui-survey-log-summary-badge-icon" icon={props.configuration.icon} />
        }
        {!props.configuration.icon &&
            <div className="mdhui-survey-log-summary-badge-label">{props.configuration.identifier.substring(0, 1).toUpperCase()}</div>
        }
    </div>;
}
