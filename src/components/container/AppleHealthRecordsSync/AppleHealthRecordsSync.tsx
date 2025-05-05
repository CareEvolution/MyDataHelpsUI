import React, { useState } from 'react';
import { Action, Button } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { language, useInitializeView } from '../../../helpers';
import appleHealthLogo from '../../../assets/applehealth-logo.svg';
import './AppleHealthRecordsSync.css';

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
    const [recheckAttempts, setRecheckAttempts] = useState<number>(0);

    let recheckTimeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    const applyPreviewState = (previewState: AppleHealthRecordsSyncPreviewState) => {
        setPlatform(previewState === 'wrong platform' ? 'Web' : 'iOS');
        setStatus(previewState.startsWith('enabled') ? 'enabled' : previewState === 'disabled' ? 'disabled' : undefined);
        setHasData(previewState === 'enabled with data');
        setConnecting(previewState === 'enabled no data yet');
        setShowHelp(false);
    };

    useInitializeView(() => {
        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }

        if (!platform) {
            MyDataHelps.getDeviceInfo().then(deviceInfo => {
                setPlatform(deviceInfo.platform);
            });
            return;
        }

        if (platform === 'iOS') {
            MyDataHelps.getDataCollectionSettings().then(settings => {
                setStatus(settings.appleHealthRecordsEnabled ? 'enabled' : 'disabled');
                if (settings.appleHealthRecordsEnabled) {
                    MyDataHelps.getDataAvailability().then(dataAvailability => {
                        setHasData(dataAvailability.appleHealthRecords);
                        if (dataAvailability.appleHealthRecords || recheckAttempts === MAX_DATA_AVAILABILITY_RECHECK_ATTEMPTS) {
                            setConnecting(false);
                        } else if (connecting) {
                            recheckTimeoutId = setTimeout(() => setRecheckAttempts(recheckAttempts + 1), 5000);
                        }
                    });
                } else {
                    setHasData(false);
                    setConnecting(false);
                }
            });
        }
    }, ['surveyDidFinish'], [props.previewState, platform, recheckAttempts], () => clearTimeout(recheckTimeoutId));

    if (!status || (props.showWhen && props.showWhen !== status)) {
        return null;
    }

    const getSubtitle = () => {
        if (status === 'enabled') {
            return hasData ? language('connected') : connecting ? language('syncing-data') : language('no-data');
        }
        return language('apple-health-records-sync-prompt');
    };

    const getIndicator = () => {
        if (status === 'enabled') {
            return <Button variant='subtle' onClick={() => setShowHelp(!showHelp)}>{language('help')}</Button>;
        }
        const onEnableHealthRecords = () => {
            setConnecting(true);
            MyDataHelps.startSurvey(props.enableAppleHealthRecordsSurvey);
        };
        return <Button onClick={onEnableHealthRecords}>{language('connect')}</Button>;
    };

    return <div className="mdhui-apple-health-records-sync">
        <Action
            title={language('apple-health-records-sync-title')}
            titleIcon={<img src={appleHealthLogo} style={{ width: '15px', marginRight: '8px' }} alt="apple health logo" />}
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