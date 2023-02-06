import React from 'react'
import stepElementStyle from '../step-helpers';
import './StepTitle.css'
import { StepElementProps } from '../shared';
import StepMarkdown from '../StepMarkdown/StepMarkdown';


export default function (props: StepElementProps) {
    if (!props.text) {
      return null
    }
    return (
      <div className="step-title" style={stepElementStyle(props)}>
          <StepMarkdown 
            text={props.text} 
            inline={true}
          /> 
      </div>
    );
}