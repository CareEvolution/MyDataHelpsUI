import React, { useState } from 'react';
import { Action, Button } from '../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { language, useInitializeView } from '../../../helpers';
import appleHealthLogo from '../../../assets/applehealth-logo.svg';
import './AppleHealthRecordsSync.css';

export type AppleHealthRecordsSyncPreviewState = 'wrong platform' | 'disabled' | 'enabled no data' | 'enabled with data';
export type AppleHealthRecordsStatus = 'enabled' | 'disabled';

export interface AppleHealthRecordsSyncProps {
    previewState?: AppleHealthRecordsSyncPreviewState;
    enableAppleHealthRecordsSurvey: string;
    showWhen?: AppleHealthRecordsStatus;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function AppleHealthRecordsSync(props: AppleHealthRecordsSyncProps) {
    const [platform, setPlatform] = useState<string>();
    const [status, setStatus] = useState<AppleHealthRecordsStatus>();
    const [connected, setConnected] = useState<boolean>();
    const [showHelp, setShowHelp] = useState<boolean>(false);

    useInitializeView(async () => {
        if (props.previewState) {
            if (props.previewState === 'wrong platform') {
                setPlatform('Web');
                setStatus(undefined);
                setConnected(undefined);
            } else if (props.previewState === 'disabled') {
                setPlatform('iOS');
                setStatus('disabled');
                setConnected(undefined);
            } else if (props.previewState === 'enabled no data') {
                setPlatform('iOS');
                setStatus('enabled');
                setConnected(false);
            } else if (props.previewState === 'enabled with data') {
                setPlatform('iOS');
                setStatus('enabled');
                setConnected(true);
            }
            return;
        }

        if (!platform) {
            const deviceInfo = await MyDataHelps.getDeviceInfo();
            setPlatform(deviceInfo.platform);
            return;
        }

        if (platform === 'iOS') {
            const settings = await MyDataHelps.getDataCollectionSettings();
            setStatus(settings.appleHealthRecordsEnabled ? 'enabled' : 'disabled');

            if (settings.appleHealthRecordsEnabled) {
                const dataAvailability = await MyDataHelps.getDataAvailability();
                setConnected(dataAvailability.appleHealthRecords);
            }
        }
    }, [], [props.previewState, platform]);

    console.log('showWhen: ' + props.showWhen);

    if (!status || (props.showWhen && props.showWhen !== status)) {
        return null;
    }

    const getSubtitle = () => {
        if (status === 'enabled') {
            return connected ? language('connected') : language('no-data');
        }
        return language('apple-health-records-sync-prompt');
    };

    const getIndicator = () => {
        if (status === 'enabled') {
            return <Button variant='subtle' onClick={() => setShowHelp(!showHelp)}>{language('help')}</Button>;
        }
        return <Button onClick={() => MyDataHelps.startSurvey(props.enableAppleHealthRecordsSurvey)}>{language('connect')}</Button>;
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