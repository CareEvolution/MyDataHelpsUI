import { useEffect, useState } from "react";
import MyDataHelps, {
    StepConfiguration,
    ExternalAccountProvider,
} from "@careevolution/mydatahelps-js";
import ConnectEhrStep from "../ConnectEhrStep/ConnectEhrStep";
import React from "react";

export default function () {
    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [nextButtonText, setNextButtonText] = useState<string>();
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
    const [styles, setStyles] = useState<any>({});
    const [provider, setProvider] = useState<
        ExternalAccountProvider | undefined
    >(undefined);

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

    useEffect(() => {
        const interval = setInterval(() => {
            if (!provider || !nextButtonDisabled) {
                return;
            }

            MyDataHelps.getExternalAccounts().then((accounts) => {
                if (accounts.some((a) => a.provider.id === provider.id)) {
                    setNextButtonDisabled(false);
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [provider, nextButtonDisabled]);

    return (
        <ConnectEhrStep
            title={title}
            text={text}
            nextButtonText={nextButtonText}
            nextButtonDisabled={nextButtonDisabled}
            styles={styles}
            onProviderSelected={setProvider}
        />
    );
}
