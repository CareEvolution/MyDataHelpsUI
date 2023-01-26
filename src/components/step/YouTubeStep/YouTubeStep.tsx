import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import StepTitle from '../StepTitle';
import StepText from '../StepText';
import StepDetailText from '../StepDetailText'
import StepNextButton from '../StepNextButton';
import './YouTubeStep.css'
import '../index.css';

export interface YouTubeStepProps {
    properties?: any;
    styles?: any;
}

export default function (props: YouTubeStepProps) {

    const [properties, setProperties] = useState<any>(props.properties ?? {});
    const [styles, setStyles] = useState<any>(props.styles ?? {});

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function(config: StepConfiguration){
          setProperties(config.properties ?? {});
          setStyles(config.styles ?? {});
        });
    }, []);

    if (!properties.videoId) {
        return <div className="step-container"></div>;
    }
    var height = properties.height ? properties.height : "225";
    return (
      <div className="step-container">
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
            <div style={{textAlign: 'center'}} >
              <iframe
                style={{position: "relative", width: "calc(100% + 40px)", left: "-20px"}}
                id="video" width="100%" height={height} src={`https://www.youtube.com/embed/${properties.videoId}`}
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
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
    </div>
    );
}