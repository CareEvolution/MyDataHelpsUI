import { calculateValue } from "./numericCalculationFunctions";

describe("NumericCalculationTests", () => {
    test('1 form step', () => {
      expect(calculateValue(
        "(({Q1}*{Form1, Q1.2})+{Q2})-{Q3}",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["3"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1.2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe('11');
    });

    test('Invalid Variable', () => {
      expect(calculateValue(
        "(({Q8}*{Form1, Q1.2})+{Q2})-{Q3}",
        [{"date":"2023-07-19T11:14:18.377-04:00","stepIdentifier":"Q1","resultIdentifier":"Q1","answers":["3"]},{"date":"2023-07-19T11:14:18.944-04:00","stepIdentifier":"Form1","resultIdentifier":"Q1.2","answers":["4"]},{"date":"2023-07-19T11:14:20.338-04:00","stepIdentifier":"Q2","resultIdentifier":"Q2","answers":["2"]},{"date":"2023-07-19T11:14:20.849-04:00","stepIdentifier":"Q3","resultIdentifier":"Q3","answers":["3"]}]
      )).toBe('Calculation Error - Unmatched Variable');
    });
});