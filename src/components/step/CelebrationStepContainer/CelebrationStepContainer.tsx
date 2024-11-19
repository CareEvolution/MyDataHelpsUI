import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import CelebrationStep from '../CelebrationStep';

/**
 * A celebration step to use within a MyDataHelps survey.
 */
export default function CelebrationStepContainer() {

    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [detailText, setDetailText] = useState<string>();
    const [iconUrl, setIconUrl] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [nextButtonText, setNextButtonText] = useState<string>();
    const [styles, setStyles] = useState<any>({});

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function(config: StepConfiguration){
          if (!config) return; // allows test mode to work
          
          setTitle(config.properties.title);
          setText(config.properties.text);
          setDetailText(config.properties.detailText);
          setIconUrl(config.properties.iconImage);
          setImageUrl(config.properties.image);
          setNextButtonText(config.properties.nextButtonText);

          setStyles(config.styles ?? {});
        });
    }, []);

    return (
        <CelebrationStep
            title={title}
            text={text}
            detailText={detailText}
            iconUrl={iconUrl}
            imageUrl={imageUrl}
            nextButtonText={nextButtonText}
            styles={styles}
        />
    );
}