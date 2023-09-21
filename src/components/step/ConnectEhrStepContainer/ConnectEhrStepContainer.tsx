import { useEffect, useState } from "react";
import MyDataHelps, {
    ExternalAccountProvider,
    StepConfiguration,
} from "@careevolution/mydatahelps-js";
import ConnectEhrStep from "../ConnectEhrStep/ConnectEhrStep";
import React from "react";

export default function () {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [nextButtonText, setNextButtonText] = useState<string>();
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
    const [styles, setStyles] = useState<any>({});

    function onProviderConnected(provider: ExternalAccountProvider) {
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
    }, []);

    return (
        <ConnectEhrStep
            title={title}
            text={text}
            nextButtonText={nextButtonText}
            nextButtonDisabled={nextButtonDisabled}
            styles={styles}
            onProviderConnected={onProviderConnected}
            onNextButtonClick={() => MyDataHelps.completeStep("")}
        />
    );
}
