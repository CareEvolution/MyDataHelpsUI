import React from 'react'

export interface StepStyleProps {
  titleAlignment?: string;
  titleColor?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
}

export default function (props: StepStyleProps) {
    return (
      <style>
          .step-container .step-title &#123;
            text-align: {props.titleAlignment};
            color: {props.titleColor};
            font-size: {props.titleFontSize};
            font-weight: {props.titleFontWeight};
            &#125;
      </style>  
    );
}

