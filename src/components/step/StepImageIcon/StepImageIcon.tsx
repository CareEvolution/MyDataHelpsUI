import React from 'react'
import stepElementStyle from '../step-helpers';
import './StepImageIcon.css'
import { IconElementProps } from '../shared';

export default function (props: IconElementProps) {
    if (!props.srcUrl) {
      return null
    }
    return (
      <div className="mdhui-step-image-icon">
        <img src={props.srcUrl} />
      </div>
    );
}