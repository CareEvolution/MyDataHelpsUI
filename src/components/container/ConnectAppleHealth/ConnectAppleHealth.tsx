import MyDataHelps from '@careevolution/mydatahelps-js';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import language from '../../../helpers/language';
import { PlatformSpecificContent } from '..';
import Button from '../../presentational/Button';
import Card from '../../presentational/Card';
import CardTitle from '../../presentational/CardTitle';
import TextBlock from '../../presentational/TextBlock';

export interface ConnectAppleHealthProps {
    enableAppleHealthSurveyName?: string
    appleHealthEnabled?: boolean
    previewDevicePlatform?: string
}

export default function (props: ConnectAppleHealthProps) {
    return <>
        <PlatformSpecificContent platforms={['Web']} previewDevicePlatform={props.previewDevicePlatform}>
            <CardTitle title="Apple Health" />
            <TextBlock>
                <p style={{ marginBottom: '16px' }}>
                    {language["web-apple-health"]}
                </p>
                <Button className='auto-width' onClick={() => MyDataHelps.openExternalUrl("https://apps.apple.com/us/app/mydatahelps/id1286789190")}>{language["download-mydatahelps"]}</Button>
            </TextBlock>
        </PlatformSpecificContent>
        <PlatformSpecificContent platforms={['iOS']} previewDevicePlatform={props.previewDevicePlatform}>
            <CardTitle title="Apple Health" />
            <TextBlock>
                {(!props.enableAppleHealthSurveyName || props.appleHealthEnabled) &&
                    <>
                        {props.appleHealthEnabled &&
                            <p style={{ color: "var(--mdhui-color-success" }}>
                                <FontAwesomeSvgIcon icon={faCheckCircle} />&nbsp;
                                {language["enabled"]}
                            </p>
                        }
                        <p>{language["apple-health-troubleshooting-intro"]}</p>
                        <ol>
                            <li>{language["apple-health-troubleshooting-li-1"]}</li>
                            <li>{language["apple-health-troubleshooting-li-2"]}</li>
                            <li>{language["apple-health-troubleshooting-li-3"]}</li>
                            <li>{language["apple-health-troubleshooting-li-4"]}</li>
                            <li>{language["apple-health-troubleshooting-li-5"]}</li>
                        </ol>
                    </>
                }
                {(props.enableAppleHealthSurveyName && !props.appleHealthEnabled) &&
                    <>
                        <p style={{ marginBottom: '16px' }}>
                            {language["apple-health-start-sharing"]}
                        </p>
                        <Button onClick={() => MyDataHelps.startSurvey("ShareAppleHealth")}>{language["apple-health-share"]}</Button>
                    </>
                }
            </TextBlock>
        </PlatformSpecificContent>
    </>
}