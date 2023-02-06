import React, {useEffect} from 'react'
import './StepLayout.css'

export interface StepLayoutProps {
    children?: React.ReactNode;
}

export default function (props: StepLayoutProps) {
  // override the default bundle body style in a way that won't interfere with the views styles
  document.body.style.backgroundColor = "#FFFFFF";

  return (
      <div className="step-container">
        {props.children}
      </div>
    );
}