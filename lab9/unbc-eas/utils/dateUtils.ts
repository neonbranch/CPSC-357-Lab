/**
 * Date Utility Functions
 * 
 * This file contains helper functions for working with dates.
 * These functions make it easier to format and manipulate dates in our app.
 */

// Type definition for a date object with year, month, and day
export interface DateObject {
  year: number;
  month: number;
  day: number;
}

/**
 * Formats a date into YYYY-MM-DD format
 * 
 * @param year - The year (e.g., 2000)
 * @param month - The month (1-12)
 * @param day - The day (1-31)
 * @returns A formatted date string like "2000-01-15"
 * 
 * Example: formatDate(2000, 1, 15) returns "2000-01-15"
 */
export function formatDate(year: number, month: number, day: number): string {
  // Convert month to string and add leading zero if needed (e.g., "01" instead of "1")
  const monthString = month.toString().padStart(2, '0');
  
  // Convert day to string and add leading zero if needed (e.g., "05" instead of "5")
  const dayString = day.toString().padStart(2, '0');
  
  // Combine into YYYY-MM-DD format
  return `${year}-${monthString}-${dayString}`;
}

/**
 * Creates a default date object (20 years ago from today)
 * This is used as the starting date when the user opens the date picker
 * 
 * @returns A DateObject with year, month, and day
 */
export function getDefaultDate(): DateObject {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11, so we add 1
  const currentDay = today.getDate();
  
  // Return a date that is 20 years ago
  return {
    year: currentYear - 20,
    month: currentMonth,
    day: currentDay,
  };
}

/**
 * Gets the number of days in a specific month and year
 * This is important because different months have different numbers of days
 * 
 * @param year - The year
 * @param month - The month (1-12)
 * @returns The number of days in that month
 * 
 * Example: getDaysInMonth(2024, 2) returns 29 (leap year)
 *          getDaysInMonth(2023, 2) returns 28 (non-leap year)
 */
export function getDaysInMonth(year: number, month: number): number {
  // Create a date object for the first day of the next month
  // Then go back one day to get the last day of the current month
  const date = new Date(year, month, 0);
  return date.getDate();
}

/**
 * Gets the minimum year allowed (1900)
 * This prevents users from selecting dates too far in the past
 */
export function getMinYear(): number {
  return 1900;
}

/**
 * Gets the maximum year allowed (current year)
 * This prevents users from selecting dates in the future
 */
export function getMaxYear(): number {
  return new Date().getFullYear();
}

/**
 * Formats a date string into a readable format with day name, date, and time
 * 
 * @param dateString - ISO date string (e.g., "2024-01-15T10:30:00Z")
 * @returns Formatted string like "Monday, January 15, 2024 at 10:30 AM"
 * 
 * Example: formatDateTime("2024-01-15T10:30:00Z") returns "Monday, January 15, 2024 at 10:30 AM"
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  
  // Get day name (Monday, Tuesday, etc.)
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Get formatted date (January 15, 2024)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  // Get formatted time (10:30 AM)
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return `${dayName}, ${formattedDate} at ${formattedTime}`;
}

/**
 * Formats a date string into a short format with date and time
 * 
 * @param dateString - ISO date string
 * @returns Formatted string like "Jan 15, 2024 • 10:30 AM"
 */
export function formatShortDateTime(dateString: string): string {
  const date = new Date(dateString);
  
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return `${formattedDate} • ${formattedTime}`;
}

/**
 * Formats a date string into a very compact format
 * 
 * @param dateString - ISO date string
 * @returns Formatted string like "Jan 15, 10:30 AM"
 */
export function formatCompactDateTime(dateString: string): string {
  const date = new Date(dateString);
  
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return `${formattedDate}, ${formattedTime}`;
}
