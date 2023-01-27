import React from 'react'
import stepElementStyle from '../step-helpers';
import './StepDetailText.css'
import { StepElementProps } from '../shared';
import StepMarkdown from '../StepMarkdown/StepMarkdown';


export default function (props: StepElementProps) {
    return (
      <div id="detail-text" className="step-detail-text" style={stepElementStyle(props)}>
        <StepMarkdown 
          text={props.text} /> 
      </div>
    );
}