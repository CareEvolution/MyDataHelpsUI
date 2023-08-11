import React from "react";
import MyDataHelps, {
    ExternalAccountProvidersPage,
} from "@careevolution/mydatahelps-js";
import StepLayout from "../StepLayout";
import StepTitle from "../StepTitle";
import StepText from "../StepText";
import StepNextButton from "../StepNextButton";

export interface ConnectDeviceAccountStepProps {
    title?: string;
    text?: string;
    deviceType: string; // "Fitbit" | "Garmin" | "Omron";
    providerName: string;
    styles: { [key: string]: any };
}

export default function (props: ConnectDeviceAccountStepProps) {
    const nextButtonText = `Connect to ${props.deviceType}`;
    return (
        <StepLayout>
            <StepTitle
                text={props.title}
                textAlign={props.styles.titleAlignment}
                color={props.styles.titleColor}
                fontSize={props.styles.titleFontSize}
                fontWeight={props.styles.titleFontWeight}
            />
            <StepText
                text={props.text}
                textAlign={props.styles.textAlignment}
                color={props.styles.textColor}
                fontSize={props.styles.textFontSize}
                fontWeight={props.styles.textFontWeight}
            />
            <StepNextButton
                text={nextButtonText}
                color={props.styles.nextButtonTextColor}
                fontWeight={props.styles.nextButtonFontWeight}
                backgroundColor={props.styles.nextButtonBackgroundColor}
                letterSpacing={props.styles.nextButtonLetterSpacing}
                textTransform={props.styles.nextButtonTextTransform?.toLowerCase()}
                gradient={props.styles.nextButtonBackgroundGradient}
                onClick={() =>
                    MyDataHelps.getExternalAccountProviders(
                        props.providerName,
                        "Device Manufacturer",
                        10,
                        0
                    )
                        .then((page: ExternalAccountProvidersPage) => {
                            if (page.totalExternalAccountProviders === 0) {
                                throw new Error(
                                    `No external account provider ${props.providerName} found.`
                                );
                            } else if (page.totalExternalAccountProviders > 1) {
                                throw new Error(
                                    `More than one external account provider ${props.providerName} found.`
                                );
                            }

                            return page.externalAccountProviders[0].id;
                        })
                        .then((providerId) => {
                            return MyDataHelps.connectExternalAccount(
                                providerId,
                                { openNewWindow: true }
                            );
                        })
                }
            />
        </StepLayout>
    );
}
