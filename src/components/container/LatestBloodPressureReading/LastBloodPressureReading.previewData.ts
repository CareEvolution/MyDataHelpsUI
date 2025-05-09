import { BloodPressureClassification } from '../../presentational';
import { BloodPressureDataPoint } from '../../../helpers';
import { add } from "date-fns";

const systolicValues: Record<BloodPressureClassification, number> = {
    'low': 85,
    'normal': 115,
    'elevated': 125,
    'hypertension-stage-1': 135,
    'hypertension-stage-2': 145,
    'hypertensive-crisis': 185
};

export function createPreviewDataProvider(classification: BloodPressureClassification): () => Promise<BloodPressureDataPoint[]> {
    return async (): Promise<BloodPressureDataPoint[]> => {
        return [{ systolic: systolicValues[classification], diastolic: 75, date: add(new Date(), { days: -1 }) }];
    };
}