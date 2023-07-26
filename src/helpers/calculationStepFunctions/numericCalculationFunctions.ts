import { create, all, string } from 'mathjs'
import { CurrentSurveyAnswer } from '@careevolution/mydatahelps-js'

export const calculateValue = (calcString :string, surveyAnswers: CurrentSurveyAnswer[]) => {
  const config = { }
  const math = create(all, config)

  try {
    let answerDict: {[id: string] : number} = createScope(surveyAnswers);
    try {
      return(math.evaluate(calcString, answerDict)._data[0].toString());
    }
    catch {
      return("Calculation Error - Unmatched Variable") 
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
  surveyAnswers.map((answer) => {
    if (answer.answers.length > 1) {
      throw new Error(`Calculation Error - Calculation not available for multiple-select text choice questions (${answer.resultIdentifier})`)
    }
    if (answer.resultIdentifier.includes('.')) {
      throw new Error(`Calculation Error - QuestionIdentifier "${answer.resultIdentifier}" cannot have a "."`)
    }
    const value = parseFloat(answer.answers[0]);
    if (isNaN(value)){
      throw new Error(`Calculation Error - Answer not a number (${answer.resultIdentifier})`)
    }
    answerDict[answer.resultIdentifier] = value;
  })
  return answerDict;
}