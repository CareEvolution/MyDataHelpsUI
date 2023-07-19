import { create, all } from 'mathjs'
import { CurrentSurveyAnswer } from '@careevolution/mydatahelps-js'

export const calculateValue = (calcString :string, surveyAnswers: CurrentSurveyAnswer[]) => {
  const config = { }
  const math = create(all, config)

  let replacedString = replaceVariables(calcString, surveyAnswers);
  replacedString = replacedString.replace("/{/g", "");
  replacedString = replacedString.replace("/}/g", "");

  if (replacedString.includes('Unmatched Variable')) {
    return("Calculation Error - Unmatched Variable") 
  }

  return(math.evaluate(replacedString).toString());
}

function replaceVariables(expression: string, surveyAnswers: CurrentSurveyAnswer[]): string {
  //find variables
  const regex = /\{(.*?)\}/g;

  //replace variables with numeric values and convert number to string
  let replacedExpression = expression.toString().replace(regex, (match, variable) => {
    const value = getValue(variable!, surveyAnswers);

    if (typeof value === 'number' && !isNaN(value)) {
      return value.toString();
    }

    return "Unmatched Variable";
  });

  return replacedExpression;
}

const getValue = (lookUpString :string, surveyAnswers :CurrentSurveyAnswer[]) => {
  const splitString = lookUpString.split(",");
  const stepIdentifier = splitString[0].trim()
  const resultIdentifier = splitString.length > 1 ? splitString[1].trim() : undefined;

  try {
    return (resultIdentifier != undefined ? 
        parseFloat(surveyAnswers.find((answer) => {
            return(answer.stepIdentifier == stepIdentifier && answer.resultIdentifier == resultIdentifier);
        })!.answers[0])
        : parseFloat(surveyAnswers.find((answer) => {
            return (answer.stepIdentifier == stepIdentifier);
        })!.answers[0]));
  }
  catch {
    return "Unmatched Variable"
  }
}