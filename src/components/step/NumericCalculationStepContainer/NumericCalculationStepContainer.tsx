import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import { calculateValue } from '../../../helpers/calculationStepFunctions/numericCalculationFunctions';
import StepLayout from '../StepLayout'
import { LoadingIndicator } from '../../presentational';
import OnVisibleTrigger from '../../presentational/OnVisibleTrigger/OnVisibleTrigger';

export default function () {

    const [calculationString, setCalculationString] = useState<string>("");
    const [calculationReady, setCalculationReady] = useState<boolean>(false);
    const [calculationResult, setCalculationResult] = useState<string>("");


    useEffect(() => {
        setCalculationReady(false);
        MyDataHelps.getStepConfiguration().then(function(config: StepConfiguration){
          if (!config) return; // allows test mode to work
          
          setCalculationString(config.properties.calculation);
          return new Promise((resolve, reject) => {
            resolve(config.properties.calculation);
          })
        })
        .then((() => MyDataHelps.getCurrentSurveyAnswers()))
        .then((surveyAnswers) => {
            setCalculationResult(calculateValue(calculationString, surveyAnswers).toString());
            console.log(calculationResult);
            setCalculationReady(true);
        })
    }, []);

    return (
        <StepLayout>
            <LoadingIndicator/>
            <OnVisibleTrigger enabled={calculationReady} onTrigger={() => {MyDataHelps.completeStep(calculationResult)}}/>
        </StepLayout>
    );
}