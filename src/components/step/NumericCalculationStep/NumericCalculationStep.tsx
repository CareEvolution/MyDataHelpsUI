import React from 'react'
import MyDataHelps from '@careevolution/mydatahelps-js';
import StepLayout from '../StepLayout'
import { LoadingIndicator } from '../../presentational';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger/OnVisibleTrigger';


export interface NumericCalculationStepProps {
    calculationResult: string;
    calculationReady: boolean;
}

export default function (props: NumericCalculationStepProps) {
    return (
      <StepLayout>
          <LoadingIndicator/>
          <OnVisibleTrigger enabled={props.calculationReady} onTrigger={() => {MyDataHelps.completeStep(props.calculationResult)}}/>
      </StepLayout>
    );
}