import { add, startOfToday } from 'date-fns';
import { describe, it, jest, expect, beforeEach } from '@jest/globals';
import { queryRelativeActivity, RelativeActivityDataType } from '../../src/helpers/relative-activity';
import { queryDailyData, DailyDataQueryResult } from '../../src/helpers/query-daily-data';
import getDayKey from '../../src/helpers/get-day-key';

jest.mock('../../src/helpers/query-daily-data', () => ({
  __esModule: true,
  queryDailyData: jest.fn()
}));

describe('queryRelativeActivity', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should calculate relative activity with numeric threshold', async () => {
    // Arrange
    const startDate = startOfToday();
    const endDate = startOfToday();
    const dayKey = getDayKey(startDate);
    const dataTypes: RelativeActivityDataType[] = [
      { 
        dailyDataType: 'steps',
        threshold: 10000
      }
    ];
    
    const mockDailyData: DailyDataQueryResult = {
      [dayKey]: 5000
    };
    (queryDailyData as jest.MockedFunction<typeof queryDailyData>).mockResolvedValue(mockDailyData);

    // Act
    const result = await queryRelativeActivity(startDate, endDate, dataTypes, false);

    // Assert
    expect(queryDailyData).toHaveBeenCalledWith(
      'steps',
      add(startDate, { days: -1 }),
      add(endDate, { days: 1 }),
      false
    );
    expect(result).toEqual({
      steps: {
        [dayKey]: {
          relativePercent: 0.25, // 5000 / (10000 * 2) = 0.25
          value: 5000,
          threshold: 10000
        }
      }
    });
  });

  it('should handle failed data fetch gracefully through Promise.allSettled', async () => {
    // Arrange
    const startDate = startOfToday();
    const endDate = startOfToday();
    const dayKey = getDayKey(startDate);
    const dataTypes: RelativeActivityDataType[] = [
      { dailyDataType: 'steps', threshold: 10000 },
      { dailyDataType: 'calories', threshold: 2000 }
    ];
    
    // Mock queryDailyData to succeed for steps but fail for calories
    (queryDailyData as jest.MockedFunction<typeof queryDailyData>)
      .mockImplementation((type: string) => {
        if (type === 'steps') return Promise.resolve({ [dayKey]: 5000 });
        if (type === 'calories') return Promise.reject(new Error('Data fetch failed'));
        return Promise.resolve({});
      });

    // Act
    const result = await queryRelativeActivity(startDate, endDate, dataTypes, false);

    // Assert
    expect(result).toEqual({
      steps: {
        [dayKey]: {
          relativePercent: 0.25,
          value: 5000,
          threshold: 10000
        }
      }
    });
    
    expect(queryDailyData).toHaveBeenCalledTimes(2);
  });
}); 