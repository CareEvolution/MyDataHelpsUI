import React, { CSSProperties, useContext } from 'react';
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

    const title = props.title ?? formatDateForLocale(props.surveyLog.date, 'PPP');

    const titleAccessory = props.loading
        ? <LoadingIndicator variant="inline" />
        : <UnstyledButton onClick={props.onEdit}><FontAwesomeSvgIcon icon={faEdit} /></UnstyledButton>;

    return <div className="mdhui-survey-log-summary" ref={props.innerRef}>
        {!surveyLogBadgeContext && <Action
            className="mdhui-survey-log-summary-action"
            title={title}
            subtitle="A log has been entered."
            indicator={props.loading
                ? <LoadingIndicator className="mdhui-survey-log-summary-action-loading-indicator" />
                : <Button className="mdhui-survey-log-summary-action-edit-button" onClick={props.onEdit}>Edit Log</Button>
            }
            renderAs="div"
        />}
        {(!!surveyLogBadgeContext?.badgeConfigurations.length || !!surveyLogBadgeContext?.getDetails) &&
            <Title order={4} accessory={titleAccessory}>{title}</Title>
        }
        {!!surveyLogBadgeContext?.badgeConfigurations.length &&
            <div className="mdhui-survey-log-summary-badges">
                {surveyLogBadgeContext.badgeConfigurations.map((configuration, index) => {
                    return <div key={index}>
                        <Badge surveyLog={props.surveyLog} configuration={configuration} />
                    </div>;
                })}
            </div>
        }
        {!!surveyLogBadgeContext?.getDetails &&
            <div className="mdhui-survey-log-summary-details">
                {surveyLogBadgeContext.getDetails(props.surveyLog)}
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
    const iconColor = shouldHighlight ? props.configuration.iconColor ?? 'var(--mdhui-color-primary)' : { lightMode: '#ddd', darkMode: '#1c1c1d' };
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
            <FontAwesomeSvgIcon icon={props.configuration.icon} className="mdhui-survey-log-summary-badge-icon" />
        }
        {!props.configuration.icon &&
            <div className="mdhui-survey-log-summary-badge-label">{props.configuration.identifier.substring(0, 1).toUpperCase()}</div>
        }
    </div>;
}
