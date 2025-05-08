import React, { useRef, useState } from 'react';
import { Action, Button } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { language, useInitializeView } from '../../../helpers';
import appleHealthLogo from '../../../assets/applehealth-logo.svg';
import './AppleHealthRecordsSync.css';
import { useInterval } from '../../../hooks';

export type AppleHealthRecordsSyncPreviewState = 'wrong platform' | 'disabled' | 'enabled no data yet' | 'enabled no data' | 'enabled with data';
export type AppleHealthRecordsStatus = 'enabled' | 'disabled';

export interface AppleHealthRecordsSyncProps {
    previewState?: AppleHealthRecordsSyncPreviewState;
    enableAppleHealthRecordsSurvey: string;
    showWhen?: AppleHealthRecordsStatus;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function AppleHealthRecordsSync(props: AppleHealthRecordsSyncProps) {
    const MAX_DATA_AVAILABILITY_RECHECK_ATTEMPTS = 6;

    const [platform, setPlatform] = useState<string>();
    const [status, setStatus] = useState<AppleHealthRecordsStatus>();
    const [hasData, setHasData] = useState<boolean>(false);
    const [connecting, setConnecting] = useState<boolean>(false);
    const [showHelp, setShowHelp] = useState<boolean>(false);

    const dataAvailabilityRecheckAttempts = useRef<number>(0);

    const applyPreviewState = (previewState: AppleHealthRecordsSyncPreviewState): void => {
        setPlatform(previewState === 'wrong platform' ? 'Web' : 'iOS');
        setStatus(previewState.startsWith('enabled') ? 'enabled' : previewState === 'disabled' ? 'disabled' : undefined);
        setHasData(previewState === 'enabled with data');
        setConnecting(previewState === 'enabled no data yet');
        setShowHelp(false);

        dataAvailabilityRecheckAttempts.current = 0;
    };

    const loadPlatform = async (): Promise<void> => {
        const deviceInfo = await MyDataHelps.getDeviceInfo();
        setPlatform(deviceInfo.platform);
    };

    const checkDataAvailability = async (): Promise<void> => {
        const dataAvailability = await MyDataHelps.getDataAvailability();
        setHasData(dataAvailability.appleHealthRecords);
        if (dataAvailability.appleHealthRecords || dataAvailabilityRecheckAttempts.current >= MAX_DATA_AVAILABILITY_RECHECK_ATTEMPTS) {
            setConnecting(false);
        }
    };

    const loadState = async (): Promise<void> => {
        const settings = await MyDataHelps.getDataCollectionSettings();
        setStatus(settings.appleHealthRecordsEnabled ? 'enabled' : 'disabled');
        if (!settings.appleHealthRecordsEnabled) {
            setHasData(false);
            setConnecting(false);
        } else if (!connecting) {
            checkDataAvailability();
        }
    };

    useInitializeView(() => {
        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }

        if (!platform) {
            loadPlatform();
            return;
        }

        if (platform === 'iOS') {
            loadState();
        }
    }, [], [props.previewState, platform]);

    // This interval only executes while "connecting" is true.  When connecting
    // gets set to false, a null delay is passed to useInterval, which cancels
    // the interval.  The next time connecting gets set to true, the interval
    // starts again.
    useInterval(() => {
        dataAvailabilityRecheckAttempts.current += 1;
        checkDataAvailability();
    }, connecting ? 5000 : null);

    if (!status || (props.showWhen && props.showWhen !== status)) {
        return null;
    }

    const getSubtitle = () => {
        if (status !== 'enabled') {
            return language('apple-health-records-sync-prompt');
        }
        if (hasData) {
            return language('connected');
        }
        return connecting ? language('syncing-data') : language('no-data');
    };

    const getIndicator = () => {
        if (status === 'enabled') {
            return <Button variant='subtle' onClick={() => setShowHelp(!showHelp)}>{language('help')}</Button>;
        }
        const onEnableHealthRecords = () => {
            if (props.previewState) return;

            setConnecting(true);
            dataAvailabilityRecheckAttempts.current = 0;
            MyDataHelps.startSurvey(props.enableAppleHealthRecordsSurvey);
        };
        return <Button onClick={onEnableHealthRecords}>{language('connect')}</Button>;
    };

    return <div className="mdhui-apple-health-records-sync">
        <Action
            title={language('apple-health-records-sync-title')}
            titleIcon={<img src={appleHealthLogo} style={{ width: '15px', marginRight: '8px' }} alt={language('apple-health-logo-alt')} />}
            subtitle={getSubtitle()}
            indicator={getIndicator()}
            renderAs="div"
            innerRef={props.innerRef}
        />
        {showHelp &&
            <div className="mdhui-apple-health-records-sync-help">
                <p>{language('apple-health-troubleshooting-intro')}</p>
                <ol>
                    <li>{language('apple-health-troubleshooting-li-1')}</li>
                    <li>{language('apple-health-troubleshooting-li-2')}</li>
                    <li>{language('apple-health-troubleshooting-li-3')}</li>
                    <li>{language('apple-health-troubleshooting-li-4')}</li>
                    <li>{language('apple-health-troubleshooting-li-5')}</li>
                </ol>
            </div>
        }
    </div>;
}