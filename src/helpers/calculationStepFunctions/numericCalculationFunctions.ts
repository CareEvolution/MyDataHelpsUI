import { create, all, string } from 'mathjs'
import { CurrentSurveyAnswer } from '@careevolution/mydatahelps-js'

export const calculateValue = (calcString :string, surveyAnswers: CurrentSurveyAnswer[]) => {
  const config = { }
  const math = create(all, config)

  try {
    // const answerDict: {[id: string] : number} = createScope(surveyAnswers);
    const [answerDict, brokenIdentifiers] = createScope(surveyAnswers);
    try {
      let calculation = math.evaluate(calcString, answerDict)._data[0].toString();
      if (calculation == "NaN"){
        let nonNumberIdentifier = Object.keys(answerDict).find(key => isNaN(answerDict[key]));
        throw Error(`Calculation Error: Answer not a number (${nonNumberIdentifier})`);
      }
      return(calculation);
    }
    catch(error: unknown) {
      if (error instanceof Error){
        if(!error.message.startsWith("Calculation Error:")) {
          const errorIdentifierMessage = brokenIdentifiers.length ? brokenIdentifiers : error.message;
          return("Calculation Error: Numeric Calculation Steps do not support StepIdentifier or ResultIdentifiers that have spaces, periods, or multiple-select (" + errorIdentifierMessage + ").");
        }
        else{
          return(error.message);
        }
      }
      return(error);
    }
  }
  catch(error: unknown) {
    if (error instanceof Error) {
      return(error.message);
    }
  }
}

const createScope = (surveyAnswers: CurrentSurveyAnswer[]) => {
  let answerDict: {[id: string] : number} = {};
  let issueIdentifier: string[] = [];
  surveyAnswers.map((answer) => {
    const value = parseFloat(answer.answers[0]);
    if (answer.answers.length > 1 || answer.resultIdentifier.includes('.')) {
      issueIdentifier.push(answer.resultIdentifier);
      return
    }
    answerDict[answer.resultIdentifier] = value;
  })
  return [answerDict, issueIdentifier] as const;
}