import React from 'react'
import stepElementStyle from '../step-helpers';
import './StepImage.css'
import { IconElementProps } from '../shared';

export default function (props: IconElementProps) {
    if (!props.srcUrl) {
      return null
    }
    return (
      <div className="step-image">
        <img src={props.srcUrl} />
      </div>
    );
}