import React from 'react'
import ReactMarkdown from 'react-markdown'
import stepElementStyle from '../step-helpers';
import './StepText.css'
import { StepElementProps } from '../shared';
import StepMarkdown from '../StepMarkdown/StepMarkdown';


export default function (props: StepElementProps) {
    return (
      <div id="text" className="step-text" style={stepElementStyle(props)}>
          <StepMarkdown 
            text={props.text} /> 
      </div>
    );
}