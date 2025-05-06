import React, { useEffect, useRef, useState } from 'react';
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

    const isConnecting = useRef<boolean>(false);
    const recheckTimeoutId = useRef<ReturnType<typeof setTimeout>>();

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

        clearTimeout(recheckTimeoutId.current);

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
                    const checkDataAvailability = (recheckAttempts: number = 0) => {
                        MyDataHelps.getDataAvailability().then(dataAvailability => {
                            setHasData(dataAvailability.appleHealthRecords);
                            if (dataAvailability.appleHealthRecords || recheckAttempts === MAX_DATA_AVAILABILITY_RECHECK_ATTEMPTS) {
                                setConnecting(false);
                            } else if (isConnecting.current) {
                                recheckTimeoutId.current = setTimeout(() => checkDataAvailability(recheckAttempts + 1), 5000);
                            }
                        });
                    };
                    checkDataAvailability();
                } else {
                    setHasData(false);
                    setConnecting(false);
                }
            });
        }
    }, [], [props.previewState, platform], () => clearTimeout(recheckTimeoutId.current));

    useEffect(() => {
        isConnecting.current = connecting;
    }, [connecting]);

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