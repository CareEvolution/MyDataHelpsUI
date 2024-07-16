import React, { useState, useEffect } from "react";
import MyDataHelps, { StepConfiguration } from "@careevolution/mydatahelps-js";
import HtmlStep from "../HtmlStep";

type SurveyStyleProps = Record<string, string> & {
    nextButtonBackgroundGradient?: {
        direction: "LeftToRight" | "TopToBottom";
        startColor: string;
        endColor: string;
    };
};

export default function () {
    const [html, setHtml] = useState<string>();
    const [styles, setStyles] = useState<SurveyStyleProps>({});

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function (config: StepConfiguration) {
            if (!config) return; // allows test mode to work

            setHtml(config.properties.html);
            setStyles(config.styles || {});
        });
    }, []);

    return <HtmlStep html={html} styles={styles} />;
}
