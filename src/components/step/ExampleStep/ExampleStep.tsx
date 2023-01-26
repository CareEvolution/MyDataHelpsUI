import React from 'react'
import '../index.css';

export interface ExampleStepProps {
    children?: React.ReactNode;
}

export default function (props: ExampleStepProps) {
    return (
      <div className="step-container">
        {props.children}
      </div>
    );
}