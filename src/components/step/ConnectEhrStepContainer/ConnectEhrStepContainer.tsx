import { useEffect, useState } from "react";
import MyDataHelps, {
    ExternalAccountProvider,
    StepConfiguration,
    SurveyContext,
} from "@careevolution/mydatahelps-js";
import ConnectEhrStep from "../ConnectEhrStep/ConnectEhrStep";
import React from "react";

/**
 * A survey step to use within a MyDataHelps survey for connecting Providers, and Health Plans.
 */
export default function ConnectEhrStepContainer() {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [surveyContext, setSurveyContext] = useState<SurveyContext>();
    const [nextButtonText, setNextButtonText] = useState<string>();
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
    const [styles, setStyles] = useState<any>({});
    const [providerIDs, setProviderIDs] = useState<number[]>([]);

    function onProviderConnected(provider: ExternalAccountProvider) {
        setProviderIDs((ids) => [...ids, provider.id]);
        setNextButtonDisabled(false);
    }

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function (
            config: StepConfiguration
        ) {
            if (!config) return; // allows test mode to work

            setTitle(config.properties.title);
            setText(config.properties.text);
            setNextButtonText(config.properties.nextButtonText);
            setStyles(config.styles ?? {});
        });

        MyDataHelps.getSurveyContext().then(function(
          context  
        ){
          if (!context) return;
          setSurveyContext(context);
        }); 
    }, []);

    return (
        <ConnectEhrStep
            title={title}
            text={text}
            nextButtonText={nextButtonText}
            nextButtonDisabled={nextButtonDisabled}
            styles={styles}
            onProviderConnected={onProviderConnected}
            // Display preview data under 'Design' mode.
            previewState={surveyContext?.surveyMode === 'Design'?'Default' : undefined}
            onNextButtonClick={() => MyDataHelps.completeStep(providerIDs.toString())}
        />
    );
}
