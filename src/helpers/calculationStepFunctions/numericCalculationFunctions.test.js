import { calculateValue } from "./numericCalculationFunctions";

describe("NumericCalculationTests", () => {
    test('QuestionIdentifier has .', () => {
      expect(calculateValue(
        "(([Q1]*[Q1.2])[Q2])-[Q3]",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["3"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1.2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe(`Calculation Error: Numeric Calculation Steps do not support StepIdentifier or ResultIdentifiers that have spaces, periods, or multiple-select (Q1.2).`);
    });

    test('Multiple Errors', () => {
      expect(calculateValue(
        "(([Q1]*[Q1.2])[Q2])-[Q3]",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["3", "4"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1.2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe(`Calculation Error: Numeric Calculation Steps do not support StepIdentifier or ResultIdentifiers that have spaces, periods, or multiple-select (Q1,Q1.2).`);
    });

    test('Invalid Variable', () => {
      expect(calculateValue(
        "(([Q8]*[Q1_2])+[Q2])-[Q3]",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["3"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1_2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe('Calculation Error: Numeric Calculation Steps do not support StepIdentifier or ResultIdentifiers that have spaces, periods, or multiple-select (Undefined symbol Q8).');
    });

    test('Checkbox - multiselect', () => {
      expect(calculateValue(
        "(([Q1]*[Q1_2])+[Q2])-[Q3]",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["3", "4"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1_2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe('Calculation Error: Numeric Calculation Steps do not support StepIdentifier or ResultIdentifiers that have spaces, periods, or multiple-select (Q1).');
    });

    test('Calculation includes variable that is not a number', () => {
      expect(calculateValue(
        "(([Q1]*[Q1_2])+[Q2])-[Q3]",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["Jacob"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1_2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe('Calculation Error: Answer not a number (Q1)');
    });

    test('Unused Identifier contains .', () => {
      expect(calculateValue(
        "(([Q1]*[Q1_2])+[Q2])-[Q3]",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["Jacob"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1_2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]},{"date":"2023-07-19T11:14:21.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q4.1","answers":["3"]}]
      )).toBe('Calculation Error: Answer not a number (Q1)');
    });

    test('Calculation Passes', () => {
      expect(calculateValue(
        "(([Q1]*[Q1_2])+[Q2])-[Q3]",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["3"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1_2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe('11');
    });
});