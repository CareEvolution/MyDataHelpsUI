import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import YouTubeStep from '../YouTubeStep';

export default function () {

    const [title, setTitle] = useState<string>();
    const [text, setText] = useState<string>();
    const [transcript, setTranscript] = useState<string>();
    const [videoId, setVideoId] = useState<string>("");
    const [nextButtonText, setNextButtonText] = useState<string>();
    const [height, setHeight] = useState<string>();
    const [styles, setStyles] = useState<any>({});

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function(config: StepConfiguration){
          if (!config) return; // allows test mode to work
          
          setTitle(config.properties.title);
          setText(config.properties.text);
          setTranscript(config.properties.transcript);
          setVideoId(config.properties.videoId);
          setNextButtonText(config.properties.nextButtonText);
          setHeight(config.properties.height);

          setStyles(config.styles ?? {});
        });
    }, []);

    return (
      <YouTubeStep
          title={title}
          text={text}
          transcript={transcript}
          nextButtonText={nextButtonText}
          height={height}
          videoId={videoId}
          styles={styles}
         />
    );
}