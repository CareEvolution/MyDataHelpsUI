import React from 'react'
import MyDataHelps from '@careevolution/mydatahelps-js';
import StepLayout from '../StepLayout'
import StepTitle from '../StepTitle';
import StepText from '../StepText';
import StepDetailText from '../StepDetailText'
import StepNextButton from '../StepNextButton';
import confetti from '../../../helpers/confetti.min.js';
import StepImageIcon from '../StepImageIcon';
import StepImage from '../StepImage';

export interface CelebrationStepProps {
    title?: string;
    text?: string;
    detailText?: string;
    iconUrl?: string;
    imageUrl?: string;
    nextButtonText?: string;
    styles: { [key: string]: any };
}

export default function (props: CelebrationStepProps) {
    //@ts-ignore
    confetti.confetti.start();
    window.setTimeout(function () {
      //@ts-ignore
      confetti.confetti.stop();
    }, 1200);
    return (
      <StepLayout>
          <StepImageIcon srcUrl={props.iconUrl} />
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
          <StepDetailText 
              text={props.detailText} 
              textAlign={props.styles.textAlignment}
              color={props.styles.textColor}
              fontSize={props.styles.textFontSize}
              fontWeight={props.styles.textFontWeight}
          />
          <StepImage srcUrl={props.imageUrl} />
          <StepNextButton 
              text={props.nextButtonText} 
              color={props.styles.nextButtonTextColor}
              fontWeight={props.styles.nextButtonFontWeight}
              backgroundColor={props.styles.nextButtonBackgroundColor}
              letterSpacing={props.styles.nextButtonLetterSpacing}
              textTransform={props.styles.nextButtonTextTransform?.toLowerCase()}
              gradient={props.styles.nextButtonBackgroundGradient}
              onClick={() => MyDataHelps.completeStep('')}
          />
      </StepLayout>
    );
}