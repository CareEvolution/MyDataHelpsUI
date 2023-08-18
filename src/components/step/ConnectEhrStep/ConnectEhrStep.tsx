import React from "react";
import { ProviderSearch } from "../../container";
import StepLayout from "../StepLayout";
import StepNextButton from "../StepNextButton";
import StepText from "../StepText";
import StepTitle from "../StepTitle";
import MyDataHelps, { ExternalAccountProvider } from "@careevolution/mydatahelps-js";
import { ProviderSearchPreviewState } from "../../container/ProviderSearch/ProviderSearch";

export interface ConnectEhrStepProps {
    title?: string;
    text?: string;
    nextButtonText?: string;
    nextButtonDisabled?: boolean;
    previewState?: ProviderSearchPreviewState; // For Storybook only
    onProviderSelected: (provider: ExternalAccountProvider) => void;
    styles: { [key: string]: any };
}

export default function (props: ConnectEhrStepProps) {
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
            <ProviderSearch
                previewState={props.previewState}
                providerCategories={["Provider", "Health Plan"]}
                openNewWindow={true}
                onProviderSelected={props.onProviderSelected}
            />
            <StepNextButton
                text={props.nextButtonText}
                disabled={props.nextButtonDisabled}
                color={props.styles.nextButtonTextColor}
                fontWeight={props.styles.nextButtonFontWeight}
                backgroundColor={props.styles.nextButtonBackgroundColor}
                letterSpacing={props.styles.nextButtonLetterSpacing}
                textTransform={props.styles.nextButtonTextTransform?.toLowerCase()}
                gradient={props.styles.nextButtonBackgroundGradient}
                onClick={() => MyDataHelps.completeStep("")}
            />
        </StepLayout>
    );
}
