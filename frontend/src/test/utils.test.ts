import { describe, it, expect } from 'vitest';
import { calculateTimeDifference, formatDate } from '../utils/dateUtils';
import { getCountryCode } from '../utils/imageUtils';

describe('dateUtils', () => {
  describe('calculateTimeDifference', () => {
    it('should return the correct time difference in seconds', () => {
      const now = Date.now();
      const tenSecondsAgo = (now - 10000).toString();
      expect(calculateTimeDifference(tenSecondsAgo)).toBe('10 seconds ago');
    });

    it('should return the correct time difference in minutes', () => {
      const now = Date.now();
      const fiveMinutesAgo = (now - 5 * 60 * 1000).toString();
      expect(calculateTimeDifference(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    it('should return the correct time difference in hours', () => {
      const now = Date.now();
      const twoHoursAgo = (now - 2 * 60 * 60 * 1000).toString();
      expect(calculateTimeDifference(twoHoursAgo)).toBe('2 hours ago');
    });

    it('should return the correct time difference in days', () => {
      const now = Date.now();
      const threeDaysAgo = (now - 3 * 24 * 60 * 60 * 1000).toString();
      expect(calculateTimeDifference(threeDaysAgo)).toBe('3 days ago');
    });

    it('should return the correct time difference in months', () => {
      const now = Date.now();
      const twoMonthsAgo = (now - 2 * 30 * 24 * 60 * 60 * 1000).toString();
      expect(calculateTimeDifference(twoMonthsAgo)).toBe('2 months ago');
    });

    it('should return the correct time difference in years', () => {
      const now = Date.now();
      const oneYearAgo = (now - 365 * 24 * 60 * 60 * 1000).toString();
      expect(calculateTimeDifference(oneYearAgo)).toBe('1 year ago');
    });
  });

  describe('formatDate', () => {
    it('should format the date correctly', () => {
      const date = '1672531199000'; // 31.12.2022
      expect(formatDate(date)).toBe('01.01.2023');
    });

    it('should return "Invalid Date" for invalid date strings', () => {
      const invalidDate = 'invalid';
      expect(formatDate(invalidDate)).toBe('Invalid Date');
    });
  });
});

describe('imageUtils', () => {
  describe('getCountryCode', () => {
    it('should return the correct country codes', () => {
      const countries = ['Norway', 'Sweden'];
      const expectedCodes = ['no', 'se'];
      expect(getCountryCode(countries)).toEqual(expectedCodes);
    });

    it('should return "xx" for unknown countries', () => {
      const countries = ['Unknownland'];
      const expectedCodes = ['xx'];
      expect(getCountryCode(countries)).toEqual(expectedCodes);
    });
  });
});
