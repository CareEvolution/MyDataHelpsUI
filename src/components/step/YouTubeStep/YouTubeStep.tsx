import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import StepLayout from '../StepLayout'
import StepTitle from '../StepTitle';
import StepText from '../StepText';
import StepDetailText from '../StepDetailText'
import StepNextButton from '../StepNextButton';

export interface YouTubeStepProps {
    properties?: { [key: string]: any };
    styles?: { [key: string]: any };
}

export default function (props: YouTubeStepProps) {

    const [properties, setProperties] = useState<any>(props.properties ?? {});
    const [styles, setStyles] = useState<any>(props.styles ?? {});

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function(config: StepConfiguration){
          if (!config) return; // allows test mode to work
          setProperties(config?.properties ?? {});
          setStyles(config?.styles ?? {});
        });
    }, []);

    if (!properties.videoId) {
        return <div className="step-container"></div>;
    }
    // ref player params at https://developers.google.com/youtube/player_parameters
    let frameHeight = (properties.height ? properties.height : "225") + "px";
    let ccLanguage = MyDataHelps.getCurrentLanguage(); // used to set default CC language
    let showRelated = 0; // restricts related videos to current channel only
    let showControls = 1; // show player controls, probably something we should make configurable
    let autoplay = 0; // do not autoplay, probably should make this configurable
    let allowFullscreen = 1; // show fullscreen controls
    let youTubeBranding = 1; // hide youtube logo
    return (
      <StepLayout>
           <StepTitle 
              text={properties.title} 
              textAlign={styles.titleAlignment}
              color={styles.titleColor}
              fontSize={styles.titleFontSize}
              fontWeight={styles.titleFontWeight}
            />
           <StepText 
              text={properties.text} 
              textAlign={styles.textAlignment}
              color={styles.textColor}
              fontSize={styles.textFontSize}
              fontWeight={styles.textFontWeight}
            />
            <div style={{textAlign: 'center', width: "100%"}} >
              <iframe
                style={{width: "100%", height: frameHeight, border: 0}}
                  src={`https://www.youtube.com/embed/${properties.videoId}?rel=${showRelated}&cc_lang_pref=${ccLanguage}&controls=${showControls}&autoplay=${autoplay}&fs=${allowFullscreen}&modestbranding=${youTubeBranding}`}
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen={true}>
              </iframe>
            </div>
            <StepDetailText 
              text={properties.transcript} 
              textAlign={styles.detailTextAlignment}
              color={styles.detailTextColor}
              fontSize={styles.detailTextFontSize}
              fontWeight={styles.detailTextFontWeight}
            />
            <StepNextButton 
              text={properties.nextButtonText} 
              color={styles.nextButtonTextColor}
              fontWeight={styles.nextButtonFontWeight}
              backgroundColor={styles.nextButtonBackgroundColor}
              letterSpacing={styles.nextButtonLetterSpacing}
              textTransform={styles.nextButtonTextTransform?.toLowerCase()}
              gradient={styles.nextButtonBackgroundGradient}
              onClick={() => MyDataHelps.completeStep('')}
            />            
      </StepLayout>
    );
}