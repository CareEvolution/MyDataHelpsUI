import React from 'react'
import MyDataHelps from '@careevolution/mydatahelps-js';
import StepLayout from '../StepLayout'
import StepTitle from '../StepTitle';
import StepText from '../StepText';
import StepDetailText from '../StepDetailText'
import StepNextButton from '../StepNextButton';

export interface YouTubeStepProps {
    properties: { [key: string]: any };
    styles: { [key: string]: any };
}

export default function (props: YouTubeStepProps) {

    if (!props.properties.videoId) {
        return (<StepLayout></StepLayout>)
    }
    // ref player params at https://developers.google.com/youtube/player_parameters
    let frameHeight = (props.properties.height ? props.properties.height : "225") + "px";
    let ccLanguage = MyDataHelps.getCurrentLanguage(); // used to set default CC language
    let showRelated = 0; // restricts related videos to current channel only
    let showControls = 1; // show player controls, probably something we should make configurable
    let autoplay = 0; // do not autoplay, probably should make this configurable
    let allowFullscreen = 1; // show fullscreen controls
    let youTubeBranding = 1; // hide youtube logo
    return (
      <StepLayout>
           <StepTitle 
              text={props.properties.title} 
              textAlign={props.styles.titleAlignment}
              color={props.styles.titleColor}
              fontSize={props.styles.titleFontSize}
              fontWeight={props.styles.titleFontWeight}
            />
           <StepText 
              text={props.properties.text} 
              textAlign={props.styles.textAlignment}
              color={props.styles.textColor}
              fontSize={props.styles.textFontSize}
              fontWeight={props.styles.textFontWeight}
            />
            <div style={{textAlign: 'center', width: "100%"}} >
              <iframe
                style={{width: "100%", height: frameHeight, border: 0}}
                  src={`https://www.youtube.com/embed/${props.properties.videoId}?rel=${showRelated}&cc_lang_pref=${ccLanguage}&controls=${showControls}&autoplay=${autoplay}&fs=${allowFullscreen}&modestbranding=${youTubeBranding}`}
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen={true}>
              </iframe>
            </div>
            <StepDetailText 
              text={props.properties.transcript} 
              textAlign={props.styles.detailTextAlignment}
              color={props.styles.detailTextColor}
              fontSize={props.styles.detailTextFontSize}
              fontWeight={props.styles.detailTextFontWeight}
            />
            <StepNextButton 
              text={props.properties.nextButtonText} 
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