import React from 'react'
import ReactMarkdown from 'react-markdown'
import stepElementStyle from '../step-helpers';
import './StepText.css'
import { StepElementProps } from '../shared';


export default function (props: StepElementProps) {
    return (
      <div id="text" className="step-text" style={stepElementStyle(props)}>
          <ReactMarkdown 
            components={{a: ({node, ...props}) => <a href={props.href} target="_blank">{props.children}</a>}}>
            {props.text}</ReactMarkdown>
      </div>
    );
}