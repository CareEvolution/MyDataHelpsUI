import React, { useState } from 'react';
import { Card, Layout, LoadingIndicator, NavigationBar, Title } from '../../../presentational';
import { AsthmaAirQualities, AsthmaBiometrics, AsthmaLogEntryDetails } from '../../components';
import { useInitializeView } from '../../../../helpers';
import { AsthmaParticipant } from '../../model';
import { asthmaDataService } from '../../helpers';
import { getFullDateString } from '../../../../helpers/date-helpers';

export interface AsthmaDayViewProps {
    colorScheme?: 'light' | 'dark' | 'auto';
    previewState?: 'loading' | 'default' | 'as caregiver';
    date: Date;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    editLogEntryUrl: string;
    logEntryInfoUrl: string;
    heartAndLungsUrl: string;
    activityUrl: string;
    sleepUrl: string;
    airQualityUrl: string;
}

export default function AsthmaDayView(props: AsthmaDayViewProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [participant, setParticipant] = useState<AsthmaParticipant>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }

        if (props.previewState) {
            setParticipant({ getParticipantMode: () => props.previewState === 'as caregiver' ? 'Caregiver' : 'Self' } as AsthmaParticipant);
            setLoading(false);
            return;
        }

        asthmaDataService.loadParticipant().then(participant => {
            setParticipant(participant);
            setLoading(false);
        });
    }, [], [props.previewState]);

    return <Layout colorScheme={props.colorScheme ?? 'auto'}>
        <NavigationBar variant="compressed" showCloseButton={true}>
            <Title style={{ textAlign: 'left' }} order={2}>
                {getFullDateString(props.date)}
            </Title>
        </NavigationBar>
        {loading && <LoadingIndicator />}
        {!loading &&
            <>
                <Card>
                    <AsthmaLogEntryDetails
                        previewState={props.previewState ? 'logged with mild symptoms' : undefined}
                        date={props.date}
                        logTodayEntrySurveyName={props.logTodayEntrySurveyName}
                        logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
                        editLogEntryUrl={props.editLogEntryUrl}
                        infoUrl={props.logEntryInfoUrl}
                    />
                </Card>
                {participant!.getParticipantMode() !== 'Caregiver' &&
                    <Card>
                        <AsthmaBiometrics
                            previewState={props.previewState ? 'all data' : undefined}
                            heartAndLungsUrl={props.heartAndLungsUrl}
                            activityUrl={props.activityUrl}
                            sleepUrl={props.sleepUrl}
                            date={props.date}
                        />
                    </Card>
                }
                <Card>
                    <AsthmaAirQualities
                        previewState={props.previewState ? 'all data' : undefined}
                        airQualityUrl={props.airQualityUrl}
                        date={props.date}
                    />
                </Card>
            </>
        }
    </Layout>;
}