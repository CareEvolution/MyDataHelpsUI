import React, { useState, useEffect } from 'react'
import MyDataHelps, {StepConfiguration} from '@careevolution/mydatahelps-js';
import NumericCalculationStep from '../NumericCalculationStep/NumericCalculationStep';
import { CurrentSurveyAnswer } from '@careevolution/mydatahelps-js';
import { create, all } from 'mathjs'

export default function () {

    const [calculationString, setCalculationString] = useState<string>("");
    const [calculationReady, setCalculationReady] = useState<boolean>(false);
    const [calculationResult, setCalculationResult] = useState<string>("");

    const config = { }
    const math = create(all, config)


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

    const calculateValue = (calcString :string, surveyAnswers: CurrentSurveyAnswer[]) => {
        let replacedString = replaceVariables(calcString, surveyAnswers);
        replacedString = replacedString.replace("/{/g", "parseInt(getAnswer('");
        replacedString = replacedString.replace("/}/g", "'))");

        return(math.evaluate(replacedString));
    }

    function replaceVariables(expression: string, surveyAnswers: CurrentSurveyAnswer[]): string {
        //find variables
        const regex = /\{(.*?)\}/g;
      
        //replace variables with numeric values and convert number to string
        const replacedExpression = expression.replace(regex, (match, variable) => {
          const value = getValue(variable!, surveyAnswers);
      
          if (typeof value === 'number' && !isNaN(value)) {
            return value.toString();
          }
      
          return match;
        });
      
        return replacedExpression;
      }


    const getValue = (lookUpString :string, surveyAnswers :CurrentSurveyAnswer[]) => {
        const splitString = lookUpString.split(",");
        const stepIdentifier = splitString[0].trim()
        const resultIdentifier = splitString.length > 1 ? splitString[1].trim() : null;

        return (resultIdentifier ? 
            parseFloat(surveyAnswers.find((answer) => {
                answer.stepIdentifier == stepIdentifier && answer.resultIdentifier == resultIdentifier;
            })!.answers[0])
            : parseFloat(surveyAnswers.find((answer) => {
                answer.stepIdentifier == stepIdentifier;
            })!.answers[0]));
    }


    return (
        <NumericCalculationStep
            calculationReady={calculationReady}
            calculationResult={calculationResult}
        />
    );
}