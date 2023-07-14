import MyDataHelps from '@careevolution/mydatahelps-js';
import { faCheckCircle, faGear, faGears } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import language from '../../../helpers/language';
import { PlatformSpecificContent } from '..';
import Button from '../../presentational/Button';
import Card from '../../presentational/Card';
import CardTitle from '../../presentational/CardTitle';
import TextBlock from '../../presentational/TextBlock';

export interface ConnectGoogleFitProps {
    enableGoogleFitSurveyName?: string
    googleFitEnabled?: boolean
    previewDevicePlatform?: string
}

export default function (props: ConnectGoogleFitProps) {
    return <>
        <PlatformSpecificContent platforms={['Web']} previewDevicePlatform={props.previewDevicePlatform}>
            <CardTitle title="Google Fit" />
            <TextBlock>
                <p style={{ marginBottom: '16px' }}>
                    {language["web-google-fit"]}
                </p>
                <Button className='auto-width' onClick={() => MyDataHelps.openExternalUrl("https://play.google.com/store/apps/details?id=com.careevolution.mydatahelps&hl=en_US&gl=US")}>{language["download-mydatahelps"]}</Button>
            </TextBlock>
        </PlatformSpecificContent>
        <PlatformSpecificContent platforms={['Android']} previewDevicePlatform={props.previewDevicePlatform}>
            <CardTitle title="Google Fit" />
            <TextBlock>
                {(!props.enableGoogleFitSurveyName || props.googleFitEnabled) &&
                    <>
                        {props.googleFitEnabled &&
                            <p style={{ color: "var(--mdhui-color-success" }}>
                                <FontAwesomeSvgIcon icon={faCheckCircle} />&nbsp;
                                {language["enabled"]}
                            </p>
                        }
                        <a onClick={() => MyDataHelps.showGoogleFitSettings()}>
                            <FontAwesomeSvgIcon icon={faGear} />&nbsp;
                            {language["update-sharing-settings"]}</a>
                    </>
                }
                {props.enableGoogleFitSurveyName && !props.googleFitEnabled &&
                    <>
                        <p style={{ marginBottom: '16px' }}>
                            {language["google-fit-start-sharing"]}
                        </p>
                        <Button className='auto-width' onClick={() => MyDataHelps.startSurvey("ShareGoogleFit")}>{language["google-fit-share"]}</Button>
                    </>
                }
            </TextBlock>
        </PlatformSpecificContent>
    </>
}