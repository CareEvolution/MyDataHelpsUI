import React from 'react'
import stepElementStyle from '../step-helpers';
import { StepElementProps } from '../shared';
import language from '../../../helpers/language'
import './StepNextButton.css'

export interface StepNextButtonProps extends StepElementProps {
    backgroundColor: string,
    letterSpacing: string,
    textTransform: string,
    gradient: any;
    onClick(): void;
}

export default function (props: StepNextButtonProps) {

    const style = stepElementStyle(props) as any;
    if (props.gradient) {
      var gradientStyle = props.gradient.direction === "LeftToRight" ? 
        `linear-gradient(to right, ${props.gradient.startColor} 0%, ${props.gradient.endColor} 100%)` :
        `linear-gradient(to bottom, ${props.gradient.startColor} 0%, ${props.gradient.endColor} 100%)`;
        style.backgroundImage = gradientStyle;
    }
    style.letterSpacing = props.letterSpacing;
    style.textTransform = props.textTransform;
    style.backgroundColor = props.backgroundColor;
    var text = props.text ? props.text : language["next-button-text"];
    return (
      <button 
        className="step-next-button" 
        style={style} 
        onClick={props.onClick}>
          {text}
      </button>
    );
}