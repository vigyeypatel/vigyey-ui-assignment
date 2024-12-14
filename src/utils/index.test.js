import { calculateRewardPoints, calculateMonthlyRewards, debounce, toCamelCase } from './Index';

describe('calculateRewardPoints', () => {
  it('should calculate points for amounts above 50 but less than 100', () => {
    const result = calculateRewardPoints(75);
    expect(result).toBe(25); // (75 - 50) * 1 = 25
  });

  it('should calculate points for amounts above 100', () => {
    const result = calculateRewardPoints(150);
    expect(result).toBe(150); // (100 - 50) * 1 + (150 - 100) * 2 = 50 + 100 = 150
  });

  it('should apply custom config for reward calculation', () => {
    const customConfig = { above50: 2, above100: 3 };
    const result = calculateRewardPoints(150, customConfig);
    expect(result).toBe(250); // (100 - 50) * 2 + (150 - 100) * 3 = 100 + 150 = 200
  });

  it('should return 0 points for amounts below or equal to 50', () => {
    const result = calculateRewardPoints(50);
    expect(result).toBe(0); // No points if amount is less than or equal to 50
  });
});

describe('calculateMonthlyRewards', () => {
  const transactions = [
    { customerId: 1, transactionAmount: 50, transactionDate: '2024-12-01' },
    { customerId: 1, transactionAmount: 100, transactionDate: '2024-12-15' },
    { customerId: 2, transactionAmount: 150, transactionDate: '2024-12-10' },
    { customerId: 2, transactionAmount: 200, transactionDate: '2024-11-20' },
  ];

  it('should group transactions by month and customerId', () => {
    const rewards = calculateMonthlyRewards(transactions);

    expect(rewards['1-December']).toEqual({ customerId: 1, month: 'December', points: 50 });
    expect(rewards['2-December']).toEqual({ customerId: 2, month: 'December', points: 150 });
    expect(rewards['2-November']).toEqual({ customerId: 2, month: 'November', points: 250 });
  });

  it('should correctly sum reward points for each customer and month', () => {
    const rewards = calculateMonthlyRewards(transactions);

    expect(rewards['1-December'].points).toBe(50);
    expect(rewards['2-December'].points).toBe(150);
    expect(rewards['2-November'].points).toBe(250); 
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('should debounce function calls correctly', () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 300);

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    // Ensure the mock function has not been called immediately
    expect(mockFunction).not.toHaveBeenCalled();

    // Fast forward time by 300ms
    jest.advanceTimersByTime(300);

    // Now the mock function should be called once
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should not call the debounced function if time has not passed', () => {
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 300);

    debouncedFunction();
    jest.advanceTimersByTime(100); // Less than the debounce delay
    debouncedFunction();
    jest.advanceTimersByTime(100); // Total of 200ms

    // The mock function should still not have been called
    expect(mockFunction).not.toHaveBeenCalled();
  });
});

describe('toCamelCase', () => {
  it('should convert a string with spaces to camelCase', () => {
    const result = toCamelCase('hello world');
    expect(result).toBe('helloWorld');
  });

  it('should handle capitalized words correctly', () => {
    const result = toCamelCase('Hello World');
    expect(result).toBe('helloWorld');
  });

  it('should handle multiple words', () => {
    const result = toCamelCase('This is a test case');
    expect(result).toBe('thisIsATestCase');
  });

  it('should handle single word input correctly', () => {
    const result = toCamelCase('hello');
    expect(result).toBe('hello');
  });

  it('should return an empty string when input is empty', () => {
    const result = toCamelCase('');
    expect(result).toBe('');
  });
});
