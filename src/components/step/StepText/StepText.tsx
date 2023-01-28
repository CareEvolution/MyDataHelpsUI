import React from 'react'
import stepElementStyle from '../step-helpers';
import './StepText.css'
import { StepElementProps } from '../shared';
import StepMarkdown from '../StepMarkdown/StepMarkdown';


export default function (props: StepElementProps) {
    if (!props.text) {
      return (<></>)
    }
    return (
      <div id="text" className="step-text" style={stepElementStyle(props)}>
          <StepMarkdown 
            text={props.text} /> 
      </div>
    );
}