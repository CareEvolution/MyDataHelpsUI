import React from 'react'
import './StepLayout.css'

export interface StepLayoutProps {
    children?: React.ReactNode;
}

export default function (props: StepLayoutProps) {
    return (
      <div className="step-container">
        {props.children}
      </div>
    );
}