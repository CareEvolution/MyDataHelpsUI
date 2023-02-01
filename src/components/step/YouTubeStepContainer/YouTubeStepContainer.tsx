import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import YouTubeStep from '../YouTubeStep';

export default function () {

    const [properties, setProperties] = useState<any>({});
    const [styles, setStyles] = useState<any>({});

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function(config: StepConfiguration){
          if (!config) return; // allows test mode to work
          setProperties(config.properties ?? {});
          setStyles(config.styles ?? {});
        });
    }, []);

    return (
      <YouTubeStep
          properties={properties}
          styles={styles}
         />
    );
}