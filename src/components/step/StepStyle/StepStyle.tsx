import React from 'react'
import { StepStyleProps } from '../shared';

export default function (props: StepStyleProps) {
    return (
      <style>
          .step-container .step-title &#123;
            {props.titleAlignment ? `text-align: ${props.titleAlignment};` : ""}
            {props.titleColor ? `color: ${props.titleColor};` : ""}
            {props.titleFontSize ? `font-size: ${props.titleFontSize}px;` : ""}
            {props.titleFontWeight ? `font-weight: ${props.titleFontWeight};` : ""}
          &#125;
      </style>
    );
}

