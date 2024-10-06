import { formatNumber } from '../utils/formatNumber.util';

describe('formatNumber', () => {
  test('should format a positive integer', () => {
    const result = formatNumber(1000);
    expect(result).toBe('1,000');
  });

  test('should format a negative integer', () => {
    const result = formatNumber(-1000);
    expect(result).toBe('-1,000');
  });

  test('should format a number with decimals', () => {
    const result = formatNumber(1234.56);
    expect(result).toBe('1,234.56');
  });

  test('should format a negative number with decimals', () => {
    const result = formatNumber(-1234.56);
    expect(result).toBe('-1,234.56');
  });

  test('should format zero correctly', () => {
    const result = formatNumber(0);
    expect(result).toBe('0');
  });

  test('should format a large number', () => {
    const result = formatNumber(1234567890);
    expect(result).toBe('1,234,567,890');
  });
});
