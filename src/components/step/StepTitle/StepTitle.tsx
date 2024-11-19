import React from 'react'
import stepElementStyle from '../step-helpers';
import './StepTitle.css'
import { StepElementProps } from '../shared';
import StepMarkdown from '../StepMarkdown/StepMarkdown';


export default function StepTitle (props: StepElementProps) {
    if (!props.text) {
      return null
    }
    return (
      <div className="mdhui-step-title" style={stepElementStyle(props)}>
          <StepMarkdown 
            text={props.text} 
            inline={true}
          /> 
      </div>
    );
}