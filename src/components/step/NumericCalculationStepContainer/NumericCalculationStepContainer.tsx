import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import { calculateValue } from '../../../helpers/calculationStepFunctions/numericCalculationFunctions';
import StepLayout from '../StepLayout'
import { LoadingIndicator } from '../../presentational';

export default function () {
    
    useEffect(() => {
        MyDataHelps.getStepConfiguration().then((config: StepConfiguration) => {
            if (!config) return; // allows test mode to work
            MyDataHelps.getCurrentSurveyAnswers().then((surveyAnswers) => {
                MyDataHelps.completeStep(calculateValue(config.properties.calculation, surveyAnswers).toString());
            });
        });
    }, []);

    return (
        <StepLayout>
            <LoadingIndicator/>
        </StepLayout>
    );
}