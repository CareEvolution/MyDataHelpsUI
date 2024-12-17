import React from 'react'
import stepElementStyle from '../step-helpers';
import './StepDetailText.css'
import { StepElementProps } from '../shared';
import StepMarkdown from '../StepMarkdown/StepMarkdown';


export default function StepDetailText (props: StepElementProps) {
    if (!props.text) {
      return null
    }
    return (
      <div className="mdhui-step-detail-text" style={stepElementStyle(props)}>
        <StepMarkdown 
          text={props.text} />
      </div>
    );
}