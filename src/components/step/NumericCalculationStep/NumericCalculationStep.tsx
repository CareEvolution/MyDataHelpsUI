import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import { Answer } from '../../../helpers/answer';
import { LoadingIndicator } from '../../presentational';
import StepLayout from '../StepLayout/StepLayout';

export default function () {

    const [calculationString, setCalculationString] = useState<string>("");
    const [previousResults, setPreviousResults] = useState<Array<Answer>>([]);
    const [styles, setStyles] = useState<any>({});

    useEffect(() => {
        MyDataHelps.getStepConfiguration().then(function(config: StepConfiguration){
          if (!config) return; // allows test mode to work
          
          setCalculationString(config.properties.calculation);

          setStyles(config.styles ?? {});
        });
        MyDataHelps.getCurrentSurveyAnswers().then((answers) =>{
            setPreviousResults(answers);
            
            let calculatedAnswer = null;   
            try {
                calculatedAnswer = eval(convertLogicStringToCodeString(calculationString));
            } catch (error) {
                calculatedAnswer = "Calculation Error";
            }
            MyDataHelps.completeStep(calculatedAnswer.toString())
        })
    }, []);

    const findValue = (lookUpKey: string | undefined):string => {
        if (lookUpKey === undefined) {
            return "";
        }
        const stepIdentifier = lookUpKey.split(',')[0].trim();
        const resultIdentifier = lookUpKey.split(',').length > 1 ? lookUpKey.split(',')[1].trim() : null;
        if (resultIdentifier) {
            return (previousResults.find((item) => item.stepIdentifier == stepIdentifier && item.resultIdentifier == resultIdentifier))?.answers[0]!
        } else {
            return (previousResults.find((item) => item.stepIdentifier == stepIdentifier)?.answers[0]!);
        }
    }

    function replaceVariables(expression: string) {
        const regex = /\{(.*?)\}/g;

        const replacedExpression = expression.replace(regex, (match, variable :string) => {

            const value = parseFloat(findValue(variable));

            if (typeof value === 'number' && !isNaN(value)) {
                return value.toString();
            }

            return match;
        });

        return replacedExpression;
    }

    const convertLogicStringToCodeString = (input: string) => {
        input = replaceVariables(input);
        input = input.replace(/{/g, '');
        input = input.replace(/}/g, '');
        return (input);
    }
  
    return (
        <StepLayout>
            <LoadingIndicator></LoadingIndicator>
        </StepLayout>
    );
}