import React from "react";
import StepLayout from "../StepLayout";
import StepTitle from "../StepTitle";
import StepText from "../StepText";
import StepNextButton from "../StepNextButton";
import { deviceType } from "../../../helpers/deviceType";
import { language } from "../../../helpers/language";
export interface ConnectDeviceAccountStepProps {
    title?: string;
    text?: string;
    deviceType: deviceType;
    providerID: number;
    styles: { [key: string]: any };
    onConnect: () => void;
}

export default function (props: ConnectDeviceAccountStepProps) {
    const nextButtonText = language("connect-to-device").replace("@@DEVICE@@", props.deviceType);

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
                onClick={props.onConnect}
            />
        </StepLayout>
    );
}
